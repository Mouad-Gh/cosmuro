// searching a nft inside a collection 

import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import "./nfts.css";

const NftSection = (props) => {

    //get state location Link
    const { collectionInfo } = useLocation().state;
    console.log("infos",collectionInfo);
    

    //get the collection name from the route parameter
    const { db_name } = useParams();
    console.log(db_name)
    //create a state that will contain the collection nfts
    const [nfts, setnfts] = useState(null);

    //
    const [number, setNumber] = useState(null);
    const [rank, setRank] = useState(null);
    //useeffect that will fetch the collection and store it on a local state
    useEffect(() => {
        const fetchCollection = async ()=> {
          const response = await fetch(`http://localhost:4000/api/nfts/${db_name}`);
          const json = await response.json();
  
          if(response.ok){
            setnfts(json)
            console.log(json)
            
          }
        }
        fetchCollection();
        
    }, []);
    const [nftObj, setNftObj] = useState(null);
    const goClick = ()=>{
        if(rank){
            
            setNftObj(nfts.find(nft =>{
                return nft.Rank === rank;
            }));
            console.log(nftObj.len);
        }
    }

    return ( 
        <section className="mx-auto mb-8 py-8 px-6 selection:bg-violet selection:text-noir " aria-label="the collection nfts">
            
            <div className="sm:max-w-lg lg:max-w-2xl w-full mx-auto px-4 flex flex-col items-center gap-x-8  " aria-label="nft's info">
                
                <div className="w-full flex flex-col">
                    <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-4 text-base font-azonix" aria-label="search fields">
                        <div className="flex gap-x-1" aria-label="search by number">
                            <input type="text" placeholder="Search by Number" className="outline-none border-violet border-2 rounded-lg p-3 text-noir" onChange={(e)=>setRank(e.target.value)}/>
                            <button className="bg-violet rounded-lg p-3 uppercase" onClick={goClick}>Go</button>
                        </div>
                        
                    </div>
                    <div className="bg-noir rounded-lg p-4 flex flex-col self-center w-4/5 outline-none border-2 border-violet">
                        <div className="flex justify-between">
                            <h4 className="font-medium text-2xl capitalize">{nftObj? collectionInfo.name+"#"+nftObj.ID :  "nft name"}</h4>
                            <span className="bg-violet rounded-xl whitespace-nowrap h-8 p-2 flex items-center font-medium">{nftObj? "Rank "+nftObj.Rank+" of "+collectionInfo.totalItem : "nft rank"}</span>
                        </div>
                        <h5 className="text-violet font-medium text-xl font-jura">{nftObj?.Network || "collection name"}</h5>
                    </div>
                    

                </div>
                <div className="w-4/5 mt-4  ">
                    <div style={{backgroundImage : `url(${nftObj?.Pic || collectionInfo.imageUrl})`}} className="pt-[100%] rounded-3xl outline-none border-4 border-violet bg-cover bg-center "></div>
                </div>

            </div>
        </section>
     );
}
 
export default NftSection;

/**
 *                      <h3 className="py-4 px-6 w-full rounded-lg bg-noir font-medium text-2xl">Traits</h3>
                        <div className="mt-2 grid grid-cols-1 lg:grid-cols-3 gap-4 w-full h-52 scrollbar overflow-y-auto ">
                            <div className="bg-noir rounded-lg  py-2 px-4 flex flex-col  ">
                                <span className="">BACKGROUND</span>
                                <h5 className="">Warm Grey</h5>
                                <h5 className="text-violet">12% have this trait</h5>
                            </div>
                            <div className="bg-noir rounded-lg py-2 px-4 flex flex-col  ">
                                <span className="">BACKGROUND</span>
                                <h5 className="">Warm Grey</h5>
                                <h5 className="text-violet">12% have this trait</h5>
                            </div>
                            <div className="bg-noir rounded-lg py-2 px-4 flex flex-col  ">
                                <span className="">BACKGROUND</span>
                                <h5 className="">Warm Grey</h5>
                                <h5 className="text-violet">12% have this trait</h5>
                            </div>
                            
                        </div>
 */


/**
 * 
<section className="mx-auto mb-8 py-8 px-6 selection:bg-violet selection:text-noir " aria-label="the collection nfts">
            
    <div className="sm:max-w-lg lg:max-w-6xl w-full mx-auto px-4 flex flex-col lg:flex-row gap-x-8  " aria-label="nft's info">
        <div className="lg:basis-2/5 lg:max-w-[40%] mb-4  ">
            <div style={{backgroundImage : `url(${nftObj?.Pic || collectionInfo.imageUrl})`}} className="pt-[100%] rounded-3xl outline-none border-4 border-violet bg-cover bg-center "></div>
        </div>
        <div className="lg:basis-3/5 lg:max-w-[60%] flex flex-col">
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-4 text-base font-azonix" aria-label="search fields">
                <div className="flex gap-x-1" aria-label="search by number">
                    <input type="text" placeholder="Search by Number" className="outline-none border-violet border-2 rounded-lg p-3 text-noir" onChange={(e)=>setNumber(e.target.value)}/>
                    <button className="bg-violet rounded-lg p-3 uppercase" >Go</button>
                </div>
                <div className="flex gap-x-1" aria-label="search by rank">
                    <input type="text" placeholder="Search by Rank" className="outline-none border-violet border-2 rounded-lg p-3 text-noir" onChange={(e)=>setRank(e.target.value)} />
                    <button className="bg-violet rounded-lg p-3 uppercase" onClick={goClick}>Go</button>
                </div>
            </div>
            <div className="bg-noir rounded-lg p-4 flex flex-col">
                <div className="flex justify-between">
                    <h4 className="font-medium text-2xl capitalize">{nftObj?.Posters || "nft name"}</h4>
                    <span className="bg-violet rounded-xl whitespace-nowrap h-8 p-2 flex items-center font-medium">{nftObj?.Rank || "nft rank"}</span>
                </div>
                <h5 className="text-violet font-medium text-xl font-jura">{nftObj?.Network || "collection name"}</h5>
            </div>
            <div className="mt-5 flex flex-col bg-noir rounded-lg py-2">
                <div className="flex justify-between pl-2">
                    <h4 className="font-medium text-2xl capitalize">{collectionInfo.name}</h4>
                    <div style={{backgroundImage : `url(${collectionInfo.imageUrl})`}} className="rounded-lg h-20 w-20 bg-cover bg-center "></div>
                </div>
                <p className="">{collectionInfo.description}</p>
            </div>

        </div>

    </div>
</section>
 */