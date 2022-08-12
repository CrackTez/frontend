import { useEffect, useState, useContext } from "react";
import Navbar from "../../components/navbar";
import { useRouter } from "next/router";
import axios from "axios";
import * as config from "../../../config";
import Loader from "../../../utils/Loader";
import DarkModeContext from "../../../Context/DarkModeContext";
import defaultPFP from "../../assets/defaultPFP.png"
import Image from "next/image";
import tezIcon from "../../assets/tezos.svg";



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
          backgroundImage: `url(${config.IPFS_GATEWAY + thumbnailHash})`,
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
          {fundraised}{" "}
          <Image
            src={tezIcon}
            width={15}
            height={15}
            className='inline-block'
          />{" "}
          / {Math.round(fundraising_goal / 1e5) / 10}
          <Image
            src={tezIcon}
            width={15}
            height={15}
            className='inline-block'
          />{" "}
          raised
        </div>
      </div>
    </div>
  );
};

export default function Posts() {
  const router = useRouter();
  const { publicKey } = router.query;
  console.log(publicKey);
  const contextValue = useContext(DarkModeContext);
  const [responseList, setResponseList] = useState(null);
  const [errorHappened, setErrorHappened] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function getPosts() {
      if (!publicKey) return;
      setIsLoading(true);
      try {
        const res = await axios.post(
          "https://tipdeso.com/get-posts-by-author",
          { author: publicKey, net: config.NETWORK }
        );
        if (res.data) {
          console.log(res.data);
          setResponseList(res.data.posts);
        } else {
          setErrorHappened(true);
          //window.location.reload();
        }
      } catch (e) {
        console.log(e);
        setErrorHappened(true);
        //window.location.reload();
      }
      setIsLoading(false);
    }
    getPosts();
  }, [publicKey]);

  return (
    <div
      className={`${
        contextValue.isDark ? "darkBg" : ""
      } leading-normal tracking-normal min-h-screen`}>
      <Navbar title='Writez' gradient={true} />
      {isLoading ? (
        <div className='h-screen mx-auto pt-20'>
          <Loader />
        </div>
      ) : errorHappened ? (
        <div className='h-screen mx-auto pt-20'>
          <p
            className={`${
              contextValue.isDark ? "text-white" : "text-dark"
            } text-xl text-center pt-10`}>
            Error while loading post. Retrying...
          </p>
        </div>
      ) : (
        <div>
          <div
            className={`${
              contextValue.isDark ? "secondaryDark" : "secondaryLight"
            } h-56 sm:h-72`}></div>
          <div className='topBar pt-4 flex mx-auto justify-center'>
            <div className='flex items-center space-x-2 '>
              <div className='w-16 h-16 sm:w-28 sm:h-28'>
                <Image src={defaultPFP} className='rounded-full' />
              </div>

              <p
                className={`${
                  contextValue.isDark
                    ? "lightText secondaryDark  hover:bg-[#354875]"
                    : "bg-gray-200 hover:bg-gray-300  "
                } text-sm sm:text-lg px-4 py-2 rounded-lg`}>
                {publicKey}
              </p>
            </div>
          </div>
          <div className='mt-6'>
            <p
              className={`${
                contextValue.isDark ? "lightText" : "darkText"
              } text-center text-2xl  `}>{`Contents Posted`}</p>
            <div className='my-t pb-4 flex flex-wrap mx-auto  justify-center '>
              {Object.keys(responseList).length > 0 ? (
                Object.keys(responseList).map((key) => {
                  return (
                    <Card
                      key={responseList[key]["idKey"]}
                      keyValue={responseList[key]["idKey"]}
                      title={responseList[key]["title"]}
                      author={responseList[key]["author"]}
                      thumbnailHash={responseList[key]["thumbnailHash"]}
                      timestamp={responseList[key]["timestamp"]}
                      isDark={contextValue.isDark}
                      fundraising_goal={responseList[key]["fundraising_goal"]}
                      fundraised={responseList[key]["fundraised"]}
                    />
                  );
                })
              ) : (
                <div className={`text-center mt-3 text-xl ${contextValue.isDark? "lightText": ""}`}>
                  This user has not posted anything on Writez yet
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
