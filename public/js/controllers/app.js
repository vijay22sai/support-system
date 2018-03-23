const support=angular.module("support",['ngRoute']);
support.controller("supportCtrl", function($scope){
	alert("in support Ctrl");
	console.log("in support");
});