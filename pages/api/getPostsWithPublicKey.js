// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import * as config from "../../config";
import axios from "axios";

export default async function handler(req, res) {
console.log(req.body)
  const { pk } = req.body;
  console.log(`public key ${pk}`)
  const posts = await axios.get(
    `https://api.jakartanet.tzkt.io/v1/contracts/${config.CONTRACT_ADDRESS}/bigmaps/posts/keys`
  );
  let postByKeyDict = {};
  
  const allPostList = posts.data;
  for (let i = 0; i < allPostList.length; i++) {
    const post = allPostList[i];
    const posterKey = post.value.author;
    if (posterKey === pk) {
      postByKeyDict[post.key] = post.value;
    }
  }
  return res.status(posts.status).json(postByKeyDict);
}
