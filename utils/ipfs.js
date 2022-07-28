import { create, urlSource } from 'ipfs-http-client';

const ipfs = create({ url: 'https://ipfs.infura.io:5001', protocol: 'https' });

const uploadToIpfs = async (text) => {
  let textBuffer = new Buffer.from(text);
  const f = await ipfs.add(textBuffer);
  const url = "https://ipfs.infura.io/ipfs/" + f.cid.toString();
  return url;
}

const uploadToIpfsFromUrl = async (url) => {
  const f = await ipfs.add(urlSource(url));
  const urlipfs = "https://ipfs.infura.io/ipfs/" + f.cid.toString();
  return urlipfs;
}

const getFromIpfs = async (CIDHash) => {
  const resp = ipfs.cat(CIDHash);
  let content = [];
  for await (const chunk of resp) {
    content = [...content, ...chunk];
  }
  const raw = Buffer.from(content).toString('utf8');
  return raw;
}

export { uploadToIpfs, getFromIpfs, uploadToIpfsFromUrl };
