romanToArabicConverter = require('./lib/conversion/roman-to-arabic')

module.exports.ArabicToRoman = require('./lib/conversion/arabic-to-roman').convert
module.exports.RomanToArabic = require('./lib/conversion/roman-to-arabic').convert
module.exports.dataMapping = require('./lib/conversion/convertion-map')