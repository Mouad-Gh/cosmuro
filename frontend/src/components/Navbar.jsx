import { useState } from "react";
import {FaTelegramPlane , FaDiscord , FaTwitter , FaGithub} from 'react-icons/fa';
import { Link } from "react-router-dom";
import WalletCnx from "./WalletCnx";

const Navbar = () => {

    const [menuOpen,setMenuOpen] = useState(false);

    const toggleClick = () => {
        if(window.innerWidth<768){
          setMenuOpen(!menuOpen);
        }
        
      }

    return ( 
    <header className="relative h-20 p-1 md:p-2 text-white" aria-label="primary navigation" >
        <div className="relative flex ">

          <div className="flex min-w-fit">
            <Link className="pt-2 md:pt-0 " to="/"> <img src="/assets/ApeLogo.png" alt="logo" className="h-10  object-cover"   /></Link>
          </div>

          <ul className={`absolute top-[70px] left-0 right-0 md:inset-0 md:relative w-full h-[calc(100vh-70px)] md:h-auto z-50 bg-noir md:bg-transparent self-center flex flex-col md:flex-row justify-center items-center uppercase     gap-y-5 gap-x-3 ${menuOpen? "translate-x-0 " : "-translate-x-full bg-transparent"}  md:translate-x-0 ease-in-out duration-300`} >
            <li className="text-xl ml-0 font-bold  "><Link to="/holder" onClick={toggleClick} className="p-1 focus:outline-none focus-visible:ring-4 ring-violet rounded-xl pb-3 selected">Holders</Link></li>
            <li className="text-xl ml-0 font-bold  "><Link to="#" onClick={toggleClick} className="p-1 focus:outline-none focus-visible:ring-4 ring-violet rounded-xl pb-3 selected">Sales</Link></li>
            <li className="text-xl font-bold"><Link to="/rarity" onClick={toggleClick} className="p-1 focus:outline-none focus-visible:ring-4 ring-violet rounded-full pb-3 selected">Rarity</Link></li>
            <li className="text-xl font-bold"><Link to="#" onClick={toggleClick} className="p-1 focus:outline-none focus-visible:ring-4 ring-violet rounded-full pb-3 selected">Activity</Link></li>
            <li className="text-xl font-bold"><Link to="#" onClick={toggleClick} className="p-1 focus:outline-none focus-visible:ring-4 ring-violet rounded-full pb-3 selected">Snapshot</Link></li>

            {/**
             * <li className="pb-3 relative md:absolute right-1 inline-flex">
                  <Link to="f" onClick={toggleClick} className="px-1 lg:px-3 "><FaTwitter size={24} className='cursor-pointer hover:text-violet hover:scale-110 transition-all ' /></Link>
                  <Link to="f" onClick={toggleClick} className="px-1 lg:px-3 "><FaTelegramPlane size={24} className='cursor-pointer hover:text-violet hover:scale-110 transition-all ' /></Link>
                  <Link to="f" onClick={toggleClick} className="px-1 lg:px-3"><FaDiscord size={24}  className=" cursor-pointer hover:text-violet hover:scale-110 transition-all" /></Link>
              </li>
            */}
              
          </ul>

          <WalletCnx />

          { !menuOpen && <button className="absolute right-1 top-1 md:hidden" onClick={toggleClick} id="open">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" viewBox="0 0 256 256" > <path fill="none" d="M0 0H256V256H0z"></path> <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" d="M40 128L216 128"></path> <path  stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" d="M40 64L216 64" ></path> <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" d="M40 192L216 192" ></path>  </svg>
          </button>}
          { menuOpen && <button className="absolute right-1 top-1  md:hidden"  id="close" onClick={toggleClick}>
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor"  viewBox="0 0 256 256"> <path fill="none" d="M0 0H256V256H0z"></path> <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" d="M200 56L56 200" ></path> <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" d="M200 200L56 56" ></path> </svg>      
          </button>}

          <div className="fixed right-0.5 bottom-4 z-50 flex flex-col gap-y-2 text-[#c4c4c4] " aria-label="social media section">        
            <Link href="f" className="px-1 lg:px-3 "><FaGithub size={20} className='cursor-pointer hover:scale-110 hover:text-white ' /></Link>
            <Link href="f" className="px-1 lg:px-3 "><FaTwitter size={20} className='cursor-pointer hover:scale-110 hover:text-white' /></Link>
            <Link href="f" className="px-1 lg:px-3 "><FaTelegramPlane size={20} className='cursor-pointer hover:scale-110 hover:text-white ' /></Link>
            <Link href="f" className="px-1 lg:px-3"><FaDiscord size={20}  className=" cursor-pointer hover:scale-110 hover:text-white" /></Link>
          </div>
        
        </div>


    </header> );
}
 
export default Navbar;