/***************************************************
 *  
 *                   03 - FIND
 *
 ***************************************************/

/**
 * Here we will learn to search for documents.
 *
 * In this exercise the database name is learnyoumongo.
 * So, the url would be something like:
 *      monogodb://localhost:27017/learnyoumongo
 *
 * Use the parrots collection to find all documents 
 * where age is greater than the first argument
 * passed to your script.
 *
 * Using console.log, print the documents to stdout.
 **/


// To connect to the database, one can use something like this:

var mongo = require('mongodb').MongoClient;

mongo.connect('mongodb://localhost:27017/learnyoumongo', function(err, db) {
    if (err) return console.error("Error:", err);
    // get the collection called parrots
    db.collection('parrots').find({
        // and all entries with age greater than passed argument
        age: { $gt : parseInt(process.argv[2]) }
    }).toArray(function(err, documents) {
        if (err) return console.error("Error:", err);
        console.log(documents);
    });
    // close db when finished
    db.close();
});