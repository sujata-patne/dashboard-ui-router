'use strict';

/**
 * @ngdoc function
 * @name dashboardApp.controller:ProjectsCtrl
 * @description
 * # ProjectsCtrl
 * Controller of the dashboardApp
 */
angular.module('dashboardApp')
  .controller('ProjectsCtrl', function ($scope) {
    $scope.chartTitle = [
      [{"1":"PDX"},{"2":"CMS"},{"3":"Loven"}],
      [{"4":"LRS"},{"5":"Google"},{"6":"Tryrell"}]
    ];

    $scope.openPositions = [
      [1,2,3],
      [4,5,6]
    ];

    $scope.subTitle1 = 'Red Days';
    $scope.subTitle2 = 'Billable People';
    $scope.people = 'People';

    $scope.peopleList = [
      ['Anil','Preshit','Sumeet, Anuja, Vijay'],
      ['CMS, Studer','Salil, Atul, Uttam','Salil, Atul, Uttam']
    ];
    $scope.redDaysList = [
      [0,0,0],
      [1,0,0]
    ];

    $scope.notesList = [
      ['Owned by Anil','Owned by Preshit','Owned by Mukund'],
      ['Owned by Ashutosh','Owned by Salil','Owned by Salil']
    ];

    $scope.labels = ['Series A', 'Series B','Series C', 'Series D','Series E'];
    $scope.data = [58, 48, 92, 25, 35];

  });
