"use strict";

var modules = [
    'ngRoute',
    'ngAnimate'
];

var app = angular.module('xut-app', modules);

app.config(function($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'main.html',
            controller: 'HomeController'
        })
        .when('/map', {
            templateUrl: 'map.html',
            controller: 'MapController'
        }).
        otherwise({
            redirectTo: '/'
        });
});
