/***************************************************
 *  
 *                  09 - AGGREGATE
 *
 ***************************************************/


/**
 * Next up is aggregation. Aggregation allows one to do things like
 * calculate the sum of a field of multiple documents or the average
 * of a field of documents meeting particular criteria.
 *
 * Say you have a collection named prices. Each price 
 * document is modeled like so:
 *
 *  {
 *    "name": "Tshirt",
 *    "size": "S",
 *    "price": 10,
 *    "quantity": 12
 *    "meta": {
 *      "vendor": "hanes",
 *      "location": "US"
 *    }
 *  }
 *
 * In this exercise, we need to calculate the average price for all documents
 * in the prices collection in the database named learnyoumongo that have
 * the size that will be passed as the first argument to your script.
 *
 * Use console.log() to print the average price rounded to 2 decimal places
 * to stdout after you have found it.
 **/


var mongo = require('mongodb').MongoClient;

var url = 'mongodb://localhost:27017/learnyoumongo';


mongo.connect(url, function(err, db) {
    if (err) throw err;
    var collection = db.collection('prices');
    /**
     *      $match
     * 
     * $match is used similar to the way a query is done. It allows
     * us to select the documents that meet certain criteria.
     *
     * Ex. var match = { $match: { status: 'A' } }
     *
     * The above example will match all of the documents that have 
     * a status property equal to A.
     * 
     *      $group
     * 
     * $group is what allows us to run operations on certain properties.
     *
     * So, say we wanted to get the sum of the values of the property value
     * where status is equal to A and have it placed in the total property.
     * 
     * Ex.
     *
     * // [
     * //  { status: 'A', value: 1 },
     * //  { status: 'B', value: 2 },
     * //  { status: 'A', value: 10 }
     * // ]
     *
     * collection.aggregate([
     *  { $match: { status: 'A' }},
     *  { $group: {
     *      id: 'total', // This can be an arbitrary string in this case
     *      total: {
     *          // $sum is the operator used here
     *          $sum: '$value'
     *      }
     *  }}
     *  ]).toArray(function(err, results) {
     *      // handle error
     *      console.log(results)
     *      // => [
     *      // =>   { _id: 'total', total: 11 }
     *      // => ]
     *  })
     **/
    //console.log('Looking for', process.argv[2], 'in:');
    collection.aggregate([
        { 
            $match : {
                size: process.argv[2]
            }
         }, 
         { 
            $group : {
                _id: 'average',
                average: {
                    $avg: '$price'
                }
            }
             
         }]).toArray(function(err, results) {
             if (err) throw err;
             console.log(Number(results[0].average).toFixed(2));
             db.close();
         })
});