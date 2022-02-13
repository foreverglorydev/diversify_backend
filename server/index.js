// server/index.js

const express = require("express");
const keccak256 = require('keccak256');
const cors = require("cors");
const formidable = require("formidable");
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({origin: "http://localhost:3000"}));

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());


app.post("/api", (req, res) =>  {
  
  let reqAddr = req.body.account;
  let resAddr = 'none';   //default address of return value of this API

  fs.readFile('./server/whitelists.txt', function read(err, data) {
    if (err) {
        throw err;
    }
    const content = data;
    // console.log(typeof data);
    let userList = JSON.parse(content);
    for(let i = 0; i < userList.length; i++)
    {
      if(userList[i].address == reqAddr)
        resAddr = reqAddr;     //if match, replace content of return with matching address.
    }

  
    console.log(userList.length);  
    console.log(userList[1].user);
    console.log(userList[1].address);  

    //if matched real address is encrypted,   else static string "none" will be encrypted as a signature
    //if none, no meanningful this hash.
    let signature = keccak256(resAddr).toString('hex');   
    res.json({ message: signature });

  });
});



app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});


