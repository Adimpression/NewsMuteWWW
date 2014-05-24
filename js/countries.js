/**
 * Created with JetBrains WebStorm.
 * User: News Mute
 * Date: 24/5/14
 * Time: 12:26 PM
 */

const countries = [
    {'title': 'Skip Selecting                ', 'feeds': [
    ]},
    {'title': 'Afghanistan                   ', 'feeds': [
    ]},
    {'title': 'Albania                       ', 'feeds': [
    ]},
    {'title': 'Algeria                       ', 'feeds': [
    ]},
    {'title': 'Andorra                       ', 'feeds': [
    ]},
    {'title': 'Argentina                     ', 'feeds': [
    ]},
    {'title': 'Armenia                       ', 'feeds': [
    ]},
    {'title': 'Australia                     ', 'feeds': [
    ]},
    {'title': 'Austria                       ', 'feeds': [
    ]},
    {'title': 'Azerbaijan                    ', 'feeds': [
    ]},
    {'title': 'Bahamas                       ', 'feeds': [
    ]},
    {'title': 'Bahrain                       ', 'feeds': [
    ]},
    {'title': 'Bangladesh                    ', 'feeds': [
    ]},
    {'title': 'Barbados                      ', 'feeds': [
    ]},
    {'title': 'Belarus                       ', 'feeds': [
    ]},
    {'title': 'Belgium                       ', 'feeds': [
    ]},
    {'title': 'Belize                        ', 'feeds': [
    ]},
    {'title': 'Benin                         ', 'feeds': [
    ]},
    {'title': 'Bhutan                        ', 'feeds': [
    ]},
    {'title': 'Bolivia                       ', 'feeds': [
    ]},
    {'title': 'Bosnia Herzegovina            ', 'feeds': [
    ]},
    {'title': 'Botswana                      ', 'feeds': [
    ]},
    {'title': 'Brazil                        ', 'feeds': [
    ]},
    {'title': 'Brunei                        ', 'feeds': [
    ]},
    {'title': 'Bulgaria                      ', 'feeds': [
    ]},
    {'title': 'Burkina                       ', 'feeds': [
    ]},
    {'title': 'Burundi                       ', 'feeds': [
    ]},
    {'title': 'Cambodia                      ', 'feeds': [
    ]},
    {'title': 'Cameroon                      ', 'feeds': [
    ]},
    {'title': 'Canada                        ', 'feeds': [
    ]},
    {'title': 'Cape Verde                    ', 'feeds': [
    ]},
    {'title': 'Central African Rep           ', 'feeds': [
    ]},
    {'title': 'Chad                          ', 'feeds': [
    ]},
    {'title': 'Chile                         ', 'feeds': [
    ]},
    {'title': 'China                         ', 'feeds': [
    ]},
    {'title': 'Colombia                      ', 'feeds': [
    ]},
    {'title': 'Comoros                       ', 'feeds': [
    ]},
    {'title': 'Congo                         ', 'feeds': [
    ]},
    {'title': 'Congo {Democratic Rep}        ', 'feeds': [
    ]},
    {'title': 'Costa Rica                    ', 'feeds': [
    ]},
    {'title': 'Croatia                       ', 'feeds': [
    ]},
    {'title': 'Cuba                          ', 'feeds': [
    ]},
    {'title': 'Cyprus                        ', 'feeds': [
    ]},
    {'title': 'Czech Republic                ', 'feeds': [
    ]},
    {'title': 'Denmark                       ', 'feeds': [
    ]},
    {'title': 'Djibouti                      ', 'feeds': [
    ]},
    {'title': 'Dominica                      ', 'feeds': [
    ]},
    {'title': 'Dominican Republic            ', 'feeds': [
    ]},
    {'title': 'East Timor                    ', 'feeds': [
    ]},
    {'title': 'Ecuador                       ', 'feeds': [
    ]},
    {'title': 'Egypt                         ', 'feeds': [
    ]},
    {'title': 'El Salvador                   ', 'feeds': [
    ]},
    {'title': 'Equatorial Guinea             ', 'feeds': [
    ]},
    {'title': 'Eritrea                       ', 'feeds': [
    ]},
    {'title': 'Estonia                       ', 'feeds': [
    ]},
    {'title': 'Ethiopia                      ', 'feeds': [
    ]},
    {'title': 'Fiji                          ', 'feeds': [
    ]},
    {'title': 'Finland                       ', 'feeds': [
    ]},
    {'title': 'France                        ', 'feeds': [
    ]},
    {'title': 'Gabon                         ', 'feeds': [
    ]},
    {'title': 'Gambia                        ', 'feeds': [
    ]},
    {'title': 'Georgia                       ', 'feeds': [
    ]},
    {'title': 'Germany                       ', 'feeds': [
    ]},
    {'title': 'Ghana                         ', 'feeds': [
    ]},
    {'title': 'Greece                        ', 'feeds': [
    ]},
    {'title': 'Grenada                       ', 'feeds': [
    ]},
    {'title': 'Guatemala                     ', 'feeds': [
    ]},
    {'title': 'Guinea                        ', 'feeds': [
    ]},
    {'title': 'Guinea-Bissau                 ', 'feeds': [
    ]},
    {'title': 'Guyana                        ', 'feeds': [
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
    {'title': 'Yemen                         ', 'feeds': [
    ]},
    {'title': 'Zambia                        ', 'feeds': [
    ]},
    {'title': 'Zimbabwe                      ', 'feeds': [
    ]},
    {'title': 'Rest of the world             ', 'feeds': [
    ]}
];

