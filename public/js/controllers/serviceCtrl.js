support.controller("serviceCtrl",function($scope,$http,$window,$location,$routeParams){
		$scope.get_all_services = function(){
			$http({
				method : "GET",
				url    : "/service/all"
			}).then(function(response){
				$scope.services = response.data;
			},function(err){});
		}

		$scope.add_service = function(){
			$http({
				method : "POST",
				url    : "/service/add",
				data   : {"service":$scope.service}
			}).then(function(response){
				$scope.get_all_services();
			},function(err){});
		}

});