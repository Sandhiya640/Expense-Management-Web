const express = require("express");
const router = express.Router();

const roleController = require("../controllers/roleController");

router.get("/allRoles", roleController.getRoles);

router.post("/createRole", roleController.createRole);

router.put("/updateRole/:id", roleController.updateRole);

router.delete("/:id", roleController.deleteRole);

module.exports = router;
