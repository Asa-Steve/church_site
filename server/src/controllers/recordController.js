const xlsx = require("xlsx");
const fs = require("fs");

// Schemas
const baptismRecord = require("../models/allBaptismSchema");
const marriageRecord = require("../models/allMarriageSchema");

// Utility Fn to Process records in batches
const processBatch = require("../utils/recordHelpers");

// My Controller Fns
const recordBaptism = async (req, res) => {
  try {
    const { role } = req.user;
    if (role !== "superAdmin" && role !== "secretary") {
      return res
        .status(403)
        .json({ status: "failure", message: "Not Authorized!" });
    }
    const newRecord = new baptismRecord({
      baptismName: req.body.baptismName, // The baptismal name
      otherName: req.body.otherName, // Additional name(s)
      surname: req.body.surname, // The surname
      dob: req.body.dob, // The  date of birth
      doBaptism: req.body.doBaptism, // The date of baptism
      birthPlace: req.body.birthPlace, // The place where the person was born
      fatherName: req.body.fatherName, // Father's name
      motherName: req.body.motherName, // Mother's name
      homeTown: req.body.homeTown, // Family's hometown
      lga: req.body.lga, // Local Government Area
      state: req.body.state,
      lb: req.body.lb,
      sponsor: req.body.sponsor, // Name of the sponsor for baptism
      minister: req.body.minister,
    });

    await newRecord.save();

    res
      .status(200)
      .json({ status: "success", message: "successfully uploaded Record" });
  } catch (err) {
    if (err?.errorResponse?.code === 11000) {
      const [key, value] = Object.entries(err.keyValue)[0];
      err.message = `${key}-${value} already exists`;
    }
    res.status(500).json({
      status: "failure",
      message: err?.message || "Internal server error",
    });
  }
};

const recordMarriage = async (req, res) => {
  try {
    const { role } = req.user;
    if (role !== "superAdmin" && role !== "secretary") {
      return res
        .status(403)
        .json({ status: "failure", message: "Not Authorized!" });
    }

    const newMarriageRecord = new marriageRecord({
      husbandName: req.body.husbandName,
      wifeName: req.body.wifeName,
      lm: req.body.lm,
      doMarriage: req.body.doMarriage,
      placeofMarriage: req.body.placeofMarriage,
      witness1: req.body.witness1,
      witness2: req.body.witness2,
      officiatingPriest: req.body.officiatingPriest,
    });

    await newMarriageRecord.save();
    res
      .status(200)
      .json({ status: "success", message: "successfully uploaded Record" });
  } catch (err) {
    if (err?.errorResponse?.code === 11000) {
      const [key, value] = Object.entries(err.keyValue)[0];
      err.message = `${key}-${value} already exists`;
    }
    res.status(500).json({
      status: "failure",
      message: err?.message || "Internal server error",
    });
  }
};

