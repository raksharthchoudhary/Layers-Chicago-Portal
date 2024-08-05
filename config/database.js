const mongoose = require('mongoose');

const connectDB = async (username, password) => {
  try {
    const mongoURI = `mongodb+srv://${username}:${password}@layerschicagoportal.ybcpr.mongodb.net/yourDatabaseName?retryWrites=true&w=majority`;

    const conn = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
