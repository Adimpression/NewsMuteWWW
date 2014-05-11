const $feedsList = $('#feedsList');
const $itemTemplate = $('.itemTemplate');
const $genderItemTemplate = $('.genderItemTemplate');
const $countryItemTemplate = $('.countryItemTemplate');
const $industryItemTemplate = $('.industryItemTemplate');
const $genderList = $('.genderList');
const $countryList = $('.countryList');
const $industryList = $('.industryList');
const $FeedSetupGenders = $('.FeedSetupGenders');
const $FeedSetupCountries = $('.FeedSetupCountries');
const $FeedSetupIndustries = $('.FeedSetupIndustries');
const $Loader = $(".Loader");
const $Login = $(".Login");
const $FeedSetup = $(".FeedSetup");
const $FeedInterface = $(".FeedInterface");
const $Inception = $(".Inception");
const $Busy = $(".Busy");

const clsItemTitle = '.itemTitle';
const clsItemSource = '.itemSource';
const clsItemDescription = '.itemDescription';
const clsItemBookmark = '.itemBookmark';
const clsItemBookmarkText = '.itemBookmarkText';
const clsItemAdvanced = '.itemAdvanced';
const clsItemHide = '.itemHide';

const strId = "id";
const strClass = "class";

const flag_super_friend = "flag_super_friend";
const flag_app_launched = "flag_app_launched";

var humanId;
var feedRefreshTimeout;
var isFirstWake = true;
var statePasswordReset = false;
var tempEmail;
var tempPasswordHash;


const Country_Global_ABC = 'http://feeds.abcnews.com/abcnews/internationalheadlines';
const Industry_Technology_Y_Combinator = 'https://news.ycombinator.com/rss';
const Gender_Female_Elle = 'http://www.elle.com/rss/';
const Gender_Male_Elle = 'http://feeds.feedburner.com/TrendHunter/Fashion-for-Men';

