'use strict';

angular.module('main', [])
    .controller('MainCtrl', function ($scope, $http) {

        //Load json file into scope
        $http.get("vuelos.json").success(function (data) {
            $scope.vuelos = data.vuelos;
        });

        $scope.getTotalFlights = function () {
            return $scope.vuelos.length;

        };

        //Check if number of passengers is valid input. If not, remove te table (showClick = false)
        $scope.checkContent = function () {
            if ($scope.passengers === '' || typeof $scope.passengers === 'undefined' || $scope.passengers === 0) {
                $scope.showClick = false;
            }
        }

        $scope.submit = function () {


            //Check if dates are valid
            var x = new Date ($scope.departure);
            var y = new Date ($scope.arrival);

            var start = new Date("2019-07-02");
            var fin = new Date("2019-09-30");

            if(+ x >= +y) 
                alert("Return date should be GREATER than departure date!");

            if( x < start || y > fin )
                alert("Dates must be between 07/02 and 09/30");



            //arrays to save the flights, resultsDep are array for Departure flights, resultsArr is for Arrival flights
            //and results is final array with combinations of both departure and arrival flights that match the criteria
            $scope.resultsDep = [];
            $scope.resultsArr = [];
            $scope.results = [];

            //temp array for saving the flight row that match the criteria
            var item = [];

            //first check if all inputs are valid
            if ($scope.departure && $scope.arrival && $scope.origin && $scope.destination && $scope.passengers && x < y) {
                $scope.showClick = true;

                //iterate over original flight data
                for (var i = 0; i < $scope.vuelos.length; i++) {

                    //save to temporary
                    item = $scope.vuelos[i];

                    //check if is the departure flight
                    if ($scope.origin.toUpperCase() === $scope.vuelos[i].origen &&
                        $scope.destination.toUpperCase() === $scope.vuelos[i].destino &&
                        $scope.departure === $scope.vuelos[i].salida.substring(0, 10)) {
                        
                        $scope.resultsDep.push(item);
                    }

                    //or check if is the arrival flight
                    else if ($scope.destination.toUpperCase() === $scope.vuelos[i].origen &&
                        $scope.origin.toUpperCase() === $scope.vuelos[i].destino &&
                        $scope.arrival === $scope.vuelos[i].llegada.substring(0, 10)) {
                            
                        $scope.resultsArr.push(item);

                    }

                }

                //Finnaly make all possible combinations of "Dep" and "Arr" aray and save it to final "results" array
                for (var i = 0; i < $scope.resultsDep.length; i++) {
                    for (var j = 0; j < $scope.resultsArr.length; j++) {
                        $scope.results.push({
                            departure: $scope.resultsDep[i].vuelo + " / " +
                                $scope.resultsDep[i].llegada.substring(11, 16),

                            arrival: $scope.resultsArr[j].vuelo + " / " +
                                $scope.resultsArr[j].llegada.substring(11, 16),

                            //multiply the prices with number of passengers
                            business: ($scope.resultsDep[i].bussiness + $scope.resultsArr[j].bussiness) * $scope.passengers,
                            optima: ($scope.resultsDep[i].optima + $scope.resultsArr[j].optima) * $scope.passengers,
                            economy: ($scope.resultsDep[i].economy + $scope.resultsArr[j].economy * $scope.passengers)
                        });
                    }
                }

            }

            // for (var i = 0; i < $scope.results.length; i++) {
            //     console.log($scope.results[i]);
            // }

        };

       

    });