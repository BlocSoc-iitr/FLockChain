import { Domain, EIP712Types } from "@stackr/stackr-js";
import { ethers } from "ethers";

const getUserInput = async (types: EIP712Types, domain: Domain) => {
  const w = ethers.Wallet.createRandom();

  const addr1 = ethers.hexlify(ethers.randomBytes(20));

  const payload = { type: "increment" };
  const signature = await w.signTypedData(domain, types, payload);

  return {
    data: {
      msgSender: w.address,
      payload,
      signature,
    },
  };
};