const countries = [
    {'title': 'Don\'t care                   ', 'feeds': []},//Don't put anything here, this is the users exit strategy in case (s)he doesn't want to chose anything
    {'title': 'Afghanistan                   ', 'feeds': ['http://feeds.feedburner.com/khaama']},
    {'title': 'Albania                       ', 'feeds': ['http://topics.nytimes.com/top/news/international/countriesandterritories/albania/?rss=1']},
    {'title': 'Algeria                       ', 'feeds': ['http://www.aps.dz/spip.php?page=backend&id_rubrique=32']},
    {'title': 'Andorra                       ', 'feeds': ['http://topics.nytimes.com/top/news/international/countriesandterritories/andorra/']},
//    {'title': 'Angola                        ', 'feeds': [Country_Global_ABC]},
//    {'title': 'Antigua & Deps                ', 'feeds': [Country_Global_ABC]},
    {'title': 'Argentina                     ', 'feeds': ['http://www.argentinaindependent.com/category/currentaffairs/newsfromargentina/feed/']},
    {'title': 'Armenia                       ', 'feeds': ['http://news.am/arm/rss/', 'http://www.tert.am/rss/?language=am']},
    {'title': 'Australia                     ', 'feeds': ['http://www.abc.net.au/news/feeds/rss/', 'http://rss.skynews.com.au/c/34485/f/628636/index.rss', 'http://feeds.news.com.au/public/rss/2.0/theaus_TWAM_13_3314.xml', 'http://feeds.news.com.au/public/rss1/2.0/theaus_wish_3072.xml', 'http://feeds.news.com.au/public/rss1/2.0/theaus_dealmag_3074.xml']},
//    {'title': 'Austria                       ', 'feeds': [Country_Global_ABC]},
    {'title': 'Azerbaijan                    ', 'feeds': ['http://www.today.az/rss.php']},
    {'title': 'Bahamas                       ', 'feeds': ['http://www.bahamaspress.com/?feed=rss2', 'http://www.bna.bh/portal/main_rss/ar/feed.rss']},
//    {'title': 'Bahrain                       ', 'feeds': [Country_Global_ABC]},
    {'title': 'Bangladesh                    ', 'feeds': ['http://www.banglanews24.com/rss/rss.xml']},
    {'title': 'Barbados                      ', 'feeds': ['http://www.barbadostoday.bb/feed/']},
    {'title': 'Belarus                       ', 'feeds': ['http://naviny.by/rss/alls.xml']},
//    {'title': 'Belgium                       ', 'feeds': [Country_Global_ABC]},
    {'title': 'Belize                        ', 'feeds': ['http://www.belizenewspost.com/feed/']},
    {'title': 'Benin                         ', 'feeds': ['http://allafrica.com/tools/headlines/rdf/benin/headlines.rdf']},
    {'title': 'Bhutan                        ', 'feeds': ['http://www.bhutannewsservice.com/feed/']},
//    {'title': 'Bolivia                       ', 'feeds': [Country_Global_ABC]},
//    {'title': 'Bosnia Herzegovina            ', 'feeds': [Country_Global_ABC]},
//    {'title': 'Botswana                      ', 'feeds': [Country_Global_ABC]},
    {'title': 'Brazil                        ', 'feeds': ['http://www.brazilsun.com/index.php/rss/24437442923341f1']},
//    {'title': 'Brunei                        ', 'feeds': [Country_Global_ABC]},
    {'title': 'Bulgaria                      ', 'feeds': ['http://www.bgnewsnet.com/rssbnn20.xml']},
    {'title': 'Burkina                       ', 'feeds': ['http://allafrica.com/tools/headlines/rdf/burkinafaso/headlines.rdf']},
    {'title': 'Burundi                       ', 'feeds': ['http://allafrica.com/tools/headlines/rdf/burundi/headlines.rdf']},
//    {'title': 'Cambodia                      ', 'feeds': [Country_Global_ABC]},
//    {'title': 'Cameroon                      ', 'feeds': [Country_Global_ABC]},
//    {'title': 'Canada                        ', 'feeds': [Country_Global_ABC]},
//    {'title': 'Cape Verde                    ', 'feeds': [Country_Global_ABC]},
//    {'title': 'Central African Rep           ', 'feeds': [Country_Global_ABC]},
//    {'title': 'Chad                          ', 'feeds': [Country_Global_ABC]},
//    {'title': 'Chile                         ', 'feeds': [Country_Global_ABC]},
    {'title': 'China                         ', 'feeds': ['http://www.chinadaily.com.cn/rss/china_rss.xml']},
//    {'title': 'Colombia                      ', 'feeds': [Country_Global_ABC]},
//    {'title': 'Comoros                       ', 'feeds': [Country_Global_ABC]},
//    {'title': 'Congo                         ', 'feeds': [Country_Global_ABC]},
//    {'title': 'Congo {Democratic Rep}        ', 'feeds': [Country_Global_ABC]},
//    {'title': 'Costa Rica                    ', 'feeds': [Country_Global_ABC]},
//    {'title': 'Croatia                       ', 'feeds': [Country_Global_ABC]},
//    {'title': 'Cuba                          ', 'feeds': [Country_Global_ABC]},
//    {'title': 'Cyprus                        ', 'feeds': [Country_Global_ABC]},
//    {'title': 'Czech Republic                ', 'feeds': [Country_Global_ABC]},
//    {'title': 'Denmark                       ', 'feeds': [Country_Global_ABC]},
//    {'title': 'Djibouti                      ', 'feeds': [Country_Global_ABC]},
//    {'title': 'Dominica                      ', 'feeds': [Country_Global_ABC]},
//    {'title': 'Dominican Republic            ', 'feeds': [Country_Global_ABC]},
//    {'title': 'East Timor                    ', 'feeds': [Country_Global_ABC]},
//    {'title': 'Ecuador                       ', 'feeds': [Country_Global_ABC]},
    {'title': 'Egypt                         ', 'feeds': ['http://feeds.feedburner.com/DailyNewsEgypt']},
//    {'title': 'El Salvador                   ', 'feeds': [Country_Global_ABC]},
//    {'title': 'Equatorial Guinea             ', 'feeds': [Country_Global_ABC]},
//    {'title': 'Eritrea                       ', 'feeds': [Country_Global_ABC]},
//    {'title': 'Estonia                       ', 'feeds': [Country_Global_ABC]},
//    {'title': 'Ethiopia                      ', 'feeds': [Country_Global_ABC]},
//    {'title': 'Fiji                          ', 'feeds': [Country_Global_ABC]},
//    {'title': 'Finland                       ', 'feeds': [Country_Global_ABC]},
//    {'title': 'France                        ', 'feeds': [Country_Global_ABC]},
//    {'title': 'Gabon                         ', 'feeds': [Country_Global_ABC]},
//    {'title': 'Gambia                        ', 'feeds': [Country_Global_ABC]},
//    {'title': 'Georgia                       ', 'feeds': [Country_Global_ABC]},
//    {'title': 'Germany                       ', 'feeds': [Country_Global_ABC]},
//    {'title': 'Ghana                         ', 'feeds': [Country_Global_ABC]},
//    {'title': 'Greece                        ', 'feeds': [Country_Global_ABC]},
//    {'title': 'Grenada                       ', 'feeds': [Country_Global_ABC]},
//    {'title': 'Guatemala                     ', 'feeds': [Country_Global_ABC]},
//    {'title': 'Guinea                        ', 'feeds': [Country_Global_ABC]},
//    {'title': 'Guinea-Bissau                 ', 'feeds': [Country_Global_ABC]},
//    {'title': 'Guyana                        ', 'feeds': [Country_Global_ABC]},
//    {'title': 'Haiti                         ', 'feeds': [Country_Global_ABC]},
//    {'title': 'Honduras                      ', 'feeds': [Country_Global_ABC]},
//    {'title': 'Hungary                       ', 'feeds': [Country_Global_ABC]},
//    {'title': 'Iceland                       ', 'feeds': [Country_Global_ABC]},
//    {'title': 'India                         ', 'feeds': [Country_Global_ABC]},
//    {'title': 'Indonesia                     ', 'feeds': [Country_Global_ABC]},
//    {'title': 'Iran                          ', 'feeds': [Country_Global_ABC]},
//    {'title': 'Iraq                          ', 'feeds': [Country_Global_ABC]},
//    {'title': 'Ireland {Republic}            ', 'feeds': [Country_Global_ABC]},
//    {'title': 'Israel                        ', 'feeds': [Country_Global_ABC]},
//    {'title': 'Italy                         ', 'feeds': [Country_Global_ABC]},
//    {'title': 'Ivory Coast                   ', 'feeds': [Country_Global_ABC]},
//    {'title': 'Jamaica                       ', 'feeds': [Country_Global_ABC]},
//    {'title': 'Japan                         ', 'feeds': [Country_Global_ABC]},
//    {'title': 'Jordan                        ', 'feeds': [Country_Global_ABC]},
//    {'title': 'Kazakhstan                    ', 'feeds': [Country_Global_ABC]},
//    {'title': 'Kenya                         ', 'feeds': [Country_Global_ABC]},
//    {'title': 'Kiribati                      ', 'feeds': [Country_Global_ABC]},
//    {'title': 'Korea North                   ', 'feeds': [Country_Global_ABC]},
//    {'title': 'Korea South                   ', 'feeds': [Country_Global_ABC]},
//    {'title': 'Kosovo                        ', 'feeds': [Country_Global_ABC]},
//    {'title': 'Kuwait                        ', 'feeds': [Country_Global_ABC]},
//    {'title': 'Kyrgyzstan                    ', 'feeds': [Country_Global_ABC]},
//    {'title': 'Laos                          ', 'feeds': [Country_Global_ABC]},
//    {'title': 'Latvia                        ', 'feeds': [Country_Global_ABC]},
//    {'title': 'Lebanon                       ', 'feeds': [Country_Global_ABC]},
//    {'title': 'Lesotho                       ', 'feeds': [Country_Global_ABC]},
//    {'title': 'Liberia                       ', 'feeds': [Country_Global_ABC]},
//    {'title': 'Libya                         ', 'feeds': [Country_Global_ABC]},
//    {'title': 'Liechtenstein                 ', 'feeds': [Country_Global_ABC]},
//    {'title': 'Lithuania                     ', 'feeds': [Country_Global_ABC]},
//    {'title': 'Luxembourg                    ', 'feeds': [Country_Global_ABC]},
//    {'title': 'Macedonia                     ', 'feeds': [Country_Global_ABC]},
//    {'title': 'Madagascar                    ', 'feeds': [Country_Global_ABC]},
//    {'title': 'Malawi                        ', 'feeds': [Country_Global_ABC]},
//    {'title': 'Malaysia                      ', 'feeds': [Country_Global_ABC]},
//    {'title': 'Maldives                      ', 'feeds': [Country_Global_ABC]},
//    {'title': 'Mali                          ', 'feeds': [Country_Global_ABC]},
//    {'title': 'Malta                         ', 'feeds': [Country_Global_ABC]},
//    {'title': 'Marshall Islands              ', 'feeds': [Country_Global_ABC]},
//    {'title': 'Mauritania                    ', 'feeds': [Country_Global_ABC]},
//    {'title': 'Mauritius                     ', 'feeds': [Country_Global_ABC]},
    {'title': 'Mexico                        ', 'feeds': ['http://www.mexconnect.com/articles.rss']},
//    {'title': 'Micronesia                    ', 'feeds': [Country_Global_ABC]},
//    {'title': 'Moldova                       ', 'feeds': [Country_Global_ABC]},
//    {'title': 'Monaco                        ', 'feeds': [Country_Global_ABC]},
//    {'title': 'Mongolia                      ', 'feeds': [Country_Global_ABC]},
//    {'title': 'Montenegro                    ', 'feeds': [Country_Global_ABC]},
//    {'title': 'Morocco                       ', 'feeds': [Country_Global_ABC]},
//    {'title': 'Mozambique                    ', 'feeds': [Country_Global_ABC]},
//    {'title': 'Myanmar, {Burma}              ', 'feeds': [Country_Global_ABC]},
//    {'title': 'Namibia                       ', 'feeds': [Country_Global_ABC]},
//    {'title': 'Nauru                         ', 'feeds': [Country_Global_ABC]},
//    {'title': 'Nepal                         ', 'feeds': [Country_Global_ABC]},
//    {'title': 'Netherlands                   ', 'feeds': [Country_Global_ABC]},
    {'title': 'New Zealand                   ', 'feeds': ['http://rss.nzherald.co.nz/rss/xml/nzhrsscid_000000001.xml']},
//    {'title': 'Nicaragua                     ', 'feeds': [Country_Global_ABC]},
//    {'title': 'Niger                         ', 'feeds': [Country_Global_ABC]},
//    {'title': 'Nigeria                       ', 'feeds': [Country_Global_ABC]},
    {'title': 'Norway                        ', 'feeds': ['http://feeds2.feedburner.com/The-Foreigner', 'http://www.norwaytoday.info/rss_headlines.php']},
//    {'title': 'Oman                          ', 'feeds': [Country_Global_ABC]},
    {'title': 'Pakistan                      ', 'feeds': ['http://feeds.feedburner.com/com/YEor', 'http://tribune.com.pk/pakistan/feed/']},
//    {'title': 'Palau                         ', 'feeds': [Country_Global_ABC]},
//    {'title': 'Panama                        ', 'feeds': [Country_Global_ABC]},
//    {'title': 'Papua New Guinea              ', 'feeds': [Country_Global_ABC]},
//    {'title': 'Paraguay                      ', 'feeds': [Country_Global_ABC]},
//    {'title': 'Peru                          ', 'feeds': [Country_Global_ABC]},
//    {'title': 'Philippines                   ', 'feeds': [Country_Global_ABC]},
//    {'title': 'Poland                        ', 'feeds': [Country_Global_ABC]},
//    {'title': 'Portugal                      ', 'feeds': [Country_Global_ABC]},
//    {'title': 'Qatar                         ', 'feeds': [Country_Global_ABC]},
//    {'title': 'Romania                       ', 'feeds': [Country_Global_ABC]},
    {'title': 'Russia                        ', 'feeds': ['http://rt.com/rss/news/', 'http://english.pravda.ru/russia/export.xml', 'http://feeds.feedburner.com/themoscowtimes/gAjo']},
//    {'title': 'Rwanda                        ', 'feeds': [Country_Global_ABC]},
//    {'title': 'St Kitts & Nevis              ', 'feeds': [Country_Global_ABC]},
//    {'title': 'St Lucia                      ', 'feeds': [Country_Global_ABC]},
//    {'title': 'Saint Vincent & the Grenadines', 'feeds': [Country_Global_ABC]},
//    {'title': 'Samoa                         ', 'feeds': [Country_Global_ABC]},
//    {'title': 'San Marino                    ', 'feeds': [Country_Global_ABC]},
//    {'title': 'Sao Tome & Principe           ', 'feeds': [Country_Global_ABC]},
//    {'title': 'Saudi Arabia                  ', 'feeds': [Country_Global_ABC]},
//    {'title': 'Senegal                       ', 'feeds': [Country_Global_ABC]},
//    {'title': 'Serbia                        ', 'feeds': [Country_Global_ABC]},
//    {'title': 'Seychelles                    ', 'feeds': [Country_Global_ABC]},
//    {'title': 'Sierra Leone                  ', 'feeds': [Country_Global_ABC]},
    {'title': 'Singapore                     ', 'feeds': ['http://www.channelnewsasia.com/starterkit/servlet/cna/rss/singapore.xml', 'http://www.todayonline.com/hot-news/feed', 'http://news.insing.com/rss', 'http://asiaone.feedsportal.com/c/34151/f/618415/index.rss']},
//    {'title': 'Slovakia                      ', 'feeds': [Country_Global_ABC]},
//    {'title': 'Slovenia                      ', 'feeds': [Country_Global_ABC]},
//    {'title': 'Solomon Islands               ', 'feeds': [Country_Global_ABC]},
//    {'title': 'Somalia                       ', 'feeds': [Country_Global_ABC]},
//    {'title': 'South Africa                  ', 'feeds': [Country_Global_ABC]},
//    {'title': 'Spain                         ', 'feeds': [Country_Global_ABC]},
    {'title': 'Sri Lanka                     ', 'feeds': ['http://www.lankanewspapers.com/news/rss.xml', 'http://www.dailymirror.lk/index.php?option=com_ninjarsssyndicator&feed_id=16&format=raw', 'http://www.adaderana.lk/rss.php']},
//    {'title': 'Sudan                         ', 'feeds': [Country_Global_ABC]},
//    {'title': 'Suriname                      ', 'feeds': [Country_Global_ABC]},
//    {'title': 'Swaziland                     ', 'feeds': [Country_Global_ABC]},
//    {'title': 'Sweden                        ', 'feeds': [Country_Global_ABC]},
    {'title': 'Switzerland                   ', 'feeds': ['http://www.altran.ch/rss-feed/rss/70919/rss.xml', 'http://www.swissinfo.ch/eng/top_news/index.html?view=rss&amp;cid=1221074']},
//    {'title': 'Syria                         ', 'feeds': [Country_Global_ABC]},
//    {'title': 'Taiwan                        ', 'feeds': [Country_Global_ABC]},
//    {'title': 'Tajikistan                    ', 'feeds': [Country_Global_ABC]},
//    {'title': 'Tanzania                      ', 'feeds': [Country_Global_ABC]},
//    {'title': 'Thailand                      ', 'feeds': [Country_Global_ABC]},
//    {'title': 'Togo                          ', 'feeds': [Country_Global_ABC]},
//    {'title': 'Tonga                         ', 'feeds': [Country_Global_ABC]},
//    {'title': 'Trinidad & Tobago             ', 'feeds': [Country_Global_ABC]},
//    {'title': 'Tunisia                       ', 'feeds': [Country_Global_ABC]},
//    {'title': 'Turkey                        ', 'feeds': [Country_Global_ABC]},
//    {'title': 'Turkmenistan                  ', 'feeds': [Country_Global_ABC]},
//    {'title': 'Tuvalu                        ', 'feeds': [Country_Global_ABC]},
//    {'title': 'Uganda                        ', 'feeds': [Country_Global_ABC]},
//    {'title': 'Ukraine                       ', 'feeds': [Country_Global_ABC]},
//    {'title': 'United Arab Emirates          ', 'feeds': [Country_Global_ABC]},
//    {'title': 'United Kingdom                ', 'feeds': [Country_Global_ABC]},
    {'title': 'United States                 ', 'feeds': ['http://rss.upi.com/news/news.rss', 'http://www.usnews.com/rss/news', 'http://feeds.nbcnews.com/feeds/topstories']},
//    {'title': 'Uruguay                       ', 'feeds': [Country_Global_ABC]},
//    {'title': 'Uzbekistan                    ', 'feeds': [Country_Global_ABC]},
//    {'title': 'Vanuatu                       ', 'feeds': [Country_Global_ABC]},
//    {'title': 'Vatican City                  ', 'feeds': [Country_Global_ABC]},
//    {'title': 'Venezuela                     ', 'feeds': [Country_Global_ABC]},
//    {'title': 'Vietnam                       ', 'feeds': [Country_Global_ABC]},
//    {'title': 'Yemen                         ', 'feeds': [Country_Global_ABC]},
//    {'title': 'Zambia                        ', 'feeds': [Country_Global_ABC]},
//    {'title': 'Zimbabwe                      ', 'feeds': [Country_Global_ABC]},
    {'title': 'Rest of the world             ', 'feeds': [Country_Global_ABC]}
];


