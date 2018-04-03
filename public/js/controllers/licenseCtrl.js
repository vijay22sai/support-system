support.controller("licenseCtrl",function($scope,$http,$window,$location,$routeParams){
	$scope.get_all_licenses = function(){
		$http({
			method: "GET",
			url   : "license/all_licenses",
		}).then(function(response){
			console.log(response);
			$scope.licenses = response.data.map((license) => {
				license.licence_procurement_date = new Date(license.licence_procurement_date).toLocaleDateString();
				license.support_renewal_date = new Date(license.support_renewal_date).toLocaleDateString();
				return license;
			});
			$scope.licenses = $scope.licenses.reverse();
		},function(err){});
	}
});