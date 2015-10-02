angular.module('app.feedurls', [])

.factory('FeedUrls', function() {

    country_Global_ABC = 'http://feeds.abcnews.com/abcnews/internationalheadlines';
    industry_Technology_Y_Combinator = 'https://news.ycombinator.com/rss';
    
    var industries = [
            {'checked': false, 'title': 'Pets                             ', 'feeds': ['http://kb.rspca.org.au/rss.php?c=98', 'http://kb.rspca.org.au/rss.php?c=4']},
            {'checked': false,'title': 'Agriculture                      ', 'feeds': ['http://www.reddit.com/r/Agriculture/.rss']},
            {'checked': false,'title': 'Beverage & Tobacco               ', 'feeds': ['http://www.reddit.com/r/alcohol/.rss']},
            {'checked': false,'title': 'Accounting                       ', 'feeds': ['http://www.reddit.com/r/Accounting/.rss']},
            {'checked': false,'title': 'Advertising                      ', 'feeds': ['http://www.reddit.com/r/advertising/.rss']},
            {'checked': false,'title': 'Aerospace                        ', 'feeds': ['http://www.reddit.com/r/aerospace/.rss']},
            {'checked': false,'title': 'Aircraft                         ', 'feeds': ['http://www.reddit.com/r/aviation/.rss']},
            {'checked': false,'title': 'Airline                          ', 'feeds': ['http://www.reddit.com/r/aviation/.rss']},
            {'checked': false,'title': 'Architecture                     ', 'feeds': ['http://www.reddit.com/r/architecture/.rss']},
            {'checked': false,'title': 'Automotive                       ', 'feeds': ['http://www.reddit.com/r/automotive/.rss']},
            {'checked': false,'title': 'Banking                          ', 'feeds': ['http://www.reddit.com/r/Banking/.rss']},        
        ];
    
    
  return {
        getIndustriesFeedsUrl: function() {
          return industries;
        },
        getCountryGlobalABCUrl: function() {
          return country_Global_ABC;
        },
        getIndustryTechnologyYCombinatorUrl: function() {
          return industry_Technology_Y_Combinator;
        }
    };
});
