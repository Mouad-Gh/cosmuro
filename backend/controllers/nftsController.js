const mongoose = require('mongoose');
const { getCollectionBySymbol } = require('./collectionController');
const Schema = mongoose.Schema;


//create a model for the collection that's already exist
//Tradoor = mongoose.model("Tradoor", new Schema({}), "tradooors");

/*const geTradoors = (req, res)=>{

    Tradoor.find({})
    .then(tradoors=>{
        //console.log(tradoors)
        res.status(200).json(tradoors);
    })
    .catch(error => res.status(400).json({err: error.message}))
}*/

//create api for returning the collection (parametre : collection name)
const getCollectionNfts = async (req, res) => {
    const {collectionName} = req.params ;
    
    try {
        const collectInfo = await getCollectionBySymbol(collectionName);
        
        if(collectInfo){
            const ModelCol = mongoose.model("ModelCol", new Schema({}),collectionName);
            
            const data = await ModelCol.find({});
            //delete the model after working with, so that it won't get an error in the next execution "Cannot overwrite `ModelCol` model once compiled"
            delete mongoose.connection.models['ModelCol'];
            return res.status(200).json({data, collectInfo});
        }
        res.status(404).json({err: "collection not found :(!"});
    } catch (error) {
        delete mongoose.connection.models['ModelCol'];
        res.status(400).json({err: error.message})
    }
    
    
}

// create an api to return the collection item



module.exports = {
    getCollectionNfts
}