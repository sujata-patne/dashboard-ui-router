'use strict';

/**
 * @ngdoc overview
 * @name dashboardApp
 * @description
 * # dashboardApp
 *
 * Main module of the application.
 */
angular
  .module('dashboardApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap',
    'ui.router',
    'chart.js',
    'auth0',
    'angular-storage',
    'angular-jwt',
    'ngTagsInput'
  ])

.config(function($stateProvider, authProvider, jwtInterceptorProvider,$httpProvider){
    authProvider.init({
        domain: 'synerzip.auth0.com',
        clientID: 'EwZKq9438ewQUSQETZR3UZjjudJssS1o',
        callbackUrl: location.href,
        loginState: 'login'
    })
    jwtInterceptorProvider.tokenGetter = function(store) {
        return store.get('token');
    }

    $stateProvider
      .state("login",{
            templateUrl:"views/login.html",
            controller:"LoginCtrl",
            url:"/login"
       })
      .state("auth",{
            templateUrl:"views/authenticated.html",
            controller:"AuthCtrl",
            abstract: true,
            data: {
                requiresLogin: true
            }
        })
      .state("auth.dashboard",{
        templateUrl:"views/dashboard.html",
        controller:"DashboardCtrl",
        url:"/dashboard"

      })
      .state("auth.organizations",{
        templateUrl:"views/organizations.html",
        controller:"OrganizationsCtrl",
        url:"/organizations"
      })
      .state('auth.organizations.list',{
        templateUrl:'views/organizations.list.html',
        controller:'OrganizationslistCtrl',
        url:'/list'
      })
      .state('auth.organizations.view',{
        templateUrl:'views/organizations.view.html',
        controller:'OrganizationsviewCtrl',
        url:'/view/:id'
      })
      .state('auth.organizations.add',{
        templateUrl:'views/organizations.edit.html',
        controller:'OrganizationseditCtrl',
        url:'/add/'
      })
      .state('auth.organizations.edit',{
        templateUrl:'views/organizations.edit.html',
        controller:'OrganizationseditCtrl',
        url:'/edit/:id'
      })
      .state("auth.organizations.delete",{
        templateUrl:"views/organizations.delete.html",
        controller:"OrganizationsdeleteCtrl",
        url:"/delete/:id"
      })
      .state("auth.projects",{
        templateUrl:"views/projects.html",
        controller:"ProjectsCtrl",
        url:"/projects"
      })
      .state("auth.projects.list",{
        templateUrl:"views/projects.list.html",
        controller:"ProjectslistCtrl",
        url:"/list"
      })
      .state("auth.projects.edit",{
        templateUrl:"views/projects.edit.html",
        controller:"ProjectseditCtrl",
        url:"/edit/:id"
      })
      .state('auth.projects.add',{
          templateUrl:'views/projects.edit.html',
          controller:'ProjectseditCtrl',
          url:'/add/'
        })
      .state("auth.projects.view",{
        templateUrl:"views/projects.view.html",
        controller:"ProjectsviewCtrl",
        url:"/view/:id"
      })
      .state("auth.projects.delete",{
        templateUrl:"views/projects.delete.html",
        controller:"ProjectsdeleteCtrl",
        url:"/delete/:id"
      })
      .state("auth.employees",{
        templateUrl:"views/employees.html",
        controller:"EmployeesCtrl",
        url:"/employees"
      })
      .state("auth.employees.list",{
        templateUrl:"views/employees.list.html",
        controller:"EmployeeslistCtrl",
        url:"/list"
      })
      .state("auth.employees.view",{
        templateUrl:"views/employees.view.html",
        controller:"EmployeesviewCtrl",
        url:"/view/:id"
      })
      .state("auth.employees.add",{
        templateUrl:"views/employees.edit.html",
        controller:"EmployeeseditCtrl",
        url:"/add"
      })
        .state("auth.employees.edit",{
        templateUrl:"views/employees.edit.html",
        controller:"EmployeeseditCtrl",
        url:"/edit/:id"
      })
      .state("auth.employees.delete",{
        templateUrl:"views/employees.delete.html",
        controller:"EmployeesdeleteCtrl",
        url:"/delete/:id"
      })

    // Add a simple interceptor that will fetch all requests and add the jwt token to its authorization header.
    // NOTE: in case you are calling APIs which expect a token signed with a different secret, you might
    // want to check the delegation-token example
    $httpProvider.interceptors.push('jwtInterceptor');
    }).run(function($rootScope, auth, store, jwtHelper, $state) {
        $rootScope.$on('$locationChangeStart', function() {
            if (!auth.isAuthenticated) {
                var token = store.get('token');
                if (token) {
                    if (!jwtHelper.isTokenExpired(token)) {
                        auth.authenticate(store.get('profile'), token);
                    } else {
                        //$location.path('/login');
                        $state.go("login");
                    }
                }
            }
        });
  })

.run(function($state,auth){
    auth.hookEvents();
    $state.go("auth.dashboard");
  })
