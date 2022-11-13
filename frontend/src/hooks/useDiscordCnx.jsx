



export const useDiscordCnx = () => {
    //add the discord user to the db 
    //check the wallet cnx

    //const [error, setError] = useState(null);
    

    const authorizeDiscord = async (name, discordId, discordImage, wallet)=>{

        const response = await fetch('http://localhost:4000/api/users',{
            method :'POST',
            headers: { "Content-Type": "application/json"},
            body : JSON.stringify({name, discordId, discordImage, wallet})
        });
        const json= await response.json();
        console.log('new wallet added',json);
    }

    return {authorizeDiscord};
}