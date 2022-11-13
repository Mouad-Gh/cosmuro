
import { useEffect, useState } from "react";
import DiscordConnection from "./DiscordConnection";
import "./stepper.css";
import TerraConnection from "./TerraConnection";
import {TiTick} from "react-icons/ti"
import { useWallet } from "@terra-money/wallet-provider";


const Stepper = () => {

    const steps = [
        {
            name:"Connect your wallet",
            p: "Connect your crypto wallets to let all of your assets shine. Join diverse Discord communities and become an active part of making them great.",
            btn: {
                text : "connect wallet",
                click : ()=>{
                    console.log(connect(availableConnectTypes[0]));
                    console.log(wallets);
                    //setWalletAdress(wallets[0]["terraAddress"]);
                }
                
            }

        },
        {
            name:"Connect to Discord",
            p: "Lunar HQ links Discord to your crypto wallet. Unlock the community potential of your crypto assets with server roles, token weighted voting and other powerful features.",
            btn: {
                text : "connect Discord",
            }
        },
        {
            name:"Confirm & go to Discord",
            p: "Lunar HQ links Discord to your crypto wallet. Unlock the community potential of your crypto assets with server roles, token weighted voting and other powerful features.",
            btn: {
                text : "Confirm",
                click : ()=>console.log("done!"),
            }
        },
        
    ]

    const [currentStep, setcurrentStep] = useState(1);
    //comlete all the steps
    const [complete, setcomplete] = useState(false);
    
    const {
        disconnect,
      } = useWallet();

     
    
    return ( 
        <section className="mt-10  p-4  ">

            <TerraConnection currentStep={currentStep} setcurrentStep={setcurrentStep} />
            <DiscordConnection currentStep={currentStep} setcurrentStep={setcurrentStep}/>

            
                <div className={`step-item ${currentStep === 3 && "active"} ${(complete) && "complete" } `}>
                    <div className="flex  p-6 items-center">
                        <span className="step ">
                            {(complete) ? <TiTick size={24} /> : 3}
                        </span>  
                        <h3 className="font-bold font-azonix">Confirm & go to Discord</h3>   
                    </div>
                    
                    <div className={`max-h-80 overflow-hidden ${(currentStep !== 3 || complete) && "max-h-0"} transition-[max-height] `}>
                        <><p className="text-gray-500  step-parag">Congratulations! you've completed the register, now you can go to Discord</p>
                        <button className="clip-button p-2 ml-14 bg-violet flex gap-x-3 hover:bg-violet/10 hover:scale-110 transition " 
                            
                            onClick={()=>{
                                setcomplete(true);
                                disconnect()
                                }}>
                                
                                <span className="font-azonix">Go to Discord</span>
                        </button></>
                    </div>
                </div>
            
        </section>
    );
}
 
export default Stepper;




/**
 * using the steps collections
 * {steps.map((step,i)=>(
                <div key={i} className={`step-item ${currentStep === i+1 && "active"} ${(i+1<currentStep || complete) && "complete" } `}>
                    <div className="flex  p-6 items-center">
                        <span className="step ">
                            {(i+1<currentStep || complete) ? <TiTick size={24} /> : i+1}
                        </span>  
                        <h3 className="font-bold font-azonix">{step.name}</h3>   
                    </div>
                    
                    <div className={`max-h-80 overflow-hidden ${(currentStep !== i+1 || complete) && "max-h-0"} transition-[max-height] `}>
                        <><p className="text-gray-500  step-parag">{step.p}</p>
                        <button className="clip-button p-2 ml-14 bg-violet flex gap-x-3 hover:bg-violet/10 hover:scale-110 transition " 
                            onClick={()=>{
                                currentStep  === steps.length ? setcomplete(true) : setcurrentStep((prev)=>prev+1)

                            }}>
                                
                                <span className="font-azonix">{step.btn.text}</span>
                        </button></>
                    </div>
                </div>
            ))}
 */