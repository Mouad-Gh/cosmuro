const Sale = require('../models/Sale');


const addSale = async (req, res)=>{

    const { contract, chain, transactionID, nftID, nftImage, CollectionName, collectionImage, amount, buyer } = req.body;
    //console.log(contract)
    try {
        const sale = await Sale.create({contract, chain, transactionID, nftID, nftImage, CollectionName, collectionImage, amount, buyer});
        res.status(200).json({sale});
    } catch (error) {
        res.status(400).json({err : error.message});
    }
}

const getSales = async (req, res) => {
    const search = req.query.name || "";
    try {
        const sales = await Sale.find({CollectionName: {$regex:search, $options: 'i'}}).sort({createdAt: -1}).limit(100);
        res.status(200).json({count:sales.length, sales});
    } catch (error) {
        res.status(400).json({err : error.message});
    }
}

const topSales = async (req, res) => {
    //by createdAt || updatedAt
    const day = parseInt(req.query.day);
    
    console.log(day,new Date(new Date() - day * 60 * 60 * 24 * 1000))
    //{ $match: { createdAt: /^2023-01/ } },
    try {
        const sales = await Sale.aggregate([
            { $match: { createdAt: { $gte: new Date(new Date() - day * 60 * 60 * 24 * 1000)} } },
            { $group: {
             _id: '$CollectionName',
             count: { $sum: 1 }, 
             amountSum: { $sum: '$amount' }, 
             collectionImage: { $first: '$collectionImage'},
            } },
            { $project: {
                CollectionName: '$_id',
                count: 1,
                amountSum: 1,
                collectionImage: 1,
                _id: 0
            }},
            {
                $sort:{ amountSum: -1 }
            },
            { 
                $limit : 5 
            }
            ]);
        res.status(200).json({count:sales.length,sales});
    } catch (error) {
        res.status(400).json({err : error.message});
    }
}

//infinite scroll 
const getSeachedSales = async (req,res) => {
    const page = parseInt(req.query.page || "0");
    const search = req.query.name || "";
    const PAGE_SIZE = 20;
    
    
    try {
        
        //get total of all documents
        const total = await Sale.countDocuments({name: {$regex:search, $options: 'i'}});

        //get documents
        let sales = await Sale.find({CollectionName: {$regex:search, $options: 'i'}})
                                                .sort({createdAt: -1})
                                                .limit(PAGE_SIZE)
                                                .skip(PAGE_SIZE * page);

        //console.log(sales)
        console.log(page)
        
        res.status(200).json({
            hasMore: (total / PAGE_SIZE )-(page+1) >0 ,
            data: sales
        });
    } catch (error) {
        res.status(400).json({err: error.message});
    }
}



module.exports = {
    addSale,
    getSales,
    topSales,
    getSeachedSales
}