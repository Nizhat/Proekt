var app = angular.module("app", ['ngRoute']);
 app.config(function($routeProvider){

        $routeProvider.when("/menu1", {
                templateUrl:'templates/addPrepod.html',
            controller:'menuOneController'
                
            })

     $routeProvider.when("/menu2", {
                templateUrl:'templates/addStudent.html',
         controller:'menuTwoController'
            
            })

     $routeProvider.otherwise({redirectTo: '/'});
    })