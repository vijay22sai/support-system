support.controller("insightCtrl",function($scope,$rootScope){
    $scope.products=['a','b','c','d','e'];
    $scope.countOfLicenses=['50','30','10','20','50'];
    var data = [{
        values: $scope.countOfLicenses,
        labels: $scope.products,
        type: 'pie'
       }];
    Plotly.newPlot('myDiv', data);
    var databar = [{
    x: $scope.products,
    y: $scope.countOfLicenses,
    type: 'bar',
    width: [0.5, 0.5, 0.5,0.5,0.5]
   }];
       Plotly.newPlot('bar', databar);
});