const { poolPromise } = require("../config/db");

exports.getDashboardData = async (req, res) => {
  try {

    const { uid, year } = req.query;
    const isAllUsers = uid === "ALL";
    const pool = await poolPromise;

    const incomeResult = await pool.request()
      .input("UID", uid)
      .input("YEAR", year)
      .query(
        isAllUsers
          ? `
        SELECT ISNULL(SUM(Inc_Value),0) TotalIncome
        FROM Trn_Income
        WHERE YEAR(Inc_Date)=@YEAR
      `
          : `
        SELECT ISNULL(SUM(Inc_Value),0) TotalIncome
        FROM Trn_Income
        WHERE UID=@UID
        AND YEAR(Inc_Date)=@YEAR
      `
      );

    const expenseResult = await pool.request()
      .input("UID", uid)
      .input("YEAR", year)
      .query(
        isAllUsers
          ? `
        SELECT ISNULL(SUM(Amount),0) TotalExpense
        FROM Trn_Expense
        WHERE YEAR(Expense_Date)=@YEAR
      `
          : `
        SELECT ISNULL(SUM(Amount),0) TotalExpense
        FROM Trn_Expense
        WHERE UID=@UID
        AND YEAR(Expense_Date)=@YEAR
      `
      );
    const loanResult = await pool.request()
      .input("UID", uid)
      .input("YEAR", year)
      .query(
        isAllUsers
          ? `
      SELECT
      ISNULL(
        SUM(
          CASE
            WHEN Status IN ('Active','Overdue')
            THEN
              CASE
                WHEN Loan_Amount -
                (
                  Monthly_EMI *
                  CASE
                    WHEN YEAR(EMI_Start_Date) > @YEAR
                      THEN 0

                    WHEN YEAR(EMI_Start_Date) = @YEAR
                      THEN DATEDIFF(
                             MONTH,
                             EMI_Start_Date,
                             DATEFROMPARTS(@YEAR,12,31)
                           ) + 1

                    ELSE 12
                  END
                ) > 0
                THEN
                  Loan_Amount -
                  (
                    Monthly_EMI *
                    CASE
                      WHEN YEAR(EMI_Start_Date) > @YEAR
                        THEN 0

                      WHEN YEAR(EMI_Start_Date) = @YEAR
                        THEN DATEDIFF(
                               MONTH,
                               EMI_Start_Date,
                               DATEFROMPARTS(@YEAR,12,31)
                             ) + 1

                      ELSE 12
                    END
                  )
                ELSE 0
              END
            ELSE 0
          END
        ),0
      ) AS OutstandingLoan
      FROM Trn_Loan
      `
          : `
      SELECT
      ISNULL(
        SUM(
          CASE
            WHEN Status IN ('Active','Overdue')
            THEN
              CASE
                WHEN Loan_Amount -
                (
                  Monthly_EMI *
                  CASE
                    WHEN YEAR(EMI_Start_Date) > @YEAR
                      THEN 0

                    WHEN YEAR(EMI_Start_Date) = @YEAR
                      THEN DATEDIFF(
                             MONTH,
                             EMI_Start_Date,
                             DATEFROMPARTS(@YEAR,12,31)
                           ) + 1

                    ELSE 12
                  END
                ) > 0
                THEN
                  Loan_Amount -
                  (
                    Monthly_EMI *
                    CASE
                      WHEN YEAR(EMI_Start_Date) > @YEAR
                        THEN 0

                      WHEN YEAR(EMI_Start_Date) = @YEAR
                        THEN DATEDIFF(
                               MONTH,
                               EMI_Start_Date,
                               DATEFROMPARTS(@YEAR,12,31)
                             ) + 1

                      ELSE 12
                    END
                  )
                ELSE 0
              END
            ELSE 0
          END
        ),0
      ) AS OutstandingLoan
      FROM Trn_Loan
      WHERE UID=@UID
      `
      );

    const emiResult = await pool.request()
      .input("UID", uid)
      .input("YEAR", year)
      .query(
        isAllUsers
          ? `
      SELECT
      ISNULL(
        SUM(
          CASE
            WHEN Status IN ('Active','Overdue')
            THEN
              Monthly_EMI *
              CASE
                WHEN YEAR(EMI_Start_Date) > @YEAR
                  THEN 0

                WHEN YEAR(EMI_Start_Date) = @YEAR
                  THEN DATEDIFF(
                         MONTH,
                         EMI_Start_Date,
                         DATEFROMPARTS(@YEAR,12,31)
                       ) + 1

                ELSE 12
              END
            ELSE 0
          END
        ),0
      ) AS YearlyEMI
      FROM Trn_Loan
      `
          : `
      SELECT
      ISNULL(
        SUM(
          CASE
            WHEN Status IN ('Active','Overdue')
            THEN
              Monthly_EMI *
              CASE
                WHEN YEAR(EMI_Start_Date) > @YEAR
                  THEN 0

                WHEN YEAR(EMI_Start_Date) = @YEAR
                  THEN DATEDIFF(
                         MONTH,
                         EMI_Start_Date,
                         DATEFROMPARTS(@YEAR,12,31)
                       ) + 1

                ELSE 12
              END
            ELSE 0
          END
        ),0
      ) AS YearlyEMI
      FROM Trn_Loan
      WHERE UID=@UID
      `
      );

    const totalIncome =
      incomeResult.recordset[0].TotalIncome;

    const totalExpense =
      expenseResult.recordset[0].TotalExpense;

    const totalLoan =
      loanResult.recordset[0].OutstandingLoan;

    const totalEMI =
      emiResult.recordset[0].YearlyEMI;

    const totalSavings =
      totalIncome - totalExpense - totalEMI;



    const monthlyIncome = await pool.request()
      .input("UID", uid)
      .input("YEAR", year)
      .query(
        isAllUsers
          ? `
        SELECT
          DATENAME(MONTH, Inc_Date) AS month,
          SUM(Inc_Value) AS value
        FROM Trn_Income
        WHERE YEAR(Inc_Date)=@YEAR
        GROUP BY MONTH(Inc_Date),
                 DATENAME(MONTH, Inc_Date)
        ORDER BY MONTH(Inc_Date)
      `
          : `
        SELECT
          DATENAME(MONTH, Inc_Date) AS month,
          SUM(Inc_Value) AS value
        FROM Trn_Income
        WHERE UID=@UID
          AND YEAR(Inc_Date)=@YEAR
        GROUP BY MONTH(Inc_Date),
                 DATENAME(MONTH, Inc_Date)
        ORDER BY MONTH(Inc_Date)
      `
      );


    const monthlyExpense = await pool.request()
      .input("UID", uid)
      .input("YEAR", year)
      .query(
        isAllUsers
          ? `
        SELECT
          DATENAME(MONTH, Expense_Date) AS month,
          SUM(Amount) AS value
        FROM Trn_Expense
        WHERE YEAR(Expense_Date)=@YEAR
        GROUP BY MONTH(Expense_Date),
                 DATENAME(MONTH, Expense_Date)
        ORDER BY MONTH(Expense_Date)
      `
          : `
        SELECT
          DATENAME(MONTH, Expense_Date) AS month,
          SUM(Amount) AS value
        FROM Trn_Expense
        WHERE UID=@UID
          AND YEAR(Expense_Date)=@YEAR
        GROUP BY MONTH(Expense_Date),
                 DATENAME(MONTH, Expense_Date)
        ORDER BY MONTH(Expense_Date)
      `
      );
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    const comparisonData = months.map(month => {
      const incomeRow = monthlyIncome.recordset.find(
        r => r.month.substring(0, 3) === month
      );

      const expenseRow = monthlyExpense.recordset.find(
        r => r.month.substring(0, 3) === month
      );

      return {
        month,
        income: incomeRow ? incomeRow.value : 0,
        expense: expenseRow ? expenseRow.value : 0,
      };
    });

    res.json({
      income: totalIncome,
      expense: totalExpense,
      savings: totalSavings,

      investment: totalIncome,

      loan: totalLoan,

      incomeData: monthlyIncome.recordset.map(row => ({
        month: row.month.substring(0, 3),
        value: row.value,
      })),

      expenseData: monthlyExpense.recordset.map(row => ({
        month: row.month.substring(0, 3),
        value: row.value,
      })),

      comparisonData,
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: err.message,
    });
  }
};