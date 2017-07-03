/***************************************************
 *  
 *                04 - FIND PROJECT
 *
 ***************************************************/

/**
 * Here we will learn how to search for documents but 
 * only fetch the fields we need. Also known as 
 * projection in MongoDB.
 * 
 * Use the parrots collection from the database named 
 * learnyoumongo to find all documents where age is 
 * greater than the first argument passed to your script.
 * 
 * The difference from the last lesson will be that we 
 * only want the name and age properties
 *
 * Using console.log, print the documents to stdout.
 **/

var mongo = require('mongodb').MongoClient;

var url = 'mongodb://localhost:27017/learnyoumongo';
var targetAge = parseInt(process.argv[2]);


mongo.connect(url, function(err, db) {
    if (err) throw err;
    
    // select collection
    db.collection('parrots').find({
        // find matching documents in the collection
        age: {
            $gt : targetAge
        }
    },{
        // specify fields to return (1 == keep)
        name: 1,
        age: 1,
        _id: 0
    }).toArray(function(err, documents) {
        if (err) throw err;
        console.log(documents);
    });
    
    // close db when finished
    db.close();
})