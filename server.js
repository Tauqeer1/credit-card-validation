const express = require('express'); // express framework
const bodyParser = require('body-parser'); // middleware, to parse the incoming request
const compression = require('compression'); // middleware, to compress
const urlencodedParser = bodyParser.urlencoded({ extended: false }); // parse url encoded bodies
const { check, validationResult } = require('express-validator'); // validator, for validation

const config = require('./config/appconfig'); // app configuration
const checkCard = require('./utils/validcard'); // luhn's algorithm for validating credit card
const encrypt = require('./utils/encrypt'); // aes algorithm for data encryption and decryption
const app = express(); // create express app and assigned to app

app.use(bodyParser.json()); // Parse json body
app.use(compression()); // Compress all HTTP responses
app.set('view engine', 'ejs'); // set the view engine to ejs template engine

app.set('db', require('./models/index.js')); // create and set db connection, and sync the db models

// Check the valid port
function normalizePort(val) {
  const port = parseInt(val, 10);
  if (Number.isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }
  return false;
}
const port = normalizePort(config.app.port); // call the function and assign the port
app.set('port', port); // set the port

// Default Route
app.get('/', (req, res) => {
  res.redirect('/payment');
});

// Payment form get route
app.get('/payment', (req, res) => {
  res.render('payment');
});

// Post the payment form
app.post(
  '/payment',
  urlencodedParser,
  [
    check('card_holder').notEmpty().withMessage('Card holder name is required'),
    check('card_number', '16 digit valid card number is required')
      .exists()
      .isLength({ min: 16, max: 16 }),
    check('expire_month').notEmpty().withMessage('Expire month is required'),
    check('expire_year').notEmpty().withMessage('Expire year is required'),
    check('cvv', '3 digit valid cvv is required')
      .exists()
      .isLength({ min: 3, max: 3 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    // error validation checking
    if (!errors.isEmpty()) {
      const alert = errors.array();
      return res.render('payment', {
        alert,
      });
    }

    // Get the database model
    const { PaymentInfo } = app.get('db');
    // Destructing the req body object
    const { card_holder, card_number, cvv, expire_month, expire_year } =
      req.body;
    // Call the luhn's algorithm to check the validity of card, if valid then condition will execute
    if (checkCard.validCardNumber(card_number)) {
      // Data encryption  using AES
      const { encryptedData: encryptedCard, iv: encryptedCardIv } =
        encrypt.encrypt(card_number);
      const { encryptedData: encryptedCvv, iv: encryptedCvvIv } =
        encrypt.encrypt(cvv);
      try {
        // Create the record in db table
        await PaymentInfo.create({
          card_holder,
          card_number: `${encryptedCardIv}_${encryptedCard}`,
          cvv: `${encryptedCvvIv}_${encryptedCvv}`,
          expire_month,
          expire_year,
        });
        // return the response
        return res.render('payment', {
          success: 'Valid Card Details, successfully saved!',
        });
      } catch (error) {
        console.error('error', error);
        // return the error response
        return res.render('payment', {
          error: 'Invalid Card Details',
        });
      }
    } else {
      console.error('Invalid card');
      // return the error response
      return res.render('payment', {
        error: 'Invalid Card Details',
      });
    }
  }
);

// Function execute if server has error while starting
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error('Permission denied');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error('Port already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

// Starting the express server
app
  .listen(port, () => {
    console.log('Listening on port', port);
  })
  .on('error', onError);
