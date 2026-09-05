const { poolPromise } = require("../config/db");

const createExpense = async (req, res) => {
  try {
    const {
      UID,
      EC_ID,
      ET_ID,
      Amount,
      Expense_Date,
      Remarks,
    } = req.body;

    if (!UID) {
      return res.status(400).json({ message: "User is required" });
    }

    if (!Expense_Date) {
      return res.status(400).json({ message: "Expense date is required" });
    }

    if (!EC_ID) {
      return res.status(400).json({ message: "Expense type is required" });
    }

    if (!ET_ID) {
      return res.status(400).json({ message: "Expense name is required" });
    }

    if (!Amount || Number(Amount) <= 0) {
      return res.status(400).json({
        message: "Amount must be greater than zero",
      });
    }

    if (!Remarks || Remarks.trim().length < 3) {
      return res.status(400).json({
        message: "Remarks must contain at least 3 characters",
      });
    }

    const pool = await poolPromise;

    const duplicate = await pool.request()
      .input("UID", UID)
      .input("EC_ID", EC_ID)
      .input("ET_ID", ET_ID)
      .input("Expense_Date", Expense_Date)
      .query(`
    SELECT *
    FROM Trn_Expense
    WHERE UID = @UID
    AND EC_ID = @EC_ID
    AND ET_ID = @ET_ID
    AND YEAR(Expense_Date) = YEAR(CAST(@Expense_Date AS DATE))
    AND MONTH(Expense_Date) = MONTH(CAST(@Expense_Date AS DATE))
  `);

    if (duplicate.recordset.length > 0) {
      return res.status(400).json({
        message: "Duplicate Expense Entry Already Exists for this month",
      });
    }

    await pool.request()
      .input("UID", UID)
      .input("EC_ID", EC_ID)
      .input("ET_ID", ET_ID)
      .input("Amount", Amount)
      .input("Expense_Date", Expense_Date)
      .input("Remarks", Remarks)
      .input("Created_by", "Admin")
      .query(`
        INSERT INTO Trn_Expense
        (
          UID,
          EC_ID,
          ET_ID,
          Amount,
          Expense_Date,
          Remarks,
          Created_by
        )
        VALUES
        (
          @UID,
          @EC_ID,
          @ET_ID,
          @Amount,
          @Expense_Date,
          @Remarks,
          @Created_by
        )
      `);

    res.status(201).json({
      message: "Expense Saved Successfully",
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: err.message,
    });
  }
};

