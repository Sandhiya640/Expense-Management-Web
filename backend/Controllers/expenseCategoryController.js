
const { poolPromise } = require("../Config/db");

exports.getExpenseCategories = async (req, res) => {
    try {
        const pool = await poolPromise;

        const result = await pool.request().query(`
      SELECT *
      FROM mst_expense_category
      ORDER BY EC_ID
    `);

        res.json(result.recordset);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error fetching categories" });
    }
};

exports.getExpenseCategoryById = async (req, res) => {
    try {
        const pool = await poolPromise;

        const result = await pool.request()
            .input("EC_ID", req.params.id)
            .query(`
        SELECT *
        FROM mst_expense_category
        WHERE EC_ID = @EC_ID
      `);

        res.json(result.recordset[0]);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error fetching category" });
    }
};
exports.addExpenseCategory = async (req, res) => {
    try {
        const { Expense_Type, Active_Status } = req.body;

        const pool = await poolPromise;

        const existingCategory = await pool.request()
            .input("Expense_Type", Expense_Type)
            .query(`
                SELECT EC_ID
                FROM mst_expense_category
                WHERE Expense_Type = @Expense_Type
            `);

        if (existingCategory.recordset.length > 0) {
            return res.status(400).json({
                success: false,
                message: "Expense Type already exists"
            });
        }

        await pool.request()
            .input("Expense_Type", Expense_Type)
            .input("Active_Status", Active_Status)
            .query(`
                INSERT INTO mst_expense_category
                (
                    Expense_Type,
                    Active_Status,
                    Created_On,
                    Created_By
                )
                VALUES
                (
                    @Expense_Type,
                    @Active_Status,
                    GETDATE(),
                    'Admin'
                )
            `);

        res.status(201).json({
            success: true,
            message: "Expense Category Added Successfully"
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Error adding category"
        });
    }
};

exports.updateExpenseCategory = async (req, res) => {
    try {
        const { Expense_Type, Active_Status } = req.body;

        const pool = await poolPromise;

        const existingCategory = await pool.request()
            .input("EC_ID", req.params.id)
            .input("Expense_Type", Expense_Type)
            .query(`
                SELECT EC_ID
                FROM mst_expense_category
                WHERE EC_ID <> @EC_ID
                AND Expense_Type = @Expense_Type
            `);

        if (existingCategory.recordset.length > 0) {
            return res.status(400).json({
                success: false,
                message: "Expense Type already exists"
            });
        }

        await pool.request()
            .input("EC_ID", req.params.id)
            .input("Expense_Type", Expense_Type)
            .input("Active_Status", Active_Status)
            .query(`
                UPDATE mst_expense_category
                SET
                    Expense_Type = @Expense_Type,
                    Active_Status = @Active_Status,
                    Modified_On = GETDATE(),
                    Modified_By = 'Admin'
                WHERE EC_ID = @EC_ID
            `);

        res.json({
            success: true,
            message: "Expense Category Updated Successfully"
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Error updating category"
        });
    }
};

exports.deleteExpenseCategory = async (req, res) => {
    try {
        const pool = await poolPromise;

        await pool.request()
            .input("EC_ID", req.params.id)
            .query(`
        DELETE FROM mst_expense_category
        WHERE EC_ID = @EC_ID
      `);

        res.json({
            message: "Expense Category Deleted Successfully"
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Error deleting category"
        });
    }
};