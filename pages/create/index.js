import { useState, useRef } from 'react';
import { connectWallet, getPKH } from "../utils/wallet";
import TopBtnBar from './TopBtnBar';
import TextEditor from './TextEditor';
import { uploadToIpfs, uploadToIpfsFromUrl } from '../utils/ipfs';
import { createPost } from '../utils/wallet';
import Navbar from '../components/navbar';
import tezIcon from "../assets/tezos.svg";
import Image from 'next/image';

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

    const [priceTez, setPriceTez] = useState();
    const [royalty, setRoyalty] = useState();
    const [copies, setCopies] = useState();
    const [sellPost, setSellPost] = useState(true);
    const [fundraisingAmt, setFundraisingAmt] = useState();


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
        if (bodyText.length <= 10) {
            alert("Content should be atleast 10 characters long");
            return;
        } if (titleText.length <= 5) {
            alert("Title should be atleast 5 characters long");
            return;
        } if (!postCover) {
            alert("You must set a post cover");
            return;
        } if (!priceTez) {
            alert("You must set a price for your post");
            return;
        } if (!royalty) {
            alert("You must set a royalty percent for your post");
            return;
        } if (!copies) {
            alert("You must set number of copies of your post");
            return;
        }

        if (!fundraisingAmt) {
            setFundraisingAmt(0);
        }

        const ipfs_url = await uploadToIpfs(bodyText);
        await createPost({
            royalty: royalty,
            sell: sellPost,
            price_mutez: priceTez,
            copies: copies,
            ipfs_url: ipfs_url,
            title: titleText,
            thumbnail_url: postCover,
            frGoal: fundraisingAmt
        });

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

                <form>
                    <div className="grid gap-2 mt-10 mb-2 grid-cols-1 sm:grid-cols-2">
                        <div>
                            <label className='inline-block mb-2 text-sm font-medium text-gray-900'>Price </label>
                            <Image src={tezIcon} width={15} height={15} className="inline-block" />
                            <input type="number" min={0} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="e.g 1" required
                                onChange={(e) => { setPriceTez(Math.abs(e.target.value * 1e6)) }} onKeyUp={(e) => { e.target.value = Math.abs(e.target.value) }} />
                        </div>
                        <div>
                            <label className='block mb-2 text-sm font-medium text-gray-900'>Royalty Percent</label>
                            <input type="number" min={0} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="e.g 10%" required
                                onChange={(e) => { setRoyalty(Math.abs(e.target.value)) }} onKeyUp={(e) => { e.target.value = Math.abs(e.target.value) }} />
                        </div>
                        <div>
                            <label className='block mb-2 text-sm font-medium text-gray-900'>Number Of Copies</label>
                            <input type="number" min={0} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="e.g 5" required
                                onChange={(e) => { setCopies(Math.abs(e.target.value)) }} onKeyUp={(e) => { e.target.value = Math.abs(e.target.value) }} />
                        </div>
                        <div className="flex items-center mt-auto pl-5 rounded-lg border border-gray-300 bg-gray-50 h-11">
                            <input defaultChecked type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-2"
                                onChange={(e) => { setSellPost(Math.abs(e.target.value)) }} />
                            <label className="py-4 ml-2 w-full text-sm font-medium text-gray-900">Set Sale</label>
                        </div>
                    </div>
                    <div className='mb-10'>
                        <label className='inline-block mb-2 text-sm font-medium text-gray-900'>Fundraising Goal <Image src={tezIcon} width={15} height={15} className="inline-block" /> (optional)</label>
                        <input type="number" min={0} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 disabled:placeholder:text-gray-300" placeholder="e.g 100Tez"
                            onChange={(e) => { setFundraisingAmt(Math.abs(e.target.value * 1e6)) }} onKeyUp={(e) => { e.target.value = Math.abs(e.target.value) }} />
                    </div>
                </form>
            </div>
        </div>
    )
}
