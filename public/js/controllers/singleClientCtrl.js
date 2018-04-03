support.controller("singleClientCtrl",function($scope,$http,$filter,$window,$location,$routeParams){
	$scope.newl = {};
	function get_all_license(){
		$http({
			method: "GET",
			url   : "license/all",
			params: {"id":$routeParams.id}
		}).then(function(response){
			console.log(response);
			$scope.licenses = response.data.map((license) => {
				license.licence_procurement_date = new Date(license.licence_procurement_date).toLocaleDateString();
				license.support_renewal_date = new Date(license.support_renewal_date).toLocaleDateString();
				return license;
			});

		},function(err){});
	}
	get_all_license();
	$scope.get_services = function(){
		$scope.today = $filter('date')(Date.now(), 'yyyy-MM-dd');
		$scope.newl.lpd=$scope.today;
		$http({
			method: "GET",
			url   : "service/all",
		}).then(function(response){
			console.log(response);
			$scope.services = response.data;
		},function(err){});
	}
	$scope.add_license = function(){
		console.log($scope.newl);
		$scope.newl.client_id = $routeParams.id;
		$http({
			method: "POST",
			url   : "license/add",
			data   : {"license":$scope.newl}
		}).then(function(response){
			get_all_license();
			$scope.newl = {};
		},function(err){});
	}
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

	$scope.client_update=function(){
		$http({
			method : "POST",
			url    : "/client/update",
			data   : $scope.client_info
		}).then(function(response){
			console.log(response);
		});
	}

	$scope.license_edit=function(p){
		$scope.l_info=p;
		console.log($scope.l_info);
	
	//  let t=$scope.l_info.licence_procurement_date;
	// let t_end=$scope.l_info.support_renewal_date;
	// $scope.l_info.licence_procurement_date=new Date($scope.l_info.licence_procurement_date);
	// $scope.l_info.support_renewal_date=new Date(t_end);
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
});