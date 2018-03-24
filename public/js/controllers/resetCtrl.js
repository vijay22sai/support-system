support.controller("resetCtrl",function($scope,$http,$window,$location,$routeParams){
	$scope.reset = function(){
		$http({
			method : "POST",
			url    : "user/reset_password_setup",
			data   : {"user_id":$scope.user_id}
		}).then(function(response){
			$scope.message = "Check your mail for password reset link";
			console.log("ok");
		},function(err){
			$scope.message = "No User exists with this user_id";
		});
	}
});