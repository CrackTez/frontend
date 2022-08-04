import React, { useContext } from "react";
import Navbar from "./components/navbar";
import landingIllustration from "./assets/landingIllustration.png";
import { useRouter } from "next/router";
import noAds from "./assets/noAds.svg";
import goal from "./assets/goal.png";
import revenue from "./assets/revenue.svg";
import keyLock from "./assets/keyLock.svg";

import DarkModeContext from "../Context/DarkModeContext";

// import Login from "./Login";
import Image from "next/image";
export default function Landing() {
  const contextValue = useContext(DarkModeContext);

  const router = useRouter();

  function gotoBlogsList() {
    router.push("/feed");
  }

  return (
    <div
      className={`leading-normal tracking-normal text-white ${
        contextValue.isDark ? "gradientDark" : "gradient"
      } transition-transform`}>
      <Navbar title='Writez' gradient={true} />
      <div>
        <div className='pt-24 '>
          <div className='container px-3 mx-auto flex flex-wrap flex-col md:flex-row items-center'>
            <div className='flex flex-col w-full md:w-2/5 justify-center items-start text-center md:text-left'>
              <h1 className='my-4 text-5xl font-bold leading-tight'>
                Publish, Own, and Fund your ideas like never before!
              </h1>
              <p className='leading-normal text-2xl mb-8'>
                Write blog posts to blockchain, share ideas, raise funds and
                connect with the global community without permission!
              </p>
              <div className='w-full flex-grow lg:flex lg:items-center lg:w-auto mt-2 lg:mt-0  lg:bg-transparent text-black p-4 lg:p-0 z-20'>
                <button
                  onClick={gotoBlogsList}
                  className={`mx-auto lg:mx-0 hover:underline ${
                    contextValue.isDark ? "darkBtn" : "lightBtn"
                  } font-bold rounded-full mt-4 lg:mt-0 py-4 px-8 shadow focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out`}>
                  Discover Latest Blogs
                </button>
              </div>
              {/* <Login /> */}
            </div>

            <div className='w-full md:w-3/5 py-6 text-center'>
              {/* <img className='w-full md:w-4/5 z-50' src={landingIllustration} /> */}
              <Image className='w-full md:w-4/5' src={landingIllustration} />
            </div>
          </div>
        </div>
        <div className='relative -mt-12 lg:-mt-24 '>
          <svg
            viewBox='0 0 1428 174'
            version='1.1'
            xmlns='http://www.w3.org/2000/svg'
            xlink='http://www.w3.org/1999/xlink'>
            <g stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
              <g
                transform='translate(-2.000000, 44.000000)'
                fill={`${contextValue.isDark ? "#1B2233" : "#FFFFFF"}`}
                fillRule='nonzero'>
                <path
                  d='M0,0 C90.7283404,0.927527913 147.912752,27.187927 291.910178,59.9119003 C387.908462,81.7278826 543.605069,89.334785 759,82.7326078 C469.336065,156.254352 216.336065,153.6679 0,74.9732496'
                  opacity='0.100000001'></path>
                <path
                  d='M100,104.708498 C277.413333,72.2345949 426.147877,52.5246657 546.203633,45.5787101 C666.259389,38.6327546 810.524845,41.7979068 979,55.0741668 C931.069965,56.122511 810.303266,74.8455141 616.699903,111.243176 C423.096539,147.640838 250.863238,145.462612 100,104.708498 Z'
                  opacity='0.100000001'></path>
                <path
                  d='M1046,51.6521276 C1130.83045,29.328812 1279.08318,17.607883 1439,40.1656806 L1439,120 C1271.17211,77.9435312 1140.17211,55.1609071 1046,51.6521276 Z'
                  id='Path-4'
                  opacity='0.200000003'></path>
              </g>
              <g
                transform='translate(-4.000000, 76.000000)'
                fill={`${contextValue.isDark ? "#1b2744" : "#FFFFFF"}`}
                fillRule='nonzero'>
                <path d='M0.457,34.035 C57.086,53.198 98.208,65.809 123.822,71.865 C181.454,85.495 234.295,90.29 272.033,93.459 C311.355,96.759 396.635,95.801 461.025,91.663 C486.76,90.01 518.727,86.372 556.926,80.752 C595.747,74.596 622.372,70.008 636.799,66.991 C663.913,61.324 712.501,49.503 727.605,46.128 C780.47,34.317 818.839,22.532 856.324,15.904 C922.689,4.169 955.676,2.522 1011.185,0.432 C1060.705,1.477 1097.39,3.129 1121.236,5.387 C1161.703,9.219 1208.621,17.821 1235.4,22.304 C1285.855,30.748 1354.351,47.432 1440.886,72.354 L1441.191,104.352 L1.121,104.031 L0.457,34.035 Z'></path>
              </g>
            </g>
          </svg>
        </div>

        <section
          className={`${
            contextValue.isDark ? "darkBg lightText" : "bg-white darkText"
          } py-8`}>
          <div className='container max-w-5xl mx-auto m-8'>
            <h1 className='w-full my-2 text-5xl font-bold leading-tight text-center '>
              Why Writez?
            </h1>
            <div className='w-full mb-4'>
              <div className='h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t'></div>
            </div>
            <div className='flex flex-wrap'>
              <div className='w-5/6 sm:w-1/2 p-6'>
                <h3 className='text-3xl  font-bold leading-none mb-3'>
                  Earn Revenue
                </h3>
                <p
                  className={`${
                    contextValue.isDark ? "lessLightText" : "lessDarkText"
                  }  mb-8`}>
                  Earn revenue through your blog posts through social tippings
                  and NFT sales of your blogs!
                  <br />
                  <br />
                </p>
              </div>
              <div className='w-full sm:w-1/3 px-16'>
                <Image src={revenue} />
              </div>
            </div>
            <div className='flex flex-wrap flex-col-reverse sm:flex-row'>
              <div className='w-full sm:w-1/3 p-6 '>
                {/* <img src={noAds}></img> */}
                <Image src={noAds} />
              </div>
              <div className='w-full sm:w-1/2 p-6 mt-6'>
                <div className='align-middle'>
                  <h3 className='text-3xl  font-bold leading-none mb-3'>
                    No Ads!
                  </h3>
                  <p
                    className={`${
                      contextValue.isDark ? "lessLightText" : "lessDarkText"
                    }  `}>
                    Ads and annoying popups are such a web2 thing. With Writez,
                    you can read and write content withot time consuming ads and
                    popups!
                    <br />
                    <br />
                  </p>
                </div>
              </div>
            </div>

            <div className='flex flex-wrap flex-col-reverse sm:flex-row items-center'>
              <div className='w-full sm:w-1/2 p-6'>
                <div className='align-middle'>
                  <h3 className='text-3xl  font-bold leading-none mb-3'>
                    Raise funds for your next idea!
                  </h3>
                  <p
                    className={`${
                      contextValue.isDark ? "lessLightText" : "lessDarkText"
                    }  mb-8`}>
                    With Writez, raising funds from the Internet becomes as easy
                    as writing a blog post!
                    <br />
                    <br />
                  </p>
                </div>
              </div>
              <div className='w-full sm:w-1/3 p-6 mt-6'>
                {/* <img src={noAds}></img> */}
                <Image src={goal} />
              </div>
            </div>
            <div className='flex flex-wrap flex-col-reverse sm:flex-row items-center'>
              <div className=' sm:w-1/3 px-20 '>
                {/* <img src={noAds}></img> */}
                <Image src={keyLock} />
              </div>
              <div className='w-full sm:w-1/2 p-6 mt-6'>
                <div className='align-middle'>
                  <h3 className='text-3xl  font-bold leading-none mb-3'>
                    Be the owner. Not the product!
                  </h3>
                  <p
                    className={`${
                      contextValue.isDark ? "lessLightText" : "lessDarkText"
                    }  `}>
                    Writez extends the famous{" "}
                    <span className='font-bold'>
                      &quot;Not your keys, not your coins&quot;{" "}
                    </span>
                    to{" "}
                    <span className='font-bold'>
                      &quot;Not your keys, not your content&quot;
                    </span>
                    . Own the content you create on your own terms!
                    <br />
                    <br />
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
