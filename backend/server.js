const express = require("express");
const app = express();
const port = 6969;
const { exec } = require('child_process');

// User Model Params
var UserRequests = []

// Fully HomoMorphic Encryption
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

app.use(express.json()); // to get the data in json format
app.use(express.urlencoded({ extended: true })); // to get the form data

app.set("view engine", "ejs");
app.use(express.static("public")); // to view static files

app.get("/client", (req, res) => {
    console.log(req.query);
    if (Object.values(req.query).length !== 0) {
        UserRequests.push({
            numClients: req.query.numClients,
            mlModel: req.query.mlModel,
            numLayers: req.query.numLayers,
            floatArray: req.query.floatArray.split(',').map(parseFloat)
        });
    }
    console.log(UserRequests);
    res.status(200).render("client", { layout: false, UserRequests: UserRequests });
});

app.get("/epoch", (req,res) => {
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

app.get("/result", (req,res) => {
    
})

app.get("/user", (req,res) => {
    res.status(200).render("user",{layout : false});
})

app.get("/", (req,res) => {
    res.status(200).render("main",{layout : false});
})

app.listen(port, () => {
  console.log(`App listening at port ${port}`);
});