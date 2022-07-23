import { useState, useRef } from 'react';
import { connectWallet, getPKH } from "../utils/wallet";
import TopBtnBar from './TopBtnBar';
import TextEditor from './TextEditor';
import { uploadToIpfs, uploadToIpfsFromUrl } from '../utils/ipfs';
import { createPost } from '../utils/wallet';
import Navbar from '../components/navbar';

export default function Create() {
    const [walletAddress, setWalletAddress] = useState();

    const btnConnect = async () => {
        const w = await connectWallet();
        const addr = await getPKH();
        setWalletAddress(addr);
    }

    const [titleText, setTitleText] = useState("");
    const [bodyText, setBodyText] = useState("");
    const [tagModalVisible, setTagModalVisible] = useState(false);
    const [postCover, setPostCover] = useState("");
    const [postTags, setPostTags] = useState([]);
    const [loggedInPublicKey, setLoggedInPublicKey] = useState(null);
    const [isPosting, setIsPosting] = useState(false);
    const [coverImageURL, setCoverImageURL] = useState("");

    const tagInput = useRef();

    // Event Listeners
    const onCoverInputChange = async (e) => {
        let rawImage = e.target.files[0];
        if (!rawImage) {
            setPostCover(null);
        }
        let url = URL.createObjectURL(rawImage);
        const thumb = await uploadToIpfsFromUrl(url);

        setPostCover(thumb);
        e.target.value = "";
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
        if (bodyText.length <= 10 || titleText.length <= 5 || !postCover) {
            console.log("not enough content to post");
            return;
        }
        const ipfs_url = await uploadToIpfs(bodyText);
        await createPost({ royalty: 10, sell: true, price_mutez: 500000, copies: 5, ipfs_url: ipfs_url, title: titleText, thumbnail_url: postCover });

    };

    // Utilities
    const uploadImage = async (rawImage) => {
        // let rawImage = e.target.files[0];
        let url = URL.createObjectURL(rawImage);
        const ipfsurl = await uploadToIpfsFromUrl(url);
        return ipfsurl;
    };

    return (
        <div>
            <Navbar title="Writez" />
            {/* <button onClick={btnConnect}>connect</button>
            <p>{walletAddress ? walletAddress : "Not Logged in"}</p> */}


            <div className='mt-24 w-screen md:w-4/5 m-auto px-2 md:px-8 mb-6'>
                <TopBtnBar
                    setTagModalVisible={setTagModalVisible}
                    publishHandler={onPublishBtnClicked}
                    isPosting={isPosting}
                    coverImgHandler={onCoverInputChange}
                />

                {/* Cover Image Preview */}

                <div
                    className={`cover-preview bg-center rounded-lg bg-no-repeat w-2/3 mx-auto h-96 bg-cover relative  ${!postCover && "hidden"
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

                <TextEditor
                    titleText={titleText}
                    bodyText={bodyText}
                    setTitleText={setTitleText}
                    setBodyText={setBodyText}
                    uploadImage={uploadImage}
                />
            </div>
        </div>
    )
}
