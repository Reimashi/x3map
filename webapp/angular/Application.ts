/* JS type wrappers */
///<reference path="../../typings/tsd.d.ts"/>

module XULAngular {
    'use strict';

    var Modules = [
        'ngRoute',
        'ngAnimate'
    ];

    var Instance = angular.module('xut-app', Modules);

    Instance.config(($routeProvider: ng.route.IRouteProvider, $locationProvider: ng.ILocationProvider) => new Config($routeProvider, $locationProvider));

    Instance.controller('MainController', ['$scope', ($scope: ng.IScope) => new MainController($scope)]);
    /*Instance.controller('MapController', MapController);*/
}
