// Bring Mongoose into the app 
import mongoose from 'mongoose'

const connection_string = process.env.DB_CONNECTION_STRING

const db_connection = async () => {

  // Create the database connection 
  connection_string && await mongoose.connect(connection_string);

  // CONNECTION EVENTS
  // When successfully connected
  mongoose.connection.on('connected', function () {
    console.log('Mongoose default connection open to ' + connection_string);
  });

  // If the connection throws an error
  mongoose.connection.on('error', function (err) {
    console.log('Mongoose default connection error: ' + err);
  });

  // When the connection is disconnected
  mongoose.connection.on('disconnected', function () {
    console.log('Mongoose default connection disconnected');
  });

  // If the Node process ends, close the Mongoose connection 
  process.on('SIGINT', function () {
    mongoose.connection.close(function () {
      console.log('Mongoose default connection disconnected through app termination');
      process.exit(0);
    });
  });
}

export { db_connection }