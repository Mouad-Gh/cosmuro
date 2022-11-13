
import { useEffect, useState } from "react";
import {TiTick} from "react-icons/ti"

const DiscordConnection = ({currentStep,setcurrentStep}) => {
    

    
    //after step 2 authorization... 
    const [user, setuser] = useState(null);
    useEffect(() => {
        const fragment = new URLSearchParams(window.location.hash.slice(1));
        const [accessToken, tokenType] = [fragment.get('access_token'), fragment.get('token_type')];
        if (user===null && accessToken !==null) {
            
        
            console.log('accesstoken & tokenTpe',accessToken,tokenType)
        
            fetch('https://discord.com/api/users/@me', {
              headers: {
                authorization: `${tokenType} ${accessToken}`,
              },
            })
              .then(result => result.json())
              .then(response => {
                const { username, discriminator, id, avatar } = response;
                console.log(username,discriminator, id, avatar,typeof(response.avater),response);
                setuser(username);
                
           
              
                // setDiscordinfco("Hello "+username);
                // setDiscorlogin("hidden");
                console.log("useEffect core...",currentStep);
                setcurrentStep(3);
        
              })
              .catch(console.error);
              window.history.replaceState({}, document.title, "/connect")
        }
    
    }, [user])

    const hundleClick = ()=>{
        window.open(
            'https://discord.com/api/oauth2/authorize?client_id=990757313390465114&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fconnect&response_type=token&scope=identify'
            ,"_self")
        
            
        
    }

    return ( 
        <div className={`step-item ${currentStep === 2 && "active"} ${(2<currentStep) && "complete" } `} aria-label="step 2: connet to your Discord">
            <div className="flex  p-6 items-center">
                <span className="step ">
                    {(2<currentStep) ? <TiTick size={24} /> : 2}
                </span>  
                <h3 className="font-bold font-azonix">Connect to Discord</h3>   
            </div>
            
            <div className={`max-h-80 overflow-hidden ${(currentStep !== 2) && "max-h-0"} transition-[max-height] `}>
                <><p className="text-gray-500  step-parag">Terra services links Discord to your crypto wallet. Unlock the community potential of your crypto assets with server roles, token weighted voting and other powerful features.</p>
                <button className="clip-button p-2 ml-14 bg-violet flex gap-x-3 hover:bg-violet/10 hover:scale-110 transition " onClick={hundleClick}> 
                        <span className="font-azonix">connect Discord</span>
                </button></>
            </div>
        </div>
     );
}
 
export default DiscordConnection;