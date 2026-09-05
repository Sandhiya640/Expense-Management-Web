const { poolPromise } = require("../config/db");

exports.getIncomeTypes = async (req, res) => {
    try {
        const pool = await poolPromise;

        const result = await pool.request().query(`
      SELECT
        IT_ID,
        Income_Type,
        Active_Status,
        Created_On,
        Created_By,
        Modified_On,
        Modified_By
      FROM mst_income_type
      ORDER BY IT_ID
    `);

        res.json(result.recordset);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error fetching income types",
        });
    }
};

exports.addIncomeType = async (req, res) => {
    try {
        const { Income_Type, Active_Status } = req.body;

        const pool = await poolPromise;

        const existingType = await pool.request()
            .input("Income_Type", Income_Type)
            .query(`
                SELECT IT_ID
                FROM mst_income_type
                WHERE Income_Type = @Income_Type
            `);

        if (existingType.recordset.length > 0) {
            return res.status(400).json({
                success: false,
                message: "Income Type already exists"
            });
        }

        await pool.request()
            .input("Income_Type", Income_Type)
            .input("Active_Status", Active_Status)
            .query(`
                INSERT INTO mst_income_type
                (
                  Income_Type,
                  Active_Status,
                  Created_On,
                  Created_By
                )
                VALUES
                (
                  @Income_Type,
                  @Active_Status,
                  GETDATE(),
                  'Admin'
                )
            `);

        res.status(201).json({
            success: true,
            message: "Income Type Added Successfully"
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message
        });
    }
};

exports.updateIncomeType = async (req, res) => {
    try {
        const { id } = req.params;
        const { Income_Type, Active_Status } = req.body;

        const pool = await poolPromise;

        const existingType = await pool.request()
            .input("IT_ID", id)
            .input("Income_Type", Income_Type)
            .query(`
                SELECT IT_ID
                FROM mst_income_type
                WHERE Income_Type = @Income_Type
                  AND IT_ID <> @IT_ID
            `);

        if (existingType.recordset.length > 0) {
            return res.status(400).json({
                success: false,
                message: "Income Type already exists"
            });
        }

        await pool.request()
            .input("IT_ID", id)
            .input("Income_Type", Income_Type)
            .input("Active_Status", Active_Status)
            .query(`
                UPDATE mst_income_type
                SET
                    Income_Type = @Income_Type,
                    Active_Status = @Active_Status,
                    Modified_On = GETDATE(),
                    Modified_By = 'Admin'
                WHERE IT_ID = @IT_ID
            `);

        res.json({
            success: true,
            message: "Income Type Updated Successfully"
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message
        });
    }
};

exports.deleteIncomeType = async (req, res) => {
    try {
        const { id } = req.params;

        const pool = await poolPromise;

        await pool.request().input("IT_ID", id).query(`
      DELETE FROM mst_income_type
      WHERE IT_ID = @IT_ID
    `);

        res.json({
            message: "Income Type Deleted Successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error deleting income type",
        });
    }
};