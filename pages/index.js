import React, { useContext } from "react";
import Navbar from "./components/navbar";
import landingIllustration from "./assets/landingIllustration.png";
import { useRouter } from "next/router";
import {FaLinkedinIn} from 'react-icons/fa';
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
      <>
        <Navbar title='Writez' gradient={true} />
      </>

      <div>
        <div className='pt-32 sm:pt-24 '>
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

        <footer
          className={`text-center lg:text-left ${
            contextValue.isDark
              ? "bg-[#141e33] lightText"
              : "bg-gray-100 text-gray-600"
          } `}>
          <div
            className={`flex justify-center items-center lg:justify-between p-6 border-b ${
              contextValue.isDark ? "border-[#26365a]" : "border-gray-400"
            }`}>
            <div className='mr-12 hidden lg:block'>
              <span>Get connected with us on social networks:</span>
            </div>
            <div className='flex justify-center'>
              <a
                href='https://twitter.com/Writez_xyz'
                target={"_blank"}
                rel='noreferrer'
                className='mr-6 text-gray-600'>
                <svg
                  aria-hidden='true'
                  focusable='false'
                  data-prefix='fab'
                  data-icon='twitter'
                  className='w-4'
                  role='img'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 512 512'>
                  <path
                    fill={`${contextValue.isDark ? "white" : "black"}`}
                    d='M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z'></path>
                </svg>
              </a>
              <a
                href='https://discord.gg/kCEwy2wnM2'
                target={"_blank"}
                rel='noreferrer'
                className={`mr-6 ${
                  contextValue.isDark
                    ? "bg-[#141e33] lightText"
                    : "bg-gray-100 text-gray-600"
                }`}>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='16'
                  height='16'
                  fill='currentColor'
                  className='bi bi-discord'
                  viewBox='0 0 16 16'>
                  <path d='M13.545 2.907a13.227 13.227 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.19 12.19 0 0 0-3.658 0 8.258 8.258 0 0 0-.412-.833.051.051 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.041.041 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032c.001.014.01.028.021.037a13.276 13.276 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019c.308-.42.582-.863.818-1.329a.05.05 0 0 0-.01-.059.051.051 0 0 0-.018-.011 8.875 8.875 0 0 1-1.248-.595.05.05 0 0 1-.02-.066.051.051 0 0 1 .015-.019c.084-.063.168-.129.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.052.052 0 0 1 .053.007c.08.066.164.132.248.195a.051.051 0 0 1-.004.085 8.254 8.254 0 0 1-1.249.594.05.05 0 0 0-.03.03.052.052 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.235 13.235 0 0 0 4.001-2.02.049.049 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.034.034 0 0 0-.02-.019Zm-8.198 7.307c-.789 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612Zm5.316 0c-.788 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612Z' />
                </svg>
              </a>

              <a
                href='https://www.instagram.com/Writezxyz/?hl=en'
                target={"_blank"}
                rel='noreferrer'
                className='mr-6 text-gray-600'>
                <svg
                  aria-hidden='true'
                  focusable='false'
                  data-prefix='fab'
                  data-icon='instagram'
                  className='w-3.5'
                  role='img'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 448 512'>
                  <path
                    fill={`${contextValue.isDark ? "white" : "black"}`}
                    d='M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z'></path>
                </svg>
              </a>

              <a
                href='https://www.linkedin.com/in/writez-xyz-121565248/'
                target={"_blank"}
                rel="noreferrer"
                className='mr-6 text-white'>
                <FaLinkedinIn />
              </a>

              <a
                href='https://github.com/CrackTez'
                rel='noreferrer'
                target={"_blank"}
                className='text-gray-600'>
                <svg
                  aria-hidden='true'
                  focusable='false'
                  data-prefix='fab'
                  data-icon='github'
                  className='w-4'
                  role='img'
                  xmlns='http://www.w3.org/3000/svg'
                  viewBox='0 0 496 512'>
                  <path
                    fill={`${contextValue.isDark ? "white" : "black"}`}
                    d='M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z'></path>
                </svg>
              </a>
            </div>
          </div>
          <div className='mx-6 py-10 text-center md:text-left'>
            <div className='grid grid-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
              <div className=''>
                <h6
                  className='
            uppercase
            font-semibold
            mb-4
            flex
            items-center
            justify-center
            md:justify-start
          '>
                  Writez
                </h6>
                <p>
                  Writez is a Decentralized Open Source Blogging Platform where
                  Authors can fund their next idea.
                </p>
              </div>

              <div className=''>
                <h6 className='uppercase font-semibold mb-4 flex justify-center md:justify-start'>
                  Contact
                </h6>

                <p className='flex items-center justify-center md:justify-start mb-4'>
                  <svg
                    aria-hidden='true'
                    focusable='false'
                    data-prefix='fas'
                    data-icon='home'
                    className='w-4 mr-4'
                    role='img'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 576 512'>
                    <path
                      fill='currentColor'
                      d='M280.37 148.26L96 300.11V464a16 16 0 0 0 16 16l112.06-.29a16 16 0 0 0 15.92-16V368a16 16 0 0 1 16-16h64a16 16 0 0 1 16 16v95.64a16 16 0 0 0 16 16.05L464 480a16 16 0 0 0 16-16V300L295.67 148.26a12.19 12.19 0 0 0-15.3 0zM571.6 251.47L488 182.56V44.05a12 12 0 0 0-12-12h-56a12 12 0 0 0-12 12v72.61L318.47 43a48 48 0 0 0-61 0L4.34 251.47a12 12 0 0 0-1.6 16.9l25.5 31A12 12 0 0 0 45.15 301l235.22-193.74a12.19 12.19 0 0 1 15.3 0L530.9 301a12 12 0 0 0 16.9-1.6l25.5-31a12 12 0 0 0-1.7-16.93z'></path>
                  </svg>
                  India
                </p>

                <p className='flex items-center justify-center md:justify-start mb-4'>
                  <svg
                    aria-hidden='true'
                    focusable='false'
                    data-prefix='fas'
                    data-icon='envelope'
                    className='w-4 mr-4'
                    role='img'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 512 512'>
                    <path
                      fill='currentColor'
                      d='M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z'></path>
                  </svg>
                  onwritez.xyz@gmail.com
                </p>
              </div>
            </div>
          </div>
          <div className='text-center p-6 '>
            <span>© 2022 Copyright:</span>
            <a
              className='font-semibold'
              href='https://writez.xyz/'
              rel='noreferrer'>
              Writez
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}