const industries = [
    {'title': 'Don\'t care                      ', 'feeds': []},//Don't put anything here, this is the users exit strategy in case (s)he doesn't want to chose anything
//    {'title': 'Agriculture                      ', 'feeds': [Industry_Technology_Y_Combinator]},
//    {'title': 'Beverage & Tobacco               ', 'feeds': [Industry_Technology_Y_Combinator]},
//    {'title': 'Accounting                       ', 'feeds': [Industry_Technology_Y_Combinator]},
//    {'title': 'Advertising                      ', 'feeds': [Industry_Technology_Y_Combinator]},
//    {'title': 'Aerospace                        ', 'feeds': [Industry_Technology_Y_Combinator]},
//    {'title': 'Aircraft                         ', 'feeds': [Industry_Technology_Y_Combinator]},
//    {'title': 'Airline                          ', 'feeds': [Industry_Technology_Y_Combinator]},
//    {'title': 'Apparel & Accessories            ', 'feeds': [Industry_Technology_Y_Combinator]},
    {'title': 'Architecture                     ', 'feeds': ['http://www.apartmenttherapy.com/ahoy-rss-feed-readers-38066']},
//    {'title': 'Automotive                       ', 'feeds': [Industry_Technology_Y_Combinator]},
//    {'title': 'Banking                          ', 'feeds': [Industry_Technology_Y_Combinator]},
//    {'title': 'Broadcasting                     ', 'feeds': [Industry_Technology_Y_Combinator]},
//    {'title': 'Brokerage                        ', 'feeds': [Industry_Technology_Y_Combinator]},
    {'title': 'Biotechnology                    ', 'feeds': ['http://www.cell.com/rssFeed/biotechnology/rss.mostread.xml']},
//    {'title': 'Chemical                         ', 'feeds': [Industry_Technology_Y_Combinator]},
//    {'title': 'Consumer Products                ', 'feeds': [Industry_Technology_Y_Combinator]},
//    {'title': 'Cosmetics                        ', 'feeds': [Industry_Technology_Y_Combinator]},
//    {'title': 'Defense                          ', 'feeds': [Industry_Technology_Y_Combinator]},
    {'title': 'Design                           ', 'feeds': ['http://500pixels.tumblr.com/rss']},
//    {'title': 'Department Stores                ', 'feeds': [Industry_Technology_Y_Combinator]},
//    {'title': 'Software                         ', 'feeds': [Industry_Technology_Y_Combinator]},
//    {'title': 'Education                        ', 'feeds': [Industry_Technology_Y_Combinator]},
//    {'title': 'Sports                           ', 'feeds': [Industry_Technology_Y_Combinator]},
//    {'title': 'Electronics                      ', 'feeds': [Industry_Technology_Y_Combinator]},
//    {'title': 'Energy                           ', 'feeds': [Industry_Technology_Y_Combinator]},
//    {'title': 'Entertainment & Leisure          ', 'feeds': [Industry_Technology_Y_Combinator]},
//    {'title': 'Television                       ', 'feeds': [Industry_Technology_Y_Combinator]},
//    {'title': 'Executive Search                 ', 'feeds': [Industry_Technology_Y_Combinator]},
//    {'title': 'Financial Services               ', 'feeds': [Industry_Technology_Y_Combinator]},
    {'title': 'Food                             ', 'feeds': ['http://www.food.com/rss?']},
//    {'title': 'Health Care                      ', 'feeds': [Industry_Technology_Y_Combinator]},
//    {'title': 'Internet Publishing              ', 'feeds': [Industry_Technology_Y_Combinator]},
//    {'title': 'Investment Banking               ', 'feeds': [Industry_Technology_Y_Combinator]},
//    {'title': 'Legal                            ', 'feeds': [Industry_Technology_Y_Combinator]},
//    {'title': 'Manufacturing                    ', 'feeds': [Industry_Technology_Y_Combinator]},
//    {'title': 'Motion Picture & Video           ', 'feeds': [Industry_Technology_Y_Combinator]},
    {'title': 'Music                            ', 'feeds': ['http://www.rollingstone.com/siteServices/rss/songReviews']},
//    {'title': 'Newspaper Publishers             ', 'feeds': [Industry_Technology_Y_Combinator]},
//    {'title': 'Publishing                       ', 'feeds': [Industry_Technology_Y_Combinator]},
//    {'title': 'Real Estate                      ', 'feeds': [Industry_Technology_Y_Combinator]},
//    {'title': 'Retail & Wholesale               ', 'feeds': [Industry_Technology_Y_Combinator]},
//    {'title': 'Securities & Commodity Exchanges ', 'feeds': [Industry_Technology_Y_Combinator]},
//    {'title': 'Service                          ', 'feeds': [Industry_Technology_Y_Combinator]},
//    {'title': 'Soap & Detergent                 ', 'feeds': [Industry_Technology_Y_Combinator]},
//    {'title': 'Technology                       ', 'feeds': [Industry_Technology_Y_Combinator]},
//    {'title': 'Telecommunications               ', 'feeds': [Industry_Technology_Y_Combinator]},
//    {'title': 'Transportation                   ', 'feeds': [Industry_Technology_Y_Combinator]},
//    {'title': 'Venture Capital                  ', 'feeds': [Industry_Technology_Y_Combinator]},
    {'title': 'Other Industries                 ', 'feeds': [Industry_Technology_Y_Combinator]}
];

