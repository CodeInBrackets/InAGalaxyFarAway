var map = require('./convertion-map')

function updateContext(current, context){
    return {
        element: current,
        previous: context.element,
        previous_previous: context.previous
    }
}

function calculateOverRepeated(result, context){
    var resultLocal = result.slice(0, -(context.element.repeat_times+1))
    if(resultLocal[resultLocal.length-1] === context.previous.simbol ){
        resultLocal = resultLocal.slice(0, -1)
        resultLocal += context.element.simbol + context.previous_previous.simbol
    }
    else  
        resultLocal += context.element.simbol + context.previous.simbol
    return resultLocal
}

function calculateFits(result, count, context, calculateOverRepeatedImpl = calculateOverRepeated){
    var resultLocal = result + context.element.simbol
    if(context.element.repeat_times === count)
        resultLocal = calculateOverRepeatedImpl(resultLocal, context)
    return resultLocal
}

function calculateCurrentRomanNumeralImpl(resultState, context, calculateFitsImp = calculateFits){
    var count = 0
    var fits = true
    while(fits){
        if(context.element.value <= resultState.number){
            resultState.number -= context.element.value
            resultState.result = calculateFitsImp(resultState.result, count, context)
        }
        else
            fits = false
        ++count
    }
    return resultState
}

function calculateCurrentDecimalSplitImpl(number, updateContextImpl = updateContext, calculateCurrentRomanNumeral = calculateCurrentRomanNumeralImpl){
   var resultState = {result: '', number : number}
   var context = { element: undefined, previous : undefined, previous_previous : undefined}
    for(var id in map){
        context = updateContextImpl(map[id], context)
        resultState = calculateCurrentRomanNumeral(resultState, context)
    }
    return resultState.result
}

function convert(numberValue, calculateCurrentDecimalSplit = calculateCurrentDecimalSplitImpl){
    var result = '' 
    var number = numberValue.toString()
    for(var index = 0; index < number.length ; ++index){
        var currentValue = parseInt(number[index]) * Math.pow(10,number.length - index - 1)
        result += calculateCurrentDecimalSplit(currentValue)
    }
    return result
}

module.exports.convert = convert
module.exports._ = {
    calculateCurrentDecimalSplitImpl,
    calculateCurrentRomanNumeralImpl,
    calculateOverRepeated,
    calculateFits,
    updateContext
}