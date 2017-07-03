/***************************************************
 *  
 *                  06 - UPDATE
 *
 ***************************************************/

/**
 * Here we are g oing to update a document in the 
 * users collection.
 * 
 * The databse will be accessible via process.argv[2].
 * 
 * Say we have a user defined like:
 * 
 *  {
 *      "name": "Tina",
 *      "age": 30,
 *      "username": "tinatime"
 *  }
 * 
 * We want to change Tina's age from 30 to 40.
 * 
 * For the purpose of this lesson, assume that the 
 * username property is unique.
 **/

var mongo = require('mongodb').MongoClient;

var url = 'mongodb://localhost:27017/' +  process.argv[2];


mongo.connect(url, function(err, db) {
    if (err) throw err;
    var collection = db.collection('users');
    collection.update({
        name: 'Tina'
    }, {
        $set: {
           age: 40
        }
    }, function(err) {
        if (err) throw err;
        db.close();
    });
});