myApp.factory('menuFactory', function($http){
	var factory={};
	var cookMenu =[];

	factory.getMenu = function(cook, callback){
		$http.get('/menu/'+ cook).success(function(response){
			cookMenu = response;
			callback(cookMenu);
		})
	}

	factory.createMeal = function(meal, callback){
		$http.post('/newMeal', meal).success(function(response){
			cookMenu.push(response);
			callback(response);
		})
	}

	return factory;
})