import { Link } from 'react-router-dom';

const CollectionCard = ({collectionInfo}) => {

    //console.log("infos",collectionInfo)

    return ( 
        <div className="pl-4 grow-0 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 max-w-full sm:max-w-[50%] md:max-w-[33.3333%] lg:max-w-[25%]  flex  " aria-label='collection card'>

            <Link to={`/collection/${collectionInfo.symbol}`} state={{ collectionInfo }} className='w-full' >
                <div className="bg-noir flex flex-col rounded-xl overflow-hidden  ">
                    <div style={{backgroundImage : `url(${collectionInfo.coverImageUrl})`}} className={`h-48 bg-cover bg-center transition-transform duration-300 hover:scale-110 `}></div>
                    <div className="relative flex justify-center pb-11">
                        <div style={{backgroundImage : `url(${collectionInfo.imageUrl})`}} className={`absolute -top-11 h-[88px] w-[88px] border-4  rounded-2xl bg-[url(${collectionInfo.imageUrl})] bg-cover bg-center `}></div>
                    </div>
                    <div className='py-2 flex justify-center '>
                        <h2 className="font-jura text-lg">{collectionInfo.name}</h2>
                    </div>
                </div>
            </Link>
        </div>
     );
}
 
export default CollectionCard;