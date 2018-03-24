angular.module('appRoutes',[])
.config(['$routeProvider','$locationProvider',function($routeProvider,$locationProvider){
	$routeProvider.when('/',{
		templateUrl :'../views/login.html'
	})
	.when('/reset_password',{
		templateUrl : '../views/forgot_pwd.html',
		controller  : "resetCtrl"
	})
	.when('/dashboard',{
		templateUrl :'../views/table.html'
	});
	$locationProvider.html5Mode(false);
}]);

	
