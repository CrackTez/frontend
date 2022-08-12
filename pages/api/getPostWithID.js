// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import * as config from "../../config";
import axios from "axios";

export default async function handler(req, res) {
  const { id } = req.body;
  const posts = await axios.get(
    `https://api.jakartanet.tzkt.io/v1/contracts/${config.CONTRACT_ADDRESS}/bigmaps/posts/keys`
  );
 // console.log(posts.data[0].value);
  if (posts.data[id]) {
    var post = posts.data[id].value;
    var URL = post.ipfs_url;
    //find the ipfs hash from the link https://ipfs.infura.io/ipfs/QmTfbdyuZi81zt2i9t72AMv1eNSCDFrxBk3cjUJD5vsEX4 and store in variable ipfsHash
    var ipfsHash = URL.split("/ipfs/")[1];
    console.log(ipfsHash);
    var ipfs = `https://cloudflare-ipfs.com/ipfs/${ipfsHash}`;

    var content = await axios.get(ipfs);
    // console.log(content)
    if (content) {
      content = content.data;
      post.ipfs_content = content;
      res.status(posts.status).json({ post: post });
    }
  } else {
    var post = undefined;
  }
}
