;(async () => {
        // Necessary imports and Params
        const args = process.argv;
        const customEncodeLocation = args.indexOf('--encode') + 1;
        const customDecodeLocation = args.indexOf('--decode') + 1;
        const DataLocation = args.indexOf("--data") + 1;
        const SEAL = require('node-seal')
        const fs = require('fs');
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
        
        // Getting Data from Client
        ModelParameters = [];
        try {
          // Synchronously read the contents of the file
          const data = fs.readFileSync(process.argv[DataLocation], 'utf-8');
          // Process the data
          ModelParameters = JSON.parse(data);
        } catch (error) {
          // Handle errors
          console.error('Error reading the file:', error.message);
        }

        // Checking Correctness of Parameters
    
        if (!context.parametersSet()) {
          throw new Error(
            'Could not set the parameters in the given context. Please try different encryption parameters.'
          )
        }
        // Generating Keys,Evaluator and Encoder
        const encoder = seal.BatchEncoder(context)

        const keyGenerator = seal.KeyGenerator(context)

        const publicKey = keyGenerator.createPublicKey()

        const secretKey = keyGenerator.secretKey()

        const encryptor = seal.Encryptor(context, publicKey)

        const decryptor = seal.Decryptor(context, secretKey)

        if (process.argv[customEncodeLocation] == "true") {
          const array = Uint32Array.from(ModelParameters)
          console.log(array);
          const plainText = encoder.encode(array)
          const cipherText = encryptor.encrypt(plainText)
          console.log(cipherText.copy);
        } else if (process.argv[customDecodeLocation] == "true") {
          console.log("This is false");
          const decryptedPlainText = decryptor.decrypt(ModelParameters)
          const decodedArray = encoder.decode(decryptedPlainText)
          console.log('decodedArray', decodedArray)
        } else {
          console.log("Please provide proper Flags");
        }

})()