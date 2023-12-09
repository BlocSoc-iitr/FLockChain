import { ethers } from "ethers";
import { stackrConfig } from "../stackr.config";
import { ActionSchema } from "@stackr/stackr-js";

const actionSchemaType = {
  updatedParams: "string"
};

const actionInput = new ActionSchema("update-parameters", actionSchemaType);

const getData = async () => {
  const wallet = ethers.Wallet.createRandom();

  const data = {
    updatedParams: JSON.stringify([[
    [ 1, 0.0, 0.0, 0.0, 0.0, 0.0],
    [ 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
    [ 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
    [ 0.0, 0.0, 0.0, 6.0, 0.0, 0.0],
    [ 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
    [ 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]],
    [[ 1, 0.0, 0.0, 0.0, 0.0, 0.0],
    [ 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
    [ 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
    [ 0.0, 0.0, 0.0, 6.0, 0.0, 0.0],
    [ 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
    [ 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]],
    [[ 1, 0.0, 0.0, 0.0, 0.0, 0.0],
    [ 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
    [ 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
    [ 0.0, 0.0, 0.0, 6.0, 0.0, 0.0],
    [ 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
    [ 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]],
    [[ 1, 0.0, 0.0, 0.0, 0.0, 0.0],
    [ 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
    [ 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
    [ 0.0, 0.0, 0.0, 6.0, 0.0, 0.0],
    [ 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
    [ 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]]])
  };

  const sign = await wallet.signTypedData(
    stackrConfig.domain,
    actionInput.EIP712TypedData.types,
    data
  );
  console.log("Signature", sign);

  const payload = JSON.stringify({
    msgSender: wallet.address,
    signature: sign,
    payload: data,
  });

  console.log(payload);

  return payload;
};

const run = async () => {
  const start = Date.now();
  const payload = await getData();

  const res = await fetch("http://localhost:3000/", {
    method: "POST",
    body: payload,
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log("RESPONSE", res)

  const end = Date.now();

  const json = await res.json();

  const elapsedSeconds = (end - start) / 1000;
  const requestsPerSecond = 1 / elapsedSeconds;

  console.log(`Requests per second: ${requestsPerSecond.toFixed(2)}`);
  console.log("response : ", json);
};

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

let sent = 0;

while (true) {
  sent++;
  await run();
  if (sent === 16) {
    break;
  }
}
