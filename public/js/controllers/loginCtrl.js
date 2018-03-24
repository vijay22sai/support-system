support.controller("loginCtrl",function($scope,$http,$window,$location){
		$scope.login=function(){
			$scope.user={
				"user_id"   :  $scope.user_id,
				"password"  :  $scope.password
			};
			//console.log($scope.user);
			$http({
				"method"    :  "POST",
				"url"       :'/user/authenticate',
				"data"      : $scope.user
			}).then(function(response){
				if(response.data==="OK"){
					$window.location.href="http://localhost:3000/#!dashboard";
				}
				else{
					$scope.message = response.data;
				}
			});
		}
});