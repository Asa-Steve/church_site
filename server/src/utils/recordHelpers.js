const baptismRecord = require("../models/allBaptismSchema");
const marriageRecord = require("../models/allMarriageSchema");

const processBatch = async (records, desiredType) => {
  const errors = [];
  const validRecords = [];

  // Determine the schema based on the desiredType
  const recordSchema =
    desiredType === "baptism" ? baptismRecord : marriageRecord;

  // Extracting unique identifiers based on record type
  const identifiers = records.map((record) =>
    desiredType === "baptism" ? record.lb : record.lm
  );

  // Finding existing records in the database
  const existingRecords = await recordSchema.find(
    desiredType === "baptism"
      ? { lb: { $in: identifiers } }
      : { lm: { $in: identifiers } }
  );

  // Create a Set of existing identifiers
  const existingSet = new Set(
    existingRecords.map((record) =>
      desiredType === "baptism" ? record.lb : record.lm
    )
  );

  // Validating each record
  records.forEach((record, index) => {
    const recordErrors = [];

    if (desiredType === "baptism") {
      // Checking if lb is duplicated
      if (existingSet.has(record.lb)) {
        recordErrors.push(
          `Record ${index + 1}: lb '${record.lb}' already exists.`
        );
      }

      // Validating required fields for baptism
      if (
        !record?.baptismName ||
        !record?.surname ||
        !record?.dob ||
        !record?.doBaptism ||
        !record?.birthPlace ||
        !record?.fatherName ||
        !record?.motherName ||
        !record?.homeTown ||
        !record.sponsor ||
        !record.minister
      ) {
        recordErrors.push(
          `Record ${index + 1}: Missing required fields for baptism.`
        );
      }
    } else if (desiredType === "marriage") {
      // Checking if lm is duplicate
      if (existingSet.has(record.lm)) {
        recordErrors.push(
          `Record ${index + 1}: lm '${record.lm}' already exists.`
        );
      }

      // Validating required fields for marriage
      if (
        !record.husbandName ||
        !record.wifeName ||
        !record.doMarriage ||
        !record.witness1 ||
        !record.witness2 ||
        !record.officiatingPriest ||
        !record.lm ||
        typeof record.lm !== "number"
      ) {
        recordErrors.push(
          `Record ${index + 1}: Missing required fields for marriage.`
        );
      }
    }

    // Adding to valid or error list
    if (recordErrors.length > 0) {
      errors.push(...recordErrors);
    } else {
      validRecords.push(record);
    }
  });

  // Saving valid records if no errors
  if (validRecords.length > 0) {
    await recordSchema.insertMany(validRecords);
  }

  return {
    errors,
    savedCount: validRecords.length,
  };
};

module.exports = processBatch;
