/**
 * Created by andrew on 30/10/16.
 */
var app = angular.module('scoreLynx', ['ui.router','ngStorage']);

app.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/scores');

    $stateProvider.state('scores', {
        url: '/scores',
        templateUrl: "app/templates/scores.html"

    })
        .state("scores.update", {
            url: '/update',
            templateUrl: "app/templates/scores-update.html"
        })
        .state('teams', {
            url: '/teams',
            templateUrl: "app/templates/teams.html"
        })
        .state("teams.add", {
            url: '/add',
            templateUrl: "app/templates/teams-add.html"
        })
        .state("rounds", {
            url: '/rounds',
            templateUrl: "app/templates/rounds.html"
        })
        .state("rounds.add", {
            url: "/add",
            templateUrl: "app/templates/rounds-add.html"
        })
});

app.run(function($rootScope, $localStorage, $filter){

    $rootScope.storage = $localStorage.$default({
        teams: [],
        rounds: []
    });

    $rootScope.findTeam = function(tableNumber){
        return $filter("filter")($rootScope.storage.teams, {number:tableNumber});
    };

    $rootScope.removeTeam = function(team){
        var index = $rootScope.storage.teams.indexOf(team);
        if(index != -1)
        {
            $rootScope.storage.teams.splice(index,1);
        }
        else
        {
            Materialize.toast('Failed to Remove Team!', 4000, 'toast-danger');
        }
    };

    $rootScope.removeRound = function(round){
        var index = $rootScope.storage.rounds.indexOf(round);
        if(index != -1)
        {
            $rootScope.storage.rounds.splice(index,1);
        }
        else
        {
            Materialize.toast('Failed to Remove Round!', 4000);
        }
    };

    $rootScope.resetTeams = function(){
        $localStorage.teams = [];
    };

    $rootScope.resetGame = function(){
        $localStorage.$reset({
            teams:[],
            rounds:[]
        });
    }

});

app.controller('mainController', function(){

});

app.controller("scoresController", function($rootScope, $scope, $state){

    $scope.teams = $rootScope.storage.teams;
    $scope.rounds = $rootScope.storage.rounds;

    function updateScore()
    {
        var originalTeam = $rootScope.findTeam($scope.scoreUpdate.team);
        if(originalTeam != null)
        {
            //TODO Finish this off
        }
    }

});

app.controller("teamsController", function($rootScope, $scope, $state){

    $scope.teams = $rootScope.storage.teams;

    $scope.team = {};

    function addTeam()
    {
        $scope.team.score = 0;
        $scope.team.rounds = [];
        $rootScope.storage.teams.push($scope.team);
        $state.transitionTo("teams");
        Materialize.toast('Team ' + $scope.team.name + ' Added', 4000);
        $scope.team = {};
    }

    $scope.addTeam = function(){
        addTeam();
    };

    $scope.deleteTeam = function(team){
        $rootScope.removeTeam(team);
    }
});

app.controller("roundsController", function($rootScope, $scope, $state){

    $scope.rounds = $rootScope.storage.rounds;

    $scope.round = {};

    function addRound()
    {
        $rootScope.storage.rounds.push($scope.round);
        $state.transitionTo("rounds");
        Materialize.toast('Round ' + $scope.round.name + ' Added', 4000);
        $scope.round = {};
    }

    $scope.addRound = function(){
        addRound();
    };

    $scope.deleteRound = function(round){
        $rootScope.removeRound(round);
    }

});