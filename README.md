# Credit card validation

## How to start the project

First you clone the project using the following command :

git clone https://github.com/AlaaMezian/NodeJs-backend-structure.git

Install node version 16.15.0 to run this project

Run npm install to install the npm packages

Then you create a postgres database Named payment. Them In config.json file under config folder replace username, password, host and port according to your postgres database server configuration

Finally you run npm start to run the project

Algorithm and Packages used in this repository:

## Packages

- Express
- EJS
- Compression
- Body Parser
- dotenv
- Express Validator
- Postgres packages
- Sequelize ORM

# Algorithm

## Luhn's algorithm -> This algorithm is simple checksum formula.

    I have added this algorithm for validating of credit card numbers, I have added in the payment route to check the user input, if the user doesn't enter the valid card number then the system will not save the card information in the database and will send the error message to the user, if the card number is valid according to luhn's algorithm then user encrypted data will be save in the database

## Advanced Encryption Standard (AES) -> Encryption algorithm

    The main reason of using this algorithm over other is, when we have constrained environment like we can encrypt and decrypt in the same environment

    Different modes of this algorithm.

        - ECB (Electronic code book mode)
        - CBC (Cipher block chaining mode)
        - CFB (Cipher feedback mode)
        - OFB (Output feedback mode)
        - CTR (Counter mode mode)

    I have used **aes-256-cbc** algorithm, here 256 is the size of key which means it takes 256 bits as input and output 256 bits of encrypted cipher text, the longer the encryption key the more difficult the algorithm is to hack and cbc is the mode of algorithm which stands for cipher block chaining.


    In Cipher Block Chaining (CBC) mode, an initialization vector (IV) is added to the first block of plaintext before encryption and the resultant cipher text is added to the next block of plaintext before encryption, and so on. Decryption is the reverse process. The IV does not need to be kept secret and must be communicated to the receiving party along with the cipher text.
    Due to IV factor I have used this mode of algorithm