const recordFile = async (req, res) => {
  try {
    const { role } = req.user;
    if (role !== "superAdmin" && role !== "secretary") {
      return res
        .status(403)
        .json({ status: "failure", message: "Not Authorized!" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    const { for: desiredType } = req.body;

    // Read the uploaded file
    const filePath = req.file.path;
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

    // Processing the data
    const result = await processBatch(sheetData, desiredType);

    // Deleting the temporary file
    fs.unlinkSync(filePath);

    if (result.errors.length > 0) {
      return res.status(400).json({
        message:
          result.errors.length > 0
            ? result.errors.join("\n")
            : result?.errors || "Some records failed validation",
      });
    }

    res.status(200).json({
      status: "success",
      message: `All ${result.savedCount} records processed successfully`,
      saveCount: result.savedCount,
    });
  } catch (error) {
    console.error(error);

    if (req.file) {
      fs.unlinkSync(req.file.path); // Cleanup in case of error
    }

    res
      .status(500)
      .json({ status: "failure", message: "Server error occurred" });
  }
};

const getRecordById = async (req, res) => {
  try {
    const { desiredType, lm = null, lb = null } = req.query;
    if (desiredType === "baptism" && lb) {
      const foundRecord = await baptismRecord
        .findOne({ lb })
        .select("-createdAt -updatedAt"); // Exclude fields;

      console.log(foundRecord);
      res.status(200).json({ status: "success", foundRecord });
    } else if (desiredType === "marriage" && lm) {
      const foundRecord = await marriageRecord
        .findOne({ lm })
        .select("-createdAt -updatedAt"); // Exclude fields;
      res.status(200).json({ status: "success", foundRecord });
    } else {
      res
        .status(401)
        .json({ status: "failure", message: "Unrecognised Request" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ status: "failure", message: "Something went wrong" });
  }
};

const getRecordByDate = async (req, res) => {
  try {
    const { to, from, desiredType, page = 1, limit = 10 } = req.query;

    if (desiredType === "marriage") {
      const foundRecords = await marriageRecord
        .find({
          doMarriage: {
            $gte: from,
            $lte: to,
          },
        })
        .skip((page - 1) * limit) // Skip documents for previous pages
        .limit(parseInt(limit)) // Limit number of documents per page;
        .select("-createdAt -updatedAt"); // Exclude fields;
      const total = await marriageRecord.countDocuments({
        doMarriage: {
          $gte: from,
          $lte: to,
        },
      });
      res.status(200).json({
        status: "success",
        foundRecords,
        totalPages: Math.ceil(total / limit),
        currentPage: parseInt(page),
        totalItems: total,
      });
    } else if (desiredType === "baptism") {
      const foundRecords = await baptismRecord
        .find({
          doBaptism: { $gte: from, $lte: to },
        })
        .skip((page - 1) * limit) // Skip documents for previous pages
        .limit(parseInt(limit)) // Limit number of documents per page;
        .select("-createdAt -updatedAt"); // Exclude fields;

      const total = await baptismRecord.countDocuments({
        doBaptism: {
          $gte: from,
          $lte: to,
        },
      });

      res.status(200).json({
        status: "success",
        foundRecords,
        totalPages: Math.ceil(total / limit),
        currentPage: parseInt(page),
        totalItems: total,
      });
    }
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ status: "success", message: "something went wrong" });
  }
};

const getRecordByName = async (req, res) => {
  const {
    husbandName,
    wifeName,
    desiredType,
    baptismName,
    otherName,
    surname,
    page = 1,
    limit = 10,
  } = req.query;

  if (desiredType === "marriage") {
    const foundRecords = await marriageRecord
      .find({
        $or: [
          { husbandName: { $regex: husbandName, $options: "i" } },
          { wifeName: { $regex: wifeName, $options: "i" } },
        ],
      })
      .skip((page - 1) * limit) // Skip documents for previous pages
      .limit(parseInt(limit)) // Limit number of documents per page;
      .select("-createdAt -updatedAt");

    const total = await marriageRecord.countDocuments({
      $or: [
        { husbandName: { $regex: husbandName, $options: "i" } },
        { wifeName: { $regex: wifeName, $options: "i" } },
      ],
    });

    res.status(200).json({
      status: "success",
      foundRecords,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      totalItems: total,
    });
  } else if (desiredType === "baptism") {
    const foundRecords = await baptismRecord
      .find({
        $or: [
          {
            baptismName: { $regex: baptismName, $options: "i" },
            otherName: { $regex: otherName, $options: "i" },
          },
          {
            otherName: { $regex: otherName, $options: "i" },
            surname: { $regex: surname, $options: "i" },
          },
          {
            baptismName: { $regex: baptismName, $options: "i" },
            surname: { $regex: surname, $options: "i" },
          },
        ],
      })
      .skip((page - 1) * limit) // Skip documents for previous pages
      .limit(parseInt(limit)) // Limit number of documents per page;
      .select("-createdAt -updatedAt");

    const total = await baptismRecord.countDocuments({
      $or: [
        {
          baptismName: { $regex: baptismName, $options: "i" },
          otherName: { $regex: otherName, $options: "i" },
        },
        {
          otherName: { $regex: otherName, $options: "i" },
          surname: { $regex: surname, $options: "i" },
        },
        {
          baptismName: { $regex: baptismName, $options: "i" },
          surname: { $regex: surname, $options: "i" },
        },
      ],
    });

    res.status(200).json({
      status: "success",
      foundRecords,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      totalItems: total,
    });
  }
};

const editRecord = async (req, res) => {
  try {
    const { role } = req.user;
    const { desiredType, lm = null, lb = null } = req.query;

    if (role !== "superAdmin" && role !== "secretary") {
      return res
        .status(403)
        .json({ status: "failure", message: "Not Authorized!" });
    }

    if (desiredType === "marriage") {
      await marriageRecord.findOneAndUpdate(
        { lm },
        {
          husbandName: req?.body?.husbandName && req.body.husbandName,
          wifeName: req?.body?.wifeName && req.body.wifeName,
          lm: req?.body?.lm && req.body.lm,
          doMarriage: req?.body?.doMarriage && req.body.doMarriage,
          placeofMarriage:
            req?.body?.placeofMarriage && req.body.placeofMarriage,
          witness1: req?.body?.witness1 && req.body.witness1,
          witness2: req?.body?.witness2 && req.body.witness2,
          officiatingPriest:
            req?.body?.officiatingPriest && req.body.officiatingPriest,
        }
      );

      res
        .status(200)
        .json({ status: "success", message: "Record updated successfully!" });
    } else if (desiredType === "baptism") {
      await baptismRecord.findOneAndUpdate(
        { lb },
        {
          baptismName: req?.body?.baptismName && req.body.baptismName, // The baptismal name
          otherName: req?.body?.otherName && req.body.otherName, // Additional name(s)
          surname: req?.body?.surname && req.body.surname, // The surname
          dob: req?.body?.dob && req.body.dob, // The  date of birth
          doBaptism: req?.body?.doBaptism && req.body.doBaptism, // The date of baptism
          birthPlace: req?.body?.birthPlace && req.body.birthPlace, // The place where the person was born
          fatherName: req?.body?.fatherName && req.body.fatherName, // Father's name
          motherName: req?.body?.motherName && req.body.motherName, // Mother's name
          homeTown: req?.body?.homeTown && req.body.homeTown, // Family's hometown
          lga: req?.body?.lga && req.body.lga, // Local Government Area
          state: req?.body?.state && req.body.state,
          lb: req?.body?.lb && req.body.lb,
          sponsor: req?.body?.sponsor && req.body.sponsor, // Name of the sponsor for baptism
          minister: req?.body?.minister && req.body.minister,
        }
      );
      res
        .status(200)
        .json({ status: "success", message: "Record updated successfully!" });
    }
  } catch (error) {
    if (error?.errorResponse) {
      if (error?.errorResponse?.code === 11000) {
        error.message = "Record ID already exist. Check and try again.";
      } else {
        error.message = "Something went wrong";
      }
    } else {
      error.message = "Something went wrong while updating";
    }
    res.status(500).json({
      status: "failure",
      message: error.message,
    });
  }
};
const deleteRecord = async (req, res) => {
  try {
    const { role } = req.user;
    const { desiredType, recordId } = req.query;

    if (role !== "superAdmin" && role !== "secretary") {
      return res
        .status(403)
        .json({ status: "failure", message: "Not Authorized!" });
    }

    if (desiredType === "baptism") {
      const deletedRecord = await baptismRecord.findOneAndDelete({
        lb: recordId,
      });

      res
        .status(200)
        .json({ status: "success", message: "Record deleted successfully" });
    } else if (desiredType === "marriage") {
      const deletedRecord = await marriageRecord.findOneAndDelete({
        lm: recordId,
      });

      res
        .status(200)
        .json({ status: "success", message: "Record deleted successfully." });
    }
  } catch (error) {
    res.status(500).json({
      status: "failure",
      message: "something went wrong while deleting record.",
    });
  }
};

module.exports = {
  recordBaptism,
  recordMarriage,
  recordFile,
  getRecordById,
  getRecordByDate,
  getRecordByName,
  editRecord,
  deleteRecord,
};
