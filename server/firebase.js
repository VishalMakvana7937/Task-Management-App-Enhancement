const admin = require('firebase-admin');
const serviceAccount = require('./messages-b3c55-firebase-adminsdk-9750f-adc3e745f7.json');  // Ensure the path is correct

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://messages-b3c55.firebaseio.com'  // Update the URL if needed
});

module.exports = admin;