const genders = [
    {'title': 'Don\'t care', 'feeds': []},//Don't put anything here, this is the users exit strategy in case (s)he doesn't want to chose anything
    {'title': 'Male       ', 'feeds': [Gender_Male_Elle]},
    {'title': 'Female     ', 'feeds': [Gender_Female_Elle]}
];

function interact_prompt_email(callback) {
    window.plugins.ContactPicker.chooseContact(function (contactInfo) {
        f(interact_confirm_email_correct)(contactInfo, callback);//', 200);//Called after contact selection. Delay is to prevent out alert jumping over the contact selector
    });
}
function interact_prompt_password_reset(email, passwordHash) {
    navigator.notification.confirm(
        "Login failed",
        function (button) {
            if (button == 1) {
                window.location.href = window.location.href;
            } else {
                humanId = null;
                statePasswordReset = true;
                f(ajax_sign_up)(email, passwordHash, intent_sign_up_response, function (argS) {
                    j(argS);
                });
            }
        }, // Specify a function to be called
        "What would you like to do?",
        "Retry,Reset password"
    );
}
function interact_confirm_email_correct(contactInfo, callback) {
    "use strict";
    try {
        navigator.notification.confirm(
            "Is this your email?",
            function (button) {
                if (button == 1) {
                    f(callback)({emails: [contactInfo.email]});
                } else {
                    f(interact_prompt_email)([callback]);
                }
            }, // Specify a function to be called
            contactInfo.email,
            "Yes,No"
        );
    } catch (e) {
        d(e);
    }
}

