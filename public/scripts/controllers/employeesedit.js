'use strict';

/**
 * @ngdoc function
 * @name dashboardApp.controller:EmployeeseditCtrl
 * @description
 * # EmployeeseditCtrl
 * Controller of the dashboardApp
 */
angular.module('dashboardApp')
    .controller('EmployeeseditCtrl',['$scope', '$state', '$stateParams','EmployeesService', function ($scope, $state, $stateParams, EmployeesService) {
        $scope.roles = [
            'Junior Software Developer',
            'Software Developer',
            'Senior Software Developer',
            'Junior QA Engineer',
            'QA Engineer',
            'Senior QA Engineer',
            'Tech Lead',
            'QA Lead',
            'Engineering Manager',
            'QA Manager',
            'Architect',
            'BU Head'
        ];
        if($stateParams.id !== undefined){
            EmployeesService.getEmployee($stateParams.id, function (employee) {
                $scope.employee = employee;

                //get last projectID
                $scope.projectIndex = $scope.employee.works_for.length+1;
                //get last ownerID
                $scope.organizationIndex = $scope.employee.organization.length+1;

            });
        }else{
            $scope.employee = {
                firstName: '',
                lastName:'',
                year_exp:'',
                role:'',
                skills:'',
                belong_to: '',
                works_for: []
            };
        }
        /*Add New Project Field*/
        $scope.newProject = { name: [], id:[] };
        $scope.addProject = function() {
            $scope.newProject.name.push('');
            $scope.newProject.id.push('');
        }

        $scope.deleteProjectField = function(index) {
            $scope.newProject.name.splice(index, 1);
            $scope.newProject.id.splice(index, 1);
        }

        $scope.deleteProject = function(id) {
            angular.forEach($scope.employee.works_for, function(item,key){
                if(item._id == id){
                    $scope.employee.works_for.splice(key,1);
                }
            })
        }

        $scope.updateProject=function(){
            var index = 0;
            angular.forEach($scope.newProject.name, function(item){
                var newProjectId = $scope.newProject.id[index];
                $scope.employee.works_for.push(newProjectId);
                index++;
            })
        };

        $scope.autoCompleteProject = function(cssClass, index){
            $( "."+cssClass ).autocomplete({
                source: function (searchTerm,response){
                    EmployeesService.searchProject(searchTerm.term).success(function (autocompleteResults) {
                        response($.map(autocompleteResults, function (autocompleteResult) {
                            return {
                                label: autocompleteResult.name,
                                value: autocompleteResult
                            }
                        }))
                    })
                },
                select: function ( event, selectedItem) {

                    $scope.newProject.name[index] = selectedItem.item.value.name;
                    $scope.newProject.id[index] = selectedItem.item.value._id;
                    $scope.$apply();
                    event.preventDefault();
                }
            });
        }

///organization

        $scope.autoCompleteOrganization = function(cssClass, index){
            $( "."+cssClass ).autocomplete({
                source: function (searchTerm,response){
                    EmployeesService.searchOrganizations(searchTerm.term).success(function (autocompleteResults) {
                        response($.map(autocompleteResults, function (autocompleteResult) {
                            return {
                                label: autocompleteResult.name,
                                value: autocompleteResult
                            }
                        }))
                    })
                },
                select: function ( event, selectedItem) {
                    $scope.employee.belong_to.name = selectedItem.item.value.name;
                    $scope.employee.belong_to._id = selectedItem.item.value._id;
                    $scope.$apply();
                    event.preventDefault();
                }
            });
        }

        //Add/Update project
        $scope.save = function(){
            $scope.updateProject();
console.log($scope.newProject)
            if($stateParams.id === undefined){
                EmployeesService.addEmployee($scope.employee, function(employee){
                    console.log(employee)
                    $scope.employee = employee;
                    $state.transitionTo('auth.employees.view',{"id" : $scope.employee._id});
                });
            }else{
                EmployeesService.updateEmployee($scope.employee, function(employee){
                    $scope.employee = employee;
                    $state.transitionTo('auth.employees.view',{"id" : $scope.employee._id});
                });
            }
        }
  }]);
