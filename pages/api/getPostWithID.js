// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getFromIpfs } from '../utils/ipfs';
import * as config from '../../config';
import axios from 'axios';

export default async function handler(req, res) {
  const { id } = req.body;
  const posts = await axios.get(`https://api.jakartanet.tzkt.io/v1/contracts/${config.CONTRACT_ADDRESS}/bigmaps/posts/keys`)
  if (posts.data[id]) {
    var post = posts.data[id].value;
    var ipfs = post.ipfs_url;
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
