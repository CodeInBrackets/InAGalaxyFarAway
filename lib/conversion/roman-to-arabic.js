var map = require('./convertion-map')

function updateState(current, context){
    if(!context.previous || context.previous.value !== current.value ){
        return { repeat: 1, previous: current }
    }
    return { repeat: ++context.repeat, previous: current }
}

function isValidState(current, validate_info){
    return true
}

function selectOperand(last, current){
     if(!last || current.value >= last.value)
        return current.value
    else
        return -current.value
}

function convert(number, nextStateManager = updateState, validator = isValidState, operanSelector = selectOperand){
    var value = 0
    var context = { repeat: 0, previous: undefined }
    for(var index = number.length-1; index >= 0 ; --index){
        var current = map[number[index]]
        if (!validator(current, context))
            throw 'wrooooooong'
        value += operanSelector(context.previous, current)
        context = nextStateManager(current, context)
    }
    return value
}

module.exports = convert
module.exports._ = {
    selectOperand,
    isValidState,
    updateState
}