var express = require('express');
var router = express.Router();
const path = require('path');
const db = require('../models/index');
const User = db.sequelize.models.User;
const GroupPost = db.sequelize.models.GroupPost;
const Group = db.sequelize.models.Group;
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId
var url = 'mongodb://localhost:27017/studentcafe_dev';
var fs = require('fs-extra');
var multer = require('multer')
var upload = multer({ dest: 'uploads/' })

/* GET users listing. */
router.get('/', function (req, res, next) {
  return User.findAll({
    raw: true
  })
    .then(function (result) {
      res.send(result);
    })
});


router.post('/login', async (req, res, next) => {
  console.log("********inside*********************************2222", req.body.user_name)
  try {
    console.log("********inside*********************************88", req.body.user_name)
    
    let fetchUserWithProfile = await User.findOne({ where: { email: req.body.user_name,password:req.body.password } });
    console.log("*****ffffff**************", fetchUserWithProfile)
    if (fetchUserWithProfile !== null) {
      res.json({
        status: 'success',
        payload: fetchUserWithProfile,
        token: fetchUserWithProfile.id,
        message: 'User logged in successfully'
      });

    } else {
      res.json({
        status: 'failed',
        message: 'User does not exist'
      });
    }
  } catch (error) {

    console.log("******************ffffff************************************")
    res.json({
      status: 'failed',
      message: "Please provide user name and password"
    });
  }
});

/* Create a user */
router.post('/register', async (req, res, next) => {
  try {
    //console.log("********inside*********************************88", req.body.user_name)
    let fetchUserWithProfile = await User.findOne({ where: { email:req.body.user_name}});
  
    console.log("*******************", fetchUserWithProfile)
    if (fetchUserWithProfile !== null) {
      res.json({
        status: 'success',
        payload: fetchUserWithProfile,
        token:"no token",
        message: 'User logged in successfully'
      });

    } else {
      var bcrypt = require('bcrypt');
      var salt = bcrypt.genSaltSync(10);
      var hashedPassword = bcrypt.hashSync("password", salt);
      let newUser = await User.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        salt: salt,
        hashed_password: hashedPassword,
        email: req.body.user_name,
        phone: req.body.phone,
        college_name:req.body.college_name,
        password: req.body.password,
        yearofstudent: req.body.yearofstudent,
        location: req.body.location,
        city: req.body.city,
        state: req.body.state,
        country: req.body.country,
        zipcode: req.body.zipcode,
        user_type: req.body.user_type,
        user_image: req.body.user_image,
        status: 'ACTIVE',
      });
      if (newUser !== null) {
        res.json({
          status: 'success',
          payload: newUser,
          token: "no token",
          message: 'User created successfully'
        });
      } else {
        res.json({
          status: 'failed',
          message: error
        });
      }
    }
  } catch (error) {
    res.json({
      status: 'failed',
      message: error
    });
  }

});


/* Create a user */
router.post('/editProfile', async (req, res, next) => {
  console.log("***************************inside*******")
  try { 
    
    
    let fetchUserWithProfile = await User.findOne({ where: { id:req.body.user_id}});
    if (fetchUserWithProfile !== null) {    
      let user = await User.update({
         first_name:req.body.first_name,
         last_name: req.body.last_name,     
         college_name:req.body.college_name,
         yearofstudent:req.body.yearofstudent,
          status: 'ACTIVE',
       }, {
              where: {
                  id: req.body.user_id
              },
              returning: true
      });
    let fetchUpdateUserWithProfile = await User.findOne({ where: { id:req.body.user_id}});    
      res.json({
        status: 'success',
        payload: fetchUpdateUserWithProfile,
        message: 'User updated successfully'
        
     });

    } else {
      res.json({
        status: 'success',
        payload: fetchUserWithProfile,
        token:"no token",
        message: 'User logged in successfully'
      });
    }
  } catch (error) {
    res.json({
      status: 'failed',
      message: error
    });
  }

});




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
            var imageType = result.ops[0].contentType;          
            fs.remove(req.file.path, function (err) {
              if (err) { console.log(err) };
              //console.log("**************************************newoid", newoid)
              req.imageId = newoid
              req.cType = imageType
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

    console.log("***********************sadfasd*************user****",req.imageId)     

    if(req.body.fromScreen !== null && req.body.fromScreen ==="profileUpdate" ){
      let fetchUser = await User.findOne({
        where: {
            id: req.body.user_id
        }
     });
     if(fetchUser !== null){
      console.log("***********************sadfasd*************user****",req.imageId)     
        let user = await User.update({
          first_name:fetchUser.first_name,
          last_name: fetchUser.last_name,
          salt: fetchUser.salt,
          hashed_password:fetchUser.hashedPassword,
          email:fetchUser.email,
          phone: fetchUser.phone,
          college_name:fetchUser.college_name,
          password: fetchUser.password,
          yearofstudent:fetchUser.yearofstudent,
          location: fetchUser.location,
          city: fetchUser.city,
          state: fetchUser.state,
          country: fetchUser.country,
          zipcode: fetchUser.zipcode,
          user_type: fetchUser.user_type,
          user_image:req.imageId.toString(),
          status: 'ACTIVE',
         }, {
                where: {
                    id: req.body.user_id
                },
                returning: true
        });
      let fetchUserWithProfile = await User.findOne({ where: { id:req.body.user_id}});    
        res.json({
          status: 'success',
          payload: fetchUserWithProfile,
          message: 'User updated successfully'
          
       });

     }else{
      res.json({
        status: 'success',
        payload: fetchUser,
        message: 'User fetch successfully'
        
     });
    
    }   
         
   }else if(req.body.fromScreen !== null && req.body.fromScreen ==="groupImageUpdate" ){
      let newGroup = await Group.update({
        group_image:req.imageId.toString(),
        status: 'ACTIVE'}
       ,{
         where: {
            id: req.body.group_id
        },
        returning: true
     });
     let fetchAllGroup = await Group.findAll({})
      res.json({
      status: 'success',
      payload: fetchAllGroup,
      message: 'Group image updated successfully'
      
     });     
   }else{
     console.log("*****************ddddd*****************************")

        let fetchUser = await User.findOne({
          where: {
              id: req.body.user_id
          }
         });
           
        var filename = req.imageId;
         let { user_id, group_id } = req.body;    
         let newGroupPost = await GroupPost.create({
              user_id: req.body.user_id,
              group_id: req.body.group_id,
              post_text:req.body.user_name,
              user_name:req.body.user_name,
              user_image:fetchUser.user_image !== ''? fetchUser.user_image:'',
              attachment_id:filename.toString(),
              content_type:req.cType,
              status: 'ACTIVE',
            }); 
            let fetchAllGroupPost = await GroupPost.findAll({})
            res.json({
              status: 'success',
              payload: fetchAllGroupPost,
              message: 'Attachement created successfully'
              
           });
      }
  } catch (error) {
    res.json({
      status: 'failed',
      message: error
    });
  }
});







router.get('/picture/:picture', async (req, res) => {
  /* my filename is actually a mdb oid */
  try {
    var filename = req.params.picture;
    MongoClient.connect(url, function (err, db) {
      let database = db.db('studentcafe_dev');
      database.collection('Attachments').findOne({ '_id': ObjectId(filename) }, function (err, results) {
        console.log("*******sss************", results); //<-- Output below
        if(err){
          res.send(err)
        }else{
         res.setHeader('content-type', results.contentType);
         res.send(results.img.buffer)
        }
      });
    });
  } catch (error) {
    res.json({
      status: 'failed',
      message: error
    });
  }
});


module.exports = router;
