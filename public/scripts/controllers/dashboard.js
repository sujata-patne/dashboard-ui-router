'use strict';

/**
 * @ngdoc function
 * @name dashboardApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the dashboardApp
 */
angular.module('dashboardApp')
  .controller('DashboardCtrl', ['$scope', function ($scope) {

    $scope.labels = ["8.00 AM", "12.00 PM", "4.00 PM", "8.00 PM", "12.00 AM", "4.00 AM"];
    $scope.series = ['Series A', 'Series B','Series C', 'Series D'];
    $scope.data = [
      [65, 59, 84, 81, 56, 55],
      [28, 48, 40, 19, 35, 27],
      [45, 59, 46, 31, 65, 48],
      [58, 48, 75, 92, 25, 35]
    ];

    $scope.colours =[
      { // yellow
        fillColor: "rgba(253,180,92,0.2)",
        strokeColor: "rgba(253,180,92,1)",
        pointColor: "rgba(253,180,92,1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(253,180,92,0.8)"
      },
      { // blue
        fillColor: "rgba(151,187,205,0.2)",
        strokeColor: "rgba(151,187,205,1)",
        pointColor: "rgba(151,187,205,1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(151,187,205,0.8)"
      },
      { // red
        fillColor: "rgba(247,70,74,0.2)",
        strokeColor: "rgba(247,70,74,1)",
        pointColor: "rgba(247,70,74,1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(247,70,74,0.8)"
      },
      { // green
        fillColor: "rgba(70,191,189,0.2)",
        strokeColor: "rgba(70,191,189,1)",
        pointColor: "rgba(70,191,189,1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(70,191,189,0.8)"
      },

      { // grey
        fillColor: "rgba(148,159,177,0.2)",
        strokeColor: "rgba(148,159,177,1)",
        pointColor: "rgba(148,159,177,1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(148,159,177,0.8)"
      },
      { // dark grey
        fillColor: "rgba(77,83,96,0.2)",
        strokeColor: "rgba(77,83,96,1)",
        pointColor: "rgba(77,83,96,1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(77,83,96,1)"
      }
    ];
    $scope.labels1 = ["8.00 AM", "12.00 PM", "4.00 PM", "8.00 PM", "12.00 AM", "4.00 AM"];
    $scope.series1 = ['Series A', 'Series B','Series C', 'Series D'];
    $scope.data1 = [58, 48, 75, 92, 25, 35 ];
    $scope.onClick = function (points, evt) {
      console.log(points, evt);
    };

  }]);
