'use strict'
var test = require('blue-tape'),
    proxyquire = require('proxyquire'),
    sinon = require('sinon'),
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
        t.equal(romanToArabic(numeral),map[numeral])
    }
    t.end()
})

//---------------------- State Manager ------------------------------------

test('First state', function (t) {
    var I = { value: 1, repeat_times: 3, can_substract: [] }
    var initial = { repeat: 0, previous: undefined }
    var expected = { repeat: 1, previous: I }
    t.deepEqual(romanToArabic._.updateState(I, initial),expected)
    t.end()
})

test('Same value state', function (t) {
    var I = { value: 1, repeat_times: 3, can_substract: [] }
    var initial = { repeat: 1, previous: I }
    var expected = { repeat: 2, previous: I }
    t.deepEqual(romanToArabic._.updateState(I, initial),expected)
    t.end()
})

test('Diferent value state', function (t) {
    var X = { value: 10, repeat_times: 3, can_substract: [] }
    var I = { value: 1, repeat_times: 3, can_substract: [] }
    var initial = { repeat: 3, previous: I }
    var expected = { repeat: 1, previous: X }
    t.deepEqual(romanToArabic._.updateState(X, initial),expected)
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

//---------------------- Validator ----------------------------------------

test('same value', function (t) {
    var previous = { value: 1, repeat_times: 3, can_substract: [] }
    var current = { value: 1, repeat_times: 3, can_substract: [] }
    t.deepEqual(romanToArabic._.isValidState(previous, current),true)
    t.end()
})
