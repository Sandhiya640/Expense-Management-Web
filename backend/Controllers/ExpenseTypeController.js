const { poolPromise } = require("../config/db");

const getExpenseTypes = async (req, res) => {
  try {
    const pool = await poolPromise;

    const result = await pool.request()
      .query(`
        SELECT *
        FROM Mst_Expense_Type
      `);

    res.json(result.recordset);

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};

const createExpenseType = async (req, res) => {
  try {
    const {
      EC_ID,
      Expense_Name,
      Active_Status
    } = req.body;

    const pool = await poolPromise;

    const existingExpense = await pool.request()
      .input("Expense_Name", Expense_Name)
      .query(`
        SELECT ET_ID
        FROM Mst_Expense_Type
        WHERE Expense_Name = @Expense_Name
      `);

    if (existingExpense.recordset.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Expense Name already exists"
      });
    }

    await pool.request()
      .input("EC_ID", EC_ID)
      .input("Expense_Name", Expense_Name)
      .input("Active_Status", Active_Status)
      .query(`
        INSERT INTO Mst_Expense_Type
        (
          EC_ID,
          Expense_Name,
          Active_Status,
          Created_by,
          Created_on
        )
        VALUES
        (
          @EC_ID,
          @Expense_Name,
          @Active_Status,
          'System',
          GETDATE()
        )
      `);

    res.status(201).json({
      success: true,
      message: "Expense Type Added Successfully"
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

const updateExpenseType = async (req, res) => {
  try {
    const id = req.params.id;

    const {
      EC_ID,
      Expense_Name,
      Active_Status
    } = req.body;

    const pool = await poolPromise;

    const existingExpense = await pool.request()
      .input("ET_ID", id)
      .input("Expense_Name", Expense_Name)
      .query(`
        SELECT ET_ID
        FROM Mst_Expense_Type
        WHERE ET_ID <> @ET_ID
          AND Expense_Name = @Expense_Name
      `);

    if (existingExpense.recordset.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Expense Name already exists"
      });
    }

    await pool.request()
      .input("ET_ID", id)
      .input("EC_ID", EC_ID)
      .input("Expense_Name", Expense_Name)
      .input("Active_Status", Active_Status)
      .query(`
        UPDATE Mst_Expense_Type
        SET
          EC_ID = @EC_ID,
          Expense_Name = @Expense_Name,
          Active_Status = @Active_Status,
          Modified_by = 'System',
          Modified_on = GETDATE()
        WHERE ET_ID = @ET_ID
      `);

    res.json({
      success: true,
      message: "Expense Type Updated Successfully"
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

const deleteExpenseType = async (req, res) => {
  try {

    const id = req.params.id;

    const pool = await poolPromise;

    await pool.request()
      .input("ET_ID", id)
      .query(`
        DELETE FROM Mst_Expense_Type
        WHERE ET_ID = @ET_ID
      `);

    res.json({
      message: "Expense Type Deleted Successfully"
    });

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};

module.exports = {
  getExpenseTypes,
  createExpenseType,
  updateExpenseType,
  deleteExpenseType
};