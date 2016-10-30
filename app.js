/**
 * Created by andrew on 30/10/16.
 */
var app = angular.module('scoreLynx', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider){

   $urlRouterProvider.otherwise('/scores');

   $stateProvider.state('scores', {
           url: '/scores',
           templateUrl: "app/templates/scores.html"
       })
       .state('teams', {
           url: '/teams',
           templateUrl: "app/templates/teams.html"
       })
       .state("teams.add", {
           url: '/add',
           templateUrl: "app/templates/teams-add.html"
       });

});

app.run(function($rootScope){

    $rootScope.teams = [{
        "number":1,
        "name":"Team 1 Test"
    }];

    $rootScope.findTeam = function(tableNumber){
        for(var i=0; i < $rootScope.teams; i++){
            if($rootScope.teams[i].number == tableNumber)
            {
                return $rootScope.teams[i];
            }
        }
        return null;
    };

    $rootScope.removeTeam = function(tableNumber){
        for(var i=0; i < $rootScope.teams; i++){
            if($rootScope.teams[i].number == tableNumber)
            {
                return $rootScope.teams.remove(i);
            }
        }
        return null;
    };

});

app.controller('mainController', function(){

});

app.controller("teamsController", function($rootScope, $scope, $state){

    $scope.teams = $rootScope.teams;

    $scope.team = {};

    function addTeam()
    {
        $rootScope.teams.push($scope.team);
        $state.transitionTo("teams");
        Materialize.toast('Team ' + $scope.team.name + ' Added', 4000);
        $scope.team = {};
    }

    function editTeam()
    {

    }

    function loadEditTeam(tableNumber)
    {
        $scope.team = $rootScope.findTeam(tableNumber);
    }

    $scope.addTeam = function(){
        addTeam();
    };
});