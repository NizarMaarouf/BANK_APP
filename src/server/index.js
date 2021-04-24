const express = require("express");
const mongoose = require("mongoose");

const accountsRouter = require("./routers/accounts.route");
const transactionsRouter = require("./routers/transactions");

const app = express();
const port = process.env.PORT || 8000;
app.use(express.json());

app.use("/api/bank/account", accountsRouter);
app.use("/api/bank/transactions", transactionsRouter);

const uri =
	"mongodb+srv://BANK_APP:2u8Dziw6fxn5xoWu@cluster0.u17so.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose
	.connect(uri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex: true,
	})
	.then(() => {
		console.log("Database connect");
	});

app.listen(port, () => {
	console.log("Server listening on port " + port);
});
