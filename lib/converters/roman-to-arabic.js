var map = {
    'M': {
        value: 1000,
        repeat_times: 3
    },
    'D': {
        value: 500,
        repeat_times: 1
    },
    'C': {
        value: 100,
        repeat_times: 3
    },
    'L': {
        value: 50,
        repeat_times: 1
    },
    'X': {
        value: 10,
        repeat_times: 3
    },
    'V': {
        value: 5,
        repeat_times: 1
    },
    'I': {
        value: 1,
        repeat_times: 3
    }
}

function validateMaxLenght(character, match){
    var count_same = (match.match(RegExp(character,'g')) || []).length
    return (map[character].repeat_times >= count_same)
}

function validateGroup(character, match){
    return validateMaxLenght(character, match)
}

function getSubgroups(character, number){
    var regex = RegExp('(.*?)'+character + '+','g')
    var matchs = number.match(regex) || []
    // for(var match of matchs){
    //     validateGroup(match)
    // }
    return matchs
}

function convert(number){
    return map[number].value
}

module.exports = convert
module.exports._ = {
    getSubgroups, 
    validateGroup
}