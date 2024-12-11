const axios = require("axios");
const Payment = require("../models/paymentSchema");
const massReq = require("../models/massRequest.Schema");
const InfantReg = require("../models/infantBaptismSchema");

//initialize a Paystack transaction
const mongoose = require("mongoose");

exports.verifyPayment = async (req, res) => {
  const { reference } = req.body;

  // Start a session for the transaction
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Verifying the payment with Paystack
    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.SECRET_KEY_TEST}`,
        },
      }
    );

    if (response?.data?.status) {
      // Getting the Required Details from the Paystack Returned Data
      const dataPaystack = {
        ...response?.data?.data?.metadata,
        method: response?.data?.data?.authorization?.channel,
        reference: response?.data?.data?.reference,
      };
      const {
        amount: amountPaystack,
        reference: referencePaystack,
        metadata,
      } = response.data.data;

      // Validate metadata object
      if (!metadata || typeof metadata !== "object") {
        return res
          .status(400)
          .json({ message: "Invalid metadata in response" });
      }

      // Processing Infant Baptism Payment
      if (metadata.paymentFor === "infant_baptism") {
        if (
          Number(amountPaystack) / 100 === 1000 &&
          referencePaystack === reference
        ) {
          // Creating a new Infant Record before saving to payment record
          const newInfantReg = new InfantReg({
            email: dataPaystack.email,
            infant: {
              baptismName: dataPaystack.baptismName,
              otherName: dataPaystack.otherName,
              surname: dataPaystack.surname,
              dob: dataPaystack.dob,
              birthPlace: dataPaystack.birthPlace,
            },
            parents: {
              fatherName: dataPaystack.fatherName,
              motherName: dataPaystack.motherName,
              contact: dataPaystack.parentPhone,
              residenceAddr: dataPaystack.residenceAddr,
              homeTown: dataPaystack.homeTown,
              lga: dataPaystack.lga,
              state: dataPaystack.state,
              wedded: dataPaystack.wedded,
            },
            sponsor: dataPaystack.sponsor,
            payment: {
              amount: dataPaystack.amount / 100,
              paymentFor: dataPaystack.paymentFor,
            },
          });

          // Saving the new Infant Record with MongoDB Transaction to DB and returning the _Id
          const { _id: InfantRegId } = await newInfantReg.save({ session });

          // Creating a new instance of Payment
          const newPayment = new Payment({
            email: dataPaystack.email,
            amount: dataPaystack.amount / 100,
            purpose: dataPaystack.paymentFor,
            referenceId: InfantRegId,
            transactionId: dataPaystack.reference,
            method: dataPaystack.method,
          });

          // Saving the new Payment with the returned reference ID
          // of the Infant Record using MongoDB Transaction
          await newPayment.save({ session });

          // Commit the transaction
          await session.commitTransaction();
          session.endSession();

          return res.status(200).json(response.data.data);
        } else {
          // Rollback on failure
          await session.abortTransaction();
          session.endSession();
          return res
            .status(400)
            .json({ message: "Amount or reference not correct" });
        }
      }
      // Processing Donation Payment
      else if (
        metadata.paymentFor === "donation" &&
        referencePaystack === reference
      ) {
        // Creating a new instance of Payment
        const newPayment = new Payment({
          email: dataPaystack.email,
          amount: dataPaystack.amount / 100,
          purpose: dataPaystack.paymentFor,
          transactionId: dataPaystack.reference,
          method: dataPaystack.method,
        });

        // Saving the Payment with the transaction with MongoDB Transaction
        await newPayment.save({ session });

        // Commit the transaction
        await session.commitTransaction();
        session.endSession();

        return res.status(200).json(response.data.data);
      }
      // Processing Mass Request Payment
      else if (
        metadata.paymentFor === "mass_request" &&
        Number(amountPaystack) / 100 >= 300
      ) {
        // Creating a new Mass Request before saving to payment record
        const newMassReq = new massReq({
          fullName: dataPaystack.fullName,
          email: dataPaystack.email,
          novena: dataPaystack.novena,
          intentions: dataPaystack.intentions,
          transactionId: dataPaystack.reference,
          amount: dataPaystack.amount / 100,
          requestedFor: dataPaystack.requestedFor,
          note: dataPaystack.note,
        });

        // Saving the new Mass Request and returning the _Id using MongoDB Transaction
        const { _id: massId } = await newMassReq.save({ session });

        // Creating a new instance of Payment
        const newPayment = new Payment({
          email: dataPaystack.email,
          amount: dataPaystack.amount / 100,
          purpose: dataPaystack.paymentFor,
          referenceId: massId,
          transactionId: dataPaystack.reference,
          method: dataPaystack.method,
        });

        // Saving the new Payment with the returned reference ID
        // of the Mass Request using MongoDB Transaction
        await newPayment.save({ session });

        // Commit the transaction
        await session.commitTransaction();
        session.endSession();

        return res.status(200).json(response.data.data);
      } else {
        // Rollback on invalid paymentFor
        await session.abortTransaction();
        session.endSession();
        return res.status(400).json({ message: "Something went wrong" });
      }
    } else {
      throw new Error("Payment verification failed");
    }
  } catch (error) {
    // Rollback on error
    await session.abortTransaction();
    session.endSession();

    console.error(
      "Error verifying payment:",
      error.response ? error.response.data : error.message
    );
    return res.status(500).json({
      error: error.response ? error.response.data : "An error occurred",
    });
  }
};

exports.initializePayment = async (req, res) => {
  const { email, amount, callback_url, metadata } = req.body;
  console.log("got here"); //subject to removal

  if (!email || !amount || !callback_url) {
    return res.status(400).json({ error: "Email and amount are required" });
  }

  const fields = {
    email,
    amount,
    callback_url,
    metadata: { ...metadata, email, amount },
  };

  //   console.log(fields);

  try {
    // Sending the request to Paystack's API
    const response = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      fields,
      {
        headers: {
          Authorization: `Bearer ${process.env.SECRET_KEY_TEST}`, // Replace with your Paystack secret key
          "Cache-Control": "no-cache",
          "Content-Type": "application/json",
        },
      }
    );

    // Return the response from Paystack to the client
    return res.status(response.status).json(response.data);
  } catch (error) {
    console.error(
      "Error initializing transaction:",
      error.response?.data || error?.message
    );
    return res
      .status(error.response?.status || 500)
      .json({ error: error.response?.data || "An error occurred" });
  }
};
