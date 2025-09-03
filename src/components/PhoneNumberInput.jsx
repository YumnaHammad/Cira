import React, { useState, useEffect } from 'react';
import PhoneInput from 'react-phone-number-input';
import { parsePhoneNumber, isValidPhoneNumber } from 'libphonenumber-js';
import 'react-phone-number-input/style.css';

const PhoneNumberInput = ({ value, onChange, error, placeholder = "Phone Number" }) => {
  const [formattedValue, setFormattedValue] = useState(value);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState({
    code: 'US',
    name: 'United States',
    dialCode: '+1',
    flag: '🇺🇸'
  });

  // Country-specific digit limits and formatting
  const getCountryInfo = (countryCode) => {
    const countryLimits = {
      'US': { digits: 10, format: 'XXX-XXX-XXXX' },
      'CA': { digits: 10, format: 'XXX-XXX-XXXX' },
      'GB': { digits: 10, format: 'XXXX XXX XXX' },
      'AU': { digits: 9, format: 'XXXX XXX XXX' },
      'DE': { digits: 11, format: 'XXX XXXXXXXX' },
      'FR': { digits: 9, format: 'XX XX XX XX XX' },
      'IT': { digits: 10, format: 'XXX XXX XXXX' },
      'ES': { digits: 9, format: 'XXX XX XX XX' },
      'PK': { digits: 10, format: 'XXX-XXXXXXX' }, // Pakistan
      'IN': { digits: 10, format: 'XXXXX XXXXX' }, // India
      'BD': { digits: 10, format: 'XXXX-XXXXXX' }, // Bangladesh
      'CN': { digits: 11, format: 'XXX XXXX XXXX' }, // China
      'JP': { digits: 10, format: 'XX-XXXX-XXXX' }, // Japan
      'KR': { digits: 10, format: 'XXX-XXXX-XXXX' }, // South Korea
      'BR': { digits: 10, format: 'XX XXXXX-XXXX' }, // Brazil
      'MX': { digits: 10, format: 'XXX XXX XXXX' }, // Mexico
      'RU': { digits: 10, format: 'XXX XXX-XX-XX' }, // Russia
      'SA': { digits: 9, format: 'XXX XXX XXX' }, // Saudi Arabia
      'AE': { digits: 9, format: 'XX XXX XXXX' }, // UAE
      'EG': { digits: 10, format: 'XXX XXX XXXX' }, // Egypt
      'ZA': { digits: 9, format: 'XX XXX XXXX' }, // South Africa
      'NG': { digits: 10, format: 'XXX XXX XXXX' }, // Nigeria
      'KE': { digits: 9, format: 'XXX XXX XXX' }, // Kenya
      'TR': { digits: 10, format: 'XXX XXX XX XX' }, // Turkey
      'IR': { digits: 10, format: 'XXX XXX XXXX' }, // Iran
      'IQ': { digits: 10, format: 'XXX XXX XXXX' }, // Iraq
      'JO': { digits: 9, format: 'XX XXX XXXX' }, // Jordan
      'LB': { digits: 8, format: 'XX XXX XXX' }, // Lebanon
      'SY': { digits: 9, format: 'XXX XXX XXX' }, // Syria
      'IL': { digits: 9, format: 'XX-XXX-XXXX' }, // Israel
      'PS': { digits: 9, format: 'XX XXX XXXX' }, // Palestine
    };
    return countryLimits[countryCode] || { digits: 10, format: 'XXX XXX XXXX' };
  };

  // Comprehensive country list with flags
  const countries = [
    { code: 'US', name: 'United States', dialCode: '+1', flag: '🇺🇸' },
    { code: 'CA', name: 'Canada', dialCode: '+1', flag: '🇨🇦' },
    { code: 'GB', name: 'United Kingdom', dialCode: '+44', flag: '🇬🇧' },
    { code: 'AU', name: 'Australia', dialCode: '+61', flag: '🇦🇺' },
    { code: 'DE', name: 'Germany', dialCode: '+49', flag: '🇩🇪' },
    { code: 'FR', name: 'France', dialCode: '+33', flag: '🇫🇷' },
    { code: 'IT', name: 'Italy', dialCode: '+39', flag: '🇮🇹' },
    { code: 'ES', name: 'Spain', dialCode: '+34', flag: '🇪🇸' },
    { code: 'NL', name: 'Netherlands', dialCode: '+31', flag: '🇳🇱' },
    { code: 'BE', name: 'Belgium', dialCode: '+32', flag: '🇧🇪' },
    { code: 'CH', name: 'Switzerland', dialCode: '+41', flag: '🇨🇭' },
    { code: 'AT', name: 'Austria', dialCode: '+43', flag: '🇦🇹' },
    { code: 'SE', name: 'Sweden', dialCode: '+46', flag: '🇸🇪' },
    { code: 'NO', name: 'Norway', dialCode: '+47', flag: '🇳🇴' },
    { code: 'DK', name: 'Denmark', dialCode: '+45', flag: '🇩🇰' },
    { code: 'FI', name: 'Finland', dialCode: '+358', flag: '🇫🇮' },
    { code: 'PL', name: 'Poland', dialCode: '+48', flag: '🇵🇱' },
    { code: 'CZ', name: 'Czech Republic', dialCode: '+420', flag: '🇨🇿' },
    { code: 'HU', name: 'Hungary', dialCode: '+36', flag: '🇭🇺' },
    { code: 'RO', name: 'Romania', dialCode: '+40', flag: '🇷🇴' },
    { code: 'BG', name: 'Bulgaria', dialCode: '+359', flag: '🇧🇬' },
    { code: 'HR', name: 'Croatia', dialCode: '+385', flag: '🇭🇷' },
    { code: 'SI', name: 'Slovenia', dialCode: '+386', flag: '🇸🇮' },
    { code: 'SK', name: 'Slovakia', dialCode: '+421', flag: '🇸🇰' },
    { code: 'LT', name: 'Lithuania', dialCode: '+370', flag: '🇱🇹' },
    { code: 'LV', name: 'Latvia', dialCode: '+371', flag: '🇱🇻' },
    { code: 'EE', name: 'Estonia', dialCode: '+372', flag: '🇪🇪' },
    { code: 'IE', name: 'Ireland', dialCode: '+353', flag: '🇮🇪' },
    { code: 'PT', name: 'Portugal', dialCode: '+351', flag: '🇵🇹' },
    { code: 'GR', name: 'Greece', dialCode: '+30', flag: '🇬🇷' },
    { code: 'CY', name: 'Cyprus', dialCode: '+357', flag: '🇨🇾' },
    { code: 'MT', name: 'Malta', dialCode: '+356', flag: '🇲🇹' },
    { code: 'LU', name: 'Luxembourg', dialCode: '+352', flag: '🇱🇺' },
    { code: 'IS', name: 'Iceland', dialCode: '+354', flag: '🇮🇸' },
    { code: 'LI', name: 'Liechtenstein', dialCode: '+423', flag: '🇱🇮' },
    { code: 'MC', name: 'Monaco', dialCode: '+377', flag: '🇲🇨' },
    { code: 'SM', name: 'San Marino', dialCode: '+378', flag: '🇸🇲' },
    { code: 'VA', name: 'Vatican City', dialCode: '+379', flag: '🇻🇦' },
    { code: 'AD', name: 'Andorra', dialCode: '+376', flag: '🇦🇩' },
    { code: 'JP', name: 'Japan', dialCode: '+81', flag: '🇯🇵' },
    { code: 'KR', name: 'South Korea', dialCode: '+82', flag: '🇰🇷' },
    { code: 'CN', name: 'China', dialCode: '+86', flag: '🇨🇳' },
    { code: 'IN', name: 'India', dialCode: '+91', flag: '🇮🇳' },
    { code: 'TH', name: 'Thailand', dialCode: '+66', flag: '🇹🇭' },
    { code: 'SG', name: 'Singapore', dialCode: '+65', flag: '🇸🇬' },
    { code: 'MY', name: 'Malaysia', dialCode: '+60', flag: '🇲🇾' },
    { code: 'ID', name: 'Indonesia', dialCode: '+62', flag: '🇮🇩' },
    { code: 'PH', name: 'Philippines', dialCode: '+63', flag: '🇵🇭' },
    { code: 'VN', name: 'Vietnam', dialCode: '+84', flag: '🇻🇳' },
    { code: 'TW', name: 'Taiwan', dialCode: '+886', flag: '🇹🇼' },
    { code: 'HK', name: 'Hong Kong', dialCode: '+852', flag: '🇭🇰' },
    { code: 'MO', name: 'Macau', dialCode: '+853', flag: '🇲🇴' },
    { code: 'BR', name: 'Brazil', dialCode: '+55', flag: '🇧🇷' },
    { code: 'AR', name: 'Argentina', dialCode: '+54', flag: '🇦🇷' },
    { code: 'CL', name: 'Chile', dialCode: '+56', flag: '🇨🇱' },
    { code: 'CO', name: 'Colombia', dialCode: '+57', flag: '🇨🇴' },
    { code: 'PE', name: 'Peru', dialCode: '+51', flag: '🇵🇪' },
    { code: 'VE', name: 'Venezuela', dialCode: '+58', flag: '🇻🇪' },
    { code: 'EC', name: 'Ecuador', dialCode: '+593', flag: '🇪🇨' },
    { code: 'BO', name: 'Bolivia', dialCode: '+591', flag: '🇧🇴' },
    { code: 'PY', name: 'Paraguay', dialCode: '+595', flag: '🇵🇾' },
    { code: 'UY', name: 'Uruguay', dialCode: '+598', flag: '🇺🇾' },
    { code: 'GY', name: 'Guyana', dialCode: '+592', flag: '🇬🇾' },
    { code: 'SR', name: 'Suriname', dialCode: '+597', flag: '🇸🇷' },
    { code: 'GF', name: 'French Guiana', dialCode: '+594', flag: '🇬🇫' },
    { code: 'FK', name: 'Falkland Islands', dialCode: '+500', flag: '🇫🇰' },
    { code: 'MX', name: 'Mexico', dialCode: '+52', flag: '🇲🇽' },
    { code: 'GT', name: 'Guatemala', dialCode: '+502', flag: '🇬🇹' },
    { code: 'BZ', name: 'Belize', dialCode: '+501', flag: '🇧🇿' },
    { code: 'SV', name: 'El Salvador', dialCode: '+503', flag: '🇸🇻' },
    { code: 'HN', name: 'Honduras', dialCode: '+504', flag: '🇭🇳' },
    { code: 'NI', name: 'Nicaragua', dialCode: '+505', flag: '🇳🇮' },
    { code: 'CR', name: 'Costa Rica', dialCode: '+506', flag: '🇨🇷' },
    { code: 'PA', name: 'Panama', dialCode: '+507', flag: '🇵🇦' },
    { code: 'CU', name: 'Cuba', dialCode: '+53', flag: '🇨🇺' },
    { code: 'JM', name: 'Jamaica', dialCode: '+1876', flag: '🇯🇲' },
    { code: 'HT', name: 'Haiti', dialCode: '+509', flag: '🇭🇹' },
    { code: 'DO', name: 'Dominican Republic', dialCode: '+1809', flag: '🇩🇴' },
    { code: 'PR', name: 'Puerto Rico', dialCode: '+1787', flag: '🇵🇷' },
    { code: 'TT', name: 'Trinidad and Tobago', dialCode: '+1868', flag: '🇹🇹' },
    { code: 'BB', name: 'Barbados', dialCode: '+1246', flag: '🇧🇧' },
    { code: 'AG', name: 'Antigua and Barbuda', dialCode: '+1268', flag: '🇦🇬' },
    { code: 'DM', name: 'Dominica', dialCode: '+1767', flag: '🇩🇲' },
    { code: 'GD', name: 'Grenada', dialCode: '+1473', flag: '🇬🇩' },
    { code: 'KN', name: 'Saint Kitts and Nevis', dialCode: '+1869', flag: '🇰🇳' },
    { code: 'LC', name: 'Saint Lucia', dialCode: '+1758', flag: '🇱🇨' },
    { code: 'VC', name: 'Saint Vincent and the Grenadines', dialCode: '+1784', flag: '🇻🇨' },
    { code: 'BS', name: 'Bahamas', dialCode: '+1242', flag: '🇧🇸' },
    { code: 'RU', name: 'Russia', dialCode: '+7', flag: '🇷🇺' },
    { code: 'UA', name: 'Ukraine', dialCode: '+380', flag: '🇺🇦' },
    { code: 'BY', name: 'Belarus', dialCode: '+375', flag: '🇧🇾' },
    { code: 'MD', name: 'Moldova', dialCode: '+373', flag: '🇲🇩' },
    { code: 'GE', name: 'Georgia', dialCode: '+995', flag: '🇬🇪' },
    { code: 'AM', name: 'Armenia', dialCode: '+374', flag: '🇦🇲' },
    { code: 'AZ', name: 'Azerbaijan', dialCode: '+994', flag: '🇦🇿' },
    { code: 'KZ', name: 'Kazakhstan', dialCode: '+7', flag: '🇰🇿' },
    { code: 'UZ', name: 'Uzbekistan', dialCode: '+998', flag: '🇺🇿' },
    { code: 'TM', name: 'Turkmenistan', dialCode: '+993', flag: '🇹🇲' },
    { code: 'TJ', name: 'Tajikistan', dialCode: '+992', flag: '🇹🇯' },
    { code: 'KG', name: 'Kyrgyzstan', dialCode: '+996', flag: '🇰🇬' },
    { code: 'MN', name: 'Mongolia', dialCode: '+976', flag: '🇲🇳' },
    { code: 'AF', name: 'Afghanistan', dialCode: '+93', flag: '🇦🇫' },
    { code: 'PK', name: 'Pakistan', dialCode: '+92', flag: '🇵🇰' },
    { code: 'BD', name: 'Bangladesh', dialCode: '+880', flag: '🇧🇩' },
    { code: 'LK', name: 'Sri Lanka', dialCode: '+94', flag: '🇱🇰' },
    { code: 'MV', name: 'Maldives', dialCode: '+960', flag: '🇲🇻' },
    { code: 'BT', name: 'Bhutan', dialCode: '+975', flag: '🇧🇹' },
    { code: 'NP', name: 'Nepal', dialCode: '+977', flag: '🇳🇵' },
    { code: 'MM', name: 'Myanmar', dialCode: '+95', flag: '🇲🇲' },
    { code: 'LA', name: 'Laos', dialCode: '+856', flag: '🇱🇦' },
    { code: 'KH', name: 'Cambodia', dialCode: '+855', flag: '🇰🇭' },
    { code: 'BN', name: 'Brunei', dialCode: '+673', flag: '🇧🇳' },
    { code: 'TL', name: 'East Timor', dialCode: '+670', flag: '🇹🇱' },
    { code: 'PG', name: 'Papua New Guinea', dialCode: '+675', flag: '🇵🇬' },
    { code: 'FJ', name: 'Fiji', dialCode: '+679', flag: '🇫🇯' },
    { code: 'SB', name: 'Solomon Islands', dialCode: '+677', flag: '🇸🇧' },
    { code: 'VU', name: 'Vanuatu', dialCode: '+678', flag: '🇻🇺' },
    { code: 'NC', name: 'New Caledonia', dialCode: '+687', flag: '🇳🇨' },
    { code: 'PF', name: 'French Polynesia', dialCode: '+689', flag: '🇵🇫' },
    { code: 'WS', name: 'Samoa', dialCode: '+685', flag: '🇼🇸' },
    { code: 'TO', name: 'Tonga', dialCode: '+676', flag: '🇹🇴' },
    { code: 'KI', name: 'Kiribati', dialCode: '+686', flag: '🇰🇮' },
    { code: 'TV', name: 'Tuvalu', dialCode: '+688', flag: '🇹🇻' },
    { code: 'NR', name: 'Nauru', dialCode: '+674', flag: '🇳🇷' },
    { code: 'PW', name: 'Palau', dialCode: '+680', flag: '🇵🇼' },
    { code: 'FM', name: 'Micronesia', dialCode: '+691', flag: '🇫🇲' },
    { code: 'MH', name: 'Marshall Islands', dialCode: '+692', flag: '🇲🇭' },
    { code: 'NZ', name: 'New Zealand', dialCode: '+64', flag: '🇳🇿' },
    { code: 'ZA', name: 'South Africa', dialCode: '+27', flag: '🇿🇦' },
    { code: 'EG', name: 'Egypt', dialCode: '+20', flag: '🇪🇬' },
    { code: 'LY', name: 'Libya', dialCode: '+218', flag: '🇱🇾' },
    { code: 'TN', name: 'Tunisia', dialCode: '+216', flag: '🇹🇳' },
    { code: 'DZ', name: 'Algeria', dialCode: '+213', flag: '🇩🇿' },
    { code: 'MA', name: 'Morocco', dialCode: '+212', flag: '🇲🇦' },
    { code: 'SD', name: 'Sudan', dialCode: '+249', flag: '🇸🇩' },
    { code: 'SS', name: 'South Sudan', dialCode: '+211', flag: '🇸🇸' },
    { code: 'ET', name: 'Ethiopia', dialCode: '+251', flag: '🇪🇹' },
    { code: 'ER', name: 'Eritrea', dialCode: '+291', flag: '🇪🇷' },
    { code: 'DJ', name: 'Djibouti', dialCode: '+253', flag: '🇩🇯' },
    { code: 'SO', name: 'Somalia', dialCode: '+252', flag: '🇸🇴' },
    { code: 'KE', name: 'Kenya', dialCode: '+254', flag: '🇰🇪' },
    { code: 'UG', name: 'Uganda', dialCode: '+256', flag: '🇺🇬' },
    { code: 'TZ', name: 'Tanzania', dialCode: '+255', flag: '🇹🇿' },
    { code: 'RW', name: 'Rwanda', dialCode: '+250', flag: '🇷🇼' },
    { code: 'BI', name: 'Burundi', dialCode: '+257', flag: '🇧🇮' },
    { code: 'CD', name: 'Democratic Republic of the Congo', dialCode: '+243', flag: '🇨🇩' },
    { code: 'CG', name: 'Republic of the Congo', dialCode: '+242', flag: '🇨🇬' },
    { code: 'CF', name: 'Central African Republic', dialCode: '+236', flag: '🇨🇫' },
    { code: 'TD', name: 'Chad', dialCode: '+235', flag: '🇹🇩' },
    { code: 'CM', name: 'Cameroon', dialCode: '+237', flag: '🇨🇲' },
    { code: 'GQ', name: 'Equatorial Guinea', dialCode: '+240', flag: '🇬🇶' },
    { code: 'GA', name: 'Gabon', dialCode: '+241', flag: '🇬🇦' },
    { code: 'ST', name: 'São Tomé and Príncipe', dialCode: '+239', flag: '🇸🇹' },
    { code: 'AO', name: 'Angola', dialCode: '+244', flag: '🇦🇴' },
    { code: 'ZM', name: 'Zambia', dialCode: '+260', flag: '🇿🇲' },
    { code: 'ZW', name: 'Zimbabwe', dialCode: '+263', flag: '🇿🇼' },
    { code: 'BW', name: 'Botswana', dialCode: '+267', flag: '🇧🇼' },
    { code: 'NA', name: 'Namibia', dialCode: '+264', flag: '🇳🇦' },
    { code: 'SZ', name: 'Eswatini', dialCode: '+268', flag: '🇸🇿' },
    { code: 'LS', name: 'Lesotho', dialCode: '+266', flag: '🇱🇸' },
    { code: 'MG', name: 'Madagascar', dialCode: '+261', flag: '🇲🇬' },
    { code: 'MU', name: 'Mauritius', dialCode: '+230', flag: '🇲🇺' },
    { code: 'SC', name: 'Seychelles', dialCode: '+248', flag: '🇸🇨' },
    { code: 'KM', name: 'Comoros', dialCode: '+269', flag: '🇰🇲' },
    { code: 'YT', name: 'Mayotte', dialCode: '+262', flag: '🇾🇹' },
    { code: 'RE', name: 'Réunion', dialCode: '+262', flag: '🇷🇪' },
    { code: 'MZ', name: 'Mozambique', dialCode: '+258', flag: '🇲🇿' },
    { code: 'MW', name: 'Malawi', dialCode: '+265', flag: '🇲🇼' },
    { code: 'GH', name: 'Ghana', dialCode: '+233', flag: '🇬🇭' },
    { code: 'TG', name: 'Togo', dialCode: '+228', flag: '🇹🇬' },
    { code: 'BJ', name: 'Benin', dialCode: '+229', flag: '🇧🇯' },
    { code: 'BF', name: 'Burkina Faso', dialCode: '+226', flag: '🇧🇫' },
    { code: 'NE', name: 'Niger', dialCode: '+227', flag: '🇳🇪' },
    { code: 'NG', name: 'Nigeria', dialCode: '+234', flag: '🇳🇬' },
    { code: 'CI', name: 'Ivory Coast', dialCode: '+225', flag: '🇨🇮' },
    { code: 'LR', name: 'Liberia', dialCode: '+231', flag: '🇱🇷' },
    { code: 'SL', name: 'Sierra Leone', dialCode: '+232', flag: '🇸🇱' },
    { code: 'GN', name: 'Guinea', dialCode: '+224', flag: '🇬🇳' },
    { code: 'GW', name: 'Guinea-Bissau', dialCode: '+245', flag: '🇬🇼' },
    { code: 'GM', name: 'Gambia', dialCode: '+220', flag: '🇬🇲' },
    { code: 'SN', name: 'Senegal', dialCode: '+221', flag: '🇸🇳' },
    { code: 'ML', name: 'Mali', dialCode: '+223', flag: '🇲🇱' },
    { code: 'MR', name: 'Mauritania', dialCode: '+222', flag: '🇲🇷' },
    { code: 'CV', name: 'Cape Verde', dialCode: '+238', flag: '🇨🇻' },
    { code: 'SA', name: 'Saudi Arabia', dialCode: '+966', flag: '🇸🇦' },
    { code: 'AE', name: 'United Arab Emirates', dialCode: '+971', flag: '🇦🇪' },
    { code: 'QA', name: 'Qatar', dialCode: '+974', flag: '🇶🇦' },
    { code: 'BH', name: 'Bahrain', dialCode: '+973', flag: '🇧🇭' },
    { code: 'KW', name: 'Kuwait', dialCode: '+965', flag: '🇰🇼' },
    { code: 'OM', name: 'Oman', dialCode: '+968', flag: '🇴🇲' },
    { code: 'YE', name: 'Yemen', dialCode: '+967', flag: '🇾🇪' },
    { code: 'IQ', name: 'Iraq', dialCode: '+964', flag: '🇮🇶' },
    { code: 'IR', name: 'Iran', dialCode: '+98', flag: '🇮🇷' },
    { code: 'TR', name: 'Turkey', dialCode: '+90', flag: '🇹🇷' },
    { code: 'IL', name: 'Israel', dialCode: '+972', flag: '🇮🇱' },
    { code: 'PS', name: 'Palestine', dialCode: '+970', flag: '🇵🇸' },
    { code: 'JO', name: 'Jordan', dialCode: '+962', flag: '🇯🇴' },
    { code: 'LB', name: 'Lebanon', dialCode: '+961', flag: '🇱🇧' },
    { code: 'SY', name: 'Syria', dialCode: '+963', flag: '🇸🇾' },
    { code: 'CY', name: 'Cyprus', dialCode: '+357', flag: '🇨🇾' }
  ];

  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    country.dialCode.includes(searchTerm)
  );

  // Format phone number based on country
  const formatPhoneNumber = (phoneNumber, countryCode) => {
    if (!phoneNumber || !countryCode) return phoneNumber;
    
    const countryInfo = getCountryInfo(countryCode);
    const digits = phoneNumber.replace(/\D/g, '');
    
    if (digits.length > countryInfo.digits) {
      return phoneNumber.slice(0, phoneNumber.length - 1); // Prevent extra digits
    }
    
    // Apply formatting based on country
    let formatted = digits;
    if (countryCode === 'PK') {
      // Pakistan: +92 XXX-XXXXXXX
      if (digits.length > 3) {
        formatted = digits.slice(0, 3) + '-' + digits.slice(3);
      }
    } else if (countryCode === 'US' || countryCode === 'CA') {
      // US/Canada: XXX-XXX-XXXX
      if (digits.length > 6) {
        formatted = digits.slice(0, 3) + '-' + digits.slice(3, 6) + '-' + digits.slice(6);
      } else if (digits.length > 3) {
        formatted = digits.slice(0, 3) + '-' + digits.slice(3);
      }
    } else if (countryCode === 'GB') {
      // UK: XXXX XXX XXX
      if (digits.length > 4) {
        formatted = digits.slice(0, 4) + ' ' + digits.slice(4, 7) + ' ' + digits.slice(7);
      } else if (digits.length > 4) {
        formatted = digits.slice(0, 4) + ' ' + digits.slice(4);
      }
    }
    
    return formatted;
  };

  // Handle phone number change with digit limiting
  const handlePhoneChange = (phoneValue) => {
    if (!phoneValue) {
      setFormattedValue('');
      onChange('');
      return;
    }

    try {
      const phoneNumber = parsePhoneNumber(phoneValue);
      if (phoneNumber) {
        const countryCode = phoneNumber.country;
        const nationalNumber = phoneNumber.nationalNumber;
        const countryInfo = getCountryInfo(countryCode);
        
        // Check if number exceeds country limit
        if (nationalNumber.length > countryInfo.digits) {
          return; // Don't update if exceeds limit
        }
        
        // Format the number with dashes
        const formatted = formatPhoneNumber(nationalNumber, countryCode);
        
        setFormattedValue(phoneValue);
        onChange(phoneValue);
      } else {
        setFormattedValue(phoneValue);
        onChange(phoneValue);
      }
    } catch (error) {
      setFormattedValue(phoneValue);
      onChange(phoneValue);
    }
  };

  // Handle country selection
  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setShowModal(false);
    setSearchTerm('');
    // Update the phone number with new country code
    if (value) {
      const phoneNumber = value.replace(/^\+\d+/, country.dialCode);
      onChange(phoneNumber);
    } else {
      onChange(country.dialCode);
    }
  };

  // Update formatted value when value prop changes
  useEffect(() => {
    if (value !== formattedValue) {
      setFormattedValue(value);
    }
  }, [value]);

  return (
    <div className="relative">
      {/* Use exact same Tailwind classes as other input fields */}
      <div className={`w-full pl-6 pr-3 py-2 rounded-3xl border bg-white text-gray-900 placeholder-gray-400 placeholder:text-sm text-base focus-within:outline-none focus-within:ring-2 focus-within:border-transparent transition-all duration-200 ${
        error 
          ? 'border-red-500 focus-within:ring-red-500' 
          : 'border-white focus-within:ring-pink-500'
      }`}>
        {/* Custom phone input with country selector */}
        <div className="flex items-center gap-2">
          {/* Country Selector Button */}
          <button
            type="button"
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 cursor-pointer"
          >
            <span className="text-lg">{selectedCountry.flag}</span>
            <span className="text-gray-700 text-sm font-medium">{selectedCountry.dialCode}</span>
            <svg className="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          {/* Phone Number Input */}
          <input
            type="tel"
            value={value?.replace(selectedCountry.dialCode, '') || ''}
            onChange={(e) => {
              const inputValue = e.target.value;
              const digitsOnly = inputValue.replace(/\D/g, '');
              const countryInfo = getCountryInfo(selectedCountry.code);
              
              // Limit digits based on country
              if (digitsOnly.length > countryInfo.digits) {
                return; // Don't allow more digits than country limit
              }
              
              // Format with dashes as user types
              let formatted = digitsOnly;
              if (selectedCountry.code === 'PK') {
                // Pakistan: XXX-XXXXXXX
                if (digitsOnly.length > 3) {
                  formatted = digitsOnly.slice(0, 3) + '-' + digitsOnly.slice(3);
                }
              } else if (selectedCountry.code === 'US' || selectedCountry.code === 'CA') {
                // US/Canada: XXX-XXX-XXXX
                if (digitsOnly.length > 6) {
                  formatted = digitsOnly.slice(0, 3) + '-' + digitsOnly.slice(3, 6) + '-' + digitsOnly.slice(6);
                } else if (digitsOnly.length > 3) {
                  formatted = digitsOnly.slice(0, 3) + '-' + digitsOnly.slice(3);
                }
              } else if (selectedCountry.code === 'GB') {
                // UK: XXXX XXX XXX
                if (digitsOnly.length > 4) {
                  formatted = digitsOnly.slice(0, 4) + ' ' + digitsOnly.slice(4, 7) + ' ' + digitsOnly.slice(7);
                } else if (digitsOnly.length > 4) {
                  formatted = digitsOnly.slice(0, 4) + ' ' + digitsOnly.slice(4);
                }
              } else {
                // Default formatting with dashes
                if (digitsOnly.length > 6) {
                  formatted = digitsOnly.slice(0, 3) + '-' + digitsOnly.slice(3, 6) + '-' + digitsOnly.slice(6);
                } else if (digitsOnly.length > 3) {
                  formatted = digitsOnly.slice(0, 3) + '-' + digitsOnly.slice(3);
                }
              }
              
              // Update with country code + formatted number
              onChange(selectedCountry.dialCode + formatted);
            }}
            placeholder={placeholder}
            className="flex-1 bg-transparent border-none outline-none text-gray-900 placeholder-gray-400 placeholder:text-sm text-base"
          />
        </div>
      </div>

      {/* Custom Country Selection Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end sm:items-center justify-center">
          <div className="bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-md h-[70vh] flex flex-col">
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 text-center">Choose your country</h2>
            </div>
            
            {/* Search Bar */}
            <div className="p-4 border-b border-gray-100">
              <div className="relative">
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search Country..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-3xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
              </div>
            </div>
            
            {/* Country List */}
            <div className="flex-1 overflow-y-auto">
              {filteredCountries.map((country, index) => (
                <div key={country.code}>
                  <button
                    type="button"
                    onClick={() => handleCountrySelect(country)}
                    className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50 text-left"
                  >
                    <span className="text-lg">{country.flag}</span>
                    <span className="text-gray-900 font-medium">{country.name}</span>
                    <span className="text-gray-500 ml-auto">({country.dialCode})</span>
                  </button>
                  {index < filteredCountries.length - 1 && (
                    <div className="border-b border-gray-100 mx-4"></div>
                  )}
                </div>
              ))}
            </div>
            
            {/* Select Button */}
            <div className="p-4 border-t border-gray-100">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="w-full py-3 bg-gray-100 text-gray-600 rounded-2xl font-medium hover:bg-gray-200 transition-colors"
              >
                Select
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Error Message */}
      {error && (
        <p className="text-red-500 text-xs mt-1 text-left">{error}</p>
      )}
    </div>
  );
};

export default PhoneNumberInput;