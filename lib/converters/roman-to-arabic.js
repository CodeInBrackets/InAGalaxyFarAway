var map = require('./convertion-map')

function validateMaxLenght(character, match){
    var count_same = (match.match(RegExp(character,'g')) || []).length
    return (map[character].repeat_times >= count_same)
}

function substractCorrect(character, match){
    //return match[match.length-2]===character || map[character].can_substract.includes(match[match.length-2])
}

function validateGroup(character, match){
    return validateMaxLenght(character, match)
}

function getSubgroups(character, number){
    var regex = RegExp('(.*?)'+character + '+','g')
    var matchs = number.match(regex) || []
    for(var match of matchs){
        if(!validateGroup(character, match))
            throw 'ups'
    }
    return matchs
}

function convert(number){
    return map[number].value
}

module.exports = convert
module.exports._ = {
    getSubgroups, 
    validateGroup,
    validateMaxLenght,
    substractCorrect
}