const getExpenses = async (req, res) => {
  try {
    const pool = await poolPromise;

    const result = await pool.request().query(`
      SELECT
          TE.EXP_ID,
          U.UID,
          U.Emp_Code,
          U.Emp_Name,

          TE.EC_ID,
          TE.ET_ID,

          TE.Expense_Date,

          EC.Expense_Type,
          ET.Expense_Name,

          TE.Amount,
          TE.Remarks

      FROM Trn_Expense TE

      INNER JOIN Mst_User U
          ON TE.UID = U.UID

      INNER JOIN Mst_Expense_Category EC
          ON TE.EC_ID = EC.EC_ID

      INNER JOIN Mst_Expense_Type ET
          ON TE.ET_ID = ET.ET_ID

      ORDER BY TE.EXP_ID 
    `);

    res.json(result.recordset);

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }
};
const getExpenseById = async (req, res) => {
  try {
    const { id } = req.params;

    const pool = await poolPromise;

    const result = await pool
      .request()
      .input("EXP_ID", id)
      .query(`
        SELECT *
        FROM Trn_Expense
        WHERE EXP_ID = @EXP_ID
      `);

    res.json(result.recordset[0]);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
const updateExpense = async (req, res) => {
  try {
    const { id } = req.params;

    console.log(req.body);

    const {
      userId,
      expType,
      expCategory,
      expValue,
      expDate,
      remarks,
    } = req.body;

    const pool = await poolPromise;

    await pool
      .request()
      .input("EXP_ID", id)
      .input("UID", userId)
      .input("EC_ID", expType)
      .input("ET_ID", expCategory)
      .input("Amount", expValue)
      .input("Expense_Date", expDate)
      .input("Remarks", remarks)
      .input("Modified_by", "Admin")
      .query(`
        UPDATE Trn_Expense
        SET
          UID = @UID,
          EC_ID = @EC_ID,
          ET_ID = @ET_ID,
          Amount = @Amount,
          Expense_Date = @Expense_Date,
          Remarks = @Remarks,
          Modified_by = @Modified_by,
          Modified_on = GETDATE()
        WHERE EXP_ID = @EXP_ID
      `);

    res.json({
      message: "Expense Updated Successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;

    const pool = await poolPromise;

    await pool
      .request()
      .input("EXP_ID", id)
      .query(`
        DELETE FROM Trn_Expense
        WHERE EXP_ID = @EXP_ID
      `);

    res.json({
      message: "Expense Deleted Successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const bulkUploadExpense = async (req, res) => {
  try {

    const records = req.body;
    const pool = await poolPromise;

    let inserted = 0;
    let skipped = 0;

    for (const item of records) {

      const empCode = item["USER ID"];
      const expenseType = item["EXPENSE TYPE"];
      const expenseName = item["EXPENSE NAME"];

      const userResult = await pool.request()
        .input("Emp_Code", empCode)
        .query(`
          SELECT UID
          FROM Mst_User
          WHERE Emp_Code = @Emp_Code
        `);

      if (userResult.recordset.length === 0) {
        skipped++;
        continue;
      }

      const UID = userResult.recordset[0].UID;

      const categoryResult = await pool.request()
        .input("Expense_Type", expenseType)
        .query(`
          SELECT EC_ID
          FROM Mst_Expense_Category
          WHERE Expense_Type = @Expense_Type
        `);

      if (categoryResult.recordset.length === 0) {
        skipped++;
        continue;
      }

      const EC_ID = categoryResult.recordset[0].EC_ID;

      const typeResult = await pool.request()
        .input("Expense_Name", expenseName)
        .query(`
          SELECT ET_ID
          FROM Mst_Expense_Type
          WHERE Expense_Name = @Expense_Name
        `);

      if (typeResult.recordset.length === 0) {
        skipped++;
        continue;
      }

      const ET_ID = typeResult.recordset[0].ET_ID;

      const [day, month, year] =
        item["DATE"].split("-");

      const formattedDate =
        `${year}-${month}-${day}`;

    
  const duplicate = await pool.request()
  .input("UID", UID)
  .input("EC_ID", EC_ID)
  .input("ET_ID", ET_ID)
  .input("Expense_Date", formattedDate)
  .query(`
      SELECT EXP_ID
      FROM Trn_Expense
      WHERE UID = @UID
      AND EC_ID = @EC_ID
      AND ET_ID = @ET_ID
      AND YEAR(Expense_Date) = YEAR(CAST(@Expense_Date AS DATE))
      AND MONTH(Expense_Date) = MONTH(CAST(@Expense_Date AS DATE))
  `);

      if (duplicate.recordset.length > 0) {
        skipped++;
        continue;
      }

      await pool.request()
        .input("UID", UID)
        .input("EC_ID", EC_ID)
        .input("ET_ID", ET_ID)
        .input("Amount", item["AMOUNT"])
        .input("Expense_Date", formattedDate)
        .input("Remarks", item["REMARKS"] || "")
        .query(`
          INSERT INTO Trn_Expense
          (
            UID,
            EC_ID,
            ET_ID,
            Amount,
            Expense_Date,
            Remarks,
            Created_By
          )
          VALUES
          (
            @UID,
            @EC_ID,
            @ET_ID,
            @Amount,
            @Expense_Date,
            @Remarks,
            'Admin'
          )
        `);

      inserted++;
    }

    res.status(200).json({
      message: "Bulk Upload Completed",
      inserted,
      skipped,
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {
  createExpense,
  getExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense,
  bulkUploadExpense,
};