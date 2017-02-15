var map = require('./convertion-map')

class ValidationError extends Error {
    constructor(message) { 
        super(message)
    }
}    

function updateState(current, context){
    return { 
        repeat: context.previous.value !== current.value ? 1 : ++context.repeat, 
        previous: current,
        isSubstraction: context.previous.value > current.value
    }
}

function validateNumberOfOcurrencies(current, context){
    if(context.repeat > current.repeat_times)
        throw new ValidationError('value repeated to many times')
}

function isAValueThatCanBeSubstracted(current, context){
    if(context.previous.can_substract && !context.previous.can_substract.includes(current.value))
        throw new ValidationError('this value cannot be substracted')
}

function onlyOneSubstraction(current, context){
    if (context.previous.value > current.value && context.isSubstraction )
        throw new ValidationError('can only be one substraction')
}

function isValidState(current, context){
    validateNumberOfOcurrencies(current, context)
    if(current.value >= context.previous.value)
        return
    isAValueThatCanBeSubstracted(current, context)
    onlyOneSubstraction(current, context)
}

function selectOperand(last, current){
     if(current.value >= last.value)
        return current.value
    else
        return -current.value
}

function convert(number, nextStateManager = updateState, runValidation = isValidState, operanSelector = selectOperand){
    var value = 0
    var context = { repeat: 0, previous: { value : 0 } }
    for(var index = number.length-1; index >= 0 ; --index){
        var current = map[number[index]]
        runValidation(current, context)
        value += operanSelector(context.previous, current)
        context = nextStateManager(current, context)
    }
    return value
}

module.exports = convert
module.exports._ = {
    selectOperand,
    isValidState,
    updateState,
    validateNumberOfOcurrencies,
    isAValueThatCanBeSubstracted,
    onlyOneSubstraction
}