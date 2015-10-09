module XULAngular {
  export class Config {
    public static $inject = [
			'$routeProvider',
			'$locationProvider'
		];

    constructor(
			private $routeProvider: ng.route.IRouteProvider,
			private $locationProvider: ng.ILocationProvider
    ) {
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
