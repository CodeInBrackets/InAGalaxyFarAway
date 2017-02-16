'use strict'
var test = require('blue-tape'),
    romanToArabic = require('../../lib/conversion/roman-to-arabic')

var map = {
    M: 1000,
    D: 500,
    C: 100,
    L: 50,
    X: 10,
    V: 5,
    I: 1
}

//---------------------- Convert ----------------------------------------

test('Convert direct Numbers', function (t) {
    for (var numeral in map) {
        t.equal(romanToArabic.convert(numeral),map[numeral])
    }
    t.end()
})

//---------------------- State Manager ------------------------------------

test('First state', function (t) {
    var I = { value: 1, repeat_times: 3, can_substract: [] }
    var initial = { repeat: 0, previous: { value : 0 } }
    var expected = { repeat: 1, previous: I, isSubstraction: false }
    t.deepEqual(romanToArabic._.updateState(I, initial),expected)
    t.end()
})

test('Same value state', function (t) {
    var I = { value: 1, repeat_times: 3, can_substract: [] }
    var initial = { repeat: 1, previous: I }
    var expected = { repeat: 2, previous: I, isSubstraction: false }
    t.deepEqual(romanToArabic._.updateState(I, initial),expected)
    t.end()
})

test('Diferent value state sum', function (t) {
    var X = { value: 10, repeat_times: 3, can_substract: [] }
    var I = { value: 1, repeat_times: 3, can_substract: [] }
    var initial = { repeat: 3, previous: I }
    var expected = { repeat: 1, previous: X, isSubstraction: false }
    t.deepEqual(romanToArabic._.updateState(X, initial),expected)
    t.end()
})

test('Diferent value state sub', function (t) {
    var X = { value: 10, repeat_times: 3, can_substract: [] }
    var I = { value: 1, repeat_times: 3, can_substract: [] }
    var initial = { repeat: 3, previous: X }
    var expected = { repeat: 1, previous: I, isSubstraction: true }
    t.deepEqual(romanToArabic._.updateState(I, initial),expected)
    t.end()
})

//---------------------- Operand Selector -------------------------------

test('same value', function (t) {
    var previous = { value: 1, repeat_times: 3, can_substract: [] }
    var current = { value: 1, repeat_times: 3, can_substract: [] }
    t.equal(romanToArabic._.selectOperand(previous, current),1)
    t.end()
})

test('previous bigger than current', function (t) {
    var previous = { value: 10, repeat_times: 3, can_substract: [] }
    var current = { value: 1, repeat_times: 3, can_substract: [] }
    t.equal(romanToArabic._.selectOperand(previous, current), -1)
    t.end()
})

test('previous smaller than current', function (t) {
    var previous = { value: 1, repeat_times: 3, can_substract: [] }
    var current = { value: 10, repeat_times: 3, can_substract: [] }
    t.equal(romanToArabic._.selectOperand(previous, current), 10)
    t.end()
})

//---------------------- Validators ----------------------------------------

test('more ocurrencies than valid', function (t) {
    var context = { repeat: 4, previous: { value : 0 } }
    var current = { value: 1, repeat_times: 3, can_substract: [] }
    t.throws(() => romanToArabic._.validateNumberOfOcurrencies(current, context))
    t.end()
})

test('less ocurrencies than valid', function (t) {
    var context = { repeat: 2, previous: { value : 0 } }
    var current = { value: 1, repeat_times: 3, can_substract: [] }
    t.doesNotThrow(() => romanToArabic._.validateNumberOfOcurrencies(current, context))
    t.end()
})

test('only one substraction second one', function (t) {
    var context = { repeat: 2, previous: { value: 10, repeat_times: 3, can_substract: [] }, isSubstraction: true }
    var current = { value: 1, repeat_times: 3, can_substract: [] }
    t.throws(() => romanToArabic._.onlyOneSubstraction(current, context))
    t.end()
})

test('only one substraction first one', function (t) {
    var context = { repeat: 2, previous: { value: 10, repeat_times: 3, can_substract: [] }, isSubstraction: false }
    var current = { value: 1, repeat_times: 3, can_substract: [] }
    t.doesNotThrow(() => romanToArabic._.onlyOneSubstraction(current, context))
    t.end()
})

test('only one substraction reset one', function (t) {
    var context = { repeat: 2, previous: { value: 10, repeat_times: 3, can_substract: [] }, isSubstraction: true }
    var current = { value: 100, repeat_times: 3, can_substract: [] }
    t.doesNotThrow(() => romanToArabic._.onlyOneSubstraction(current, context))
    t.end()
})

test('is A Value that can be substracted', function (t) {
    var context = { repeat: 2, previous: { value: 10, repeat_times: 3, can_substract: [1] }, isSubstraction: true }
    var current = { value: 1, repeat_times: 3, can_substract: [] }
    t.doesNotThrow(() => romanToArabic._.isAValueThatCanBeSubstracted(current, context))
    t.end()
})

test('is A Value that can not be substracted', function (t) {
    var context = { repeat: 2, previous: { value: 10, repeat_times: 3, can_substract: [1] }, isSubstraction: true }
    var current = { value: 1000, repeat_times: 3, can_substract: [] }
    t.throws(() => romanToArabic._.isAValueThatCanBeSubstracted(current, context))
    t.end()
})
