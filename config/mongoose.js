const mongoose = require("mongoose");
const db = mongoose.connection;

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(`mongodb://127.0.0.1:27017/ds-blog`);
  console.log("Successlly Connected to Database...!");
}

// module.exports = db;