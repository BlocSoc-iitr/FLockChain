;(async () => {

    // Necessary imports and Params

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
    
    // Checking Correctness of Parameters

    if (!context.parametersSet()) {
      throw new Error(
        'Could not set the parameters in the given context. Please try different encryption parameters.'
      )
    }

    // Generating Keys,Evaluator and Encoder
    const encoder = seal.BatchEncoder(context)

    const keyGenerator = seal.KeyGenerator(context)
    const keyGenerator42 = seal.KeyGenerator(context)

    const publicKey = keyGenerator.createPublicKey()
    const publicKey42 = keyGenerator42.createPublicKey()

    const secretKey = keyGenerator.secretKey()
    const secretKey42 = keyGenerator42.secretKey()
    console.log(secretKey);
    console.log(secretKey42);

    const encryptor = seal.Encryptor(context, publicKey)
    const encryptor42 = seal.Encryptor(context, publicKey)

    const decryptor = seal.Decryptor(context, secretKey)
    const decryptor42 = seal.Decryptor(context, secretKey)

    const evaluator = seal.Evaluator(context)
    const evaluator42 = seal.Evaluator(context)


    // Sending the data
    const array1 = Int32Array.from([1,2,3,4,5])
    const plainText1 = encoder.encode(array1)
    const cipherText1 = encryptor.encrypt(plainText1)
    const array2 = Int32Array.from([2,3,4,5,6])
    const plainText2 = encoder.encode(array2)
    const cipherText2 = encryptor42.encrypt(plainText2)

    // const normalize = Int32Array.from([3,4,5,6,7])
    // const plainText_Normalize = encoder.encode(array2)
    // const cipherText_Normalize = encryptor.encrypt(plainText2)

    // Doing Arithematic on the encrypted Data
    const Result = seal.CipherText()
    evaluator.add(cipherText1, cipherText2, Result) 
    // evaluator.multiply(cipherText1,cipherText_Normalize,Result)

    // Decoding the Encrypted Data
    const decryptedPlainText = decryptor42.decrypt(Result)
    const decodedArray = encoder.decode(decryptedPlainText)
    console.log('decodedArray', decodedArray)

    // Expected Output : 

    /*
    decodedArray Int32Array(4096) [
        6, 15, 28, 45, 66, 0, 0, 0, 0, 0, 0, 0,
        0,  0,  0,  0,  0, 0, 0, 0, 0, 0, 0, 0,
        0,  0,  0,  0,  0, 0, 0, 0, 0, 0, 0, 0,
        0,  0,  0,  0,  0, 0, 0, 0, 0, 0, 0, 0,
        0,  0,  0,  0,  0, 0, 0, 0, 0, 0, 0, 0,
        0,  0,  0,  0,  0, 0, 0, 0, 0, 0, 0, 0,
        0,  0,  0,  0,  0, 0, 0, 0, 0, 0, 0, 0,
        0,  0,  0,  0,  0, 0, 0, 0, 0, 0, 0, 0,
        0,  0,  0,  0,
        ... 3996 more items
    ]
    */
})()