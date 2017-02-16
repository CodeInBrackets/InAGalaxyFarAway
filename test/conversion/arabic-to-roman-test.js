'use strict'
var test = require('blue-tape'),
    arabicToRuman = require('../../lib/conversion/arabic-to-roman')

//---------------------- Convert ----------------------------------------

test('Convert direct Numbers', function (t) {
    
    // for (var numeral in map) {
    //     t.equal(arabicToRuman(numeral),map[numeral])
    // }
    t.end()
})


//---------------------- calculate Current Decimal Split ----------------------------

// test('calculate fits does not pass maximum', function (t) {
//     var context = { 
//         element: { value: 1, simbol: 'I', repeat_times: 3 }
//     }
//     var current = 'III'
//     var expected = 'IIII'
//     t.equal(arabicToRuman._.calculateFits(current, 2, context, () => {}), expected)
//     t.end()
// })
// calculateCurrentDecimalSplitImpl

//---------------------- calculate Fits --------------------------------------------

test('calculate fits does not pass maximum', function (t) {
    var context = { 
        element: { value: 1, simbol: 'I', repeat_times: 3 }
    }
    var current = 'III'
    var expected = 'IIII'
    t.equal(arabicToRuman._.calculateFits(current, 2, context, () => {}), expected)
    t.end()
})

test('calculate fits does pass maximum', function (t) {
    var context = { 
        element: { value: 1, simbol: 'I', repeat_times: 3 }
    }
    var current = 'III'
    var expected = 'Hello'
    t.equal(arabicToRuman._.calculateFits(current, 3, context, () => { return expected }), expected)
    t.end()
})

//---------------------- calculate Over Repeated ------------------------------------

test('calculate Over Repeated near mid value', function (t) {
    var context = { 
        element: { value: 1, simbol: 'I', repeat_times: 3 },
        previous: { value: 5, simbol: 'V', repeat_times: 1, can_substract: [ 1 ] },
        previous_previous: { value: 10, simbol: 'X', repeat_times: 3, can_substract: [ 1 ] } 
    }
    var current = 'IIII'
    var expected = 'IV'
    t.deepEqual(arabicToRuman._.calculateOverRepeated(current,context), expected)
    t.end()
})

test('calculate Over Repeated far bigger value', function (t) {
    var context = { 
        element: { value: 1, simbol: 'I', repeat_times: 3 },
        previous: { value: 5, simbol: 'V', repeat_times: 1, can_substract: [ 1 ] },
        previous_previous: { value: 10, simbol: 'X', repeat_times: 3, can_substract: [ 1 ] } 
    }
    var current = 'VIIII'
    var expected = 'IX'
    t.deepEqual(arabicToRuman._.calculateOverRepeated(current,context), expected)
    t.end()
})

//---------------------- Update Context ---------------------------------------------

test('update First Context', function (t) {
    var context = { element: undefined, previous : undefined, previous_previous : undefined}
    var element = { value: 1000, simbol: 'M', repeat_times: 3, can_substract: [100] }
    var expected = { element: element, previous : undefined, previous_previous : undefined}
    t.deepEqual(arabicToRuman._.updateContext(element,context), expected)
    t.end()
})

test('update Second Context', function (t) {
    var element_2 = { value: 1000, simbol: 'M', repeat_times: 3, can_substract: [100] }
    var element = { value: 1, simbol: 'I', repeat_times: 3, can_substract: [100] }
    var context = { element: element_2, previous : undefined, previous_previous : undefined}
    var expected = { element: element, previous : element_2, previous_previous : undefined}
    t.deepEqual(arabicToRuman._.updateContext(element,context), expected)
    t.end()
})

test('update Second Context', function (t) {
    var element_3 = { value: 100, simbol: 'C', repeat_times: 3, can_substract: [100] }
    var element_2 = { value: 1000, simbol: 'M', repeat_times: 3, can_substract: [100] }
    var element = { value: 1, simbol: 'I', repeat_times: 3, can_substract: [100] }
    var context = { element: element_2, previous : element_3, previous_previous : undefined}
    var expected = { element: element, previous : element_2, previous_previous : element_3}
    t.deepEqual(arabicToRuman._.updateContext(element,context), expected)
    t.end()
})