
const { poolPromise } = require("../config/db");

exports.getLoans = async (req, res) => {
  try {
    const pool = await poolPromise;

    const result = await pool.request().query(`
      SELECT
        lt.LO_ID,
        lt.UID,
        u.Emp_Code,
        u.Emp_Name,
        lt.Loan_Type,
        lt.Bank_Name,
        lt.Loan_Amount,
        lt.Interest_Rate,
        lt.EMI_Start_Date,
        lt.Tenure,
        lt.Due_Date,
        lt.Monthly_EMI,
        lt.Status
      FROM trn_loan lt
      INNER JOIN mst_user u
        ON lt.UID = u.UID
      ORDER BY lt.LO_ID
    `);

    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};


exports.getLoanById = async (req, res) => {
  try {
    const pool = await poolPromise;

    const result = await pool.request().input("LO_ID", req.params.id).query(`
        SELECT *
        FROM loan_transaction
        WHERE LO_ID = @LO_ID
      `);

    res.json(result.recordset[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

exports.createLoan = async (req, res) => {
  try {
    const {
      UID,
      Loan_Type,
      Bank_Name,
      Loan_Amount,
      Interest_Rate,
      EMI_Start_Date,
      Tenure,
      Due_Date,
      Monthly_EMI,
      Status,
    } = req.body;

    if (
      !UID ||
      !Loan_Type ||
      !Bank_Name ||
      !Loan_Amount ||
      !Interest_Rate ||
      !EMI_Start_Date ||
      !Tenure ||
      !Status
    ) {
      return res.status(400).json({
        error: "All fields are required",
      });
    }

    const pool = await poolPromise;

    await pool
      .request()
      .input("UID", UID)
      .input("Loan_Type", Loan_Type)
      .input("Bank_Name", Bank_Name)
      .input("Loan_Amount", Loan_Amount)
      .input("Interest_Rate", Interest_Rate)
      .input("EMI_Start_Date", EMI_Start_Date)
      .input("Tenure", Tenure)
      .input("Due_Date", Due_Date)
      .input("Monthly_EMI", Monthly_EMI)
      .input("Status", Status).query(`
        INSERT INTO trn_loan
        (
          UID,
          Loan_Type,
          Bank_Name,
          Loan_Amount,
          Interest_Rate,
          EMI_Start_Date,
          Tenure,
          Due_Date,
          Monthly_EMI,
          Status,
          Created_On,
          Created_By
        )
        VALUES
        (
          @UID,
          @Loan_Type,
          @Bank_Name,
          @Loan_Amount,
          @Interest_Rate,
          @EMI_Start_Date,
          @Tenure,
          @Due_Date,
          @Monthly_EMI,
          @Status,
          GETDATE(),
          'Admin'
        )
      `);

    res.status(201).json({
      message: "Loan created successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

exports.updateLoan = async (req, res) => {
  try {
    const {
      UID,
      Loan_Type,
      Bank_Name,
      Loan_Amount,
      Interest_Rate,
      EMI_Start_Date,
      Tenure,
      Due_Date,
      Monthly_EMI,
      Status,
    } = req.body;

    const pool = await poolPromise;

    await pool
      .request()
      .input("LO_ID", req.params.id)
      .input("UID", UID)
      .input("Loan_Type", Loan_Type)
      .input("Bank_Name", Bank_Name)
      .input("Loan_Amount", Loan_Amount)
      .input("Interest_Rate", Interest_Rate)
      .input("EMI_Start_Date", EMI_Start_Date)
      .input("Tenure", Tenure)
      .input("Due_Date", Due_Date)
      .input("Monthly_EMI", Monthly_EMI)
      .input("Status", Status).query(`
        UPDATE trn_loan
        SET
          UID = @UID,
          Loan_Type = @Loan_Type,
          Bank_Name = @Bank_Name,
          Loan_Amount = @Loan_Amount,
          Interest_Rate = @Interest_Rate,
          EMI_Start_Date = @EMI_Start_Date,
          Tenure = @Tenure,
          Due_Date = @Due_Date,
          Monthly_EMI = @Monthly_EMI,
          Status = @Status,
          Modified_On = GETDATE(),
          Modified_By = 'Admin'
        WHERE LO_ID = @LO_ID
      `);

    res.json({
      message: "Loan updated successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
