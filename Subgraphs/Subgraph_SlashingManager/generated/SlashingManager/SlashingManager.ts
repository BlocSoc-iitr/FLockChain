// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class SlashClients extends ethereum.Event {
  get params(): SlashClients__Params {
    return new SlashClients__Params(this);
  }
}

export class SlashClients__Params {
  _event: SlashClients;

  constructor(event: SlashClients) {
    this._event = event;
  }

  get instanceId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }
}

export class SlashingManager extends ethereum.SmartContract {
  static bind(address: Address): SlashingManager {
    return new SlashingManager("SlashingManager", address);
  }

  SLASHER_ADDRESS(): Address {
    let result = super.call(
      "SLASHER_ADDRESS",
      "SLASHER_ADDRESS():(address)",
      []
    );

    return result[0].toAddress();
  }

  try_SLASHER_ADDRESS(): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "SLASHER_ADDRESS",
      "SLASHER_ADDRESS():(address)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  getSlasherAddress(): Address {
    let result = super.call(
      "getSlasherAddress",
      "getSlasherAddress():(address)",
      []
    );

    return result[0].toAddress();
  }

  try_getSlasherAddress(): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "getSlasherAddress",
      "getSlasherAddress():(address)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }
}

export class ConstructorCall extends ethereum.Call {
  get inputs(): ConstructorCall__Inputs {
    return new ConstructorCall__Inputs(this);
  }

  get outputs(): ConstructorCall__Outputs {
    return new ConstructorCall__Outputs(this);
  }
}

export class ConstructorCall__Inputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }

  get _slasherAddress(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class ConstructorCall__Outputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class SlashCall extends ethereum.Call {
  get inputs(): SlashCall__Inputs {
    return new SlashCall__Inputs(this);
  }

  get outputs(): SlashCall__Outputs {
    return new SlashCall__Outputs(this);
  }
}

export class SlashCall__Inputs {
  _call: SlashCall;

  constructor(call: SlashCall) {
    this._call = call;
  }

  get _clientAddress(): Array<Address> {
    return this._call.inputValues[0].value.toAddressArray();
  }

  get _instanceId(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }

  get _stakingRegistry(): Address {
    return this._call.inputValues[2].value.toAddress();
  }
}

export class SlashCall__Outputs {
  _call: SlashCall;

  constructor(call: SlashCall) {
    this._call = call;
  }
}
