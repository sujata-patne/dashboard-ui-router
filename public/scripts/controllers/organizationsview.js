'use strict';

/**
 * @ngdoc function
 * @name dashboardApp.controller:OrganizationsviewCtrl
 * @description
 * # OrganizationsviewCtrl
 * Controller of the dashboardApp
 */
angular.module('dashboardApp')
  .controller('OrganizationsviewCtrl', ['$scope', '$stateParams','OrganizationsService', function ($scope, $stateParams, OrganizationsService) {
    //$scope.chartData = OrganizationsService.chartData;
    $scope.months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    $scope.chartData = {
        "labels": $scope.months,
        "series": ['Billable', 'Bench'],
        "data":[]
    }

    OrganizationsService.getOrganization($stateParams.id, function (organization) {
      $scope.organization = organization;
        $scope.chartData.data = [];
        OrganizationsService.getOrganizationsHistory(organization._id, function (data) {
            $scope.bench = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            $scope.billable = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            data.forEach(function(organization) {
                var date = new Date(organization.version_date);
                $scope.months.forEach(function (i, m) {
                    if (date.getMonth() == m) {
                        $scope.billable[m] = organization.billable_headcount;
                        $scope.bench[m] = parseInt(organization.total_num_people - organization.billable_headcount);
                    }
                })
            });
            $scope.chartData.data = [$scope.billable,$scope.bench];
            console.log($scope.chartData.data)
        });
    });

    $scope.getObjectDataStr = function(objects){
      return OrganizationsService.getObjectDataStr(objects);
    }
  }]);
