angular.module('app.iso3116CountryCodes', [])

    .factory('Iso3116CountryCodes', function () {

        var iso3116CountryCodes = [];

        return {
            getIso3116CountryCodes: function () {
                return iso3116CountryCodes;
            }
        };
    });
