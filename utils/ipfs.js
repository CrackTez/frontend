import axios from "axios";
import * as config from "../config";

const uploadFileToIPFS = async (formData) => {
  const resFile = await axios({
    method: "post",
    url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
    data: formData,
    headers: {
      pinata_api_key: config.API_KEY_PINATA,
      pinata_secret_api_key: config.API_KEY_SECRET_PINATA,
      "Content-Type": "multipart/form-data",
    },
  });
  const ImgHash = resFile.data.IpfsHash;
  const imgURL = config.IPFS_GATEWAY + ImgHash;
  console.log(imgURL);
  return imgURL;
};

const getFromIpfs = async (CIDHash) => {
  const resp = ipfs.cat(CIDHash);
  let content = [];
  for await (const chunk of resp) {
    content = [...content, ...chunk];
  }
  const raw = Buffer.from(content).toString("utf8");
  return raw;
};

export { getFromIpfs, uploadFileToIPFS };
