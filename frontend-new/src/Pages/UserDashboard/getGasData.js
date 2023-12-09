import axios from "axios";

const chainId = 11155111;
const username = "8e1f0b3233fb4a9d9869946a0ccaca2b";
const password = "G3a402wdJAyyMeKC+FrkEJGW7k/ym7ekTiuKHqxXR6YucZCXcwaqlg";
console.log(username, password);
const basicAuth = "Basic " + btoa(username + ":" + password);

export const handleFetchGasData = async () => {
  try {
    const { data } = await axios.get(
      `https://gas.api.infura.io/networks/${chainId}/suggestedGasFees`,
      {
        headers: {
          Authorization: `${basicAuth}`,
        },
      }
    );
    return data;
  } catch (error) {
    console.log("Server responded with:", error);
  }
};
