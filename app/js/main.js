var app = angular.module('app',[]);


app.controller('weather', ['$scope','$http',function($scope,$http){


    var weatherApiKey = 'c04a9512cf2f19dfcf7709bb07fcc4c5';
    var defaultCity = 'San-francisco';
    var zipReg = /\d{5}/g;
    var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };


    function success(pos) {
        var crd = pos.coords;
        requestWeather('lat='+ crd.latitude + '5&lon=' + crd.longitude);
    }

    function error(err) {
        console.warn('ERROR(' + err.code + '): ' + err.message);
        requestWeather('q='+defaultCity);
    }

    function initLocation(){

        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(success, error, options);
        }else{
            requestWeather('q='+defaultCity);
        }

    }
    initLocation();

    $scope.getweather = function() {

        requestWeather(validateLocation($scope.address));
    };

    function validateLocation(location){

        if (location != undefined){
            if (location.match(zipReg) && location.length == 5){
                console.log("it's zip code");
                return 'zip='+location+',us';

            }else{
                return 'q='+location;
            }
        }else{
            return 'q='+defaultCity;
        }
    }

    function requestWeather(location){
        $http.get('http://api.openweathermap.org/data/2.5/weather?' + location + '&units=metric&appid=' + weatherApiKey)

            .success(function(data, status, headers, config) {
                $scope.weather = data;
            })
            .error(function(data, status, headers, config) {
                // log error
            });
    }




}]);
