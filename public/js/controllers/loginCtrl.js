support.controller("loginCtrl",function($scope,$http,$window,$rootScope,$location){
	$rootScope.enableAction=false;
		$scope.login=function(){
			if(!$scope.user_id) $scope.user_id = "dummy";
			if(!$scope.user_id) $scope.password= "dummy";
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
					$rootScope.enableAction=true;
				}
				else{
					$scope.message = response.data;
				}
			});
		}
});