import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Navbar(props) {
    const router = useRouter();
    const handleCreateButton = () => {
        router.push("/create");
    };
    return (
        <nav
            id='header'
            className={`fixed bg-white ${props.gradient ? "gradient text-white" : null
                } w-full z-30 top-0  shadow-sm`}>
            <div className='w-full container mx-auto flex flex-wrap items-center justify-between mt-0 py-2'>
                <div className={`toggleColour ${props.gradient ? "text-white" : null
                    } no-underline hover:no-underline font-bold text-2xl lg:text-4xl pl-4 flex items-center`}>
                    <Link href="/">{props.title}</Link>
                </div>
                <div
                    className='flex-grow flex items-center w-auto  mt-0 bg-transparent text-black p-0 pr-5 z-20'
                    id='nav-content'>
                    <ul className='list-reset flex justify-end flex-1 items-center'>
                        <li className='mr-3'></li>
                    </ul>
                    <button
                        id='navAction'
                        onClick={handleCreateButton}
                        className='mx-auto hover:underline text-gray-800 font-bold rounded-full mt-0 py-4 px-8 shadow bg-white/50 focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out'>
                        Create
                    </button>
                </div>
            </div>
            <hr className='border-b border-gray-100 opacity-25 my-0 py-0' />
        </nav>
    );
}
