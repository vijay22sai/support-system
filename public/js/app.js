var support=angular.module("support",['ngRoute','appRoutes']);
support.controller("supportCtrl", function($scope, $rootScope){
		if(!document.cookie)
		$rootScope.enableAction=false;
	else
		$rootScope.enableAction=true;
});