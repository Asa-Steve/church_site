const axios = require("axios");
const Payment = require("../models/paymentSchema");
const massReq = require("../models/massRequestSchema");
const InfantReg = require("../models/infantBaptismSchema");
const User = require("../models/userSchema");

//initialize a Paystack transaction
const mongoose = require("mongoose");

const getTotalForCurrentMonth = async (req, res) => {
  try {
    // Get the current month and year
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth(); // 0-indexed
    const currentYear = currentDate.getFullYear();

    // Array of month names
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    // Correctly define the start and end of the current month in UTC
    const startOfMonth = new Date(
      Date.UTC(currentYear, currentMonth, 1, 0, 0, 0, 0)
    );
    const endOfMonth = new Date(
      Date.UTC(currentYear, currentMonth + 1, 1, 0, 0, 0, 0)
    ); // EXCLUSIVE

    // Aggregate total amount for the current month
    const result = await Payment.aggregate([
      {
        $match: {
          createdAt: { $gte: startOfMonth, $lt: endOfMonth }, // Use `$lt` to exclude next month
        },
      },
      {
        $group: {
          _id: null, // Group all records together
          totalAmount: { $sum: "$amount" }, // Sum all `amount` fields
        },
      },
    ]);

    const totalAmount = result.length > 0 ? result[0].totalAmount : 0; // Get total or default to 0

    return {
      month: `${monthNames[currentMonth]}, ${currentYear}`,
      total: `${totalAmount}`,
    }; // Return the total for the current month
  } catch (error) {
    console.error("Error retrieving total for current month:", error);
    throw new Error("Failed to retrieve total for the current month");
  }
};

const getInfants = async (interval, month = null, year = null) => {
  const now = new Date();
  let filter = {};

  if (interval === "monthly") {
    const filterYear = year || now.getFullYear(); // Use provided year or default to current year
    const filterMonth = month !== null ? month - 1 : now.getMonth(); // Use provided month or default to current month

    filter = {
      createdAt: {
        $gte: new Date(filterYear, filterMonth, 1), // Start of the specified month
        $lt: new Date(filterYear, filterMonth + 1, 1), // Start of the next month
      },
    };
  } else if (interval === "yearly") {
    const filterYear = year || now.getFullYear();

    filter = {
      createdAt: {
        $gte: new Date(filterYear, 0, 1), // Start of the year
        $lt: new Date(filterYear + 1, 0, 1), // Start of the next year
      },
    };
  }

  try {
    const total = await InfantReg.countDocuments(filter);
    return total;
  } catch (error) {
    console.error("Error fetching registrations:", error);
    throw new Error("Failed to fetch registrations");
  }
};

const getMassReqs = async (interval, month = null, year = null) => {
  const now = new Date();
  let filter = {};

  if (interval === "monthly") {
    const filterYear = year || now.getFullYear(); // Use provided year or default to current year
    const filterMonth = month !== null ? month - 1 : now.getMonth(); // Use provided month or default to current month

    filter = {
      createdAt: {
        $gte: new Date(filterYear, filterMonth, 1), // Start of the specified month
        $lt: new Date(filterYear, filterMonth + 1, 1), // Start of the next month
      },
    };
  } else if (interval === "yearly") {
    const filterYear = year || now.getFullYear();

    filter = {
      createdAt: {
        $gte: new Date(filterYear, 0, 1), // Start of the year
        $lt: new Date(filterYear + 1, 0, 1), // Start of the next year
      },
    };
  }

  try {
    const total = await massReq.countDocuments(filter);
    return total;
  } catch (error) {
    console.error("Error fetching registrations:", error);
    throw new Error("Failed to fetch registrations");
  }
};

const getWeeklyDataForCurrentMonth = async () => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth(); // 0-indexed (January = 0)
  const currentYear = currentDate.getFullYear();

  // 🔥 Manually set the strict start and end date for MongoDB filtering
  const startOfMonth = new Date(
    Date.UTC(currentYear, currentMonth, 1, 0, 0, 0, 0)
  ); // Jan 1, 2025 00:00:00 UTC
  const endOfMonth = new Date(
    Date.UTC(currentYear, currentMonth + 1, 1, 0, 0, 0, 0)
  ); // Feb 1, 2025 00:00:00 UTC (EXCLUSIVE)

  const rawData = await Payment.find({
    purpose: { $in: ["infant_baptism", "donation", "mass_request"] },
    createdAt: { $gte: startOfMonth, $lt: endOfMonth }, // 🔥 `$lt` ensures only January data is included
  }).lean();

  // Function to get correct week within the month
  const calculateWeekOfMonth = (date) => {
    const dayOfMonth = date.getUTCDate(); // Ensure UTC consistency
    return Math.ceil(dayOfMonth / 7);
  };

  // Aggregate weekly data
  const weeklyData = {};
  rawData.forEach((payment) => {
    const paymentDate = new Date(payment.createdAt);
    const week = calculateWeekOfMonth(paymentDate);

    if (!weeklyData[week]) {
      weeklyData[week] = {
        week: `Week ${week}`,
        amt: 0,
        inf_baptism: 0,
        donations: 0,
        mass_requests: 0,
      };
    }

    weeklyData[week].amt += payment.amount;
    if (payment.purpose === "infant_baptism")
      weeklyData[week].inf_baptism += payment.amount;
    if (payment.purpose === "donation")
      weeklyData[week].donations += payment.amount;
    if (payment.purpose === "mass_request")
      weeklyData[week].mass_requests += payment.amount;
  });

  // Generate weeks dynamically
  const lastDayOfMonth = new Date(
    currentYear,
    currentMonth + 1,
    0
  ).getUTCDate();
  const totalWeeks = Math.ceil(lastDayOfMonth / 7);
  const formattedData = Array.from({ length: totalWeeks }, (_, i) => {
    return (
      weeklyData[i + 1] || {
        week: `Week ${i + 1}`,
        amt: 0,
        inf_baptism: 0,
        donations: 0,
        mass_requests: 0,
      }
    );
  });

  return formattedData;
};

const getTotalUsers = async () => {
  const totalUsers = await User.countDocuments();
  return totalUsers;
};

exports.allPayments = async (req, res) => {
  try {
    const monthlyData = await getWeeklyDataForCurrentMonth();
    const totalAmount = await getTotalForCurrentMonth();
    const totalInfants = await getInfants("monthly");
    const totalMassReqs = await getMassReqs("monthly");
    const totalUsers = await getTotalUsers();

    return res.status(200).json({
      status: "success",
      data: monthlyData,
      totalAmount,
      totalInfantsReg: totalInfants,
      totalMassReqs,
      totalUsers,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.verifyPayment = async (req, res) => {
  try {
    const { reference } = req.body;

    // Start a session for the transaction
    const session = await mongoose.startSession();
    session.startTransaction();

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
  try {
    const { email, amount, callback_url, metadata } = req.body;
    if (!email || !amount || !callback_url) {
      return res.status(400).json({ error: "Email and amount are required" });
    }

    const fields = {
      email,
      amount,
      callback_url,
      metadata: { ...metadata, email, amount },
    };

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
