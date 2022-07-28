import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { DateTime } from "luxon";
import Loader from "../../Loader";
import Navbar from "../../components/navbar";
import StickyActionWidget from "./StickyActionWidget"
import axios from "axios";
import tezIcon from "../../assets/tezos.svg";
import Image from "next/image";
import { sendTip } from "../../../utils/wallet";


const Post = () => {
    const router = useRouter()
    const { id } = router.query;
    const [isLoading, setIsLoading] = useState(true);

    const [postTitle, setPostTitle] = useState(null);
    const [posterKey, setPosterKey] = useState(null);
    const [postUsername, setPostUserName] = useState(null);
    const [postDate, setPostDate] = useState(null);
    const [postCover, setPostCover] = useState(null);
    const [postBody, setPostBody] = useState(null);
    const [postStats, setPostStats] = useState([]); // [diamonds, likes, comments]

    const [postPrice, setPostPrice] = useState();
    const [copiesMax, setPostCopiesMax] = useState();
    const [copiesRemaining, setPostCopiesRemaining] = useState();
    const [fundraisingGoal, setFundraisingGoal] = useState();
    const [fundraised, setFundraised] = useState();
    const [royalty, setRoyalty] = useState();

    const commentElement = useRef();

    useEffect(() => {
        async function fetchData() {
            //here we will fetch the post info from IPFS
            //for now I am just fetching a simple post from deso blockchain cuz i am too lazy to fetch from IPFS
            const response = await axios.post("/api/getPostWithID", { id: id })
            const post = response.data.post;

            if (!response.status === 200) {
                console.log("An Error Occured!");
                return;
            }

            setPosterKey(post.author);
            setPostBody(post.ipfs_content);
            setPostCover(post.thumbnail_url);
            setPostUserName(post.author);
            setPostTitle(post.title);
            // setPostPrice(0);
            // setPostCopiesRemaining(post.copies_max);
            // setPostCopiesMax(post.copies_remaining);
            setFundraised(post.fundraised / 1e6);
            setFundraisingGoal(post.fundraising_goal / 1e6);
            // setRoyalty(post.royalty_percent);
            // setPostStats([
            //     postData.DiamondCount,
            //     postData.LikeCount,
            //     postData.CommentCount,
            // ]);

            const timestamp = Date.parse(post.timestamp);
            setPostDate(
                DateTime.fromMillis(timestamp).toLocaleString(DateTime.DATE_FULL)
            );

            setIsLoading(false);
        }
        fetchData();

    }, [id]);

    return (
        <>
            <Navbar title='Writez' />

            <div className='mt-24 mx-auto md:w-3/4 px-4 md:px-16'>
                {isLoading ? (
                    <Loader />
                ) : (
                    <div>
                        <div className='post-head'>
                            <div className='flex'>
                                <div className='p-2'>
                                    {/* <img
                                        src={`https://node.deso.org/api/v0/get-single-profile-picture/${posterKey}?fallback=https://node.deso.org/assets/img/default_profile_pic.png`}
                                        alt={`${postUsername}'s Avatar`}
                                        className='rounded-full h-12 w-12'
                                    /> */}
                                </div>
                                <div className='user-text p-2 text-gray-800'>
                                    <div className='username font-bold hover:underline'>
                                        {/* {postUsername ? postUsername.slice(0, 6) + "..." + postUsername.slice(-6) : "..."} */}
                                        {postUsername ? postUsername : "..."}
                                    </div>
                                    <div className='post-date text-sm'>
                                        {postDate}
                                    </div>
                                </div>
                            </div>
                            <div className='text-4xl font-bold break-words my-5 mx-3'>
                                {postTitle}
                            </div>
                        </div>

                        <div className='cover-img py-4'>
                            <img
                                src={postCover}
                                alt=''
                                className='rounded-lg md:max-w-4xl w-full mx-auto'
                            />
                        </div>

                        <ReactMarkdown
                            className='post-content text-lg font  break-words unreset'
                            rehypePlugins={[rehypeHighlight]}
                            remarkPlugins={[remarkGfm]}>
                            {postBody}
                        </ReactMarkdown>

                        <div className='title text-2xl font-bold separator my-5'>-</div>
                        {/* <div>
                            {royalty} % royalty
                        </div>
                        <div>
                            {copiesRemaining} out of {copiesMax} copies left
                        </div> */}
                        <div>
                            {fundraised} <Image src={tezIcon} width={15} height={15} className="inline-block" /> of {fundraisingGoal} <Image src={tezIcon} width={15} height={15} className="inline-block" /> raised
                        </div>
                        <br />
                        <button onClick={() => { sendTip({ post_id: id, amount_mutez: 10000 }) }}>send 0.1tez tip</button>

                        <div className='title text-2xl font-bold separator my-5'>-</div>
                        {/* 
              <div className='tag-bar py-2 flex gap-2'>
                {postTags.map((tag, idx) => {
                  return (
                    <Link
                      key={idx}
                      to={`/tag/${tag.replace(" ", "-")}`}
                      className='tag-capsule p-2 border border-gray-600 rounded-full hover:bg-gray-600 hover:text-white duration-300'>
                      # {tag}
                    </Link>
                  );
                })}
              </div> 
            */}

                        {/* <div className='comments mt-4' ref={commentElement}> */}
                        {/*    <div className='title text-2xl font-bold separator'>Comments</div> */}
                        {/* </div> */}

                        {/* <StickyActionWidget
                            id={id}
                            diamonds={postStats[0]}
                            likes={postStats[1]}
                            comments={postStats[2]}
                            commentEl={commentElement}
                        /> */}
                    </div>
                )}
            </div>
        </>
    );
};

export default Post;
