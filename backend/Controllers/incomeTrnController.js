const { poolPromise } = require("../config/db");

exports.getIncomeRecords = async (req, res) => {
    try {
        const pool = await poolPromise;

        const result = await pool.request().query(`
  SELECT
    I.INC_ID,
    U.UID,
    U.Emp_Code,
    U.Emp_Name,

    I.IT_ID,
    T.Income_Type,

    I.Inc_Value,
    I.Inc_Date,
    I.Remarks

FROM Trn_Income I

INNER JOIN Mst_User U
    ON I.UID = U.UID

INNER JOIN Mst_Income_Type T
    ON I.IT_ID = T.IT_ID

ORDER BY I.INC_ID 
    `);

        res.json(result.recordset);
    } catch (err) {
        res.status(500).json(err.message);
    }
};


exports.getIncomeTypes = async (req, res) => {
    try {

        const pool = await poolPromise;

        const result = await pool.request().query(`
            SELECT
                IT_ID,
                Income_Type
            FROM Mst_Income_Type
            WHERE Active_Status = 1
        `);

        res.json(result.recordset);

    } catch (err) {

        res.status(500).json(err.message);
    }
};


exports.getUserByEmpCode = async (req, res) => {

    try {

        const { empCode } = req.params;

        const pool = await poolPromise;

        const result = await pool.request()
            .input("Emp_Code", empCode)
            .query(`
                SELECT
                    UID,
                    Emp_Code,
                    Emp_Name
                FROM Mst_User
                WHERE Emp_Code = @Emp_Code
            `);

        res.json(result.recordset[0]);

    } catch (err) {

        res.status(500).json(err.message);
    }
};


exports.addIncome = async (req, res) => {
    try {
        const {
            UID,
            IT_ID,
            Inc_Value,
            Inc_Date,
            Remarks,
        } = req.body;

        const pool = await poolPromise;

        const duplicate = await pool.request()
            .input("UID", UID)
            .input("IT_ID", IT_ID)
            .input("Inc_Date", Inc_Date)
            .query(`
                SELECT INC_ID
                FROM Trn_Income
                WHERE UID = @UID
                  AND IT_ID = @IT_ID
                  AND Inc_Date = @Inc_Date
            `);

        if (duplicate.recordset.length > 0) {
            return res.status(400).json({
                message: "Income Type already exists for this user on this month"
            });
        }

        await pool.request()
            .input("UID", UID)
            .input("IT_ID", IT_ID)
            .input("Inc_Value", Inc_Value)
            .input("Inc_Date", Inc_Date)
            .input("Remarks", Remarks)
            .query(`
                INSERT INTO Trn_Income
                (
                    UID,
                    IT_ID,
                    Inc_Value,
                    Inc_Date,
                    Remarks,
                    Created_On,
                    Created_By
                )
                VALUES
                (
                    @UID,
                    @IT_ID,
                    @Inc_Value,
                    @Inc_Date,
                    @Remarks,
                    GETDATE(),
                    'Admin'
                )
            `);

        res.json({
            message: "Income Added Successfully"
        });

    } catch (err) {
        res.status(500).json(err.message);
    }
};


exports.updateIncome = async (req, res) => {

    try {

        const { id } = req.params;

        const {
            IT_ID,
            Inc_Value,
            Inc_Date,
            Remarks
        } = req.body;

        const pool = await poolPromise;

        await pool.request()
            .input("INC_ID", id)
            .input("IT_ID", IT_ID)
            .input("Inc_Value", Inc_Value)
            .input("Inc_Date", Inc_Date)
            .input("Remarks", Remarks)

            .query(`
        UPDATE trn_income
        SET
          IT_ID=@IT_ID,
          Inc_Value=@Inc_Value,
          Inc_Date=@Inc_Date,
          Remarks=@Remarks,
          Modified_On=GETDATE(),
          Modified_By='Admin'
        WHERE INC_ID=@INC_ID
      `);

        res.json({
            message: "Income Updated Successfully"
        });

    } catch (err) {
        res.status(500).json(err.message);
    }
};


exports.deleteIncome = async (req, res) => {

    try {

        const { id } = req.params;

        const pool = await poolPromise;

        await pool.request()
            .input("INC_ID", id)
            .query(`
                DELETE FROM Trn_Income
                WHERE INC_ID = @INC_ID
            `);

        res.json({
            message: "Deleted Successfully"
        });

    } catch (err) {

        res.status(500).json(err.message);
    }
};

exports.bulkUploadIncome = async (req, res) => {
    try {
        const records = req.body;
        const pool = await poolPromise;

        let inserted = 0;
        let skipped = 0;

        for (const item of records) {

            console.log("Excel Row:", item);

            const empCode = item["USER ID"];
            const incomeTypeName = item["INCOME TYPE"];


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

            const typeResult = await pool.request()
                .input("Income_Type", incomeTypeName)
                .query(`
                    SELECT IT_ID
                    FROM Mst_Income_Type
                    WHERE Income_Type = @Income_Type
                `);

            if (typeResult.recordset.length === 0) {
                skipped++;
                continue;
            }

            const IT_ID = typeResult.recordset[0].IT_ID;
            const [day, month, year] = item["DATE"].split("-");
            const formattedDate = `${year}-${month}-${day}`;

            const duplicateResult = await pool.request()
                .input("UID", UID)
                .input("IT_ID", IT_ID)
                .input("Inc_Date", formattedDate)
                .query(`
                    SELECT INC_ID
                    FROM Trn_Income
                    WHERE UID = @UID
                      AND IT_ID = @IT_ID
                      AND Inc_Date = @Inc_Date
                `);

            if (duplicateResult.recordset.length > 0) {
                skipped++;
                continue;
            }

            await pool.request()
                .input("UID", UID)
                .input("IT_ID", IT_ID)
                .input("Inc_Value", item["AMOUNT"])
                .input("Inc_Date", formattedDate)
                .input("Remarks", item["REMARKS"] || "")
                .query(`
                    INSERT INTO Trn_Income
                    (
                        UID,
                        IT_ID,
                        Inc_Value,
                        Inc_Date,
                        Remarks,
                        Created_On,
                        Created_By
                    )
                    VALUES
                    (
                        @UID,
                        @IT_ID,
                        @Inc_Value,
                        @Inc_Date,
                        @Remarks,
                        GETDATE(),
                        'Admin'
                    )
                `);

            inserted++;
        }

        res.status(200).json({
            message: "Bulk Upload Completed",
            inserted,
            skipped
        });

    } catch (err) {
        console.error("Bulk Error:", err);
        res.status(500).json({
            error: err.message
        });
    }
};