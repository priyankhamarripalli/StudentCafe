var express = require('express');
var router = express.Router();
const path = require('path');
const db = require('../models');
const Group = db.sequelize.models.Group;
const User = db.sequelize.models.User;
const GroupMembers = db.sequelize.models.GroupMembers;
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId
var url = 'mongodb://localhost:27017/studentcafe_dev';
var fs = require('fs-extra');
var multer = require('multer')
var upload = multer({ dest: 'uploads/' })

/* GET groups listing. */
router.get('/', async (req, res, next) => {
  let fetchAllGroup = await Group.findAll({})
  if (fetchAllGroup !== null) {
  res.json({
    status: 'success',
    payload: fetchAllGroup,
    token: "no token",
    message: 'Group created successfully'
  });
}else{
  res.json({
    status: 'success',
    message: "NO Group Available"
  });
}
});

/* Create a group */
router.post('/', async (req, res, next) => {
  try {
    let fetchGroup = await Group.findOne({ where: { group_code: req.body.group_code } });
    if (fetchGroup !== null) {
      res.json({
        status: 'success',
        payload: null,
        token: "no token",
        message: 'Group Code already exist'
      });

    } else {
      let newGroup = await Group.create({
        group_code: req.body.group_code,
        group_name: req.body.group_name,
        group_image:'',
        status: 'ACTIVE',
      });
      if (newGroup !== null) {
        let groupMember = await GroupMembers.create({
          user_id: req.body.user_id,
          group_id: newGroup.id,
          user_role:"C",
          status: 'ACTIVE',
        });
        let fetchAllGroup = await Group.findAll({})
        res.json({
          status: 'success',
          payload: fetchAllGroup,
          token: "no token",
          message: 'Group created successfully'
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


/* Join a existing group */
router.post('/joingroup', async (req, res, next) => {
  try {
    let fetchGroup = await Group.findOne({ where: { group_code: req.body.group_code } });
       if (fetchGroup !== null) { 
       let fetchGroupMember = await GroupMembers.findOne({ include: [{ model: Group, as: 'group', where: { group_code: req.body.group_code } },{ model: User, as: 'user', where: { id: req.body.user_id } }]})
      if(fetchGroupMember === null){
        let groupMember = await GroupMembers.create({
          user_id: req.body.user_id,
          group_id: fetchGroup.id,
          user_role:"M",
          status: 'ACTIVE',
        });
       }
        let fetchAllGroup = await Group.findAll({})
        res.json({
          status: 'success',
          payload: fetchAllGroup,
          token: "no token",
          message: 'Group created successfully'
        });
      } else {
        res.json({
          status: 'failed',
          message: error
        });
      }
    
  } catch (error) {
    res.json({
      status: 'failed',
      message: error
    });
  }

});

/* Fetch  group Member. */
router.get('/:groupCode', async (req, res, next) =>{
  let { groupCode } = req.params;
  let fetchGroupMember = await GroupMembers.findAll({ include: [{ model: Group, as: 'group', where: { group_code: groupCode } },{
    model: User,
    as: 'user'
  }]})
  res.json({
    status: 'success',
    payload: fetchGroupMember,
     message: 'Fetch Group Member successfully'
  });
});

/* Fetch group based login user  */
router.get('/usergroup/:userId', async (req, res, next) =>{
  let { userId } = req.params;
  let fetchGroupMember = await GroupMembers.findAll({ include: [{ model: User, as: 'user', where: { id: parseInt(userId) } },{
    model: Group,
    as: 'group'
  }]})
  res.json({
    status: 'success',
    payload: fetchGroupMember,
     message: 'Fetch Group Member successfully'
  });
});


module.exports = router;
