support.controller("clientCtrl",function($scope,$http,$window,$location,$routeParams,$filter){
	$scope.client = {};
	
	console.log($scope.test);
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
			setTimeout(()=>{ $window.location.href = '/#!/client?id='+response.data._id;},200);
		},function(err){
			$scope.message="Something went wrong";
		});
	}
	$scope.get_all_clients = function(){
		$http({
			method:"GET",
			url   :"client/clients"
		}).then(function(response){
			$scope.all_clients = response.data;
			$scope.clients=$scope.all_clients;
			console.log($scope.clients);
		},function(err){
			$scope.message="Something went wrong";
		});
	}

	$scope.filter_status = function(){
		alert("in filter");
		clients2=$filter('client_status')($scope.all_clients,$scope.selected_item);
		console.log(clients2);
		$scope.clients=clients2;
		//$scope.clients=$filter('client_status')($scope.all_clients);
	}
});

support.filter('client_status', function(){
return function(clients,status){

	console.log("selected...."+status);
	
   
    return clients;
};
});