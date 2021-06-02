'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		/*
		  Add altering commands here.
		  Return a promise to correctly handle asynchronicity.
	
		  Example:
		  return queryInterface.bulkInsert('People', [{
			name: 'John Doe',
			isBetaMember: false
		  }], {});
		*/
		var bcrypt = require('bcrypt');
		var salt = bcrypt.genSaltSync(10);
		var hashedPassword = bcrypt.hashSync("password", salt);
		return queryInterface.bulkInsert('Users', [{
			first_name: 'Raja',
			last_name: 'R',
			salt: salt,
			hashed_password: hashedPassword,
			email: 'rajar@gmail.com',
			phone: '9874563210',
			location: 'India',
			city: 'channai',
			state: 'Tamilnadu',
			country: 'India',
			password:"password",
			yearofstudent:"I",
			zipcode: '600042',
			college_name:"M.O.P Vaishnav College For Women",
			user_type: 'ADMIN',
			user_image:"",
			status: 'ACTIVE',
			createdAt: new Date(),
			updatedAt: new Date()
		},{
			first_name: 'Kishore',
			last_name: 'R',
			salt: salt,
			hashed_password: hashedPassword,
			email: 'kishore@gmail.com',
			phone: '9874563210',
			location: 'India',
			city: 'channai',
			state: 'Tamilnadu',
			country: 'India',
			password:"password",
			yearofstudent:"I",
			zipcode: '600042',
			college_name:"M.O.P Vaishnav College For Women",
			user_type: 'STU',
			user_image:"",
			status: 'ACTIVE',
			createdAt: new Date(),
			updatedAt: new Date()
		},{
			first_name: 'Bosco',
			last_name: 'R',
			salt: salt,
			hashed_password: hashedPassword,
			email: 'bosco@gmail.com',
			phone: '9874563210',
			location: 'India',
			city: 'channai',
			state: 'Tamilnadu',
			country: 'India',
			password:"password",
			yearofstudent:"II",
			zipcode: '600042',
			user_type: 'STU',
			college_name:"M.O.P Vaishnav College For Women",
			user_image:"",
			status: 'ACTIVE',
			createdAt: new Date(),
			updatedAt: new Date()
		},{
			first_name: 'Abi',
			last_name: 'R',
			salt: salt,
			hashed_password: hashedPassword,
			email: 'abi@gmail.com',
			phone: '9874563210',
			location: 'India',
			city: 'channai',
			state: 'Tamilnadu',
			country: 'India',
			password:"password",
			yearofstudent:"III",
			zipcode: '600042',
			user_type: 'STF',
			college_name:"M.O.P Vaishnav College For Women",
			user_image:"",
			status: 'ACTIVE',
			createdAt: new Date(),
			updatedAt: new Date()
		}], {});
	},

	down: (queryInterface, Sequelize) => {
		/*
		  Add reverting commands here.
		  Return a promise to correctly handle asynchronicity.
	
		  Example:
		  return queryInterface.bulkDelete('People', null, {});
		*/

		return queryInterface.bulkDelete('Users', null, {});
	}
};

