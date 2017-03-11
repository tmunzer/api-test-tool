angular.module('att').config(function ($routeProvider) {
    $routeProvider
        .when("/check", {
            templateUrl: "/web-app/check/view.html",
            module: "Check",
            controller: "CheckCtrl"
        })
        .when("/webhook", {
            templateUrl: "/web-app/webhook/view.html",
            module: "Webhook",
            controller: "WebhookCtrl"
        })
        .otherwise({
            redirectTo: "/check/"
        });
});