function post_session() {
    d(post_session);
    try { //render_initial_setup();
        intent_yawn_read();
        var lastVisited = window.localStorage.getItem("lastVisited");
        if (lastVisited != null) {
            //alert('lv no null');
            ajax_scream_link(lastVisited, function (e) {
            }, function (e) {
                if (debug) {
                    alert(e);
                }
            });
            intent_mark_read(lastVisited);
            window.localStorage.removeItem("lastVisited");
        } else {
            //alert('lv null');
            //alert('The share url is null');
        }


        var flag_super_friend_value = window.localStorage.getItem(flag_super_friend);

        if (flag_super_friend_value == null) {
            intent_super_friend();
            notifyLong('Matching friends with DOUBLE-HASHED emails.\n (Emails will not be recorded anywhere)');
        } else {
            //Check for time and update after several days?
            //Remember that we can run a hash check
        }
    } catch (e) {
        if (debug) {
            alert("post_session:" + e);
        }
    }
}


function NewsMute() {
    try {
        if (statePasswordReset) {
            notifyLong('Retrying login with new password');
            ajax_sign_in(tempEmail, tempPasswordHash, function (email, passwordHash, response, statusText, request) {
                notifyShort('Login successful');
                humanId = get_hash(email);
            }, function () {
                j(interact_prompt_password_reset)(tempEmail, tempPasswordHash);
                humanId = null;
            });
        }
        j(render_check_humanId);
    } catch (e) {
        if (debug) {
            alert(e);
        }
    }
}


var app = {
    // Application Constructor
    initialize: function () {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);

        document.addEventListener('resume', function () {
            try {
                if (statePasswordReset) {
                    NewsMute();
                } else {
                    intent_yawn_read();//The user doesn't know that all news items need to be read to get a news refresh.
                    // So we refresh news at the earliest after a long pause.
                    cordova.plugins.clipboard.paste(function (text) {
                        var lastFeedSubscription = window.localStorage.getItem("lastFeedSubscription");
                        if (lastFeedSubscription == text) {

                        } else {
                            intent_subscribe_if_valid_feed(text);
                            window.localStorage.setItem("lastFeedSubscription", text);
                        }
                    });
                }
            } catch (e) {
                if (debug) {
                    alert(e);
                }
            }
        }, false);

        document.addEventListener('deviceready', function () {
            window.plugins.webintent.onNewIntent(function (url) {
                //alert(url);
            })
        }, false);

        document.addEventListener('deviceready', function () {
            window.plugins.webintent.onNewIntent(WebIntent.ACTION_VIEW, function (hasExtraResult) {
                if (hasExtraResult) {
                    window.plugins.webintent.onNewIntent(WebIntent.EXTRA_TEXT, function (url) {
                        alert('Sharing:\n' + url);
                        intent_scream_link(url);
                    }, function () {
                        if (debug) {
                            alert('Sorry, News Mute doesn\'t support that');
                        }
                    });
                } else {
                    if (debug) {
                        alert('No extra found');
                    }
                }

            }, function () {
                if (debug) {
                    alert('No extra');
                }
            });
        });
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'

    onDeviceReady: function () {
        app.receivedEvent('deviceready');
        try {
            if (!isConnected()) {
                alert("Sorry, for now News Mute needs internet to start. We will fix this soon, promise!");
                return;
            }
            //alert("Initializing...");
            NewsMute();
            document.addEventListener("pause", function () {
                window.localStorage.removeItem(flag_app_launched);
                window.localStorage.removeItem("lastVisited");
            }, false);


        } catch (e) {
            if (debug) {
                alert('init error');
                alert(e);
            }
        }
    },
    // Update DOM on a Received Event
    receivedEvent: function (id) {
    }
};


