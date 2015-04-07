'use strict';

/**
 * @ngdoc function
 * @name dashboardApp.controller:ProjectsviewCtrl
 * @description
 * # ProjectsviewCtrl
 * Controller of the dashboardApp
 */
angular.module('dashboardApp')
  .controller('ProjectsviewCtrl', ['$scope', '$stateParams','ProjectsService', function ($scope, $stateParams, ProjectsService) {
      $scope.chartData = ProjectsService.chartData;
      ProjectsService.getProject($stateParams.id, function (project) {
        $scope.project = project;
      });

      $scope.getObjectDataStr = function(objects){
        return ProjectsService.getObjectDataStr(objects);
      }
  }]);
