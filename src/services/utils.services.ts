import axios, { AxiosResponse } from "axios";

const getUserIP = async () => {
  const res: AxiosResponse<{ ip: string }> = await axios.get("https://api.ipify.org?format=json");

  return res.data.ip;
};

const UtilsServices = {
  getUserIP,
};

export default UtilsServices;