function intent_prompt_email() {
    f(interact_prompt_email)(function (arg) {
        try {
            const email = d(arg.emails[0]);
            $('#loginEmail').val(email);
            $('#loginEmail').text(email);
            notifyShort('Your personal details will not be recorded');
        } catch (e) {
            d(e);
        }
    });
}
function intent_yawn_read() {

    try {
        if (isFirstWake) {
            render($Loader);
        } else {
            busy();
        }

        var beforeSend = function () {
            if (isFirstWake) {
                render($Loader);
            } else {
                busy();
            }
        };
        var complete = function () {
            isFirstWake = false;
            render($FeedInterface);
        };
        var error = function (e) {
            j(e)
        };

        function ajax_yawn_read_success(response) {
            try {
                var json = JSON.parse(response);

                var data = json.returnValue.data;

                data.sort(function (a, b) {//http://stackoverflow.com/questions/4222690/sorting-a-json-object-in-javascript
                        var a1st = -1; // negative value means left item should appear first
                        var b1st = 1; // positive value means right item should appear first
                        var equal = 0; // zero means objects are equal

                        if (b.shocks < a.shocks) {
                            return b1st;
                        }
                        else if (a.shocks < b.shocks) {
                            return a1st;
                        }
                        else {
                            return equal;
                        }
                    }
                );

                data.reverse();
                render_yawn_items(data);
            } catch (e) {
                d('Data render error' + e);
            }
        }

        ajax_yawn_read(beforeSend, complete, error, ajax_yawn_read_success);
    } catch (e) {
        d('intent_yawn_read:' + e);
    }
}
function intent_sign_in() {
    var password = $('#loginPassword').val();
    if (password == "") {
        //setTimeout('promptPassword();', 100);//Removing the timeout and doing a direct call will not work on iOS.
        notifyLong('Enter a password');
    } else if (password == null) {
        //setTimeout('promptPassword();', 100);//Removing the timeout and doing a direct call will not work on iOS.
        notifyLong('Enter a password');
    } else if (password.length < 6) {
        //setTimeout('promptPassword();', 100);//Removing the timeout and doing a direct call will not work on iOS.
        notifyLong('Enter a password longer that 6 characters');
    } else {
        //Now we have the email, we try to login, if we fail
        render($($Loader));
        notifyShort('Logging in...');
        f(ajax_sign_in)($('#loginEmail').val(), get_hash(password), intent_sign_in_response, function (arg) {
            d(arg);
            j(arg);
        });//signIn
    }
}
function intent_sign_up() {
    var password = $('#loginPassword').val();
    if (password == "") {
        //setTimeout('promptPassword();', 100);//Removing the timeout and doing a direct call will not work on iOS.
        notifyLong('Enter a password');
    } else if (password == null) {
        //setTimeout('promptPassword();', 100);//Removing the timeout and doing a direct call will not work on iOS.
        notifyLong('Enter a password');
    } else if (password.length < 6) {
        //setTimeout('promptPassword();', 100);//Removing the timeout and doing a direct call will not work on iOS.
        notifyLong('Enter a password longer that 6 characters');
    } else {
        //Now we have the email, we try to login, if we fail
        render($($Loader));
        notifyShort('Signing up...');
        f(ajax_sign_up)($('#loginEmail').val(), get_hash(password), intent_sign_up_response, function (argS) {
            j(argS);
        });
    }
}
function intent_sign_in_response(email, passwordHash, response, textStatus, request) {
    try {
        window.localStorage.setItem("x-session-header", d(request.getResponseHeader('x-session-header')));
        var json = j(JSON.parse(response));
        var dataArray = json.returnValue.data;
        var data = dataArray[0];
        var status = data.status;
        if (json.returnStatus == "OK") {
            switch (status) {
                case "OK":
                    humanId = get_hash(email);
                    window.localStorage.setItem("humanId", humanId);
                    f(post_session);
                    break;

                case "ERROR":
                    interact_prompt_password_reset(email, passwordHash);
                    break;

                case "NO_ACCOUNT":
                    notifyLong("No account, we are creating one for you...");
                    f(ajax_sign_up)(email, passwordHash, intent_sign_up_response, function (argS) {
                        j(argS);
                    });
                    break;
                default:
                    alert('News Mute sign in error:' + status);
                    break;
            }
        } else {
            d("returnStatus:" + data.returnStatus);
        }
    } catch (e) {
        d(e);
    }
}
function intent_sign_up_response(response, textStatus, request) {
    try {
        window.localStorage.setItem("x-session-header", d(request.getResponseHeader('x-session-header')));
        var json = j(JSON.parse(response));
        d(JSON.stringify(json));
        var data = json.returnValue.data[0];
        var status = data.status;
        if (json.returnStatus == "OK") {
            switch (status) {
                case "OK":
                    window.localStorage.setItem("humanId", humanId);
                    alert('Check email. Click verification link and come back here.');
                    break;

                case "ERROR":
                    alert("Sign up failed");//
                    window.location.href = window.location.href;
                    break;

                default:
                    alert('News Mute sign up error:' + status);
                    break;
            }
        } else {
            d("intent_sign_up_response:returnStatus:" + data.returnStatus);
        }
    } catch (e) {
        d("intent_sign_up_response:" + e);
    }
}
function intent_open_link(link) {
    var ref = window.open(link, '_blank', 'location=yes;closebuttoncaption=Done;toolbar=yes;EnableViewportScale=yes;allowInlineMediaPlayback=yes;');
    ref.addEventListener('loadstop', function () {
        ref.insertCSS({code: "body {" +
            "zoom: 0.5;" +
            "-moz-transform: scale(0.5);" +
            "-moz-transform-origin: 0 0" +
            "}"});
    });
    ref.addEventListener('exit', function () {
        //intent_yawn_read();
    });
}
function intent_scream_link(url, successCallback, failureCallback) {
    d("Sharing:" + url)
    if (isValidURL(url)) {
        ajax_scream_link(url, successCallback, failureCallback);
    } else {
        alert('Sorry :-( This link is not recognized by News Mute')
    }
}
function intent_stalk(url) {

    if (url == null) {
        url = prompt("Enter feed URL");
        if (url == null || url == "") {
            return;
        }
    }

    if (isValidURL(url)) {
        var beforeSend = function () {
        };
        var complete = function () {
        };
        var success = function (response) {
            try {
                notifyShort("Subscribed");//@TODO: Check response
                //window.location.href = window.location.href;
            } catch (e) {
                d(e);
            }
        };
        var error = function (e) {
            j(JSON.stringify(e));
        };
        ajax_stalk(url, beforeSend, complete, success, error);
    } else {
        alert('Sorry :-( This feed is not recognized by News Mute')
    }

}
function intent_stalk(url) {
    var success = function (response) {
        try {
            //alert("Subscribed");//@TODO: Check response
            //window.location.href = window.location.href;
        } catch (e) {
            if (debug) {
                alert(e);
            }
        }
    };
    var error = function (e) {
        if (debug) {
            alert(JSON.stringify(e));
        }
    };
    var complete = function () {
    };
    var beforeSend = function () {
    };
    ajax_stalk(url, beforeSend, complete, success, error);
}
function intent_unshare(url) {
    try {
        if (isValidURL(url)) {

            navigator.notification.confirm(
                "Remove feed permanently?",
                callBackFunction, // Specify a function to be called
                'Remove News Source',
                "Yes,No"
            );

            function callBackFunction(b) {
                if (b == 1) {

                    var complete = function () {
                    };
                    var beforeSend = function () {

                    };
                    var success = function (response) {
                        notifyShort('Removed feed.');
                    };
                    var error = function (e) {
                        j(e);
                    };
                    ajax_unshare(url, beforeSend, complete, success, error);
                } else {

                }
            }

        } else {//Then this is a spammy user, get rid of it?
            //alert('Noted as spam');
        }
    } catch (e) {
        if (debug) {
            alert(e);
        }
    }
}
function intent_mark_read(url) {
    var complete = function () {
    };
    var beforeSend = function () {

    };
    var success = function (response) {
    };
    var error = function (e) {
        j(e);
    };
    ajax_mark_read(url, beforeSend, complete, success, error);
}
function intent_subscribe_if_valid_feed(rssFeedUrl) {
    try {
        intent_discover_feed_for_url(rssFeedUrl.replace(/\s+/g, ''))//We replace all spaces since a user can type something like Facebook.com which ends up with spaces in the end
            .done(function (data) {
                var queryResult = data.responseData;
                if (!!queryResult) {
                    //'http://feeds.feedburner.com/techcrunch/social?format=xml';
                    intent_stalk(queryResult.url);
                    notifyShort('Found RSS feed. Subscribed!');
                    //We can exit here, but why would a user want to exit after a feed subscription, except explore feeds
                } else {
                    notifyShort("Sorry, News Mute doesn't recognise this website!");
                }
            });
    } catch (e) {
        alert(e);
    }
}
function intent_discover_feed_for_url(pageURL) {
    var baseApiUrl = "http://ajax.googleapis.com/ajax/services/feed/lookup?v=1.0";
    var jQueryJsonpToken = "&callback=?"; // tells jQuery to treat it as JSONP request
    var pageUrlParameter = "&q=" + pageURL;
    var requestUrl = baseApiUrl + jQueryJsonpToken + pageUrlParameter;
    return $.getJSON(requestUrl);
}
function intent_super_friend() {
    d('Finding contacts');
    function intent_find_all_contancts(contacts) {
        d('Found contacts: ' + contacts.length);
        try {
            var contactSet = "";
            for (var i = 0; i < contacts.length; i++) {
                for (var j = 0; contacts[i].emails != null && j < contacts[i].emails.length; j++) {
                    if (contacts != "") {
                        contactSet = contactSet + "%7C" + get_hash(contacts[i].emails[j].value); //%7C is the pipe | sign
                    } else {
                        contactSet = get_hash(contacts[i].emails[j].value);
                    }
                }

                if (i % 20 == 0) {//Why? Because we might hit the maximum length of the URL. Right now my contacts count on the phone is some 1900+
                    var beforeSend = function () {
                    };
                    var complete = function () {
                    };
                    var success = function (response) {
                    };
                    var error = function (e) {
                        j(JSON.stringify(e));
                    };
                    ajax_super_friend(contactSet, beforeSend, complete, success, error);
                    contactSet = "";

                }
            }
            window.localStorage.setItem(flag_super_friend, "true");

        } catch (e) {
            if (debug) {
                alert(e);
            }
        }

    }

    function callback_find_all_contacts_failure(e) {
        d(e);
    }

    try {
        var options = new ContactFindOptions();
        options.filter = "";
        options.multiple = true;

        navigator.contacts.find(['emails'], intent_find_all_contancts, callback_find_all_contacts_failure, options);
    } catch (e) {
        if (debug) {
            alert(e);
        }
    }

}
function intent_scream() {
    var url = prompt("Enter link");
    if (url == null || url == "") {
        return;
    }

    intent_scream_link(url, function (e) {
        alert(e)
    }, function (e) {
        alert(e)
    });
}
function intent_share(link) {
    try {
        var message = {
            url: link
        };
        window.socialmessage.send(message);
    } catch (e) {
        if (debug) {
            alert(e);
        }
    }

}

