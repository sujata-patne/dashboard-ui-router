'use strict';

/**
 * @ngdoc function
 * @name dashboardApp.controller:OrganizationslistCtrl
 * @description
 * # OrganizationslistCtrl
 * Controller of the dashboardApp
 */
angular.module('dashboardApp')
  .controller('OrganizationslistCtrl',['$scope', '$stateParams','OrganizationsService', function ($scope, $stateParams, OrganizationsService) {

    //$scope.chartData = OrganizationsService.chartData;
    OrganizationsService.getOrganizationsList(function (organizations) {
      $scope.organizationsList = organizations;

        $scope.chartData = {
            "labels":["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
            "series":['Series A', 'Series B','Series C', 'Series D'],
            "data":[
                [65, 59, 25, 81, 56, 55,45, 59, 45, 31, 65, 48],
                [28, 48, 35, 19, 35, 27,65, 59, 25, 81, 56, 55],
                [45, 59, 45, 31, 65, 48,65, 59, 25, 81, 56, 55],
                [58, 48, 55, 92, 25, 35,28, 48, 35, 19, 35, 27]
            ]
        }

    });

    $scope.getObjectDataStr = function(objects){
      return OrganizationsService.getObjectDataStr(objects);
    }

  }]);
