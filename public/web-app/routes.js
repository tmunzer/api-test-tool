angular.module('att').config(function ($routeProvider) {
    $routeProvider
        .when("/att", {
            templateUrl: "/web-app/check/view.html",
            module: "Check",
            controller: "CheckCtrl"
        })
        .otherwise({
            redirectTo: "/att/"
        });
});