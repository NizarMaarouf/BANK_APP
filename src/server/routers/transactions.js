const express = require("express");
const transactionsController = require("../controllers/transactions");
const router = express.Router();

router
	.get("/", transactionsController.getAllTransactions)
	.put("/deposit/:id", transactionsController.deposit)
	.put("/update-credit/:id", transactionsController.updateCredit)
	.put("/withdraw/:id", transactionsController.withdraw)
	.put("/transfer/:from/:to", transactionsController.transfer);

module.exports = router;
