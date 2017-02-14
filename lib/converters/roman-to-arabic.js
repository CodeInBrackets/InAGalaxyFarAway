var map = {
    M: 1000,
    D: 500,
    C: 100,
    L: 50,
    X: 10,
    V: 5,
    I: 1
}

function getSubgroups(character, number){
    var result = [];
    var regex = RegExp('(.*?)'+character + '+','g')
    var match
    while(match = regex.exec(number)){
        result.push(match[0])
    }
    return result
}

function convert(number){
     getSubgroups()
    return map[number]
}

module.exports = convert
module.exports._ = {
    getSubgroups
}