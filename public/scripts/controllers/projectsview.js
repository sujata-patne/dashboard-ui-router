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
     $scope.chartData = [];
     $scope.labels = ['Billable', 'Bench'];
      ProjectsService.getProject($stateParams.id, function (project) {
        $scope.project = project;
          $scope.chartData = [project.billable_headcount, parseInt(project.total_num_people - project.bench_strength)];
      });

      $scope.getObjectDataStr = function(objects){
        return ProjectsService.getObjectDataStr(objects);
      }
  }]);
