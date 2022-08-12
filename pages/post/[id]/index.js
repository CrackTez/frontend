import React, { useEffect, useState, useRef, useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { DateTime } from "luxon";
import Loader from "../../Loader";
import Navbar from "../../components/navbar";
import ReactTooltip from "react-tooltip";
import axios from "axios";
import tezIcon from "../../assets/tezos.svg";
import defaultPFP from "../../assets/defaultPFP.png";
import Image from "next/image";
import { sendTip } from "../../../utils/wallet";
import DarkModeContext from "../../../Context/DarkModeContext";
import hljs from "highlight.js";
import "highlight.js/styles/github.css";
import * as config from "../../../config";
import Head from "next/head";

//chagne theme of hljs to VS Code dark theme
const Post = () => {
  const router = useRouter();
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
  const [fundraisingGoal, setFundraisingGoal] = useState(0);
  const [fundraised, setFundraised] = useState(0);
  const [percentRaised, setPercentRaised] = useState(0);
  const [royalty, setRoyalty] = useState();
  const [progressBar, setProgressBar] = useState("");
  const [wasResponseSuccessful, setWasResponseSuccessful] = useState(false);
  const [loadingContent, setLoadingContent] = useState(true);
  const [customContributeValue, setCustomContributeValue] = useState("");
  const commentElement = useRef();
  const contextValue = useContext(DarkModeContext);
  useEffect(() => {
    async function fetchData() {
      if (!id) return;
      if (wasResponseSuccessful) return;
      try {
        const response = await axios.post(
          "https://tipdeso.com/get-post-by-id",
          { id: id, net: config.NETWORK }
        );
        console.log(`this is reponse ${response.data}`);
        const post = response.data;
        //console.log(post);
        if (!response.status === 200) {
          setWasResponseSuccessful(false);
          console.log("An Error Occured!");
          return;
        }
        setWasResponseSuccessful(true);

        setPosterKey(post.author);

        setPostCover(post.thumbnailHash);
        setPostUserName(post.author);
        setPostTitle(post.title);
        // setPostPrice(0);
        // setPostCopiesRemaining(post.copies_max);
        // setPostCopiesMax(post.copies_remaining);
        setFundraised(post.fundraised / 1e6);
        setFundraisingGoal(post.fundraising_goal / 1e6);
        setPercentRaised((post.fundraised * 100) / post.fundraising_goal);
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
        setProgressBar(
          <div
            className='bg-green-700 text-md font-medium text-blue-100 text-center px-0.5 rounded '
            style={{
              width:
                ((post.fundraised * 100) / post.fundraising_goal)
                  .toFixed(2)
                  .toString() + "%",
              minWidth: "fit-content",
              maxWidth: "100%",
            }}>
            {post.fundraising_goal != 0
              ? ((post.fundraised * 100) / post.fundraising_goal).toFixed(2)
              : "100"}
            %
          </div>
        );
        setIsLoading(false);

        var gatewayLists = config.LIST_OF_GATEWAYS;
        for (var i = 0; i < gatewayLists.length; i++) {
          var url = gatewayLists[i];
          //make get request to url
          try {
            const gatewayResponse = await axios.get(url + post.content);
            console.log(gatewayResponse.data);
            if (gatewayResponse.data) {
              setPostBody(gatewayResponse.data);
              setLoadingContent(false);
              break;
            }
          } catch (e) {
            console.log(e);
          }
        }
      } catch (err) {
        setIsLoading(false);
        setWasResponseSuccessful(false);
        //console.log(err)
        //window.location.reload();
      }
    }

    fetchData();
  }, [id]);

  function sendTipFunc(id, amt_mutez) {
    sendTip({ post_id: id, amount_mutez: amt_mutez });
    //setFundraised(fundraised + amt_mutez / 1e6);
    //setPercentRaised(((fundraised + amt_mutez / 1e6) * 100) / fundraisingGoal);
    /*setProgressBar(
      <div
        className='bg-green-600 text-xs font-medium text-blue-100 text-center px-0.5 rounded'
        style={{
          width:
            (((fundraised + amt_mutez / 1e6) * 100) / fundraisingGoal)
              .toFixed(2)
              .toString() + "%",
          minWidth: "fit-content",
          maxWidth: "100%",
        }}>
        {(((fundraised + amt_mutez / 1e6) * 100) / fundraisingGoal).toFixed(2)}%
      </div>
    );*/
  }

  return (
    <div>
      <Head>
        <meta property='og:title' content={postTitle} />
        <title>{postTitle}</title>

        <meta property='og:url' content={"https://www.writez.xyz/post/" + id} />
      </Head>
      <Navbar title='Writez' />
      <div className={`${contextValue.isDark ? "darkBg" : ""} pb-10`}>
        {isLoading ? (
          <div className='h-screen mx-auto pt-20'>
            <Loader />
          </div>
        ) : !wasResponseSuccessful ? (
          <div className='h-screen mx-auto pt-20'>
            <p
              className={`${
                contextValue.isDark ? "text-white" : "text-dark"
              } text-xl text-center pt-10`}>
              Error while loading post. Please reload page.
            </p>
          </div>
        ) : (
          <div
            className={`${
              contextValue.isDark ? "darkBg" : ""
            } pt-24 lg:w-4/6   px-4 md:px-16 sm:mx-auto lg:mx-0`}>
            <div
              className={`${contextValue.isDark ? "dakrBg" : ""} min-h-screen`}>
              <div>
                <div className='post-head'>
                  <div className=' flex items-center space-x-2 px-10'>
                    <div className=' sm:w-16 sm:h-16 md:w-16 md:h-16'>
                      <Image
                        src={defaultPFP}
                        alt={`${postUsername}'s Avatar`}
                        className=' rounded-full '
                      />
                    </div>

                    <div className='flex flex-col space-y-1'>
                      <p
                        className={` ${
                          contextValue.isDark ? "lightText" : ""
                        } username font-bold hover:underline text-gray-800 text-xs sm:text-md hover:cursor-pointer`}
                        onClick={() => {
                          router.push(`/u/${posterKey}`);
                        }}>
                        {postUsername ? postUsername : "..."}
                      </p>{" "}
                      <div
                        className={` ${
                          contextValue.isDark ? "leastLightText" : ""
                        } post-date text-sm`}>
                        {postDate}
                      </div>
                    </div>
                  </div>
                  <h1
                    className={`${
                      contextValue.isDark ? "lightText" : ""
                    } text-4xl font-bold break-words my-10 px-10 `}>
                    {postTitle}
                  </h1>
                </div>

                <div
                  className={`${
                    contextValue.isDark ? "dakrBg" : ""
                  } blogContent lg:flex lg:justify-between `}>
                  <div className='leftContainer lg:px-10 xm:px-2 '>
                    <div className='cover-img py-4'>
                      <img
                        src={`https://cloudflare-ipfs.com/ipfs/${postCover}`}
                        alt=''
                        className='rounded-lg md:max-w-4xl w-full mx-auto'
                      />
                    </div>
                    {/* use highliught js to highlight ot */}
                    {loadingContent ? (
                      <div className='h-screen mx-auto pt-20'>
                        <Loader />
                      </div>
                    ) : (
                      <ReactMarkdown
                        className={` ${
                          contextValue.isDark ? "lessLightText" : ""
                        } post-content text-lg font  break-words  ${
                          contextValue.isDark ? "unresetDark" : "unresetLight"
                        } unreset`}
                        rehypePlugins={[rehypeHighlight]}
                        remarkPlugins={[remarkGfm]}>
                        {postBody}
                      </ReactMarkdown>
                    )}
                  </div>
                  <div
                    className={`${
                      contextValue.isDark ? "darkBg lessLightText" : ""
                    } rightContainer lg:fixed md:top-32 md:right-8 xl:right-12  sm:right-2 my-4 `}>
                    <div
                      className={`${
                        contextValue.isDark ? "lessLightText" : ""
                      }`}>
                      {fundraised.toFixed(2)}{" "}
                      <Image
                        src={tezIcon}
                        width={15}
                        height={15}
                        className='inline-block'
                      />{" "}
                      of {fundraisingGoal}{" "}
                      <Image
                        src={tezIcon}
                        width={15}
                        height={15}
                        className='inline-block'
                      />{" "}
                      raised
                    </div>
                    <div
                      className={`${
                        contextValue.isDark ? "darkContainer" : "bg-gray-100"
                      } w-full  rounded`}>
                      {progressBar}
                    </div>
                    <br />
                    Fund this Post 🎉
                    <br />
                    <div className='flex flex-col'>
                      <div
                        className={`${
                          contextValue.isDark ? "darkContainer" : "bg-gray-100"
                        } flex gap-2 text-center justify-center rounded-t-lg p-2 w-96 mx-auto`}>
                        <button
                          data-tip
                          data-for='gem'
                          className='p-1 px-5  miniLightBtn   text-xl'
                          onClick={() => {
                            sendTipFunc(id, 200000);
                          }}>
                          💎
                        </button>

                        <ReactTooltip id='gem' place='top' effect='solid'>
                          Contribute 0.2 $XTZ
                        </ReactTooltip>
                        <button
                          data-tip
                          data-for='gift'
                          className='miniLightBtn p-1 px-5 fas  text-xl'
                          onClick={() => {
                            sendTipFunc(id, 500000);
                          }}>
                          🎁
                        </button>
                        <ReactTooltip id='gift' place='top' effect='solid'>
                          Contribute 0.5 $XTZ
                        </ReactTooltip>
                        <button
                          data-tip
                          data-for='moneyBag'
                          className='miniLightBtn p-1 px-5 fas   text-xl'
                          onClick={() => {
                            sendTipFunc(id, 10000000);
                          }}>
                          💰
                        </button>
                        <ReactTooltip id='moneyBag' place='top' effect='solid'>
                          Contribute 10 $XTZ
                        </ReactTooltip>
                        <button
                          data-tip
                          data-for='trophy'
                          className='miniLightBtn p-1 px-5 fas   text-xl'
                          onClick={() => {
                            sendTipFunc(id, 50000000);
                          }}>
                          🏆
                        </button>
                        <ReactTooltip id='trophy' place='top' effect='solid'>
                          Contribute 50 $XTZ
                        </ReactTooltip>
                      </div>
                      <div
                        className={` ${
                          contextValue.isDark ? "darkContainer" : "bg-gray-100"
                        } grid rounded-b-lg p-2 w-96 mx-auto`}>
                        <input
                          type='number'
                          value={customContributeValue}
                          onChange={(e) => {
                            setCustomContributeValue(e.target.value);
                          }}
                          className={`${
                            contextValue.isDark ? "thirdDark" : "lighContainer"
                          } p-2 active:outline-none outline-none border-none focus:border-none active:border-none rounded-md`}
                          placeholder='$XTZ to contribute'></input>
                        <button
                          className={` bg-blue-500 hover:bg-blue-600 mt-2 p-3 rounded-md`}
                          onClick={() => {
                            customContributeValue > 0
                              ? sendTipFunc(
                                  id,
                                  parseInt(customContributeValue) * 1e6
                                )
                              : alert("Please enter a valid amount");
                          }}>
                          Contribute
                        </button>
                      </div>
                    </div>
                    {/* Add social media share things here...*/}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Post;
