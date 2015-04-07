'use strict';

/**
 * @ngdoc function
 * @name dashboardApp.controller:ProjectslistCtrl
 * @description
 * # ProjectslistCtrl
 * Controller of the dashboardApp
 */
angular.module('dashboardApp')
  .controller('ProjectslistCtrl', ['$scope', '$stateParams','ProjectsService', function ($scope, $stateParams, ProjectsService) {

      $scope.chartData = ProjectsService.chartData;

      ProjectsService.getProjectList(function (projects) {
        $scope.projectList = projects;
      });

      $scope.getObjectDataStr = function(objects){
        return ProjectsService.getObjectDataStr(objects);
      }
  }]);
