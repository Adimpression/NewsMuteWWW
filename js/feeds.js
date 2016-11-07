angular.module('app.feedurls', [])

    .factory('FeedUrls', function () {

        var countries = [];

        var industries = [];

        return {
            getIndustriesFeedsUrl: function () {
                return industries;
            },
            getCountriesFeedUrl: function () {
                return countries;
            }
        };
    });
