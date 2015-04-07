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

    $scope.chartData = OrganizationsService.chartData;
    //$scope.organizationsList = OrganizationsService.getOrganizationsList();
    OrganizationsService.getOrganizationsList(function (organizations) {
      $scope.organizationsList = organizations;
    });


    $scope.getObjectDataStr = function(objects){
      return OrganizationsService.getObjectDataStr(objects);
    }

  }]);
