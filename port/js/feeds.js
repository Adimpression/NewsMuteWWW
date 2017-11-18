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
            },
            {
                title: "Time Most Popular       ",
                feeds: ["http://feeds2.feedburner.com/time/topstories"]
            },
            {
                title: "Time News Feed          ",
                feeds: ["http://feeds.feedburner.com/time/newsfeed"]
            },
            {
                title: "Time Ideas Feed         ",
                feeds: ["http://feeds.feedburner.com/time/ideas"]
            },
            {
                title: "Your Tango              ",
                feeds: ["http://www.yourtango.com/rss/all-posts"]
            },
            {
                title: "WHO                                    ",
                feeds: ["http://www.who.int/feeds/entity/mediacentre/news/en/rss.xml"]
            },
            {
                title: "WebMD                                  ",
                feeds: ["http://rssfeeds.webmd.com/rss/rss.aspx?RSSSource=RSS_PUBLIC"]
            },
            {
                title: "Science Daily - Health                 ",
                feeds: ["https://rss.sciencedaily.com/top/health.xml"]
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
