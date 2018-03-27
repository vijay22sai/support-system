support.controller("singleClientCtrl",function($scope,$http,$window,$location,$routeParams){
	$scope.newl = {};
	function get_client_info(){
		console.log("in client info");

		$http({
			method : "GET",
			url    : "client/single_client",
			params :{"id":$routeParams.id}
		}).then(function(response){
			$scope.client_info=response.data;
			console.log($scope.client_info);
		});
	}
	get_client_info();
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
		console.log($scope.newl.lpd);
		$http({
			method: "POST",
			url   : "license/add",
			data   : {"license":$scope.newl}
		}).then(function(response){
			get_all_license();
		},function(err){});
	}
<<<<<<< HEAD
	$scope.is_duplicate_service = function(){
		let service = $scope.newl.product;
		$scope.duplicate_message = "";
		let services = $scope.licenses;
		console.log(services);
		for(let i=0;i<services.length;i++){
			if(services[i].product===service){
				$scope.duplicate_message = "Client is currently using "+service+"..."
				$scope.newl.product="";
				break;
			}
		}

	}
=======
	$scope.l_info={};
	$scope.license_edit=function(p){
		$scope.l_info=p;
		console.log($scope.l_info);
	
	let t=$scope.l_info.licence_procurement_date;
	let t_end=$scope.l_info.support_renewal_date;
	$scope.l_info.licence_procurement_date=new Date(t);
	$scope.l_info.support_renewal_date=new Date(t_end);
	}


	$scope.delete_license=function(){
		$http({
			method  :  "POST",
			url     : 'license/delete_license',
			data    : $scope.l_info
		}).then(function(response){
			console.log(response);
		});
	}


	$scope.license_update=function(){
		console.log($scope.l_info);
		$http({
			method  :"POST",
			url     :'license/update_license',
			data    :$scope.l_info
		}).then(function(response){
			console.log(response);
	});
}
	
>>>>>>> 7edfd470abdffb9e5008e4dd115adecb57c2821d
});