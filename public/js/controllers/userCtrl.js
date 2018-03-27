support.controller("userCtrl",function($scope,$http,$window,$location,$routeParams){
	$scope.user = {};
	$scope.add_user = function(){
		$http({
			method : "POST",
			url    : "/user/add",
			data   : {"user" : $scope.user}
		}).then(function(response){
			console.log(response);
			$scope.get_all_users();
		},function(err){
			console.log("Error");
		});
	}
	$scope.get_all_users = function(){
		$http({
			method : "GET",
			url    : "/user/all"
		}).then(function(response){
			$scope.users = response.data;
		},function(err){})
	}
});