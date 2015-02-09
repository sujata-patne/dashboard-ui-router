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
    $scope.chartData = OrganizationsService.chartData;

    OrganizationsService.getOrganization($stateParams.id, function (organization) {
      $scope.organization = organization;
    });

    $scope.getObjectDataStr = function(objects){
      return OrganizationsService.getObjectDataStr(objects);
    }
  }]);
