support.controller("singleClientCtrl",function($scope,$http,$window,$location,$routeParams){
	$scope.newl = {};
	function get_all_license(){
		$http({
			method: "GET",
			url   : "license/all",
			params: {"id":$routeParams.id}
		}).then(function(response){
			console.log(response);
			$scope.licenses = response.data;
		},function(err){});
	}
	get_all_license();
	$scope.get_services = function(){
		$http({
			method: "GET",
			url   : "service/all",
		}).then(function(response){
			console.log(response);
			$scope.services = response.data;
		},function(err){});
	}
	$scope.add_license = function(){
		$scope.newl.client_id = $routeParams.id;
		console.log($scope.newl);
		$http({
			method: "POST",
			url   : "license/add",
			data   : {"license":$scope.newl}
		}).then(function(response){
			get_all_license();
		},function(err){});
	}
});