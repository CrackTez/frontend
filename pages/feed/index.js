import { useEffect, useState, useContext } from "react";
import Navbar from "../components/navbar";
import { useRouter } from "next/router";
import axios from "axios";
import * as config from "../../config";
import Loader from "../../utils/Loader";
import DarkModeContext from "../../Context/DarkModeContext";
import defaultPFP from "../assets/defaultPFP.png";
import tezIcon from "../assets/tezos.svg";
import Image from "next/image";

function timeDifference(previous) {
  var current = Date.now();
  var msPerMinute = 60 * 1000;
  var msPerHour = msPerMinute * 60;
  var msPerDay = msPerHour * 24;
  var msPerMonth = msPerDay * 30;
  var msPerYear = msPerDay * 365;
  var elapsed = current - previous;
  if (elapsed < msPerMinute) {
    return Math.round(elapsed / 1000) + " seconds ago";
  } else if (elapsed < msPerHour) {
    return Math.round(elapsed / msPerMinute) + " minutes ago";
  } else if (elapsed < msPerDay) {
    return Math.round(elapsed / msPerHour) + " hours ago";
  } else if (elapsed < msPerMonth) {
    return Math.round(elapsed / msPerDay) + " days ago";
  } else if (elapsed < msPerYear) {
    return Math.round(elapsed / msPerMonth) + " months ago";
  } else {
    return Math.round(elapsed / msPerYear) + " years ago";
  }
}

const Card = ({
  keyValue,
  isDark,
  title,
  author,
  thumbnailHash,
  timestamp,
  fundraising_goal,
  fundraised,
}) => {
  const router = useRouter();
  const url = `/post/${keyValue}`;
  return (
    <div
      className={`${
        isDark ? "darkForm" : "bg-white"
      } my-4 w-full mx-6 md:w-1/2 lg:w-1/3   rounded-md overflow-hidden shadow-lg text-black cursor-pointer hover:scale-105 duration-75`}
      onClick={() => {
        router.push(url);
      }}>
      <div
        style={{
          backgroundImage: `url(${config.LIST_OF_GATEWAYS[1] + thumbnailHash})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "300px",
          width: "100%",
        }}></div>
      {/* <img
        className='shadow-lg rounded-t-md cursor-pointer w-full h-72 '
        src={config.IPFS_GATEWAY + thumbnailHash}
        alt={title}
      /> */}
      <div className='px-6 py-4'>
        <div className='flex items-center'>
          <div className='w-6 h-8 sm:w-10 sm:h-12'>
            <Image src={defaultPFP} className='rounded-full' alt='avatar' />
          </div>
          <div
            className={`w-44 sm:w-72  mx-2 py-1 overflow-hidden  ${
              isDark ? "thirdDark" : "thirdLight"
            } rounded-lg flex items-center`}>
            <p
              className='text-sm sm:text-md truncate px-2 hover:underline'
              onClick={() => {
                // router.push(`/u/${author}`);
                //redirect to user profile
                window.location.href = `/u/${author}`;
              }}>
              {author}
            </p>
          </div>
        </div>
        <div className='font-bold text-lg sm:text-xl drop-shadow-md   '>
          <p className='text-lg sm:text-xl text-clip '>{title}</p>
        </div>
        <p className={`${isDark ? "leastLightText" : "text-gray-400"} text-xs`}>
          {/* {post.ipfs_content.substring(0, 20)} */}
          {timeDifference(Date.parse(timestamp))}
        </p>
        <div className={`${isDark ? "lessLightText" : ""} mt-4 justify-end`}>
        {Math.round(fundraised / 1e5) / 10}
          <Image
            src={tezIcon}
            width={15}
            height={15}
            className='inline-block'
          />
          / {Math.round(fundraising_goal / 1e5) / 10}
          <Image
            src={tezIcon}
            width={15}
            height={15}
            className='inline-block'
          />
        
        </div>
      </div>
    </div>
  );
};

export default function Posts() {
  const contextValue = useContext(DarkModeContext);
  const [responseList, setResponseList] = useState([]);
  const [errorHappened, setErrorHappened] = useState(false);
  useEffect(() => {
    async function getPosts() {
      var requestPayload = {
        net: config.NETWORK,
        lastID: "",
        numToFetch: 30,
      };
      try {
        const posts = await axios({
          method: "post",
          url: `https://tipdeso.com/get-feed`,
          data: requestPayload,
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (posts.data) {
          //reverse the posts.data.posts array
          setResponseList(posts.data.posts.reverse());
          //setResponseList(posts.data.posts);
        } else {
          setErrorHappened(true);
          window.location.reload();
        }
      } catch (e) {
        setErrorHappened(true);
        window.location.reload();
      }
    }
    getPosts();
  }, []);

  return (
    <div
      className={`${
        contextValue.isDark ? "darkBg" : ""
      } leading-normal tracking-normal min-h-screen`}>
      <Navbar title='Writez' gradient={true} />

      <div>
        <div className={`${contextValue.isDark ? "darkBg" : ""} pt-24 pb-10`}>
          {responseList.length > 0 ? (
            <div>
              <p
                className={`${
                  contextValue.isDark ? "lightText" : "textDark"
                } text-3xl text-center my-3`}>
                Trending Blogs
              </p>
              <div className='flex flex-wrap  mx-auto  justify-center '>
                {/*  We gotta add infinite scrollbar too. and idk how to the api response work. lmk and i add fix that    */}

                {responseList.map((post, index) => {
                  return (
                    <Card
                      key={post["idKey"]}
                      keyValue={post["idKey"]}
                      title={post["title"]}
                      author={post["author"]}
                      thumbnailHash={post["thumbnailHash"]}
                      timestamp={post["timestamp"]}
                      isDark={contextValue.isDark}
                      fundraising_goal={post["fundraising_goal"]}
                      fundraised={post["fundraised"]}
                    />
                  );
                })}
              </div>
            </div>
          ) : errorHappened ? (
            <p
              className={`${
                contextValue.isDark ? "text-white" : "text-dark"
              } text-xl text-center pt-10`}>
              Error while loading post. Retrying...
            </p>
          ) : (
            <div className='flex justify-center my-4'>
              <Loader />{" "}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
