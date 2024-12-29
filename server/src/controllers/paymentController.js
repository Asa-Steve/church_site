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

    // Define the start and end of the current month
    const startOfMonth = new Date(currentYear, currentMonth, 1); // Start of the month
    const endOfMonth = new Date(
      currentYear,
      currentMonth + 1,
      0,
      23,
      59,
      59,
      999
    ); // End of the month

    const result = await Payment.aggregate([
      {
        $match: {
          createdAt: {
            $gte: startOfMonth, // Records from the start of the month
            $lte: endOfMonth, // Records up to the end of the month
          },
        },
      },
      {
        $group: {
          _id: null, // Grouping all records together
          totalAmount: { $sum: "$amount" }, // Sum of all "amount" fields
        },
      },
    ]);

    const totalAmount = result.length > 0 ? result[0].totalAmount : 0; // Get the total or default to 0

    return {
      month: `${monthNames[currentMonth]}, ${currentYear}`,
      total: `${totalAmount}`,
    }; // Return the total for the current month  });
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
  // Get the current month and year
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1; // Month is 0-indexed, so add 1
  const currentYear = currentDate.getFullYear();

  // Define the start and end of the current month
  const startOfMonth = new Date(currentYear, currentMonth - 1, 1); // Start of the current month
  const endOfMonth = new Date(currentYear, currentMonth, 0, 23, 59, 59, 999); // End of the current month

  // Fetch and process data
  const result = await Payment.aggregate([
    {
      $match: {
        purpose: { $in: ["infant_baptism", "donation", "mass_request"] }, // Filter specified purposes
        createdAt: { $gte: startOfMonth, $lte: endOfMonth }, // Filter by the current month
      },
    },
    {
      $addFields: {
        weekOfMonth: {
          $ceil: {
            $divide: [{ $dayOfMonth: "$createdAt" }, 7], // Calculate the week number within the month
          },
        },
      },
    },
    {
      $group: {
        _id: { week: "$weekOfMonth" }, // Group by week of the month
        totalAmount: { $sum: "$amount" }, // Total for all purposes in the week
        infBaptism: {
          $sum: {
            $cond: [{ $eq: ["$purpose", "infant_baptism"] }, "$amount", 0],
          },
        },
        donations: {
          $sum: {
            $cond: [{ $eq: ["$purpose", "donation"] }, "$amount", 0],
          },
        },
        massRequests: {
          $sum: {
            $cond: [{ $eq: ["$purpose", "mass_request"] }, "$amount", 0],
          },
        },
      },
    },
    { $sort: { "_id.week": 1 } }, // Sort by week number within the month (ascending)
  ]);

  // Format the result into the desired structure
  const formattedData = result.map((weekData) => {
    return {
      week: `Week ${weekData._id.week}`, // Week number (e.g., "Week 1")
      inf_baptism: weekData.infBaptism || 0, // Total for "infant_baptism"
      donations: weekData.donations || 0, // Total for "donations"
      mass_requests: weekData.massRequests || 0, // Total for "mass_request"
      amt: weekData.totalAmount || 0, // Total for the week (all purposes)
    };
  });

  return formattedData; // Return the formatted data
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
