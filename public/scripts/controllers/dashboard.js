'use strict';

/**
 * @ngdoc function
 * @name dashboardApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the dashboardApp
 */
angular.module('dashboardApp')
  .controller('DashboardCtrl', ['$scope', '$stateParams','ProjectsService', 'OrganizationsService', function ($scope, $stateParams, ProjectsService,OrganizationsService) {
            //$scope.chartData = ProjectsService.chartData;
        $scope.p_chartData = [];
        $scope.p_chartLabels = [];
        ProjectsService.getProjectList(function (projects) {
            $scope.p_total = 0;
            projects.forEach(function(project){
                $scope.p_chartLabels.push(project.name);
                /*$scope.p_total = parseInt(project.total_num_people + $scope.p_total);
                var billable = parseInt((project.billable_headcount/$scope.p_total) * 360);*/
                $scope.p_chartData.push(project.billable_headcount);
            })
        });


        $scope.o_chartData = {
            "labels": [],
            "series": ['Billable', 'Bench'],
            "data":[]
        }
        //$scope.o_chartLabels =[];
        //$scope.o_chartseries = ['Billable', 'Bench'];
        OrganizationsService.getOrganizationsList(function (organizations) {
            var curDate = new Date();
            $scope.bench = [];
            $scope.billable = [];
            organizations.forEach(function(org){
                $scope.o_chartData.labels.push(org.name);
                $scope.bench.push(parseInt(org.total_num_people - org.billable_headcount));
                $scope.billable.push(org.billable_headcount);
                OrganizationsService.getOrganizationsHistory(org._id, function (data) {
                    data.forEach(function(organization) {
                        var date = new Date(organization.version_date);
                        if (date.getYear() == curDate.getYear() && date.getMonth() == curDate.getMonth()) {
                            var index = $scope.o_chartData.labels.indexOf(organization.name);
                            if($scope.o_chartData.labels.length > 0) {
                                if (index) {
                                    $scope.bench.splice(index, 1, parseInt(organization.total_num_people - organization.billable_headcount));
                                    $scope.billable.splice(index, 1, organization.billable_headcount);
                                } else {
                                     $scope.bench[index] = parseInt(organization.total_num_people - organization.billable_headcount);
                                     $scope.billable[index] = organization.billable_headcount;
                                }
                            }
                        }
                    });
                });
            });
            $scope.o_chartData.data.push($scope.billable,$scope.bench);
        });


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
