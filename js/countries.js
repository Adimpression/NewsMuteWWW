/**
 * Created with JetBrains WebStorm.
 * User: News Mute
 * Date: 24/5/14
 * Time: 12:26 PM
 */

const countries = [
    {'title': 'SKIP THIS STEP                ', 'feeds': [
    ]},
    {'title': 'Afghanistan                   ', 'feeds': ['http://8am.af/feed/','','','http://www.afghanistansun.com/index.php/rss/6e1d5c8e1f98f17c','','','http://www.dawatfreemedia.org/english/index.php?mod=rss','http://www.khaama.com/category/sport/feed','','','','','','http://www.taand.com/feed','http://bloguna.tolafghan.com/rss/index/xml','http://feeds.feedburner.com/Wadsam'
    ]},
    {'title': 'Albania                       ', 'feeds': ['','','','','','','','','http://gazeta55.al/feed/','','','http://www.sportishqiptar.com.al/newsite/feed/','http://feeds2.feedburner.com/TiranaTimesNews'
    ]},
    {'title': 'Algeria                       ', 'feeds': ['','','','','','','','','http://www.echoroukonline.com/ara/feed/index.rss','','','http://feeds.feedburner.com/GalerieArtciles','http://www.elkhabarerriadhi.com/feed','','http://www.elwatan.com/divers/rss.php','http://www.ennaharonline.com/ar/feed/index.rss'
    ]},
    {'title': 'Andorra                       ', 'feeds': ['http://www.bondia.ad/rss.xml','http://www.diariandorra.ad/nXml/nXml.php','','http://www.andorradifusio.ad/xml/noticies_destacades_rtva','http://www.vilaweb.cat/rss/vilaweb.rss'
    ]},
    {'title': 'Angola                        ', 'feeds': ['http://feedburner.google.com/fb/a/mailverify?uri=club-k-angola&loc=pt_BR','','','http://luandadigital.com/feed.php','http://www.portaldeangola.com/','',''
    ]},
    {'title': 'Argentina                     ', 'feeds': ['','http://www.8300.com.ar/category/potpurri/feed/','','','http://www.argentinastar.com/index.php/rss/d9ed072d737073b4','','','http://cataratashoy.com.ar/feed/','','http://chacovision.com.ar/feed/','http://clarin.feedsportal.com/c/33088/f/577681/index.rss','','','',''
    ]},
    {'title': 'Armenia                       ', 'feeds': ['','','','','','http://hetq.am/arm/rss/news/','','http://www.hyebiz.com/feed','http://hyemedia.com/feed/'
    ]},
    {'title': 'Australia                     ', 'feeds': ['','','','','','','','','','http://feeds.feedburner.com/TheAustralianNewsNDM#itm=taus|home|aus_homepage_content3_subscriber_only|3|social_fb_tw_gp_em_rss_social|homepage|homepage','','','http://bendigoweekly.designexperts.com.au/RSSRetrieve.aspx?ID=5051&Type=RSS20',''
    ]},
    {'title': 'Austria                       ', 'feeds': ['http://www.springermedizin.at/rss-feeds/','http://austriantimes.at/RSS-Feed/onobase/generatedRssXMLs/news.xml','','http://www.apa.at/Site/RSS.xml','','http://www.austrianews.co.uk/feed/',''
    ]},
    {'title': 'Azerbaijan                    ', 'feeds': ['','','','http://mirzexezerinsesi.net/xml/rss20/feed.xml','http://www.news.az/articles.rss','http://www.today.az/rss.php','http://news.day.az/rss/all.rss'
    ]},
    {'title': 'Bahamas                       ', 'feeds': ['','','http://www.thenassauguardian.com/index.php?option=com_newsfeeds&view=categories','','',''
    ]},
    {'title': 'Bahrain                       ', 'feeds': ['http://www.akhbar-alkhaleej.com/rss.html','http://www.albiladpress.com/#demo3','http://www.alwatannews.net/rss.ashx','http://www.alayam.com/NewsRss','','','http://www.gulf-daily-news.com/rssfeeds.aspx','',''
    ]},
    {'title': 'Bangladesh                    ', 'feeds': ['http://ctgtimes.com/feed','http://www.1abcnews.tk/','','http://www.bangladeshsun.com/index.php/rss/ba01aa42514dc37d','http://www.ittefaq.com.bd/rss.xml'
    ]},
    {'title': 'Barbados                      ', 'feeds': ['','http://www.barbadostoday.bb/feed','http://www.caribbean360.com/feed','','','http://www.barbadostoday.bb/feed'
    ]},
    {'title': 'Belarus                       ', 'feeds': ['http://www.open.by/rss/list','','http://www.ng.by/ru/rss','http://belarustoday.info/rss/en_rss.xml','http://www.brestonline.com/en/news/news.rss','http://eng.belta.by/service_folder/rss'
    ]},
    {'title': 'Belgium                       ', 'feeds': ['http://www.camer.be/rss.php','http://www.standaard.be/rssfeeds','http://www.gazettevandetroit.com/comments/feed/langswitch_lang/en/','http://blogactiv.eu/feed/','http://www.eumorningpost.com/feed','http://feeds2.feedburner.com/Expatica-BelgianNewOnExpatica?format=xml','http://www.hbvl.be/RSS-Feeds'
    ]},
    {'title': 'Belize                        ', 'feeds': ['http://www.ambergristoday.com/rss.xml','http://www.belizetimes.bz/feed/','http://www.reporter.bz/feed/','','http://www.freedomhouse.org/news/feed'
    ]},
    {'title': 'Benin                         ', 'feeds': ['http://feeds.feedburner.com/NewstimeAfrica','http://allafrica.com/misc/tools/rss.html','http://www.irinnews.org/rss.aspx','http://www.infoplease.com/rss/',''
    ]},
    {'title': 'Bhutan                        ', 'feeds': ['','http://ipajournal.com/www.ipajournal.com/rss','http://asianewsnetwork.feedsportal.com/c/33359/f/566602/index.rss','',''
    ]},
    {'title': 'Bolivia                       ', 'feeds': ['http://www.jornadanet.com/rss.php','http://www.datos-bo.com/Rss-Revista-Datos-bo','http://www.eldeber.com.bo/rss/','http://www.boliviaentusmanos.com/noticias/rss.php','http://www.eldeber.com.bo/rss/',''
    ]},
    {'title': 'Bosnia Herzegovina            ', 'feeds': ['','','','http://www.balkanchronicle.com/#','http://www.bosnia.org.uk/bosnia.xml','http://bosnianmediagroup.com/?feed=rss2','http://www.avaz.ba/rss','http://feeds.feedburner.com/NezavisneNovine','http://www.sarajevotimes.com/'
    ]},
    {'title': 'Botswana                      ', 'feeds': ['http://www.sundaystandard.info/rss.php','http://feeds.feedburner.com/TheZambezian','http://feeds.feedburner.com/NewstimeAfrica','http://www.gazettebw.com/#','http://feeds.feedburner.com/NewstimeAfrica',''
    ]},
    {'title': 'Brazil                        ', 'feeds': ['http://acritica.uol.com.br/rss/rss.html','http://anoticia.clicrbs.com.br/sc/rss/','http://jornalatual.com.br/portal/?feed=rss2&cat=13','http://www.gazetadejoinville.com.br/wp/?feed=comments-rss2','http://anoticia.clicrbs.com.br/sc/ultimas-noticias-rss/',''
    ]},
    {'title': 'Brunei                        ', 'feeds': ['http://www.bt.com.bn/front/feed','http://borneobulletin.brunei-online.com.bn/?feed=rss2','http://mediapermata.brunei-online.com/index.php/feed/','http://www.brudirect.com/#'
    ]},
    {'title': 'Bulgaria                      ', 'feeds': ['http://feeds.feedburner.com/bulgariagazette','http://www.bgnewsnet.com/services.php?lang=en&sid=8','http://www.focus-news.net/rssform/','http://rsspreview.actualno.com/','http://www.burgasinfo.com/news/rss/','http://www.ekipnews.com/rss/',''
    ]},
    {'title': 'Burkina                       ', 'feeds': ['http://feeds.feedburner.com/NewstimeAfrica','http://www.aib.bf/spip.php?page=backend','http://www.evenement-bf.net/spip.php?page=backend','http://www.lefaso.net/spip.php?page=backend','http://www.sidwaya.bf/quotidien/spip.php?page=backend'
    ]},
    {'title': 'Burundi                       ', 'feeds': ['http://www.burundi-info.com/spip.php?page=backend&lang=fr','http://www.burundi-gov.org/feed/','http://www.africa.com/rss-feed/','http://www.burundi-info.com/spip.php?page=backend&lang=fr','http://www.burundi-gov.org/feed/','http://www.jeuneafrique.com/rss/index.php','http://www.iwacu-burundi.org/feed/'
    ]},
    {'title': 'Cambodia                      ', 'feeds': ['http://www.cambodiantimes.com/index.php/rss/c7e1014a94f7e43b',''
    ]},
    {'title': 'Cameroon                      ', 'feeds': ['','http://www.cameroononline.org/feed/','http://www.panapress.com/rss/pana-rss-lang3-index.html'
    ]},
    {'title': 'Canada                        ', 'feeds': ['','http://www.canindia.com/rss-feeds/','http://www.dailytownsman.com/rss/?curSection=%2F&curSection=%2F&curTitle=RSS&curTitle=RSS&c=y&c=y'
    ]},
    {'title': 'Cape Verde                    ', 'feeds': ['http://www.expressodasilhas.sapo.cv/','http://asemana.sapo.cv/spip.php?page=inc-page_rss&ak=1&lang=en','http://www.panapress.com/rss/pana-rss-lang3-index.html'
    ]},
    {'title': 'Central African Rep           ', 'feeds': ['http://feeds.feedburner.com/NewstimeAfrica','http://allafrica.com/misc/tools/rss.html'
    ]},
    {'title': 'Chad                          ', 'feeds': ['http://www.afrik.com/affiliation','http://www.alwihdainfo.com/xml/syndication.rss','http://feeds.feedburner.com/NewstimeAfrica'
    ]},
    {'title': 'Chile                         ', 'feeds': ['http://www.bnamericas.com/tools_es.html#rss','http://www.cavancha.cl/#','http://www.chilenoticias.cl/?feed=rss2'
    ]},
    {'title': 'China                         ', 'feeds': ['http://www.beijingbulletin.com/index.php/rss/55582c89cb296d4c','','http://www.chinanationalnews.com/index.php/rss/9366300fc9319e9b'
    ]},
    {'title': 'Colombia                      ', 'feeds': ['http://feeds.feedburner.com/thecitypaperbogota','http://colombiareports.co/feed/','http://hsbnoticias.com/hsbnoticias.xml'
    ]},
    {'title': 'Comoros                       ', 'feeds': ['','','http://allafrica.com/misc/tools/rss.html'
    ]},
    {'title': 'Congo                         ', 'feeds': ['http://feeds.feedburner.com/radiookapi/actu','http://www.congoplanet.com/rss_feed_fils_congo_africa.jsp',''
    ]},
    {'title': 'Costa Rica                    ', 'feeds': ['http://feeds.feedburner.com/TCRN','http://www.aldia.cr/rss/','http://www.diarioextra.com/Dnew/rss'
    ]},
    {'title': 'Croatia                       ', 'feeds': ['http://www.croatiantimes.com/RSS-Feed/159/General_News','','http://www.evarazdin.hr/feed/'
    ]},
    {'title': 'Cuba                          ', 'feeds': ['http://www.5septiembre.cu/index.php?option=com_fpss&task=module&id=164&format=feed&type=rss&lang=es','http://www.cubanews.ain.cu/?format=feed&type=rss','http://havanajournal.com/home/rss/'
    ]},
    {'title': 'Cyprus                        ', 'feeds': ['http://www.cypruspropertynews.net/feed/','http://www.cyprusreporter.com/rss','http://www.financialmirror.com/rss_all.php'
    ]},
    {'title': 'Czech Republic                ', 'feeds': ['http://www.azathabar.com/rsspage.aspx','http://feeds.feedburner.com/CzechiaToday','http://www.denik.cz/rss/','http://www.ceskenoviny.cz/rss/'
    ]},
    {'title': 'Denmark                       ', 'feeds': ['http://www.b.dk/','http://stiften.dk/rss','http://lyngby-taarbaek.lokalavisen.dk/section/rss'
    ]},
    {'title': 'Djibouti                      ', 'feeds': ['http://allafrica.com/misc/tools/rss.html','http://www.hch24.com/feed/','http://www.lanationdj.com/'
    ]},
    {'title': 'Dominica                      ', 'feeds': ['http://thedominican.net/dominicanews.xml','http://www.elcaribe.com.do/rss','http://www.diariolibre.com/rss.php'
    ]},
    {'title': 'Dominican Republic            ', 'feeds': ['http://elnacional.com.do/feed/','http://www.el-nacional.com/rss/','http://hoy.com.do/feed/'
    ]},
    {'title': 'East Timor                    ', 'feeds': ['',''
    ]},
    {'title': 'Ecuador                       ', 'feeds': ['http://www.bnamericas.com/','http://www.cuencahighlife.com/syndication.axd',''
    ]},
    {'title': 'Egypt                         ', 'feeds': ['http://moheet.com/rssfeed','http://akhbarelyom.com/RSS/GetSectionRSS?JournalID=1','http://www.almasryalyoum.com/rss'
    ]},
    {'title': 'El Salvador                   ', 'feeds': ['http://www.contrapunto.com.sv/obrss/feed/1-diario-digital-contrapunto','http://www.elsalvador.com/mwedh/paginas/rss.asp','http://elmundo.com.sv/'
    ]},
    {'title': 'Equatorial Guinea             ', 'feeds': ['http://www.guineaecuatorialpress.com/guineaecuatorial.rss.php','http://www.africa.com/rss-feed/','http://www.afrik-news.com/backend-country25.html'
    ]},
    {'title': 'Eritrea                       ', 'feeds': ['http://feeds.feedburner.com/capitaleritrea/czgB','http://reliefweb.int/rss','http://erigazette.org/'
    ]},
    {'title': 'Estonia                       ', 'feeds': ['http://www.delfi.ee/misc/rss_new.php','http://opleht.ee/feed/','http://balticreports.com/feed/'
    ]},
    {'title': 'Ethiopia                      ', 'feeds': ['','http://www.thereporterethiopia.com/index.php/news-headlines?format=feed&type=rss',''
    ]},
    {'title': 'Fiji                          ', 'feeds': ['http://fijilive.com/fijilive-rss.Fijilive','http://www.fijisun.com.fj/2014/04/18/%E2%80%98it%E2%80%99s-manual%E2%80%99/feed/','http://thejetnewspaper.com/feed/'
    ]},
    {'title': 'Finland                       ', 'feeds': ['http://www.aamulehti.fi/rss','http://www.codewit.com/atom','http://www.helsinkitimes.fi/?format=feed&type=rss'
    ]},
    {'title': 'France                        ', 'feeds': ['http://french-news-online.com/wordpress/?feed=rss2','http://www.liberation.fr/rss/',''
    ]},
    {'title': 'Gabon                         ', 'feeds': ['http://www.gabonews.com/Gabonews/php/gabonews.rss','','http://feeds.feedburner.com/NewstimeAfrica'
    ]},
    {'title': 'Gambia                        ', 'feeds': ['http://americanstreetnews.com/feed','http://www.askanisenegambia.com/rssNews/',''
    ]},
    {'title': 'Georgia                       ', 'feeds': ['','http://www.messenger.com.ge/rss.xml'
    ]},
    {'title': 'Germany                       ', 'feeds': ['http://www.aerztezeitung.de/service/rss/','',''
    ]},
    {'title': 'Ghana                         ', 'feeds': ['http://feeds.feedburner.com/LeadStoriesFromAol','http://www.globalnewsreel.com/#','http://www.myjoyonline.com/services/rss/'
    ]},
    {'title': 'Greece                        ', 'feeds': ['http://www.adapokrites.gr/index.php/rss-%CE%B1%CE%BD%CF%84%CE%B1%CF%80%CE%BF%CE%BA%CF%81%CE%B9%CF%84%CE%B5%CF%82','http://www.agelioforos.gr/default.asp?pid=255','http://www.kerdos.gr/rss/%CE%95%CF%80%CE%B9%CF%87%CE%B5%CE%B9%CF%81%CE%AE%CF%83%CE%B5%CE%B9%CF%82.xml'
    ]},
    {'title': 'Grenada                       ', 'feeds': ['','',''
    ]},
    {'title': 'Guatemala                     ', 'feeds': ['','http://www.dca.gob.gt/index.php/component/k2/itemlist/category/26-us.feed','http://www.prensalibre.com/rss/latest/'
    ]},
    {'title': 'Guinea                        ', 'feeds': ['http://aminata.com/feed/','http://guineenews.org/feed/','http://feed.xml/'
    ]},
    {'title': 'Guinea-Bissau                 ', 'feeds': ['','http://allafrica.com/misc/tools/rss.html',''
    ]},
    {'title': 'Guyana                        ', 'feeds': ['http://news.yahoo.com/rss/','http://www.guyanagraphic.com/rss.xml','http://www.guyanaobservernews.org/#'
    ]},
    {'title': 'Haiti                         ', 'feeds': [
    ]},
    {'title': 'Honduras                      ', 'feeds': [
    ]},
    {'title': 'Hungary                       ', 'feeds': [
    ]},
    {'title': 'Iceland                       ', 'feeds': [
    ]},
    {'title': 'India                         ', 'feeds': [
    ]},
    {'title': 'Indonesia                     ', 'feeds': [
    ]},
    {'title': 'Iran                          ', 'feeds': [
    ]},
    {'title': 'Iraq                          ', 'feeds': [
    ]},
    {'title': 'Ireland {Republic}            ', 'feeds': [
    ]},
    {'title': 'Israel                        ', 'feeds': [
    ]},
    {'title': 'Italy                         ', 'feeds': [
    ]},
    {'title': 'Ivory Coast                   ', 'feeds': [
    ]},
    {'title': 'Jamaica                       ', 'feeds': [
    ]},
    {'title': 'Japan                         ', 'feeds': [
    ]},
    {'title': 'Jordan                        ', 'feeds': [
    ]},
    {'title': 'Kazakhstan                    ', 'feeds': [
    ]},
    {'title': 'Kenya                         ', 'feeds': [
    ]},
    {'title': 'Kiribati                      ', 'feeds': [
    ]},
    {'title': 'Korea North                   ', 'feeds': [
    ]},
    {'title': 'Korea South                   ', 'feeds': [
    ]},
    {'title': 'Kosovo                        ', 'feeds': [
    ]},
    {'title': 'Kuwait                        ', 'feeds': [
    ]},
    {'title': 'Kyrgyzstan                    ', 'feeds': [
    ]},
    {'title': 'Laos                          ', 'feeds': [
    ]},
    {'title': 'Latvia                        ', 'feeds': [
    ]},
    {'title': 'Lebanon                       ', 'feeds': [
    ]},
    {'title': 'Lesotho                       ', 'feeds': [
    ]},
    {'title': 'Liberia                       ', 'feeds': [
    ]},
    {'title': 'Libya                         ', 'feeds': [
    ]},
    {'title': 'Liechtenstein                 ', 'feeds': [
    ]},
    {'title': 'Lithuania                     ', 'feeds': [
    ]},
    {'title': 'Luxembourg                    ', 'feeds': [
    ]},
    {'title': 'Macedonia                     ', 'feeds': [
    ]},
    {'title': 'Madagascar                    ', 'feeds': [
    ]},
    {'title': 'Malawi                        ', 'feeds': [
    ]},
    {'title': 'Malaysia                      ', 'feeds': [
    ]},
    {'title': 'Maldives                      ', 'feeds': [
    ]},
    {'title': 'Mali                          ', 'feeds': [
    ]},
    {'title': 'Malta                         ', 'feeds': [
    ]},
    {'title': 'Marshall Islands              ', 'feeds': [
    ]},
    {'title': 'Mauritania                    ', 'feeds': [
    ]},
    {'title': 'Mauritius                     ', 'feeds': [
    ]},
    {'title': 'Mexico                        ', 'feeds': [
    ]},
    {'title': 'Micronesia                    ', 'feeds': [
    ]},
    {'title': 'Moldova                       ', 'feeds': [
    ]},
    {'title': 'Monaco                        ', 'feeds': [
    ]},
    {'title': 'Mongolia                      ', 'feeds': [
    ]},
    {'title': 'Montenegro                    ', 'feeds': [
    ]},
    {'title': 'Morocco                       ', 'feeds': [
    ]},
    {'title': 'Mozambique                    ', 'feeds': [
    ]},
    {'title': 'Myanmar, {Burma}              ', 'feeds': [
    ]},
    {'title': 'Namibia                       ', 'feeds': [
    ]},
    {'title': 'Nauru                         ', 'feeds': [
    ]},
    {'title': 'Nepal                         ', 'feeds': [
    ]},
    {'title': 'Netherlands                   ', 'feeds': [
    ]},
    {'title': 'New Zealand                   ', 'feeds': [
    ]},
    {'title': 'Nicaragua                     ', 'feeds': [
    ]},
    {'title': 'Niger                         ', 'feeds': [
    ]},
    {'title': 'Nigeria                       ', 'feeds': [
    ]},
    {'title': 'Norway                        ', 'feeds': [
    ]},
    {'title': 'Oman                          ', 'feeds': [
    ]},
    {'title': 'Pakistan                      ', 'feeds': [
    ]},
    {'title': 'Palau                         ', 'feeds': [
    ]},
    {'title': 'Panama                        ', 'feeds': [
    ]},
    {'title': 'Papua New Guinea              ', 'feeds': [
    ]},
    {'title': 'Paraguay                      ', 'feeds': [
    ]},
    {'title': 'Peru                          ', 'feeds': [
    ]},
    {'title': 'Philippines                   ', 'feeds': [
    ]},
    {'title': 'Poland                        ', 'feeds': [
    ]},
    {'title': 'Portugal                      ', 'feeds': [
    ]},
    {'title': 'Qatar                         ', 'feeds': [
    ]},
    {'title': 'Romania                       ', 'feeds': [
    ]},
    {'title': 'Russia                        ', 'feeds': [
    ]},
    {'title': 'Rwanda                        ', 'feeds': [
    ]},
    {'title': 'St Kitts & Nevis              ', 'feeds': [
    ]},
    {'title': 'St Lucia                      ', 'feeds': [
    ]},
    {'title': 'Saint Vincent & the Grenadines', 'feeds': [
    ]},
    {'title': 'Samoa                         ', 'feeds': [
    ]},
    {'title': 'San Marino                    ', 'feeds': [
    ]},
    {'title': 'Sao Tome & Principe           ', 'feeds': [
    ]},
    {'title': 'Saudi Arabia                  ', 'feeds': [
    ]},
    {'title': 'Senegal                       ', 'feeds': [
    ]},
    {'title': 'Serbia                        ', 'feeds': [
    ]},
    {'title': 'Seychelles                    ', 'feeds': [
    ]},
    {'title': 'Sierra Leone                  ', 'feeds': [
    ]},
    {'title': 'Singapore                     ', 'feeds': [
    ]},
    {'title': 'Slovakia                      ', 'feeds': [
    ]},
    {'title': 'Slovenia                      ', 'feeds': [
    ]},
    {'title': 'Solomon Islands               ', 'feeds': [
    ]},
    {'title': 'Somalia                       ', 'feeds': [
    ]},
    {'title': 'South Africa                  ', 'feeds': [
    ]},
    {'title': 'Spain                         ', 'feeds': [
    ]},
    {'title': 'Sri Lanka                     ', 'feeds': [
    ]},
    {'title': 'Sudan                         ', 'feeds': [
    ]},
    {'title': 'Suriname                      ', 'feeds': [
    ]},
    {'title': 'Swaziland                     ', 'feeds': [
    ]},
    {'title': 'Sweden                        ', 'feeds': [
    ]},
    {'title': 'Switzerland                   ', 'feeds': [
    ]},
    {'title': 'Syria                         ', 'feeds': [
    ]},
    {'title': 'Taiwan                        ', 'feeds': [
    ]},
    {'title': 'Tajikistan                    ', 'feeds': [
    ]},
    {'title': 'Tanzania                      ', 'feeds': [
    ]},
    {'title': 'Thailand                      ', 'feeds': [
    ]},
    {'title': 'Togo                          ', 'feeds': [
    ]},
    {'title': 'Tonga                         ', 'feeds': [
    ]},
    {'title': 'Trinidad & Tobago             ', 'feeds': [
    ]},
    {'title': 'Tunisia                       ', 'feeds': [
    ]},
    {'title': 'Turkey                        ', 'feeds': [
    ]},
    {'title': 'Turkmenistan                  ', 'feeds': [
    ]},
    {'title': 'Tuvalu                        ', 'feeds': [
    ]},
    {'title': 'Uganda                        ', 'feeds': [
    ]},
    {'title': 'Ukraine                       ', 'feeds': [
    ]},
    {'title': 'United Arab Emirates          ', 'feeds': [
    ]},
    {'title': 'United Kingdom                ', 'feeds': [
    ]},
    {'title': 'United States                 ', 'feeds': [
    ]},
    {'title': 'Uruguay                       ', 'feeds': [
    ]},
    {'title': 'Uzbekistan                    ', 'feeds': [
    ]},
    {'title': 'Vanuatu                       ', 'feeds': [
    ]},
    {'title': 'Vatican City                  ', 'feeds': [
    ]},
    {'title': 'Venezuela                     ', 'feeds': [
    ]},
    {'title': 'Vietnam                       ', 'feeds': [
    ]},
    {'title': 'Yemen                         ', 'feeds': ['http://www.alhawyah.com/news/feed','','','http://www.yementimes.com/?tpl=1341','http://al-teef.net/feed/'
    ]},
    {'title': 'Zambia                        ', 'feeds': ['http://www.muvitv.com/comments/feed/','http://zambia.co.zm/feed/','',''
    ]},
    {'title': 'Zimbabwe                      ', 'feeds': ['','','','http://www.newzimbabwe.com/rss/rss.xml'
    ]},
    {'title': 'Rest of the world             ', 'feeds': [
    ]}
];

