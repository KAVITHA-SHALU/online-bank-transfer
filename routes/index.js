var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser').json();
//var User = require('../models/user');
//var Transfer = require('../models/transfer');
//var Userlist = require('../models/userlist');
//get the pages
router.get('/',function(req, res, next){
  return res.render('final',{title:'HOME'});
});

// router.get('/final.html',function(req, res, next){
//   return res.render('final',{title:'HOME'});
// });

// router.get('/moneytrans.html',function(req, res, next){
//   return res.render('moneytrans',{title:'moneytrans.html'});
// });

var myjson = [{"name" : "arul", "accountnumber" : "1", "amount" : 10000},
              {"name" : "kavi", "accountnumber" : "2", "amount" : 20000},
              {"name" : "mani", "accountnumber" : "3", "amount" : 30000},
              {"name" : "priya", "accountnumber" : "4", "amount" : 40000},
              {"name" : "dalika", "accountnumber" : "5", "amount" : 60000},
              {"name" : "yamini", "accountnumber" : "6", "amount" : 40000},
              {"name" : "arun", "accountnumber" : "7", "amount" : 30000},
              {"name" : "sakthi", "accountnumber" : "8", "amount" : 20000},
              {"name" : "swetha", "accountnumber" : "9", "amount" : 10000},
              {"name" : "janani", "accountnumber" : "10", "amount" : 90000}]

router.get('/userlist',function(req, res, next){
// Userlist.aggregate([
//     {
//         "$lookup": {
//             "from": "transfers",
//             "localField": "accountnumber",
//             "foreignField": "toaccountnumber",
//             "as": "resultingTagsArray"
//         }
//     },
//     { "$unwind": "$resultingTagsArray" },
//     {
//       "$group": {
//           "_id": {
//            "accountnumber": { "$ifNull": ["$accountnumber", ""] },
//            "amount": { "$ifNull": ["$resultingTagsArray.amount", ""] },
//            "name": { "$ifNull": ["$name", ""] },
//            "fromaccountnumber": { "$ifNull": ["$resultingTagsArray.fromaccountnumber", ""] },
//         }
//     }
//   },
//   {
//     "$project":
//     {
//       "name": "$_id.name",
//       "accountnumber": "$_id.accountnumber",
//       "fromaccountnumber": "$_id.fromaccountnumber",
//       "amount": "$_id.amount",
//       "_id": 0
//     }
//   }

//  ]).exec(function(err, results){
//    if(err) console.log(err);
//    else { 
//      console.log(results);
//      res.end( JSON.stringify(results));
//    }
//  })
res.end( JSON.stringify(myjson));
});

router.post('/moneytrans', bodyParser, function(req, res, next){
  //console.log(req.body);
  if(req.body.fromaccountnumber && req.body.toaccountnumber && req.body.amount){
      
       var transferData = {
        fromaccountnumber: req.body.fromaccountnumber,
        toaccountnumber: req.body.toaccountnumber,
        amount: req.body.amount
         };
         // use sche,'s create method to insert document into mongo'
        //  Transfer.create(transferData, function(err, user){
        //    if(err){
        //      return res.send("NO DATA SAVED!! there was an error");
        //    }else {
        //      return res.send("Updated Successfully");
        //      }
        //  });

        for(var i=0; i<myjson.length; i++) {
            if (myjson[i].accountnumber == req.body.fromaccountnumber) {
              myjson[i].amount = myjson[i].amount + parseInt(req.body.amount);
            }

            if (myjson[i].accountnumber == req.body.toaccountnumber) {
              myjson[i].amount = myjson[i].amount - parseInt(req.body.amount);
            }
        }
        return res.send("Updated Successfully");

     }
     else{
       var err = new Error('All fileds are required');
       err.status =400;
       return next(err);
     }
});
module.exports = router;
