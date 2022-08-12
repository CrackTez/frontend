# What is Writez ?🤔
Writez is a decentralized Tezos Blockchain based blogging platform for writers📝, and creators 🛠️ who want to own their content and raise fund from the Internet just through their articles

For passionate fans out there, be a part of the author's journey and get partial ownership of the final NFT! Don't be a passive fan, be an owner!
Try out [Writez](https://www.writez.xyz/) now!

# Wasn't NFT just an expensive .jpeg? 🔐
Not really. NFT is a non-fungible token, but of course, you knew that. What that means is it's unique in its value. It can be used to represent unique🔐, irreplaceable ownership 🦾 of any digital asset you have. Not limited to art. You can use it as identity proof, as proof of attendance (POAP), for engaging with your audience if you're a creator, or for investing!

# Cool, but why should I mint a blog, of all things? 🤷‍♀‍
Blogs are intellectual digital possessions, and you've got a right to mint them, like every other digital asset. It transfers the ownership wholly to you as opposed to any other paywalled blogging platform, to grow your readers, to get part of royalties every time publishers profit from your minted blog. If you're looking to start a course/series, it gets even better! You can start crowdfunding! 
> On Writez, we aimed to provide bloggers and writers the control and revenue they deserve which they are devoid of on traditional social platforms. The current state of web3 is mostly about decentralized finance but crypto mass adoption won’t be happening until we have engaging web3 social apps.

# Inspiration for building Writez✍️
The inspiration for Writez came from the fact that web3
is lacking social experience for the end users. With the recent bear
market, we have seen how widespread user activity on web3 apps has gone south since most applications of web3 are based on mere speculation. With Writez, we aim to push web3 to the mainstream audience. The problem with current web2 blogging platforms is that they hardly provide incentives to the writers. Most revenue is generated through ads and the end user gets nothing except likes and comments. We believe creators deserve more than just likes.
(Imagine Kickstarter + Medium but decentralized)


> Cool, now that we agree, there's much empowerment in Writez💫, let's have a look at how we went about Writez it💫, and how you can too!

# Designing the Backend💙
Let's start with what we'd like to provide users of our blogging platform Write.

-  Author should be able to mint blogs with any properties like royalty conditions etc.
-  Author should be able to fund NFT blogs
-  Author should be able to crowdfund blogs (not yet started blogs/series)
-  Readers should be able to view all minted NFT blogs
-  Readers should be able to raise funds for the idea
-  Fans should be able to easily support their author through tips
Publications/Readers should be able to buy the minted blogs
Publications/readers can take part in crowdfunding for blogs/series
Once we have decided all the purposes our platform would solve, adding APIs for these is an easy task. 
We used Python and Flask to build the backend of Writez along with a MySQL DB for easy querying of blockchain data

# Starting with Smart Contract Development🧑‍💻
For writing Smart Contract we use SmartPy. Taquito, and Beacon SDK was used for wallet integration in frontend

# Starting with the frontend🌼
For building Frontend, we used NextKs and Tailwind CSS. 
All the frontend directories can be moved to a folder inside the root directory. Let’s name this folder WritezFrontend. After installing yarn and cloning the project from GitHub.
Just do this : 
```
yarn add next react react-dom
yarn dev
```
or
```npm install
npm run dev
```
NOTE: Make sure you define your config.js accordingly.

# Source Code
For the full source code, you can [visit](https://github.com/CrackTez)
- It's open source, so do feel free to contribute! 

# Problem we face during Building Writez!
- First of all, we would like to thank the TezAsia team for organizing such a opportunistic Hackathon as well as Tezos Team mentors for helping in each doubt. Without these people, Wrtiez wouldn't have been possible
- We learnt a lot of new things like SmartPy and what it takes to build on Tezos. All our team members had never built on Tezos before




























