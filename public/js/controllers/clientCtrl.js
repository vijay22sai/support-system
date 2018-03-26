support.controller("clientCtrl",function($scope,$http,$window,$location,$routeParams){
	$scope.client = {};
	$scope.add_client = function(){
		$http({
			method:"POST",
			url   :"client/add",
			data  :{client:$scope.client}
		}).then(function(response){
			$scope.message="Client added successfully"
		},function(err){
			$scope.message="Something went wrong";
		});
	}
	$scope.get_all_clients = function(){
		$http({
			method:"GET",
			url   :"client/clients"
		}).then(function(response){
			$scope.clients = response.data;
			console.log($scope.clients);
		},function(err){
			$scope.message="Something went wrong";
		});
	}
});