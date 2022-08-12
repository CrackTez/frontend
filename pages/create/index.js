import { useState, useRef, useContext, useEffect } from "react";
import { connectWallet, getPKH, createPost } from "../../utils/wallet";
import TopBtnBar from "./TopBtnBar";
import TextEditor from "./TextEditor";
import { uploadToIpfs, uploadFileToIPFS } from "../../utils/ipfs";
import Navbar from "../components/navbar";
import tezIcon from "../assets/tezos.svg";
import Image from "next/image";
import DarkModeContext from "../../Context/DarkModeContext";
import Loader from "../Loader";
import axios from "axios";
import Link from "next/link";
import Head from "next/head";
import * as config from "../../config";
export default function Create() {
  const [walletAddress, setWalletAddress] = useState();
  const contextValue = useContext(DarkModeContext);
  const btnConnect = async () => {
    const w = await connectWallet();
    const addr = await getPKH();
    setWalletAddress(addr);
  };

  const [titleText, setTitleText] = useState("");
  const [bodyText, setBodyText] = useState("");
  const [tagModalVisible, setTagModalVisible] = useState(false);
  const [postCover, setPostCover] = useState("");
  const [postTags, setPostTags] = useState([]);

  const [isPosting, setIsPosting] = useState(false);
  const [coverImageURL, setCoverImageURL] = useState("");

  const [fundraisingAmt, setFundraisingAmt] = useState();
  const [ipfsContent, setIpfsContent] = useState(null);

  const [showLog, setShowLog] = useState(false);
  const tagInput = useRef();
  const [logValue, setLogValue] = useState("");

  const [isPostSuccess, setIsPostSuccess] = useState(false);

  // Event Listeners
  const onCoverInputChange = async (e) => {
    setShowLog(true);
    setLogValue("Uploading cover image...");
    let rawImage = e.target.files[0];
    if (!rawImage) {
      setPostCover(null);
    }
    const rawImageURL = URL.createObjectURL(rawImage);
    setCoverImageURL(rawImage);
    const formData = new FormData();
    formData.append("file", rawImage);
    try {
      const imageURL = await uploadFileToIPFS(formData);

      setPostCover(imageURL);
      //save post cover to local storage
      localStorage.setItem("postCover", imageURL);
      e.target.value = "";
    } catch (e) {
      alert(
        "Error uploading image. This is likely an issue with IPFS. Please reload the page and try again"
      );
    }
    setShowLog(false);
    setLogValue("");
  };

  const onTagInputChange = (e) => {
    const text = e.target.value;

    if (text[text.length - 1] === " ") {
      let newTag = text.split(" ")[0];
      setPostTags([...postTags, newTag]);
      if (postTags.length + 1 >= 5) {
        tagInput.current.readOnly = true;
      }
      console.log(postTags.length);
      e.target.value = "";
    }
  };

  const onInputKeyDown = (e) => {
    // Remove Tags
    if (postTags.length <= 0) return;
    if (e.code === "Backspace" && e.target.value === "") {
      let newTags = [...postTags];
      newTags.splice(newTags.length - 1, 1);
      setPostTags(newTags);
      if (newTags.length <= 5) {
        tagInput.current.readOnly = false;
      }
    }
  };

  const onPublishBtnClicked = async (e) => {
    // Publish

    // checks before publishing
    if (bodyText.length <= 10) {
      alert("Content should be atleast 10 characters long");
      return;
    }
    if (titleText.length <= 2) {
      alert("Title should be atleast 2 characters long");
      return;
    }
    if (!postCover) {
      alert("You must set a post cover");
      return;
    }
    //  if (!priceTez) {
    //     alert("You must set a price for your post");
    //     return;
    // } if (!royalty) {
    //     alert("You must set a royalty percent for your post");
    //     return;
    // } if (!copies) {
    //     alert("You must set number of copies of your post");
    //     return;
    // }

    if (!fundraisingAmt) {
      alert("You must set a fundraising amount for your post");
      return;
      //setFundraisingAmt(0);
    }
    //convert bodyText into a text file
    const bodyTextFile = new File([bodyText], "bodyText.txt", {
      type: "text/plain",
    });
    let ipfs_url = ipfsContent;
    try {
      if (!ipfsContent) {
        const textFormData = new FormData();
        textFormData.append("file", bodyTextFile);

        ipfs_url = await uploadFileToIPFS(textFormData);
        setIpfsContent(ipfs_url);
      }
    } catch (err) {
      alert(`Error uploading to IPFS: ${err}. Please try again.`);
      return;
    }
    var postResponse = null;
    try {
      setLogValue("Posting your blog to blockchain. This may take a while...");
      setShowLog(true);
      postResponse = await createPost({
        // royalty: royalty,
        // sell: sellPost,
        // price_mutez: priceTez,
        // copies: copies,
        ipfs_url: ipfs_url,
        title: titleText,
        thumbnail_url: postCover,
        frGoal: fundraisingAmt,
      });
    } catch (err) {
      alert(`Error creating post. Please try again.`);
      setShowLog(false);
      return;
    }

    console.log(postResponse);
    if (postResponse) {
      try {
        const syncRes = await axios.get(
          `https://tipdeso.com/sync-${
            config.NETWORK == "jakartanet" ? "testnet" : "mainnet"
          }`
        );
        console.log(syncRes);
      } catch (err) {
        console.log(err);
      }
      localStorage.removeItem("postCover");
      //localStorage.removeItem("postTags");
      localStorage.removeItem("bodyText");
      localStorage.removeItem("postTitle");
      localStorage.removeItem("postFundraisingAmt");

      setIsPostSuccess(true);
      setLogValue("Your blog has been posted to Blockchain!");
      setShowLog(true);
      setCoverImageURL("");
      setPostCover(null);
      setBodyText("");
      setTitleText("");
      setFundraisingAmt(null);
      setIpfsContent(null);
    }
  };

  // Utilities
  const uploadImage = async (rawImage) => {
    try {
      // let rawImage = e.target.files[0];
      let url = URL.createObjectURL(rawImage);
      const formData = new FormData();
      formData.append("file", rawImage);
      const ipfsurl = await uploadFileToIPFS(formData);
      return ipfsurl;
    } catch (err) {
      alert(`Error uploading to IPFS: ${err}. Please try again.`);
      return;
    }
  };

  useEffect(() => {
    const storedPostCover = localStorage.getItem("postCover");
    if (storedPostCover) {
      setPostCover(storedPostCover);
    }
    const storedFundraisingAmt = localStorage.getItem("fundraisingAmt");
    if (storedFundraisingAmt) {
      setFundraisingAmt(storedFundraisingAmt);
    }
    const storedBodyText = localStorage.getItem("bodyText");
    if (storedBodyText) {
      setBodyText(storedBodyText);
    }
    const storedTitleText = localStorage.getItem("titleText");
    if (storedTitleText) {
      setTitleText(storedTitleText);
    }
  }, []);
  return (
    <div className={`${contextValue.isDark ? "darkBg" : "bg-white"}`}>
      <Navbar title='Writez' noCreate={true} />
      {/* <button onClick={btnConnect}>connect</button>
            <p>{walletAddress ? walletAddress : "Not Logged in"}</p> */}

      <div className={`flex ${contextValue.isDark ? "darkBg" : "bg-white"}`}>
        <div
          className={`${
            contextValue.isDark ? "darkBg" : "bg-white"
          } mt-24 w-screen md:w-4/5 m-auto px-2 md:px-8 mb-6`}>
          {showLog ? (
            <div
              className={`flex items-center ${
                contextValue.isDark
                  ? "thirdDark text-gray-200"
                  : "bg-gray-100 text-gray-800"
              }   text-sm font-bold px-4 py-3 my-2 mb-4 rounded-md`}
              role='alert'>
              <svg
                className='fill-current w-4 h-4 mr-2'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 20 20'>
                <path d='M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z' />
              </svg>
              <div className='flex items-center space-x-8'>
                <p>{logValue}</p>
                {isPostSuccess ? (
                  <Link
                    href='/feed'
                    className='underline text-blue-500 hover:text-blue-400'>
                    View Post in Feed
                  </Link>
                ) : null}
              </div>
            </div>
          ) : null}

          <TopBtnBar
            setTagModalVisible={setTagModalVisible}
            publishHandler={onPublishBtnClicked}
            isPosting={isPosting}
            coverImgHandler={onCoverInputChange}
          />

          {/* Cover Image Preview */}

          <div
            className={`cover-preview bg-center rounded-lg bg-no-repeat w-2/3 mx-auto h-80 bg-cover relative  ${
              !postCover && "hidden"
            }`}
            style={{ backgroundImage: `url(${postCover})` }}>
            <div className='cover-toolkit absolute top-0 right-0 m-5 flex items-center'>
              <button
                className='px-4 py-2 bg-red-600 text-white opacity-75 hover:opacity-100 duration-300 rounded-lg'
                onClick={() => setPostCover(null)}>
                <i className='fal fa-close'></i>
              </button>
            </div>
          </div>
          <form>
            <div className=' mt-4'>
              <label
                className={`${
                  contextValue.isDark ? "lightText" : "darkText"
                } inline-block mb-2 text-sm font-medium `}>
                Fundraising Goal{" "}
                <Image
                  src={tezIcon}
                  width={15}
                  height={15}
                  className='inline-block'
                />
              </label>
              <input
                type='number'
                min={0}
                className={`${
                  contextValue.isDark ? "darkForm" : "lightForm"
                }  text-sm rounded-lg  block w-full p-2.5 mb-6`}
                placeholder='e.g 100Tez'
                value={(fundraisingAmt / 1e6).toString()}
                onChange={(e) => {
                  setFundraisingAmt(Math.abs(e.target.value * 1e6));
                  localStorage.setItem(
                    "fundraisingAmt",
                    Math.abs(e.target.value * 1e6)
                  );
                }}
                onKeyUp={(e) => {
                  e.target.value = Math.abs(e.target.value);
                }}
              />
            </div>
          </form>
          <div className='mb-96'>
            <TextEditor
              titleText={titleText}
              bodyText={bodyText}
              setTitleText={setTitleText}
              setBodyText={setBodyText}
              uploadImage={uploadImage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
