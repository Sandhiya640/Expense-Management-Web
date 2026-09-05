const { poolPromise } = require("../config/db");

exports.getUsers = async (req, res) => {
  try {
    const pool = await poolPromise;

    const result = await pool.request().query(`
      SELECT
        UID,
        RID,
        Emp_Code,
        Emp_Name,
        Mail_ID,
        Mobile_No,
        Active_Status,
        Created_On,
        Created_By,
        Modified_On,
        Modified_By
      FROM mst_user
      ORDER BY UID
    `);

    res.status(200).json(result.recordset);

  } catch (err) {
    console.log(err);
    res.status(500).json(err.message);
  }
};



exports.getAllUsers = async (req, res) => {
  try {

    const pool = await poolPromise;

    const result = await pool.request().query(`
      SELECT *
      FROM mst_user
      ORDER BY UID
    `);

    res.status(200).json(result.recordset);

  } catch (err) {
    console.log(err);
    res.status(500).json(err.message);
  }
};

exports.addUser = async (req, res) => {
  

  try {
    console.log("ADD BODY:", req.body);

    const {
      RID,
      Emp_Code,
      Emp_Name,
      Mail_ID,
      Mobile_No,
      Password,
      Active_Status

    } = req.body;
    if (!/^\d{10}$/.test(Mobile_No)) {
      return res.status(400).json({
        message: "Mobile number must be exactly 10 digits"
      });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(Mail_ID)) {
      return res.status(400).json({
        message: "Invalid email format"
      });
    }

    const pool = await poolPromise;

    const existingUser = await pool.request()
      .input("Emp_Code", Emp_Code)
      .input("Mail_ID", Mail_ID)
      .input("Mobile_No", Mobile_No)
      .input("Password", Password)
      .query(`
    SELECT *
    FROM mst_user
    WHERE Emp_Code = @Emp_Code
       OR Mail_ID = @Mail_ID
       OR Mobile_No = @Mobile_No
       OR Password = @Password
  `);

    if (existingUser.recordset.length > 0) {
      const user = existingUser.recordset[0];

      if (user.Emp_Code === Emp_Code) {
        return res.status(400).json({
          success: false,
          message: "Employee Code already exists"
        });
      }

      if (user.Mail_ID === Mail_ID) {
        return res.status(400).json({
          success: false,
          message: "Email already exists"
        });
      }

      if (user.Mobile_No === Mobile_No) {
        return res.status(400).json({
          success: false,
          message: "Mobile Number already exists"
        });
      }

      if (user.Password === Password) {
        return res.status(400).json({
          success: false,
          message: "Password already exists"
        });
      }
    }
    await pool.request()
      .input("RID", RID)
      .input("Emp_Code", Emp_Code)
      .input("Emp_Name", Emp_Name)
      .input("Mail_ID", Mail_ID)
      .input("Mobile_No", Mobile_No)
      .input("Password", Password)
      .input("Active_Status", Active_Status)
      .query(`
        INSERT INTO mst_user
        (
          RID,
          Emp_Code,
          Emp_Name,
          Mail_ID,
          Mobile_No,
          Password,
          Active_Status,
          Created_On,
          Created_By
        )
        VALUES
        (
          @RID,
          @Emp_Code,
          @Emp_Name,
          @Mail_ID,
          @Mobile_No,
          @Password,
          @Active_Status,
          GETDATE(),
          'Admin'
        )
      `);

    res.status(201).json({
      success: true,
      message: "User Added Successfully"
    });

  } catch (err) {
    console.log(err);
    res.status(500).json(err.message);
  }
};

exports.updateUser = async (req, res) => {
  try {

    console.log("UPDATE BODY:", req.body);

    const { id } = req.params;

    const {
      RID,
      Emp_Code,
      Emp_Name,
      Mail_ID,
      Mobile_No,
      Password,
      Active_Status
    } = req.body;

    if (!/^\d{10}$/.test(Mobile_No)) {
      return res.status(400).json({
        success: false,
        message: "Mobile number must be exactly 10 digits"
      });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(Mail_ID)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format"
      });
    }

    const pool = await poolPromise;

    const existingUser = await pool.request()
      .input("UID", id)
      .input("Emp_Code", Emp_Code)
      .input("Mail_ID", Mail_ID)
      .input("Mobile_No", Mobile_No)
      .input("Password", Password)
      .query(`
    SELECT *
    FROM mst_user
    WHERE UID <> @UID
    AND (
         Emp_Code = @Emp_Code
      OR Mail_ID = @Mail_ID
      OR Mobile_No = @Mobile_No
      OR Password = @Password
    )
  `);

    if (existingUser.recordset.length > 0) {
      const user = existingUser.recordset[0];

      if (user.Emp_Code === Emp_Code) {
        return res.status(400).json({
          success: false,
          message: "Employee Code already exists"
        });
      }

      if (user.Mail_ID === Mail_ID) {
        return res.status(400).json({
          success: false,
          message: "Email already exists"
        });
      }

      if (user.Mobile_No === Mobile_No) {
        return res.status(400).json({
          success: false,
          message: "Mobile Number already exists"
        });
      }

      if (user.Password === Password) {
        return res.status(400).json({
          success: false,
          message: "Password already exists"
        });
      }
    }

    const result = await pool.request()
      .input("UID", id)
      .input("RID", RID)
      .input("Emp_Code", Emp_Code)
      .input("Emp_Name", Emp_Name)
      .input("Mail_ID", Mail_ID)
      .input("Mobile_No", Mobile_No)
      .input("Password", Password)
      .input("Active_Status", Active_Status)
      .query(`
        UPDATE mst_user
        SET
          RID = @RID,
          Emp_Code = @Emp_Code,
          Emp_Name = @Emp_Name,
          Mail_ID = @Mail_ID,
          Mobile_No = @Mobile_No,
          Password = @Password,
          Active_Status = @Active_Status,
          Modified_On = GETDATE(),
          Modified_By = 'Admin'
        WHERE UID = @UID
      `);

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({
        success: false,
        message: "User Not Found"
      });
    }

    res.status(200).json({
      success: true,
      message: "User Updated Successfully"
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    console.log("DELETE ID:", req.params.id); // 👈 ADD THIS

    const { id } = req.params;
    const pool = await poolPromise;

    const result = await pool.request()
      .input("UID", id)
      .query(`
        DELETE FROM mst_user
        WHERE UID = @UID
      `);

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({
        success: false,
        message: "User Not Found"
      });
    }

    res.status(200).json({
      success: true,
      message: "User Deleted Successfully"
    });

  } catch (err) {
    console.log(err);
    res.status(500).json(err.message);
  }
};