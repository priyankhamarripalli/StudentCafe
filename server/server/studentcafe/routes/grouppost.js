var express = require('express');
var router = express.Router();
const path = require('path');
const db = require('../models');
const Group = db.sequelize.models.Group;
const User = db.sequelize.models.User;
const GroupMembers = db.sequelize.models.GroupMembers;
const GroupPost = db.sequelize.models.GroupPost;
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId
var url = 'mongodb://localhost:27017/studentcafe_dev';
var fs = require('fs-extra');
var multer = require('multer')
var upload = multer({ dest: 'uploads/' })

function uploadFile(req, res, next) {
  console.log("*******uploadFile***************", req.file.name)
  try {
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
      // read the img file from tmp in-memory location
      if (req.file == null) {
        // If Submit was accidentally clicked with no file selected...
        res.send('error');
      } else {
       //console.log("*******inside***************", req)
        var newImg = fs.readFileSync(req.file.path);
        // encode the file as a base64 string.
        var encImg = newImg.toString('base64');
        // define your new document
        var newItem = {
          description: req.body.description,
          contentType: req.file.mimetype,
          size: req.file.size,
          img: Buffer.from(encImg, 'base64')
        };
        let database = db.db('studentcafe_dev');
        database.collection('Attachments')
          .insert(newItem, function (err, result) {
            if (err) { console.log(err); };
            var newoid = new ObjectId(result.ops[0]._id);
            fs.remove(req.file.path, function (err) {
              if (err) { console.log(err) };
              //console.log("**************************************newoid", newoid)
              req.imageId = newoid
              next()
            });
          });
      }
    });
  } catch (error) {
    console.log("*******error***************", req)
    res.json({
      status: 'failed',
      message: error
    });
  }
}

router.post('/upload', upload.single('myFiles'), uploadFile, async (req, res, next) => {
  try {
    var filename = req.imageId;
    let { user_id, group_id } = req.body;
    console.log("************req.body******",req.body);
    console.log("************group_id******", group_id);

    MongoClient.connect(url, function (err, db) {
      let database = db.db('studentcafe_dev');
      database.collection('Attachments').findOne({ '_id': ObjectId(filename) }, function (err, results) {
        console.log("************Attachments******", results); //<-- Output below
        res.json({
          status: 'success',
          message: filename
        });
        
      });
    });
  } catch (error) {
    res.json({
      status: 'failed',
      message: JSON.stringify(error)
    });
  }
});





/* Join a existing group */
router.post('/', async (req, res, next) => {
  console.log("***************INSIDE**************************", req.body.user_id)
  console.log("***************INSIDE**************************",req.body.group_id)  
  console.log("***************INSIDE**************************",req.body.user_name)
  console.log("***************INSIDE**************************",req.body.textMessage)
  
  try {
    let fetchUser = await User.findOne({
      where: {
          id: req.body.user_id
      }
     });
    let newGroupPost = await GroupPost.create({
      user_id: req.body.user_id,
      group_id: req.body.group_id,
      post_text:req.body.textMessage,
      user_name:req.body.user_name,
      user_image:fetchUser.user_image !== null? fetchUser.user_image:'',
      attachment_id:"text",
      content_type:"text",
      status: 'ACTIVE',
    }); 
  

  let fetchAllGroupPost = await GroupPost.findAll({})
    res.json({
      status: 'success',
      payload: fetchAllGroupPost,
      message: 'Text created successfully'
      
   });

    } catch (error) {
    res.json({
      status: 'failed',
      message: error
    });
  }

});


/* GET groups listing. */
router.get('/', async (req, res, next) => {
  let fetchAllGroupPost = await GroupPost.findAll({})
  console.log("*********fgfgfgf*****",fetchAllGroupPost)
if (fetchAllGroupPost !== null) {
  res.json({
    status: 'success',
    payload: fetchAllGroupPost,
    token: "no token",
    message: 'Group created successfully'
  });
}else{
  res.json({
    status: 'success',
    message: "NO Group Post Available"
  });
}
});

module.exports = router;
