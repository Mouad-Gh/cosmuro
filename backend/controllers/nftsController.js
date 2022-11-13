const mongoose = require('mongoose');

const Schema = mongoose.Schema;


//create a model for the collection that's already exist
Tradoor = mongoose.model("Tradoor", new Schema({}), "tradooors");

const geTradoors = (req, res)=>{

    Tradoor.find({})
    .then(tradoors=>{
        //console.log(tradoors)
        res.status(200).json(tradoors);
    })
    .catch(error => res.status(400).json({err: error.message}))
}
//create api for returning the collection (parametre : collection name)
const getCollectionNfts = async (req, res) => {
    const {collectionName} = req.params ;
    
    try {
        const ModelCol = mongoose.model("ModelCol", new Schema({}),collectionName);
        console.log(ModelCol);
        const data = await ModelCol.find({});
        res.status(200).json(data);
        //delete the model after working with, so that it won't get an error in the next execution "Cannot overwrite `ModelCol` model once compiled"
        delete mongoose.connection.models['ModelCol'];
    } catch (error) {
        res.status(400).json({err: error.message})
    }
    
    
}

// create ana api to return the collection item



module.exports = {
    geTradoors,
    getCollectionNfts
}