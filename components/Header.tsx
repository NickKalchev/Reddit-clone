import Image from 'next/image';
import React from 'react';
import logo from '../public/assets/logo.png';
import signInLogo from '../public/assets/signInLogo.png';
import { HomeIcon, ChevronDownIcon, SearchIcon, MenuIcon } from '@heroicons/react/solid';
import 
    { 
        SparklesIcon, GlobeIcon, VideoCameraIcon, ChatIcon, 
        BellIcon, PlusIcon, SpeakerphoneIcon
    } 
from '@heroicons/react/outline';

function Header() {
    return (
        <div className="flex sticky top-0 z-50 bg-white px-4 py-2 shadow-sm">
            <div className="relative h-10 w-28 flex-shrink-0 cursor-pointer">
                <Image objectFit='contain' src={logo} layout="fill" />
            </div>
            
            <div className="flex items-center mx-7 xl:min-w-[300px]">
                <HomeIcon className="h-5 w-5" />
                <p className="flex-1 ml-2 hidden lg:inline">Home</p>
                <ChevronDownIcon className="h-5 w-5" />
            </div>

            <form 
                className="
                    flex flex-1 items-center space-x-2 border 
                    border-gray-200 rounded-md bg-gray-100
                    px-3 py-1
                    "
            >
                <SearchIcon className="h-6 w-6 text-gray-400"/>
                <input className="flex-1 bg-gray-100 outline-none text-gray-700" type="text" placeholder="Search Reddit" />
                <button type="submit" hidden />
            </form>

            <div className="flex text-gray-500 space-x-2 items-center mx-5 -mr-1 hidden lg:inline-flex">
                <SparklesIcon className="icon" />
                <GlobeIcon className="icon" />
                <VideoCameraIcon className="icon" />
                <hr className="h-10 border border-gray-100" />
                <ChatIcon className="icon" />
                <BellIcon className="icon" />
                <PlusIcon className="icon" />
                <SpeakerphoneIcon className="icon" />
            </div>
            <div className="ml-5 mr-2 flex items-center lg:hidden">
                <MenuIcon className="icon" />
            </div>

            <div className="hidden lg:flex ml-3 items-center space-x-2 border border-gray-100 rounded-md p-2">
                <div className="relative h-5 w-5 flex-shrink-0">
                    <Image src={signInLogo} layout="fill" objectFit="contain" />
                </div>
                <p className="text-gray-400">Sign In</p>
            </div>
        </div>
        
    )
}

export default Header
