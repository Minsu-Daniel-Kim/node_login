var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../lib/user');
var UserDB = require('../models/User');

/* GET home page. */
router.get('/', function(req, res) {


/*	var user = new User({
		_id: mongoose.Types.ObjectId('54ba15c0486831f001276264'),
		name: 'minsu',
		pass: '123123666144444423123',
		age : 24
	});
	user.save(function(result){

		console.log('result is ' + result);

	});*/
	var user = new User();
	User.authenticate('minsu', 123123, function(err, user){

		console.log('authenticated user : ' + user);

	});

	res.render('index', { title: 'Express' });
});

router.get('/register', function(req, res){

	console.log('/register');

	res.render('register', {title : 'Register'});

});

router.post('/register', function (req, res, next) {
	console.log('/register post');	

	var user = req.body;
	console.log('user : ' + user);
	console.log('username : ' + user.username);
	console.log('pass : ' + user.password);

	User.getByName(user.username, function(err, doc){

		if(err) return next(err);

		if(doc){
			res.error("username already taken!");
			res.redirect('back');
		}else{
			user = new User({
				name: user.username,
				pass: user.password
			});

			user.save(function(err){

				if(err) return next(err);
				req.session.uid = user._id;
				res.redirect('/');

			});
		}

	});
});

module.exports = router;