function make_yawn_item(item) {
    const clone = $itemTemplate.clone();

    const id = crc32(item.link);
    const feedItemTitle = clone.find(clsItemTitle);
    const feedItemSource = clone.find(clsItemSource);
    const feedItemBookmark = clone.find(clsItemBookmark);
    const feedItemHide = clone.find(clsItemHide);
    const feedItemBookmarkText = clone.find(clsItemBookmarkText);

    clone.attr(strId, id);
    clone.attr(strClass, 'itemTemplateShown');

    feedItemTitle.text(item.title);
    //clone.find('.itemTitle').attr('href', item.link);
    feedItemTitle.attr("title", item.link);
    feedItemTitle.attr("style", "font-size: 20px; color: #000000;");
    feedItemTitle.click(
        function () {
            render_toggle_content($(this).attr('title'));
        }
    );

    feedItemSource.text(item.source);
    feedItemSource.attr("style", "font-size: 10px; color: #dddddd;");

    //clone.find('.itemDescription').html(item.description.replace(/<(?:.|\n)*?>/gm, ''));
    clone.find(clsItemDescription).html(item.description.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '').replace(/<iframe\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/iframe>/gi, ''));
    //clone.find('.itemDescription').html(item.description.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, ''));
    //Without the script replacement, Chris Brogan blog renders elements wrong
    //Without the iframe replacement, Pinterest gives the following error "Application Error - There was a network error. (file://instagram.com/p/iosdfadsf/embed). This comes as a Android alert.

    {//itemBookmark
        feedItemBookmark.attr("title", item.link);
        feedItemBookmark.click(
            function () {
                const url = $(this).attr('title');

                window.localStorage.setItem('lastVisited', this.title);

                ajax_scream_link(
                    url,
                    function (e) {
                    },
                    function (e) {
                        if (debug) {
                            alert(e);
                        }
                    }
                );

                feedItemBookmarkText.text("Shared!");
                $(this).fadeOut('slow', function () {
                    render_hide_up(url);
                    $('#' + id).removeClass('itemTemplateShown');
                    $('#' + id).addClass('itemTemplateHidden');
                    if ($feedsList.find('.itemTemplateShown').length == 0) {
                        setTimeout("intent_yawn_read();", 0);
                    }

                    intent_open_link(window.localStorage.getItem('lastVisited'));
                });

            });
    }

    {//itemAdvanced
        clone.find(clsItemAdvanced).attr("title", item.source);
    }

    {//itemHide
        feedItemHide.attr("title", item.link);
        feedItemHide.click(
            function () {
                $(this).fadeOut('fast', function () {
                    render_hide_down($(this).attr('title'));
                    $('#' + id).removeClass('itemTemplateShown');
                    $('#' + id).addClass('itemTemplateHidden');
                    if ($feedsList.find('.itemTemplateShown').length == 0) {
                        setTimeout("intent_yawn_read();", 0);
                    }
                });
            });
    }
    return clone;
}
function make_country_item(item) {
    const clone = $countryItemTemplate.clone();
    clone.find('.title').text(item.title);
    clone.click(
        function () {
            //alert(item.title);
            item.feeds.forEach(function (value) {
                //alert(value);
                intent_stalk(value);
            });

            $FeedSetupCountries.hide();
            $FeedSetupGenders.fadeIn("slow");

        }
    );
    return clone;
}
function make_gender_item(item) {
    const clone = $genderItemTemplate.clone();
    clone.find('.title').text(item.title);
    clone.click(
        function () {
            //alert(item.title);
            item.feeds.forEach(function (value) {
                //alert(value);
                intent_stalk(value);
            });
            $FeedSetupGenders.hide();
            $FeedSetupIndustries.fadeIn("slow");
        }
    );
    return clone;
}
function make_industry_item(item) {
    const clone = $industryItemTemplate.clone();
    clone.find('.title').text(item.title);
    clone.click(
        function () {
            //alert(item.title);
            item.feeds.forEach(function (value) {
                //alert(value);
                intent_stalk(value);

            });

            $FeedSetupCountries.fadeOut("fast");
            $FeedSetupGenders.fadeIn("slow");


            alert("Tap 'pink nm' to add RSS feed or share link.\n " +
                "We added some for you.\n" +
                "Click the asterisks to remove feed.");
            post_session();

        }
    );
    return clone;
}

