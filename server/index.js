// server/index.js

const express = require("express");
const keccak256 = require('keccak256');
const cors = require("cors");
const formidable = require("formidable");
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({origin: "http://localhost:3000"}));





// let aaa = keccak256('0x5B38Da6a701c568545dCfcB03FcB875f56beddC4').toString('hex');

// console.log(aaa);
// let bbb = keccak256("\x19Ethereum Signed Message:\n320x" + aaa).toString('hex');
  // console.log(bbb);

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

let whitelistusers = ['0x4F56Bc08d5D75eD0252d6de31896a9F4f4d6DBc7', '0xDd9346E5b40892053eb706A046D142De1e4cCc26'];

app.post("/api", (req, res) => {

  let address = req.body.account;
  console.log(address);
  let signature = keccak256(address).toString('hex');
  res.json({ message: signature });
  
});



app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});


