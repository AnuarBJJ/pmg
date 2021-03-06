var mongoose = require('mongoose');

var Timetable = mongoose.model('timetable');

var Cook = mongoose.model('cook');

var Meal = mongoose.model('meal');

module.exports = (function(){
	return {
		getAll: function(req, res){

			Meal.find({}, function(err, result){
			   if(err) {
		         console.log(err);
		       } else {
		         res.json(result);
		       }
			});
		},
		create: function(req, res){
			Cook.findOne({name: req.body.cook}, function(err, cook){
				var timetable = new Timetable({cook: cook._id, beg: req.body.beg, end: req.body.end, menu: req.body.menu});
				
				cook.shifts.push(timetable);

				// var menu = Object.keys(req.body.menu)

				// menu.forEach(function(item){
				// 	Meal.findOne({_id: item}, function(err, meal){
				// 		timetable.menu.push(meal)
				// 	})
				// })

				timetable.save(function(err){
					cook.save(function(err){
						if(err){
							console.log(err)
						} else {
							res.json("successfully saved a shift")
						}
					})
				})
			})
		},
		delete: function(req, res){

			var id = req.params.id;
			Man.remove({_id: id}, function(err){
				if(err){
					console.log('saving failed');
				} else{
					res.json('success');
				}
			});
		},
		cookMenu: function(req, res){
			Cook.find({name: req.params.cook}, function(err, cook){
				if(err){
					console.log(err)
				} else{
					Meal.find({cook: cook[0]._id}, function(err, cookMenu){
						if(err){
							console.log(err)
						} else{
							res.json(cookMenu);
						}
					})
				}
			})
		}
	}
	
})();