module XULAngular {
    'use strict';

    export class Config {
        constructor($routeProvider: ng.route.IRouteProvider, $locationProvider: ng.ILocationProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: 'main.html',
                    controller: 'MainController'
                })
                .when('/map', {
                    templateUrl: 'map.html',
                    controller: 'MapController'
                });
        }
    }
}
