support.controller("resetTokenCtrl",function($scope,$http,$window,$location,$routeParams){
    $scope.isValid = false;
	function init(){
		$http({
			method : "GET",
			url    : "user/validate_token",
			params : {"token":$routeParams.id}
		}).then(function(response){
			console.log(response);
			if(response.data.status) $scope.isValid = true;
			else $scope.isValid = false;
		},function(err){}); 
	}
	init();
	$scope.change = function() {
		let id    = $routeParams.id;
		if(!id){
			return;
		}
		$http({
			method : "POST",
			url    : "user/reset",
			data   : {"token":id,"password":$scope.password}
		}).then(function(response){
			$scope.message = "Successfully Changed..You will be redirected to login page!";
			setTimeout(()=>{ $window.location.href = '/';},2000);
		},function(err){}); 
	}
});