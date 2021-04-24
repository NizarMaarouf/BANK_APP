const express = require("express");
const accountsController = require("../controllers/accounts.controller");
const router = express.Router();

router
	.get("/", accountsController.getAllAccounts)
	.get("/:id", accountsController.getOneAccount)
	.post("/", accountsController.createNewAccount);

module.exports = router;
