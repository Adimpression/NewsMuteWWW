angular.module('app.feedurls', [])

    .factory('FeedUrls', function () {

        var countries = [{
            title: "Afghanistan                   ",
            feeds: ["http://8am.af/feed/", "", "", "http://www.afghanistansun.com/index.php/rss/6e1d5c8e1f98f17c", "", "", "http://www.dawatfreemedia.org/english/index.php?mod=rss", "http://www.khaama.com/category/sport/feed", "", "", "", "", "", "http://www.taand.com/feed", "http://bloguna.tolafghan.com/rss/index/xml", "http://feeds.feedburner.com/Wadsam"]
        }, {
            title: "Albania                       ",
            feeds: ["", "", "", "", "", "", "", "", "http://gazeta55.al/feed/", "", "", "http://www.sportishqiptar.com.al/newsite/feed/", "http://feeds2.feedburner.com/TiranaTimesNews"]
        }, {
            title: "Algeria                       ",
            feeds: ["", "", "", "", "", "", "", "", "http://www.echoroukonline.com/ara/feed/index.rss", "", "", "http://feeds.feedburner.com/GalerieArtciles", "http://www.elkhabarerriadhi.com/feed", "", "http://www.elwatan.com/divers/rss.php", "http://www.ennaharonline.com/ar/feed/index.rss"]
        }, {
            title: "Andorra                       ",
            feeds: ["http://www.bondia.ad/rss.xml", "http://www.diariandorra.ad/nXml/nXml.php", "", "http://www.andorradifusio.ad/xml/noticies_destacades_rtva", "http://www.vilaweb.cat/rss/vilaweb.rss"]
        }, {
            title: "Angola                        ",
            feeds: ["http://feedburner.google.com/fb/a/mailverify?uri=club-k-angola&loc=pt_BR", "", "", "http://luandadigital.com/feed.php", "http://www.portaldeangola.com/", "", ""]
        }, {
            title: "Argentina                     ",
            feeds: ["", "http://www.8300.com.ar/category/potpurri/feed/", "", "", "http://www.argentinastar.com/index.php/rss/d9ed072d737073b4", "", "", "http://cataratashoy.com.ar/feed/", "", "http://chacovision.com.ar/feed/", "http://clarin.feedsportal.com/c/33088/f/577681/index.rss", "", "", "", ""]
        }, {
            title: "Armenia                       ",
            feeds: ["", "", "", "", "", "http://hetq.am/arm/rss/news/", "", "http://www.hyebiz.com/feed", "http://hyemedia.com/feed/"]
        }, {
            title: "Australia                     ",
            feeds: ["", "", "", "", "", "", "", "", "", "http://feeds.feedburner.com/TheAustralianNewsNDM#itm=taus|home|aus_homepage_content3_subscriber_only|3|social_fb_tw_gp_em_rss_social|homepage|homepage", "", "", "http://bendigoweekly.designexperts.com.au/RSSRetrieve.aspx?ID=5051&Type=RSS20", ""]
        }, {
            title: "Austria                       ",
            feeds: ["http://www.springermedizin.at/rss-feeds/", "http://austriantimes.at/RSS-Feed/onobase/generatedRssXMLs/news.xml", "", "http://www.apa.at/Site/RSS.xml", "", "http://www.austrianews.co.uk/feed/", ""]
        }, {
            title: "Azerbaijan                    ",
            feeds: ["", "", "", "http://mirzexezerinsesi.net/xml/rss20/feed.xml", "http://www.news.az/articles.rss", "http://www.today.az/rss.php", "http://news.day.az/rss/all.rss"]
        }, {
            title: "Bahamas                       ",
            feeds: ["", "", "http://www.thenassauguardian.com/index.php?option=com_newsfeeds&view=categories", "", "", ""]
        }, {
            title: "Bahrain                       ",
            feeds: ["http://www.akhbar-alkhaleej.com/rss.html", "http://www.albiladpress.com/#demo3", "http://www.alwatannews.net/rss.ashx", "http://www.alayam.com/NewsRss", "", "", "http://www.gulf-daily-news.com/rssfeeds.aspx", "", ""]
        }, {
            title: "Bangladesh                    ",
            feeds: ["http://ctgtimes.com/feed", "http://www.1abcnews.tk/", "", "http://www.bangladeshsun.com/index.php/rss/ba01aa42514dc37d", "http://www.ittefaq.com.bd/rss.xml"]
        }, {
            title: "Barbados                      ",
            feeds: ["", "http://www.barbadostoday.bb/feed", "http://www.caribbean360.com/feed", "", "", "http://www.barbadostoday.bb/feed"]
        }, {
            title: "Belarus                       ",
            feeds: ["http://www.open.by/rss/list", "", "http://www.ng.by/ru/rss", "http://belarustoday.info/rss/en_rss.xml", "http://www.brestonline.com/en/news/news.rss", "http://eng.belta.by/service_folder/rss"]
        }, {
            title: "Belgium                       ",
            feeds: ["http://www.camer.be/rss.php", "http://www.standaard.be/rssfeeds", "http://www.gazettevandetroit.com/comments/feed/langswitch_lang/en/", "http://blogactiv.eu/feed/", "http://www.eumorningpost.com/feed", "http://feeds2.feedburner.com/Expatica-BelgianNewOnExpatica?format=xml", "http://www.hbvl.be/RSS-Feeds"]
        }, {
            title: "Belize                        ",
            feeds: ["http://www.ambergristoday.com/rss.xml", "http://www.belizetimes.bz/feed/", "http://www.reporter.bz/feed/", "", "http://www.freedomhouse.org/news/feed"]
        }, {
            title: "Benin                         ",
            feeds: ["http://feeds.feedburner.com/NewstimeAfrica", "http://allafrica.com/misc/tools/rss.html", "http://www.irinnews.org/rss.aspx", "http://www.infoplease.com/rss/", ""]
        }, {
            title: "Bhutan                        ",
            feeds: ["", "http://ipajournal.com/www.ipajournal.com/rss", "http://asianewsnetwork.feedsportal.com/c/33359/f/566602/index.rss", "", ""]
        }, {
            title: "Bolivia                       ",
            feeds: ["http://www.jornadanet.com/rss.php", "http://www.datos-bo.com/Rss-Revista-Datos-bo", "http://www.eldeber.com.bo/rss/", "http://www.boliviaentusmanos.com/noticias/rss.php", "http://www.eldeber.com.bo/rss/", ""]
        }, {
            title: "Bosnia Herzegovina            ",
            feeds: ["", "", "", "http://www.balkanchronicle.com/#", "http://www.bosnia.org.uk/bosnia.xml", "http://bosnianmediagroup.com/?feed=rss2", "http://www.avaz.ba/rss", "http://feeds.feedburner.com/NezavisneNovine", "http://www.sarajevotimes.com/"]
        }, {
            title: "Botswana                      ",
            feeds: ["http://www.sundaystandard.info/rss.php", "http://feeds.feedburner.com/TheZambezian", "http://feeds.feedburner.com/NewstimeAfrica", "http://www.gazettebw.com/#", "http://feeds.feedburner.com/NewstimeAfrica", ""]
        }, {
            title: "Brazil                        ",
            feeds: ["http://acritica.uol.com.br/rss/rss.html", "http://anoticia.clicrbs.com.br/sc/rss/", "http://jornalatual.com.br/portal/?feed=rss2&cat=13", "http://www.gazetadejoinville.com.br/wp/?feed=comments-rss2", "http://anoticia.clicrbs.com.br/sc/ultimas-noticias-rss/", ""]
        }, {
            title: "Brunei                        ",
            feeds: ["http://www.bt.com.bn/front/feed", "http://borneobulletin.brunei-online.com.bn/?feed=rss2", "http://mediapermata.brunei-online.com/index.php/feed/", "http://www.brudirect.com/#"]
        }, {
            title: "Bulgaria                      ",
            feeds: ["http://feeds.feedburner.com/bulgariagazette", "http://www.bgnewsnet.com/services.php?lang=en&sid=8", "http://www.focus-news.net/rssform/", "http://rsspreview.actualno.com/", "http://www.burgasinfo.com/news/rss/", "http://www.ekipnews.com/rss/", ""]
        }, {
            title: "Burkina                       ",
            feeds: ["http://feeds.feedburner.com/NewstimeAfrica", "http://www.aib.bf/spip.php?page=backend", "http://www.evenement-bf.net/spip.php?page=backend", "http://www.lefaso.net/spip.php?page=backend", "http://www.sidwaya.bf/quotidien/spip.php?page=backend"]
        }, {
            title: "Burundi                       ",
            feeds: ["http://www.burundi-info.com/spip.php?page=backend&lang=fr", "http://www.burundi-gov.org/feed/", "http://www.africa.com/rss-feed/", "http://www.burundi-info.com/spip.php?page=backend&lang=fr", "http://www.burundi-gov.org/feed/", "http://www.jeuneafrique.com/rss/index.php", "http://www.iwacu-burundi.org/feed/"]
        }, {
            title: "Cambodia                      ",
            feeds: ["http://www.cambodiantimes.com/index.php/rss/c7e1014a94f7e43b", ""]
        }, {
            title: "Cameroon                      ",
            feeds: ["", "http://www.cameroononline.org/feed/", "http://www.panapress.com/rss/pana-rss-lang3-index.html"]
        }, {
            title: "Canada                        ",
            feeds: ["", "http://www.canindia.com/rss-feeds/", "http://www.dailytownsman.com/rss/?curSection=%2F&curSection=%2F&curTitle=RSS&curTitle=RSS&c=y&c=y"]
        }, {
            title: "Cape Verde                    ",
            feeds: ["http://www.expressodasilhas.sapo.cv/", "http://asemana.sapo.cv/spip.php?page=inc-page_rss&ak=1&lang=en", "http://www.panapress.com/rss/pana-rss-lang3-index.html"]
        }, {
            title: "Central African Rep           ",
            feeds: ["http://feeds.feedburner.com/NewstimeAfrica", "http://allafrica.com/misc/tools/rss.html"]
        }, {
            title: "Chad                          ",
            feeds: ["http://www.afrik.com/affiliation", "http://www.alwihdainfo.com/xml/syndication.rss", "http://feeds.feedburner.com/NewstimeAfrica"]
        }, {
            title: "Chile                         ",
            feeds: ["http://www.bnamericas.com/tools_es.html#rss", "http://www.cavancha.cl/#", "http://www.chilenoticias.cl/?feed=rss2"]
        }, {
            title: "China                         ",
            feeds: ["http://www.beijingbulletin.com/index.php/rss/55582c89cb296d4c", "", "http://www.chinanationalnews.com/index.php/rss/9366300fc9319e9b"]
        }, {
            title: "Colombia                      ",
            feeds: ["http://feeds.feedburner.com/thecitypaperbogota", "http://colombiareports.co/feed/", "http://hsbnoticias.com/hsbnoticias.xml"]
        }, {
            title: "Comoros                       ",
            feeds: ["", "", "http://allafrica.com/misc/tools/rss.html"]
        }, {
            title: "Congo                         ",
            feeds: ["http://feeds.feedburner.com/radiookapi/actu", "http://www.congoplanet.com/rss_feed_fils_congo_africa.jsp", ""]
        }, {
            title: "Costa Rica                    ",
            feeds: ["http://feeds.feedburner.com/TCRN", "http://www.aldia.cr/rss/", "http://www.diarioextra.com/Dnew/rss"]
        }, {
            title: "Croatia                       ",
            feeds: ["http://www.croatiantimes.com/RSS-Feed/159/General_News", "", "http://www.evarazdin.hr/feed/"]
        }, {
            title: "Cuba                          ",
            feeds: ["http://www.5septiembre.cu/index.php?option=com_fpss&task=module&id=164&format=feed&type=rss&lang=es", "http://www.cubanews.ain.cu/?format=feed&type=rss", "http://havanajournal.com/home/rss/"]
        }, {
            title: "Cyprus                        ",
            feeds: ["http://www.cypruspropertynews.net/feed/", "http://www.cyprusreporter.com/rss", "http://www.financialmirror.com/rss_all.php"]
        }, {
            title: "Czech Republic                ",
            feeds: ["http://www.azathabar.com/rsspage.aspx", "http://feeds.feedburner.com/CzechiaToday", "http://www.denik.cz/rss/", "http://www.ceskenoviny.cz/rss/"]
        }, {
            title: "Denmark                       ",
            feeds: ["http://www.b.dk/", "http://stiften.dk/rss", "http://lyngby-taarbaek.lokalavisen.dk/section/rss"]
        }, {
            title: "Djibouti                      ",
            feeds: ["http://allafrica.com/misc/tools/rss.html", "http://www.hch24.com/feed/", "http://www.lanationdj.com/"]
        }, {
            title: "Dominica                      ",
            feeds: ["http://thedominican.net/dominicanews.xml", "http://www.elcaribe.com.do/rss", "http://www.diariolibre.com/rss.php"]
        }, {
            title: "Dominican Republic            ",
            feeds: ["http://elnacional.com.do/feed/", "http://www.el-nacional.com/rss/", "http://hoy.com.do/feed/"]
        }, {
            title: "East Timor                    ",
            feeds: ["", ""]
        }, {
            title: "Ecuador                       ",
            feeds: ["http://www.bnamericas.com/", "http://www.cuencahighlife.com/syndication.axd", ""]
        }, {
            title: "Egypt                         ",
            feeds: ["http://moheet.com/rssfeed", "http://akhbarelyom.com/RSS/GetSectionRSS?JournalID=1", "http://www.almasryalyoum.com/rss"]
        }, {
            title: "El Salvador                   ",
            feeds: ["http://www.contrapunto.com.sv/obrss/feed/1-diario-digital-contrapunto", "http://www.elsalvador.com/mwedh/paginas/rss.asp", "http://elmundo.com.sv/"]
        }, {
            title: "Equatorial Guinea             ",
            feeds: ["http://www.guineaecuatorialpress.com/guineaecuatorial.rss.php", "http://www.africa.com/rss-feed/", "http://www.afrik-news.com/backend-country25.html"]
        }, {
            title: "Eritrea                       ",
            feeds: ["http://feeds.feedburner.com/capitaleritrea/czgB", "http://reliefweb.int/rss", "http://erigazette.org/"]
        }, {
            title: "Estonia                       ",
            feeds: ["http://www.delfi.ee/misc/rss_new.php", "http://opleht.ee/feed/", "http://balticreports.com/feed/"]
        }, {
            title: "Ethiopia                      ",
            feeds: ["", "http://www.thereporterethiopia.com/index.php/news-headlines?format=feed&type=rss", ""]
        }, {
            title: "Fiji                          ",
            feeds: ["http://fijilive.com/fijilive-rss.Fijilive", "http://www.fijisun.com.fj/2014/04/18/%E2%80%98it%E2%80%99s-manual%E2%80%99/feed/", "http://thejetnewspaper.com/feed/"]
        }, {
            title: "Finland                       ",
            feeds: ["http://www.aamulehti.fi/rss", "http://www.codewit.com/atom", "http://www.helsinkitimes.fi/?format=feed&type=rss"]
        }, {
            title: "France                        ",
            feeds: ["http://french-news-online.com/wordpress/?feed=rss2", "http://www.liberation.fr/rss/", ""]
        }, {
            title: "Gabon                         ",
            feeds: ["http://www.gabonews.com/Gabonews/php/gabonews.rss", "", "http://feeds.feedburner.com/NewstimeAfrica"]
        }, {
            title: "Gambia                        ",
            feeds: ["http://americanstreetnews.com/feed", "http://www.askanisenegambia.com/rssNews/", ""]
        }, {
            title: "Georgia                       ",
            feeds: ["", "http://www.messenger.com.ge/rss.xml"]
        }, {
            title: "Germany                       ",
            feeds: ["http://www.aerztezeitung.de/service/rss/", "", ""]
        }, {
            title: "Ghana                         ",
            feeds: ["http://feeds.feedburner.com/LeadStoriesFromAol", "http://www.globalnewsreel.com/#", "http://www.myjoyonline.com/services/rss/"]
        }, {
            title: "Greece                        ",
            feeds: ["http://www.adapokrites.gr/index.php/rss-%CE%B1%CE%BD%CF%84%CE%B1%CF%80%CE%BF%CE%BA%CF%81%CE%B9%CF%84%CE%B5%CF%82", "http://www.agelioforos.gr/default.asp?pid=255", "http://www.kerdos.gr/rss/%CE%95%CF%80%CE%B9%CF%87%CE%B5%CE%B9%CF%81%CE%AE%CF%83%CE%B5%CE%B9%CF%82.xml"]
        }, {
            title: "Grenada                       ",
            feeds: ["", "", ""]
        }, {
            title: "Guatemala                     ",
            feeds: ["", "http://www.dca.gob.gt/index.php/component/k2/itemlist/category/26-us.feed", "http://www.prensalibre.com/rss/latest/"]
        }, {
            title: "Guinea                        ",
            feeds: ["http://aminata.com/feed/", "http://guineenews.org/feed/", "http://feed.xml/"]
        }, {
            title: "Guinea-Bissau                 ",
            feeds: ["", "http://allafrica.com/misc/tools/rss.html", ""]
        }, {
            title: "Guyana                        ",
            feeds: ["http://news.yahoo.com/rss/", "http://www.guyanagraphic.com/rss.xml", "http://www.guyanaobservernews.org/#"]
        }, {
            title: "Haiti                         ",
            feeds: ["http://feeds2.feedburner.com/HaitiInfo", "", "http://www.haitisun.com/index.php/rss/8d0a8b42a4163d9f"]
        }, {
            title: "Honduras                      ",
            feeds: ["http://www.elheraldo.hn/Otras-Secciones/Servicios/RSS", "http://radiohrn.hn/l/rss.xml", ""]
        }, {
            title: "Hungary                       ",
            feeds: ["http://www.168ora.hu/statikus/rss-hirek-20014.html", "", ""]
        }, {
            title: "Iceland                       ",
            feeds: ["http://www.dv.is/straumur/", "http://icelandreview.com/rss.xml", "http://www.mbl.is/feeds/"]
        }, {
            title: "India                         ",
            feeds: ["http://aajtak.intoday.in.feedsportal.com/c/34152/f/618432/index.rss?option=com_rss&feed=RSS1.0&no_html=1&rsspage=home", "http://abclive.in/", "http://www.akilanews.com/19042014/rss"]
        }, {
            title: "Indonesia                     ",
            feeds: ["http://www.antaranews.com/rss/foto", "http://www.indopos.co.id/", "http://www.thejakartaglobe.com/feed/"]
        }, {
            title: "Iran                          ",
            feeds: ["http://www.alalam.ir/rss-page", "http://www.bbc.co.uk/persian/iran/index.xml", "http://www.donya-e-eqtesad.com/about/rss/"]
        }, {
            title: "Iraq                          ",
            feeds: ["", "http://www.alefyaa.com/?feed=rss2", "http://www.bbc.co.uk/arabic/index.xml"]
        }, {
            title: "Ireland                       ",
            feeds: ["http://www.ballymenatimes.com.dynamic.feedsportal.com/pf/610127/www.ballymenatimes.com/rss/cmlink/1.5498888", "http://www.theepochtimes.com/n3/rssfeeds/", "http://www.limerickleader.ie.dynamic.feedsportal.com/pf/610117/www.limerickleader.ie/rss/cmlink/1.1354751"]
        }, {
            title: "Israel                        ",
            feeds: ["http://akhbarna.com/ar/feed/", "http://www.israelnationalnews.com/More/ActivePage.aspx/RSS", "http://www.israelsmessenger.com/feed/"]
        }, {
            title: "Italy                         ",
            feeds: ["http://www.affaritaliani.it/rss/", "http://www.corrieredelgiorno.com/feed/", "http://www.gomarche.it/rss_news.xml"]
        }, {
            title: "Ivory Coast                   ",
            feeds: ["http://feeds.feedburner.com/NewstimeAfrica", "", "", ""]
        }, {
            title: "Jamaica                       ",
            feeds: ["http://jamaica-gleaner.com/feed/lead.xml", "http://www.jamaicaobserver.com/rss/", "http://www.jamaicantimes.com/index.php/rss/8fdef8065235cb7f"]
        }, {
            title: "Japan                         ",
            feeds: ["http://www.asahi.com/information/service/rss.html?iref=com_snavi", "http://feeds.feedburner.com/chibanippo", "http://www.chunichi.co.jp/article/release/"]
        }, {
            title: "Jordan                        ",
            feeds: ["http://alarabalyawm.net/?feed=rss2", "http://www.albaladeyes.com/rss.xml", "http://feeds.feedburner.com/TheJordanTimes-LatestNews"]
        }, {
            title: "Kazakhstan                    ",
            feeds: ["http://deutsche-allgemeine-zeitung.de/de/component/option,com_rss/feed,RSS2.0/no_html,1/", "", "http://inform.kz/rss/kaz.xml"]
        }, {
            title: "Kenya                         ",
            feeds: ["http://www.nation.co.ke/-/1148/1148/-/view/asFeed/-/vtvnjq/-/index.xml", "", "http://feeds.feedburner.com/NewstimeAfrica"]
        }, {
            title: "Kiribati                      ",
            feeds: ["http://kiribatiupdates.com.ki/feed/", "http://www.topix.com/rss/world/kiribati", ""]
        }, {
            title: "Korea North                   ",
            feeds: ["http://www.northkoreatimes.com/index.php/rss/08aysdf7tga9s7f7"]
        }, {
            title: "Korea South                   ",
            feeds: ["http://asiancorrespondent.com/feed/", "", ""]
        }, {
            title: "Kosovo                        ",
            feeds: ["http://8am.af/feed/", "", "", "http://www.afghanistansun.com/index.php/rss/6e1d5c8e1f98f17c", "", "", "http://www.dawatfreemedia.org/english/index.php?mod=rss", "http://www.khaama.com/category/sport/feed", "", "", "", "", "", "http://www.taand.com/feed", "http://bloguna.tolafghan.com/rss/index/xml", "http://feeds.feedburner.com/Wadsam"]
        }, {
            title: "Kuwait                        ",
            feeds: ["http://www.alaan.cc/rssfeed.asp", "http://www.alanba.com.kw/rss/", "http://al-seyassah.com/subscriber/", ""]
        }, {
            title: "Kyrgyzstan                    ",
            feeds: ["http://internews.kg/feed/", "", "http://www.bbc.co.uk/kyrgyz/index.xml"]
        }, {
            title: "Laos                          ",
            feeds: ["", "http://www.bignewsnetwork.com/index.php/nav/showrss", "http://www.irinnews.org/rss.aspx"]
        }, {
            title: "Latvia                        ",
            feeds: ["http://www.balticdailynews.com/#", "http://bnn-news.com/feed", "http://balticreports.com/feed/"]
        }, {
            title: "Lebanon                       ",
            feeds: ["http://www.7akisa7.com/feed", "http://www.charlesayoub.com/RSS-cat", "http://www.alwatanalarabi.com/news/subscribe.rss"]
        }, {
            title: "Lesotho                       ",
            feeds: ["http://allafrica.com/misc/tools/rss.html", "http://www.panapress.com/rss/pana-rss-lang3-index.html", "http://lestimes.com/?feed=rss2"]
        }, {
            title: "Liberia                       ",
            feeds: ["http://www.liberianobserver.com/rss.xml", "http://www.gnnliberia.com/rss.xml", ""]
        }, {title: "Libya                         ", feeds: [""]}, {
            title: "Liechtenstein                 ",
            feeds: ["http://www.radio.li/RssNewsFeed.xml", ""]
        }, {
            title: "Lithuania                     ",
            feeds: ["http://www.aina.lt/feed/", "http://www.balticdailynews.com/#", "http://balticreports.com/feed/"]
        }, {
            title: "Luxembourg                    ",
            feeds: ["http://www.wort.lu/rss/de", "", "http://www.tageblatt.lu/links/rss.tmpl"]
        }, {
            title: "Macedonia                     ",
            feeds: ["", "http://www.koha.mk/feed/index.1.rss", ""]
        }, {
            title: "Madagascar                    ",
            feeds: ["http://www.lexpressmada.com/feed", "http://www.midi-madagasikara.mg/politique/feed/", "http://www.panapress.com/rss/pana-rss-lang3-index.html"]
        }, {
            title: "Malawi                        ",
            feeds: ["http://www.maravipost.com/component/obrss/3-the-maravi-post.html", "http://feeds.feedburner.com/NewstimeAfrica", "http://www.nyasatimes.com/category/sports/feed/"]
        }, {
            title: "Malaysia                      ",
            feeds: ["http://asiancorrespondent.com/feed/", "http://www.theborneopost.com/feed/", "http://www.dainiksansar.com/feeds/posts/default"]
        }, {
            title: "Maldives                      ",
            feeds: ["http://haamadaily.com/feed/", "http://www.haveeru.com.mv/rss/", "http://feeds.feedburner.com/minivannews/rStS?format=xml"]
        }, {
            title: "Mali                          ",
            feeds: ["http://www.afrik-news.com/backend-country33.html", "http://www.irinnews.org/rss.aspx", "http://www.kullhadd.com/feed/rss.html"]
        }, {title: "Malta                         ", feeds: []}, {
            title: "Marshall Islands              ",
            feeds: ["http://www.yokwe.net/index.php?module=News&func=view&theme=rss", "", "http://feeds.bbci.co.uk/news/world/asia/rss.xml"]
        }, {
            title: "Mauritania                    ",
            feeds: ["", "http://www.kinews.info/feed/", "http://www.defimedia.info/dimanche-hebdo.feed"]
        }, {
            title: "Mauritius                     ",
            feeds: ["http://www.businessmag.mu/rss.xml", "http://www.lexpress.mu/rss.xml", ""]
        }, {
            title: "Mexico                        ",
            feeds: ["http://agpnoticias.com/news/?feed=rss2", "http://www.diariodemorelos.com/rss/articles/all", "http://www.elsiglodetorreon.com.mx/rss/"]
        }, {title: "Micronesia                    ", feeds: [""]}, {
            title: "Moldova                       ",
            feeds: ["", "", ""]
        }, {
            title: "Monaco                        ",
            feeds: ["", ""]
        }, {
            title: "Mongolia                      ",
            feeds: ["http://www.mol.mn/rssfeeds.php", "http://www.mongoliatoday.com/?feed=rss2", "http://ubpost.mongolnews.mn/?feed=rss2"]
        }, {
            title: "Montenegro                    ",
            feeds: ["http://www.rtcg.me/rss-feeds.html", "http://www.cdm.me/servisi/rss", "http://www.montenews.me/rss.php"]
        }, {
            title: "Morocco                       ",
            feeds: ["http://www.albawaba.com/ar/rss-ar", "", "http://www.map.ma/en/top-news/regional/feed"]
        }, {
            title: "Mozambique                    ",
            feeds: ["http://feeds.feedburner.com/NewstimeAfrica", "", "http://www.irinnews.org/rss.aspx"]
        }, {
            title: "Myanmar, {Burma}              ",
            feeds: ["http://www.bignewsnetwork.com/index.php/nav/showrss", "http://www.myanmarnews.net/index.php/rss/c3891022f175b678"]
        }, {
            title: "Namibia                       ",
            feeds: ["", "http://www.namibian.com.na/rss_feed.php", "http://www.sun.com.na/rss.xml"]
        }, {
            title: "Nauru                         ",
            feeds: ["", "http://rss.nzherald.co.nz/rss/xml/nzhrsslocid_000000068.xml"]
        }, {
            title: "Nepal                         ",
            feeds: ["http://www.ebaglung.com/?feed=rss2", "http://thehimalayantimes.com/rssList.php", "http://feeds.feedburner.com/ImageChannel"]
        }, {
            title: "Netherlands                   ",
            feeds: ["http://www.adformatie.nl/rss-adformatie", "http://www.ad.nl/rss.xml", "http://www.bndestem.nl/rss-feeds-1.212531"]
        }, {
            title: "New Zealand                   ",
            feeds: ["http://www.nzherald.co.nz/rss/", "http://www.scoop.co.nz/about/rss.html?Source=Getmore", "http://www.gisborneherald.co.nz/articlesrss.aspx?tags=focus+on+the+land"]
        }, {
            title: "Nicaragua                     ",
            feeds: ["http://www.confidencial.com.ni/feed", "http://www.elnuevodiario.com.ni/rss", "http://www.laprensa.com.ni/2014/04/23/poderes"]
        }, {
            title: "Niger                         ",
            feeds: ["", "http://feeds.bbci.co.uk/news/world/africa/rss.xml", "http://www.friendsofniger.org/feed/"]
        }, {
            title: "Nigeria                       ",
            feeds: ["", "http://theadvocatengr.com/new/?feed=rss2", "http://africanheraldexpress.com/blog8/feed/"]
        }, {
            title: "Norway                        ",
            feeds: ["http://www.adressa.no/?widgetName=polarisFeeds&widgetId=3185248&getXmlFeed=true", "http://www.aftenbladet.no/rss/?kat=aenergy", "http://www.norwaytoday.info/rss.php"]
        }, {
            title: "Oman                          ",
            feeds: ["http://shabiba.com/rss.aspx", "http://alwatan.com/feed", "http://truth-out.org/feed?format=feed"]
        }, {
            title: "Pakistan                      ",
            feeds: ["http://dunyanews.tv/news.xml", "http://paktribune.com/rss/", "http://www.bignewsnetwork.com/index.php/nav/showrss"]
        }, {
            title: "Palau                         ",
            feeds: ["", "http://www.critica.com.pa/contenidos/rss.html", "http://www.newsroompanama.com/index.php?option=com_ninjarsssyndicator&feed_id=1"]
        }, {title: "Panama                        ", feeds: []}, {
            title: "Papua New Guinea              ",
            feeds: ["", "", ""]
        }, {
            title: "Paraguay                      ",
            feeds: ["http://ea.com.py/feed/", "http://www.lanacion.com.py/xml/rss.xml"]
        }, {
            title: "Peru                          ",
            feeds: ["http://www.bnamericas.com/tools_es.html#rss", "http://gestion.pe/feed/lista", "http://elcomercio.pe/rss"]
        }, {
            title: "Philippines                   ",
            feeds: ["http://asiancorrespondent.com/feed/", "http://www.gmanetwork.com/news/rss", "http://www.philstar.com/rss"]
        }, {
            title: "Poland                        ",
            feeds: ["http://rss.dziennik.pl/Dziennik-PL/", "http://express.bydgoski.pl/najnowsze.rss", "http://gazetasredzka.pl/?feed=atom"]
        }, {
            title: "Portugal                      ",
            feeds: ["http://www.abola.pt/rssinfo/index.aspx", "http://algarvedailynews.com/news?format=feed&type=rss", "http://www.diariodetrasosmontes.com/noticias/rss.php3"]
        }, {
            title: "Qatar                         ",
            feeds: ["http://www.alarab.qa/new/rssfeeds.php?issueId=2327", "http://cs.gulf-times.com/GulfTimesNewsWebsite/rss.aspx?PortalName=GulfTimes&ListName=TopNewsList", "http://www.qatardailystar.com/feed/"]
        }, {
            title: "Romania                       ",
            feeds: ["http://www.romaniantimes.at/General%20News", "http://www.agentia.org/rss-Agentia.org.html", "http://www.gandul.info/rss-all.html"]
        }, {
            title: "Russia                        ",
            feeds: ["http://www.aif.ru/rss/all.php", "http://www.caucasianreview.com/feed/", "http://www.gazeta.ru/export_news.shtml", "", "http://www.telegraph.co.uk/topics/follow-us/"]
        }, {
            title: "Rwanda                        ",
            feeds: ["http://feeds.feedburner.com/newsofrwanda", "http://feeds.feedburner.com/RwandaEye", "http://www.newtimes.co.rw/news/feeds/new_times_front_page.xml"]
        }, {
            title: "St Kitts & Nevis              ",
            feeds: ["", "", "http://www.thestkittsnevisobserver.com/subscriptions.html"]
        }, {
            title: "St Lucia                      ",
            feeds: ["", "http://www.stlucianewsonline.com/feed", ""]
        }, {
            title: "Saint Vincent & the Grenadines",
            feeds: ["", "http://vincyview.com/category/news-and-sports/"]
        }, {
            title: "Samoa                         ",
            feeds: ["", "http://www.samoaobserver.ws/local-news", "http://www.surfnewmedia.com/rss.xml"]
        }, {
            title: "San Marino                    ",
            feeds: ["http://feeds.feedburner.com/sanmarinonotizie/wCEE", "http://www.feed.com/"]
        }, {
            title: "Sao Tome & Principe           ",
            feeds: ["http://www.jeuneafrique.com/rss/index.php", "http://reliefweb.int/rss"]
        }, {
            title: "Saudi Arabia                  ",
            feeds: ["http://www.akhbaralarab.net/feed/", "http://www.aleqt.com/page/view/rss", "http://www.almokhtsar.com/RSS"]
        }, {
            title: "Senegal                       ",
            feeds: ["", "", ""]
        }, {
            title: "Serbia                        ",
            feeds: ["http://www.balkans.com/subscribe_to_our_rss.php", "http://www.glas-javnosti.rs/rss"]
        }, {
            title: "Seychelles                    ",
            feeds: ["", ""]
        }, {
            title: "Sierra Leone                  ",
            feeds: ["", "http://feeds.feedburner.com/SierraExpressMedia"]
        }, {
            title: "Singapore                     ",
            feeds: ["http://asiatoday.com/pressrelease/rss.xml", "http://asiancorrespondent.com/feed/", "http://online.wsj.com/public/page/rss_news_and_feeds.html?mod=WSJ_footer"]
        }, {
            title: "Slovakia                      ",
            feeds: ["", ""]
        }, {
            title: "Slovenia                      ",
            feeds: ["http://www.delo.si/rss/", "http://www.dnevnik.si/rss/kaj_je_rss", "http://www.euportal.si/en/feed/"]
        }, {
            title: "Solomon Islands               ",
            feeds: ["http://www.sibconline.com.sb/feed/", ""]
        }, {
            title: "Somalia                       ",
            feeds: ["", "", "http://www.todayonline.com/rss-feeds"]
        }, {
            title: "South Africa                  ",
            feeds: ["http://www.theannouncer.co.za/", "http://www.bdlive.co.za/?filter=rss", "http://www.iol.co.za/cmlink/1.730910"]
        }, {
            title: "Spain                         ",
            feeds: ["http://ultimahora.es/mallorca/feed.rss", "http://www.elalmeria.es/rss/articles.php", "http://www.arndigital.com/articulos_rss.php", "", "http://feeds2.feedburner.com/olivepressnewspaper", "", "http://servicios.elpais.com/rss/"]
        }, {
            title: "Sri Lanka                     ",
            feeds: ["http://www.dailymirror.lk/rss/", "", "http://dinamina.lk/rss.asp", "", "", "http://lankadeepa.lk/index.php/maincontroller/breakingnews_rss", "", "", "", "", "http://www.lakbima.lk/index.php?option=com_content&view=article&id=18959", "http://virakesari.lk/taxonomy/term/5/all/feed", "http://www.dinakaran.com/rss_dkn.asp"]
        }, {
            title: "Sudan                         ",
            feeds: ["", "", ""]
        }, {
            title: "Suriname                      ",
            feeds: ["http://www.dbsuriname.com/dbsuriname/index.php/feed/", ""]
        }, {
            title: "Swaziland                     ",
            feeds: ["http://oraclesyndicate.twoday.net/summary.rdf", "http://www.newstimeafrica.com/archives/category/southern-africa/swaziland", "http://www.observer.org.sz/feed.php?output_type=rss"]
        }, {
            title: "Sweden                        ",
            feeds: ["", "", "http://www.alingtid.se/atsomxml.asp", "http://www.government.se/sb/d/8945"]
        }, {
            title: "Switzerland                   ",
            feeds: ["http://www.20min.ch/share/", "http://www.anmorgenland.com/feed/", "http://www.annabelle.ch/newsletter-rss"]
        }, {
            title: "Syria                         ",
            feeds: ["", "http://www.alwatan.sy/rss.aspx", "http://www.kassioun.org/#"]
        }, {
            title: "Taiwan                        ",
            feeds: ["http://asiatoday.com/pressrelease/rss.xml", "http://www.chinapost.com.tw/rss/", "http://www.chinatimes.com/"]
        }, {
            title: "Tajikistan                    ",
            feeds: ["http://www.ozodi.tj/rsspage.aspx", "http://russian.eurasianet.org/taxonomy/term/9/0/feed", "http://www.tajikistannews.net/index.php/rss/c08dd24cec417021"]
        }, {
            title: "Tanzania                      ",
            feeds: ["", "http://www.thecitizen.co.tz/-/1765046/1765046/-/view/asFeed/-/stj0vxz/-/index.xml", ""]
        }, {
            title: "Thailand                      ",
            feeds: ["http://asiancorrespondent.com/feed/", ""]
        }, {
            title: "Togo                          ",
            feeds: ["http://www.republicoftogo.com/republicoftogo/rss", "http://feeds.feedburner.com/NewstimeAfrica"]
        }, {
            title: "Tonga                         ",
            feeds: ["http://8am.af/feed/", "", "", "http://www.afghanistansun.com/index.php/rss/6e1d5c8e1f98f17c", "", "", "http://www.dawatfreemedia.org/english/index.php?mod=rss", "http://www.khaama.com/category/sport/feed", "", "", "", "", "", "http://www.taand.com/feed", "http://bloguna.tolafghan.com/rss/index/xml", "http://feeds.feedburner.com/Wadsam"]
        }, {
            title: "Trinidad & Tobago             ",
            feeds: ["", "http://www.trinidadexpress.com/?sitemap=rss", "http://newsday.co.tt/rss.xml"]
        }, {
            title: "Tunisia                       ",
            feeds: ["http://www.africanmanager.com/rss/index.php", "http://www.alchourouk.com/xml_top_article/rss.xml", "http://www.alchourouk.com/xml_top_article/rss.xml"]
        }, {
            title: "Turkey                        ",
            feeds: ["http://www.aksam.com.tr/cache/rss.xml", "http://www.aygazete.com/rss", "http://www.fanatik.com.tr/default.aspx?aType=Rss"]
        }, {title: "Turkmenistan                  ", feeds: [""]}, {
            title: "Tuvalu                        ",
            feeds: [""]
        }, {
            title: "Uganda                        ",
            feeds: ["http://www.bukedde.co.ug/rss.aspx", ""]
        }, {
            title: "Ukraine                       ",
            feeds: ["", "", "http://rt.com/rss/news/", "http://subscribe.theguardian.com/", "http://zn.ua/rss/", "http://www.segodnya.ua/xml/rss.html"]
        }, {
            title: "United Arab Emirates          ",
            feeds: ["http://www.alarabiya.net/tools/mrss.html", "http://www.albayan.ae/rss-7.1835693", "http://www.arabianbusiness.com/industries/real-estate/?service=rss", "http://www.alittihad.ae/rss.php"]
        }, {
            title: "United Kingdom                ",
            feeds: ["http://www.independent.co.uk/voices/?service=rss", "", "http://www.telegraph.co.uk/topics/follow-us/", "https://login.thetimes.co.uk/?gotoUrl=http%3A%2F%2Fwww.thetimes.co.uk%2Ftto%2Fnewsrss%2F%3Fservice%3Drss"]
        }, {
            title: "United States                 ",
            feeds: ["http://www.nytimes.com/services/xml/rss/index.html", "", "", "http://feeds.theguardian.com/theguardian/world/usa/rss", "http://www.nytimes.com/services/xml/rss/index.html", "http://www.usatoday.com/rss/"]
        }, {
            title: "Uruguay                       ",
            feeds: ["", "", "http://www.elguichonense.com/", "http://www.elpais.com.uy/rss/", "http://feeds.feedburner.com/themejunkie", "http://www.unoticias.com.uy/RSS/index.php"]
        }, {
            title: "Uzbekistan                    ",
            feeds: ["", "http://www.ozodlik.org/rsspage.aspx", "http://www.uznews.net/en/rss", "http://enews.fergananews.com/news.xml", "http://www.gov.uz/en/press/rss/"]
        }, {
            title: "Vanuatu                       ",
            feeds: ["http://vanuatudaily.wordpress.com/feed/", "http://feeds.feedburner.com/Vanuatu2ucom-LatestNews"]
        }, {
            title: "Vatican City                  ",
            feeds: ["http://www.news.va/en/rss.xml", "http://abcnews.go.com/Site/page?id=3520115", "http://www.misna.org/feed", "http://www.zenit.org/en/feed"]
        }, {
            title: "Venezuela                     ",
            feeds: ["http://www.eluniversal.com/rss", "http://www.noticierodigital.com/blogs/", "http://www.bignewsnetwork.com/index.php/nav/showrss", "http://venezuelanalysis.com/rss", ""]
        }, {
            title: "Vietnam                       ",
            feeds: ["http://www.thanhniennews.com/rss/society-4.rss", "http://www.giaoduc.edu.vn/FileNotFound.htm?aspxerrorpath=/NewsRss.aspx", "http://www.doisongphapluat.com/rss.html", "http://nld.com.vn/rss.htm", "http://www.thanhnien.com.vn/pages/rss.aspx", "http://vietnamnet.vn/vn/cong-nghe-thong-tin-vien-thong/"]
        }, {
            title: "Yemen                         ",
            feeds: ["http://www.alhawyah.com/news/feed", "", "", "http://www.yementimes.com/?tpl=1341", "http://al-teef.net/feed/"]
        }, {
            title: "Zambia                        ",
            feeds: ["http://www.muvitv.com/comments/feed/", "http://zambia.co.zm/feed/", "", ""]
        }, {
            title: "Zimbabwe                      ",
            feeds: ["", "", "", "http://www.newzimbabwe.com/rss/rss.xml"]
        }, {title: "Rest of the world             ", feeds: []}];

        var industries = [{
            title: "SKIP THIS STEP                   ",
            feeds: []
        }, {
            title: "Pets                             ",
            feeds: ["http://kb.rspca.org.au/rss.php?c=98", "http://kb.rspca.org.au/rss.php?c=4"]
        }, {
            title: "Agriculture                      ",
            feeds: ["http://www.reddit.com/r/Agriculture/.rss"]
        }, {
            title: "Beverage & Tobacco               ",
            feeds: ["http://www.reddit.com/r/alcohol/.rss"]
        }, {
            title: "Accounting                       ",
            feeds: ["http://www.reddit.com/r/Accounting/.rss"]
        }, {
            title: "Advertising                      ",
            feeds: ["http://www.reddit.com/r/advertising/.rss"]
        }, {
            title: "Aerospace                        ",
            feeds: ["http://www.reddit.com/r/aerospace/.rss"]
        }, {
            title: "Aircraft                         ",
            feeds: ["http://www.reddit.com/r/aviation/.rss"]
        }, {
            title: "Airline                          ",
            feeds: ["http://www.reddit.com/r/aviation/.rss"]
        }, {
            title: "Architecture                     ",
            feeds: ["http://www.reddit.com/r/architecture/.rss"]
        }, {
            title: "Automotive                       ",
            feeds: ["http://www.reddit.com/r/automotive/.rss"]
        }, {
            title: "Banking                          ",
            feeds: ["http://www.reddit.com/r/Banking/.rss"]
        }, {
            title: "Biotechnology                    ",
            feeds: ["http://www.reddit.com/r/biotechnology/.rss", "http://www.cell.com/rssFeed/biotechnology/rss.mostread.xml"]
        }, {
            title: "Design                           ",
            feeds: ["http://www.reddit.com/r/Design/.rss"]
        }, {
            title: "Software                         ",
            feeds: ["http://www.reddit.com/r/software/.rss"]
        }, {
            title: "Education                        ",
            feeds: ["http://www.reddit.com/r/Teachers/.rss", "http://www.reddit.com/r/education/.rss"]
        }, {
            title: "Sports                           ",
            feeds: ["http://www.reddit.com/r/sports/.rss"]
        }, {
            title: "Electronics                      ",
            feeds: ["http://www.reddit.com/r/.rss"]
        }, {
            title: "Energy                           ",
            feeds: ["http://www.reddit.com/r/energy/.rss"]
        }, {
            title: "Entertainment & Leisure          ",
            feeds: ["http://www.reddit.com/r/entertainment/.rss"]
        }, {
            title: "Television                       ",
            feeds: ["http://www.reddit.com/r/television/.rss"]
        }, {
            title: "Financial Services               ",
            feeds: ["http://www.reddit.com/r/finance/.rss", "http://www.reddit.com/r/FinancialCareers/.rss"]
        }, {
            title: "Food                             ",
            feeds: ["http://www.food.com/rss?"]
        }, {
            title: "Health Care                      ",
            feeds: ["http://www.reddit.com/r/food/.rss"]
        }, {
            title: "Legal                            ",
            feeds: ["http://www.reddit.com/r/investing/.rss"]
        }, {
            title: "Manufacturing                    ",
            feeds: ["http://www.reddit.com/r/manufacturing/.rss"]
        }, {
            title: "Motion Picture & Video           ",
            feeds: ["http://www.reddit.com/r/movies/.rss"]
        }, {
            title: "Music                            ",
            feeds: ["http://www.rollingstone.com/siteServices/rss/songReviews"]
        }, {
            title: "Newspaper Publishers             ",
            feeds: ["http://www.reddit.com/r/newspapers/.rss", "http://www.reddit.com/r/publishing/.rss"]
        }, {
            title: "Publishing                       ",
            feeds: ["http://www.reddit.com/r/publishing/.rss"]
        }, {
            title: "Real Estate                      ",
            feeds: ["http://www.reddit.com/r/RealEstate/.rss"]
        }, {
            title: "Technology                       ",
            feeds: ["http://www.reddit.com/r/technology/.rss"]
        }, {
            title: "Transportation                   ",
            feeds: ["http://www.reddit.com/r/Transportation/.rss"]
        }
        ];


        return {
            getIndustriesFeedsUrl: function () {
                return industries;
            },
            getCountriesFeedUrl: function () {
                return countries;
            }
        };
    });
