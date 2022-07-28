import { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import { useRouter } from "next/router";
import axios from "axios";
import * as config from "../../config";

function timeDifference(previous) {
    var current = Date.now();
    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;
    var elapsed = current - previous;
    if (elapsed < msPerMinute) {
        return Math.round(elapsed / 1000) + ' seconds ago';
    }
    else if (elapsed < msPerHour) {
        return Math.round(elapsed / msPerMinute) + ' minutes ago';
    }
    else if (elapsed < msPerDay) {
        return Math.round(elapsed / msPerHour) + ' hours ago';
    }
    else if (elapsed < msPerMonth) {
        return Math.round(elapsed / msPerDay) + ' days ago';
    }
    else if (elapsed < msPerYear) {
        return Math.round(elapsed / msPerMonth) + ' months ago';
    }
    else {
        return Math.round(elapsed / msPerYear) + ' years ago';
    }
}

const Card = ({ post }) => {
    const router = useRouter();
    console.log(post)
    const url = `/post/${post.id}`;
    return (
        <div className="max-w-sm rounded-md overflow-hidden shadow-lg bg-white text-black cursor-pointer mx-auto" onClick={
            () => {
                router.push(url);
            }
        }>
            <img className="w-full shadow-lg rounded-md cursor-pointer" src={post.thumbnail_url} alt={post.title} />
            <div className="px-6 py-4">
                <div className="font-bold text-xl drop-shadow-md">{post.title}</div>
                <p className="text-gray-700 text-base">
                    {/* {post.ipfs_content.substring(0, 20)} */}
                    {timeDifference(Date.parse(post.timestamp))}
                </p>
            </div>
            {/* <div className="px-6 pt-4 pb-2">
                                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
                                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
                                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
                                </div> */}
        </div>
    )
}

export default function Posts() {
    const [postList, setPostList] = useState([]);

    var limit = 10;

    useEffect(() => {
        async function getPosts() {
            try {
                const posts = await axios.get(`https://api.jakartanet.tzkt.io/v1/contracts/${config.CONTRACT_ADDRESS}/bigmaps/posts/keys`);
                if (posts.data) {
                    var id = posts.data.length - 1;
                    var spliced = [];
                    spliced = posts.data.slice(Math.max(posts.data.length - limit, 0));
                    var splicedNew = [];
                    for (var i = spliced.length - 1; i >= 0; i--) {
                        var post = spliced[i].value;
                        var cnt = await axios.get(post.ipfs_url);
                        post.ipfs_content = cnt.data;
                        post.id = id;
                        splicedNew.push(<Card post={post} key={i} />);
                        id--;
                    }
                    setPostList(splicedNew);
                } else {

                }
            } catch (e) {
                console.log(e);
            }

        }
        getPosts();
    }, []);



    return (
        <div className='leading-normal tracking-normal text-white gradient'>
            <Navbar title='Writez' gradient={true} />
            <div>
                <div className='pt-24  mb-10 '>
                    <div className='p-10 mx-auto grid gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                        {/* Show latest posts here */}
                        {postList}
                    </div>
                </div>
                <div className='relative -mt-12 lg:-mt-24'>
                    <svg
                        viewBox='0 0 1428 174'
                        version='1.1'
                        xmlns='http://www.w3.org/2000/svg'
                        xlink='http://www.w3.org/1999/xlink'>
                        <g stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
                            <g
                                transform='translate(-2.000000, 44.000000)'
                                fill='#FFFFFF'
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
                                fill='#FFFFFF'
                                fillRule='nonzero'>
                                <path d='M0.457,34.035 C57.086,53.198 98.208,65.809 123.822,71.865 C181.454,85.495 234.295,90.29 272.033,93.459 C311.355,96.759 396.635,95.801 461.025,91.663 C486.76,90.01 518.727,86.372 556.926,80.752 C595.747,74.596 622.372,70.008 636.799,66.991 C663.913,61.324 712.501,49.503 727.605,46.128 C780.47,34.317 818.839,22.532 856.324,15.904 C922.689,4.169 955.676,2.522 1011.185,0.432 C1060.705,1.477 1097.39,3.129 1121.236,5.387 C1161.703,9.219 1208.621,17.821 1235.4,22.304 C1285.855,30.748 1354.351,47.432 1440.886,72.354 L1441.191,104.352 L1.121,104.031 L0.457,34.035 Z'></path>
                            </g>
                        </g>
                    </svg>
                </div>
            </div>
        </div>
    );
}
