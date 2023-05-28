const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://abubakarch705:heIawZVATFLPnuHE@khareedo.xth9bzt.mongodb.net/?retryWrites=true&w=majority'
    );
    console.log('Connected to db!');
  } catch (error) {
    console.log('DB Connection', error);
  }
};

module.exports = connectDB;