function render_initial_setup() {
    try {
        clearTimeout(feedRefreshTimeout);

        render($Loader);

        $FeedSetupCountries.fadeIn("fast");

        var countryListDocumentFragment = document.createDocumentFragment();
        for (var i = 0; i < countries.length; i++) {
            (function (i, j) {
                const item = countries[i];
                const clone = make_country_item(item);
                clone.appendTo(countryListDocumentFragment);
                if (i + 1 == j) {
                    $FeedSetupGenders.hide();
                    $FeedSetupIndustries.hide();
                    render($FeedSetup);
                }

            })(i, countries.length);
        }
        $countryList.empty();
        $countryList.append(countryListDocumentFragment);

        var genderListDocumentFragment = document.createDocumentFragment();
        for (var ig = 0; ig < genders.length; ig++) {
            (function (ig, j) {
                const item = genders[ig];
                const clone = make_gender_item(item);
                clone.appendTo(genderListDocumentFragment);
                if (ig + 1 == j) {
                }

            })(ig, genders.length);
        }
        $genderList.empty();
        $genderList.append(genderListDocumentFragment);

        var industryListDocumentFragment = document.createDocumentFragment();
        for (var ii = 0; ii < industries.length; ii++) {
            (function (ii, j) {
                const item = industries[ii];
                const clone = make_industry_item(item);
                clone.appendTo(industryListDocumentFragment);
                if (ii + 1 == j) {
                }

            })(ii, industries.length);
        }
        $industryList.empty();
        $industryList.append(industryListDocumentFragment);
    } catch (e) {
        alert(e);
    }
}
function render_inception() {
    f(clearInterval)(feedRefreshTimeout);
    f(render)($Inception);
}
function render_check_humanId() {
    "use strict";
    humanId = window.localStorage.getItem("humanId");
    if (humanId == null || humanId == "") {
        render($Login);
    } else {
        f(post_session)();
    }
}
function render_yawn_items(data) {
    const length = data.length;

    const start = new Date().getTime();

    const feedListDocumentFragment = document.createDocumentFragment();
    $feedsList.empty();

    for (var i = 0; i < length && i < 100; i++) {
        (function (i) {
            const item = data[i];
            if (item.link != "null" && item.link != "") {//@TODO remove me, temp fix until server fixed
                var clone = make_yawn_item(item);
                clone.appendTo(feedListDocumentFragment);
                if (i < 5) {
                    clone.animate({opacity: 0.0});
                    clone.animate({opacity: 1.0}, {duration: i * 300, complete: function () {
                        for (i = 0; i < 1; i++) {
                            clone.fadeTo('slow', 0.5).fadeTo('slow', 1.0);
                            setTimeout('clone.fadeTo(0, 2.0);', 2000);//In case of UI glitches in animations
                        }
                    }});
                }
            }
        })(i);
    }

    if (length > 0) {
        //$('.no_news').hide();
        clearTimeout(feedRefreshTimeout);
    } else {
        //$('.no_news').show();
        clearTimeout(feedRefreshTimeout);
        feedRefreshTimeout = setTimeout("notifyShort('Checking for any updates (News Mute)'); intent_yawn_read()", 10000);
    }

    $feedsList.append(feedListDocumentFragment);
    render($FeedInterface);
    if (isFirstWake) {
        //Nothing to do here
    } else {
        free();
    }

    $feedsList.slideDown();

    d('Completed in ' + (new Date().getTime() - start ));
    return clone;
}
function render_toggle_content(url) {
    try {
        var id = crc32(url);
        var content = $("#" + id).find('.itemDescription');
        if (content.is(":visible")) {
            content.slideUp();
        } else {
            content.slideDown();
        }
    } catch (e) {
        if (debug) {
            alert(e);
        }
    }

}
function render_hide_up(url) {
    try {
        intent_mark_read(url);
        var id = crc32(url);
        $("#" + id).animate({opacity: 0.1}, {duration: 100, complete: function () {
            $("#" + id).slideUp(300);
        }});
    } catch (e) {
        if (debug) {
            alert(e);
        }
    }

}
function render_hide_down(url) {
    try {
        intent_mark_read(url);
        var id = crc32(url);
        $("#" + id).animate({opacity: 0.1}, {duration: 100, complete: function () {
            $("#" + id).slideUp(300);
        }});
    } catch (e) {
        if (debug) {
            alert(e);
        }
    }

}


function render(sectionToShow) {
    if (sectionToShow != $Loader) {
        $Loader.hide();
    }
    if (sectionToShow != $FeedSetup) {
        $FeedSetup.hide();
    }
    if (sectionToShow != $FeedInterface) {
        $FeedInterface.hide();
    }
    if (sectionToShow != $Inception) {
        $Inception.hide();
    }
    if (sectionToShow != $Busy) {
        $Busy.hide();
    }
    if (sectionToShow != $Login) {
        $Login.hide();
    }
    sectionToShow.show();
}



