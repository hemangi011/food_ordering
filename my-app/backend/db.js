const e = require('express');
const mongoose = require('mongoose');
const mongoUri = 'mongodb+srv://aakashfood:akasafood@cluster0.nbqbqbm.mongodb.net/aakashfood?retryWrites=true&w=majority';
const mongoDB = async()=>{
    try{
        await mongoose.connect(mongoUri);
        console.log("MongoDB Connected");

        const db = mongoose.connection.db;
        const fetched_data = db.collection("food_items");
        
        // Retrieve data from the collection
        const data = await fetched_data.find({}).toArray();

        // Check if data is retrieved
        if (data.length > 0) {
            const foodCategory = db.collection("foodCategory");
            const catData = await foodCategory.find({}).toArray();

            if (catData.length > 0) {
                global.food_items = data;
                global.foodCategory = catData;
                console.log("Data retrieved successfully.");
            } else {
                console.log("No data found in 'foodCategory' collection.");
            }
        } else {
            console.log("No data found in 'food_items' collection.");
        }

    }
catch(err){
        console.error(err.message);
        process.exit(1);
    }
}
// const fetched_data = mongoose.connection.db.collection("food_items",async()=>{
//     try{
//         await fetched_data.find({}).toArray(function(data){
//             console.log();
//         });
//     }catch(err) {
//         console.error(err.message);
//     };
// });

module.exports=mongoDB;


