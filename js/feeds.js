angular.module('app.feedurls', [])

    .factory('FeedUrls', function () {

        var countries = [];

        var industries = [];

        var global = [
            {
                title: "Wired                   ",
                feeds: ["https://www.wired.com/feed/"]
            },
            {
                title: "Lifehacker              ",
                feeds: ["http://feeds.gawker.com/lifehacker/full"]
            },
            {
                title: "Fox News Latest         ",
                feeds: ["http://feeds.foxnews.com/foxnews/latest"]
            },
            {
                title: "CBS News                ",
                feeds: ["http://www.cbsnews.com/latest/rss/main"]
            }
        ];

        return {
            getIndustriesFeedsUrl: function () {
                return industries;
            },
            getCountriesFeedUrl: function () {
                return countries;
            },
            getFeedListGlobal: function () {
                return global;
            }

        };
    });
