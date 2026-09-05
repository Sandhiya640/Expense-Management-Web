const express = require("express");
const router = express.Router();

const userController = require("../Controllers/userController");

router.get("/", userController.getUsers);

router.get("/allUsers", userController.getAllUsers);

router.post("/createUser", userController.addUser);

router.put("/updateUser/:id", userController.updateUser);

router.delete("/:id", userController.deleteUser);

module.exports = router;