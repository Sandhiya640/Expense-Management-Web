const ExcelJS = require("exceljs");
const { poolPromise } = require("../config/db");

exports.downloadReport = async (req, res) => {
  try {
    const { type } = req.params;

    const pool = await poolPromise;

    let result;
    let fileName;

    switch (type) {
      case "users":
        result = await pool.request().query(`
  SELECT
    Emp_Code,
    Emp_Name,
    Mail_ID,
    Mobile_No,
    Active_Status,
    Modified_On,
    Modified_By

  FROM mst_user
`);
        fileName = "User_Master.xlsx";
        break;

      case "income":
        result = await pool.request().query(`
   SELECT
    U.Emp_Code,
    U.Emp_Name,
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
        fileName = "Income_Transaction.xlsx";
        break;

      case "expense":
        result = await pool.request().query(`
SELECT
    U.Emp_Code,
    U.Emp_Name,
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
`);
        fileName = "Expense_Transaction.xlsx";
        break;

      case "loan":
        result = await pool.request().query(`
   SELECT
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
        fileName = "Loan_Transaction.xlsx";
        break;

      default:
        return res.status(400).json({
          error: "Invalid report type",
        });
    }

    const workbook = new ExcelJS.Workbook();

    const worksheet =
      workbook.addWorksheet("Report");

    if (result.recordset.length > 0) {
      worksheet.columns = Object.keys(
        result.recordset[0]
      ).map((key) => ({
        header: key,
        key,
        width: 20,
      }));

      worksheet.addRows(result.recordset);
    }

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${fileName}`
    );
    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: error.message,
    });
  }
};