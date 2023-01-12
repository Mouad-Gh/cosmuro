const User = require('../models/User');


//create  a user with the wallet connected
//for the front i should use usecontext to store the wallet...

//create user
const addUser = async (req, res)=>{
    
    const {name,discordId,discordImage,wallet} = req.body;

    try {
        const user = await User.create({name,discordId,discordImage,wallets:[wallet]});
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({err : error.message});
    }
}

//add user & if exist join the wallet to his wallet list
const addUserOrWallet = async (req, res) =>{
    const {name,discordId,discordImage,wallet} = req.body;
    const {adress,type } = wallet;
    
    try {
        //check if the user alredy exist
        const exist = await User.findOne({discordId});
        if(exist){
            //add wallet if it's not alredy in
            const walletof = await User.findOneAndUpdate({_id: exist._id, 'wallets.adress': { $ne: adress} },
                {$push: {wallets:{type , adress}}},
                {new: true, useFindAndModify: false }
                );
            return res.status(200).json({exist}) 
        }

        const user = await User.create({name,discordId,discordImage,wallets:[wallet]});
        res.status(200).json({user});

    } catch (error) {
        res.status(400).json({err : error.message});
    }

}

//get all users
const getUsers = async(req, res)=>{
    try {
        const users = await User.find({}).sort({createdAt: -1});
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({err : error.message});
    }
    
}
//get single user
/*const getUser = async(req, res)=>{
    const { id } = req.params;
    try {
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({error : "no such workout"})
        }
        const user = await User.findById(id);
        if(!user){
            return res.status(404).json({error: 'no such user!'});
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({err : error.message});
    }
    
}*/
const getUser = async(req, res)=>{
    const { id } = req.params;
    try {
        
        const user = await User.findOne({discordId: id});
        if(!user){
            return res.status(404).json({error: 'no such user!'});
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({err : error.message});
    }
    
}

//delete user

//update user

//create wallet
const addWallet = async (req, res)=>{

    const {type,adress} = req.body;
    const {userId} = req.params;

    try {
        
        const wallet = await User.findByIdAndUpdate(userId,
                                                    {$push: {wallets:{type , adress}}},
                                                    {new: true, useFindAndModify: false }
                                                    ); 

        res.status(200).json(wallet);
    } catch (error) {
        res.status(400).json({err : error.message});
    }
}
//delete wallet
const deleteWallet = async (req, res)=>{

    
    const {userId , walletId} = req.params;

    try {
        
        const wallet = await User.findByIdAndUpdate(userId,
                                                    {$pull: {wallets:{_id: walletId}}},
                                                    {new: true, useFindAndModify: false }
                                                    ); 

        res.status(200).json(wallet);
    } catch (error) {
        res.status(400).json({err : error.message});
    }
}



module.exports = {
    getUsers,
    getUser,
    addUserOrWallet,
    addWallet,
    deleteWallet
}