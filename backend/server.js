// Require Statements
const express = require("express");
const app = express();
const port = 6969;
const morgan = require("morgan");
const { exec } = require('child_process');
const mongoose = require("mongoose");
require('dotenv').config();
const cors = require("cors");
const fs = require("fs")

// Imports
const { mongodb, find, delete_data, findall } = require("./services/mongo");
const {forms} = require("./services/schema");

// Client ID
let clients = []

// Fully HomoMorphic Encryption
;(async () => {
  const SEAL = require('node-seal')
  const seal = await SEAL()
  const schemeType = seal.SchemeType.bfv
  const securityLevel = seal.SecurityLevel.tc128
  const polyModulusDegree = 4096
  const bitSizes = [36, 36, 37]
  const bitSize = 20
  const parms = seal.EncryptionParameters(schemeType)
  parms.setPolyModulusDegree(polyModulusDegree)
  parms.setCoeffModulus(
    seal.CoeffModulus.Create(polyModulusDegree, Int32Array.from(bitSizes))
    )
    parms.setPlainModulus(
      seal.PlainModulus.Batching(polyModulusDegree, bitSize)
      )
      const context = seal.Context(
        parms, 
        true, 
        securityLevel 
        )
})()
      
// Connecting MongoDB
mongodb();
// CORS
app.use(cors());

// To send Data to the client
var bodyParser = require('body-parser');
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.use(morgan('dev'))

app.set("view engine", "ejs");
app.use(express.static("public")); // to view static files

app.get("/api/", (req,res) => {
  res.send("Hello World!")
})
      
app.post("/api/v1/form/add", async (req, res) => {
  console.log(req.body);
  FormObject = {
    User_Address : req.body.User_Address,
    session_name: req.body.session_name,
    model_type: req.body.model_type,
    no_of_clients: req.body.no_of_clients,
    no_of_layers: req.body.no_of_layers,
    activation_function : req.body.activation_function,
    Optimizer : req.body.Optimizer,
    Desired_Accuracy : req.body.Desired_Accuracy,
    display : req.body.display
  }
  const form = new forms(FormObject);
  await form.save();
  res.send("SuccessFully Added");
});

app.get("/api/v1/form/fetch", async (req,res) => {
  const Available_forms = await findall(forms);
  res.json(Available_forms);
})

app.get("/api/v1/form/remove", async (req,res) => {
  await delete_data(forms,req.body.query,req.body.params);
  res.send("SuccessFully Removed")
})

app.get("/api/v1/epoch", (req,res) => {
  console.log("Epoch Done, Starting Evaluation .....");



  cipherText1 = "To get"
  cipherText2 = "Later"
  cipherText_Normalize = "HopeFully :)"
  // Decoding Encrypted Data
  const Result = seal.CipherText()
  evaluator.add(cipherText1, cipherText2, cipherText1) 
  evaluator.multiply(cipherText1,cipherText_Normalize,Result)

  // send the Result to the clients .... 
})

app.get("/api/v1/user", (req,res) => {
    res.status(200).render("user",{layout : false});
})

app.get("/api/v1/home", (req,res) => {
    res.status(200).render("main",{layout : false});
})

app.post("/api/v1/model", (req,res) => {
  let client_id = req.body.client_id
  let model_params = req.body.updated_weights;
  let data_write = JSON.stringify(model_params, null, 2);
  console.log(data_write);
  clients.push(client_id);
  console.log(client_id);
  const filePath = `./${client_id}.json`;
  fs.writeFile(filePath, data_write, { encoding: 'utf-8', flag: 'w' }, (err) => {
    if (err) {
      console.error('Error writing to file:', err);
    } else {
      console.log('Data has been written to the file successfully.');
    }
  });
  res.json(model_params)
})

app.get("/api/v1/newParams", (req,res) => {
  Final_Result = [];
  clients.forEach(element => {
    fs.readFile(`${element}.json`, 'utf-8', (err, data) => {
      if (err) {
        console.error('Error reading file:', err);
      } else {
        console.log("Aggregating");
      }
    });
  });
  setTimeout(function() {
    res.download("./Aggregated_Params.json", "Aggregated_Params.json", (err) => {
      if(err) {
        res.send({
          error: err,
          msg : "Problem downloading the File"
        })
      }
    })
  }, 5000);
})

app.post("/api/v1/FinalParams", (req,res) => {
  const filePath = "./FinalParams.json"
  let model_params = req.body.final_weights;
  let data_to_write = JSON.stringify(model_params, null, 2);
  fs.writeFile(filePath, data_to_write, { encoding: 'utf-8', flag: 'w' }, (err) => {
    if (err) {
      console.error('Error writing to file:', err);
    } else {
      console.log('Data has been written to the file successfully.');
    }
  });
  res.send("Success !!")
})

app.get("/api/v1/download", (req,res) => {
  res.download(
    "./UpdatedParams.json",
    "final_weights.json",
    (err) => {
      if (err) {
        res.send({
            error : err,
            msg   : "Problem downloading the file"
        })
      }
    });
})

app.post("/api/v1/update", async (req,res) => {
  let _id = req.body._id;
  console.log(_id);
  let filter = {_id : _id} ;
  let update = {display : 1};
  const user_form = await forms.findOneAndUpdate(filter , update);
  console.log(user_form);
    res.send("updated")
})

app.get("/api/v1/DownLoadModel", async (req,res) => {
  res.download("./model.py", "model.py", (err) => {
    if(err) {
      res.send({
        error: err,
        msg : "Problem downloading the File"
      })
    }
  })
})

app.get("/api/v1/SendUpadatedParams", async (req,res) => {
  res.download("./FinalParams.json", "FinalParams.json", (err) => {
    if(err) {
      res.send({
        error: err,
        msg : "Problem downloading the File"
      })
    }
  })
})

app.listen(port, () => {
  console.log(`App listening at port ${port}`);
});