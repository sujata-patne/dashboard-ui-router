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
      //$scope.chartData = ProjectsService.chartData;
      $scope.chartData = [];
      $scope.labels = ['Billable', 'Bench'];
      ProjectsService.getProjectList(function (projects) {
        $scope.projectList = projects;
          projects.forEach(function(project){
              $scope.chartData.push([project.billable_headcount, parseInt(project.total_num_people - project.bench_strength)]);
          })
      });

      $scope.getObjectDataStr = function(objects){
        return ProjectsService.getObjectDataStr(objects);
      }
  }]);
