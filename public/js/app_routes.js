angular.module('appRoutes',[])
.config(['$routeProvider','$locationProvider',function($routeProvider,$locationProvider){
	$routeProvider.when('/',{
		templateUrl :'../views/login.html'
	})
	.when('/reset_password',{
		templateUrl : '../views/forgot_pwd.html',
		controller  : "resetCtrl"
	})
	.when("/reset",{
		templateUrl : "../views/reset_pwd.html",
		controller  : "resetTokenCtrl"
	})
	.when("/new_client",{
		templateUrl : "../views/new_client.html",
		controller  : "clientCtrl"
	})
	.when("/client",{
		templateUrl : "../views/client_page.html",
		controller  : "singleClientCtrl"
	})
	.when("/services",{
		templateUrl : "../views/services.html",
		controller  : "serviceCtrl"
	})
	.when('/dashboard',{
		templateUrl :'../views/table.html',
		controller  : 'clientCtrl'
	});
	$locationProvider.html5Mode(false);
}]);

	
