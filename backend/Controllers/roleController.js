const { poolPromise } = require("../config/db");

const getRoles = async (req, res) => {
  try {
    const pool = await poolPromise;

    const result = await pool.request()
      .query("SELECT * FROM Mst_Role");

    res.json(result.recordset);

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

const createRole = async (req, res) => {
  try {

    const { Role_Name, Active_Status } = req.body;

    if (!Role_Name || !Role_Name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Role Name is required"
      });
    }

    const pool = await poolPromise;

    const existingRole = await pool.request()
      .input("Role_Name", Role_Name.trim())
      .query(`
        SELECT RID
        FROM Mst_Role
        WHERE Role_Name = @Role_Name
      `);

    if (existingRole.recordset.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Role Name already exists"
      });
    }

    await pool.request()
      .input("Role_Name", Role_Name.trim())
      .input("Active_Status", Active_Status)
      .query(`
        INSERT INTO Mst_Role
        (
          Role_Name,
          Active_Status,
          Created_by,
          Created_on
        )
        VALUES
        (
          @Role_Name,
          @Active_Status,
          'System',
          GETDATE()
        )
      `);

    res.status(201).json({
      success: true,
      message: "Role Added Successfully"
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

const updateRole = async (req, res) => {
  try {

    const id = req.params.id;

    const { Role_Name, Active_Status } = req.body;

    if (!Role_Name || !Role_Name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Role Name is required"
      });
    }

    const pool = await poolPromise;

    const existingRole = await pool.request()
      .input("RID", id)
      .input("Role_Name", Role_Name.trim())
      .query(`
        SELECT RID
        FROM Mst_Role
        WHERE RID <> @RID
        AND Role_Name = @Role_Name
      `);

    if (existingRole.recordset.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Role Name already exists"
      });
    }

    const result = await pool.request()
      .input("RID", id)
      .input("Role_Name", Role_Name.trim())
      .input("Active_Status", Active_Status)
      .query(`
        UPDATE Mst_Role
        SET
          Role_Name = @Role_Name,
          Active_Status = @Active_Status,
          Modified_by = 'System',
          Modified_on = GETDATE()
        WHERE RID = @RID
      `);

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({
        success: false,
        message: "Role Not Found"
      });
    }

    res.json({
      success: true,
      message: "Role Updated Successfully"
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

const deleteRole = async (req, res) => {
  try {

    const id = req.params.id;

    const pool = await poolPromise;

    const result = await pool.request()
      .input("RID", id)
      .query(`
        DELETE FROM Mst_Role
        WHERE RID = @RID
      `);

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({
        success: false,
        message: "Role Not Found"
      });
    }

    res.json({
      success: true,
      message: "Role Deleted Successfully"
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

module.exports = {
  getRoles,
  createRole,
  updateRole,
  deleteRole
};