support.controller("clientCtrl",function($scope,$http,$window,$location,$routeParams){
	$scope.client = {};
	$scope.add_client = function(){
		let client = new FormData;
		for(key in $scope.client){
			client.append(key,$scope.client[key]);
		}
		let file = $('#file')[0].files[0];
		client.append('image',file);
		$http.post('/client/add', client,{
			transformRequest : angular.identity,
			headers:{
				'Content-Type' : undefined
			}

		}).then(function(response){
			console.log(response);
			$scope.message="Client added successfully...Redirecting to Client's page";
			setTimeout(()=>{ $window.location.href = '/#!/client?id='+response.data._id;},1000);
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