const accountsModel = require("../models/accounts.model");
const transactionModel = require("../models/transactions");

exports.getAllTransactions = async (req, res) => {
	try {
		const transactions = await transactionModel.find({});
		res.send(transactions);
	} catch (error) {
		res.status(500).send(error);
	}
};

exports.deposit = async (req, res) => {
	const { amount } = req.body;

	if (!amount || Object.keys(req.body).length > 1)
		return res.status(400).send("Invalid update");

	try {
		const account = await accountsModel.findByIdAndUpdate(
			req.params.id,
			{ $inc: { cash: amount } },
			{ new: true, runValidators: true }
		);

		if (!account) {
			return res.status(404).send("The id you entered does not exist");
		}

		const transaction = new transactionModel({
			to: account.user.email,
			operation_type: "deposit",
			amount,
		});

		const result = await transaction.save();

		res.status(201).json({ account, transaction: result });
	} catch (error) {
		res.status(500).send(error);
	}
};

exports.updateCredit = async (req, res) => {
	const { amount } = req.body;

	if (!amount || Object.keys(req.body).length > 1)
		return res.status(400).send("Invalid update");

	try {
		const account = await accountsModel.findByIdAndUpdate(
			req.params.id,
			{ credit: amount },
			{ new: true, runValidators: true }
		);

		if (!account) {
			return res.status(404).send("The id you entered does not exist");
		}

		const trasnaction = new transactionModel({
			to: account.user.email,
			operation_type: "update credit",
			amount,
		});

		const result = await trasnaction.save();

		res.status(201).json({ account, transaction: result });
	} catch (error) {
		res.status(500).send(error);
	}
};

exports.withdraw = async (req, res) => {
	const { amount } = req.body;

	if (!amount || Object.keys(req.body).length > 1)
		return res.status(400).send("Invalid update");

	try {
		const account = await accountsModel.findById(req.params.id);

		if (!account)
			return res.status(404).send("The id you entered does not exist");

		if (amount > account.cash + account.credit)
			return res.status(400).send("Invalid update");

		account.cash -= amount;

		await account.save();

		const transaction = new transactionModel({
			to: account.user.email,
			operation_type: "withdraw",
			amount,
		});

		const result = await transaction.save();

		res.status(201).json({ account: account, transaction: result });
	} catch (error) {
		res.status(500).send(error);
	}
};

exports.transfer = async (req, res) => {
	const { amount } = req.body;

	if (!amount || Object.keys(req.body).length > 1)
		return res.status(400).send("Invalid update");

	try {
		const toAccount = await accountsModel.findById(req.params.to);
		const fromAccount = await accountsModel.findById(req.params.from);

		if (!toAccount || !fromAccount)
			return res.status(404).send("The id you entered does not exist");

		if (amount > fromAccount.cash + fromAccount.credit)
			return res.status(400).send("Invalid update");

		fromAccount.cash -= amount;
		toAccount.cash += amount;

		await fromAccount.save();
		await toAccount.save();

		const trasnaction = new transactionModel({
			to: toAccount.user.email,
			from: fromAccount.user.email,
			operation_type: "transfer",
			amount,
		});

		const result = await trasnaction.save();

		res.status(201).json({
			to: toAccount,
			from: fromAccount,
			trasnaction: result,
		});
	} catch (error) {
		res.status(500).send(error);
	}
};
