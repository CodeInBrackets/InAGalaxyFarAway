'use strict'
var test = require('blue-tape'),
    proxyquire = require('proxyquire'),
    sinon = require('sinon'),
    romanToArabic = require('../../lib/converters/roman-to-arabic')

var map = {
    M: 1000,
    D: 500,
    C: 100,
    L: 50,
    X: 10,
    V: 5,
    I: 1
}

test('Convert direct Numbers', function (t) {
    for (var numeral in map) {
        t.equal(romanToArabic(numeral),map[numeral])
    }
    t.end()
})

test('Get valid Subgroups', function (t) {
    t.deepEqual(romanToArabic._.getSubgroups('X','XXXIX'),['XXX', 'IX'])
    t.end()
})

test('Valid Subgroups maximum repeat of 3 valid Group', function (t) {
    var group = ['I','X','C','M']
    for (var value of group){
        var valid = Array(4).join(value)
        t.equal(romanToArabic._.validateGroup(value, valid), true)
    }
    t.end()
})

test('Invalid Subgroups maximum repeat of 3 valid Group', function (t) {
    var group = ['I','X','C','M']
    for (let value of group){
        let invalid = Array(5).join(value)
        t.equal(romanToArabic._.validateGroup(value, invalid), false)
    }
    t.end()
})


test('Valid Subgroups maximum repeat of single group', function (t) {
    var group = ['D','L','V']
    for (var value of group){
        t.equal(romanToArabic._.validateGroup(value, value), true)
    }
    t.end()
})

test('Invalid Subgroups maximum repeat of single group', function (t) {
    var group = ['D','L','V']
    for (let value of group){
        let invalid = Array(3).join(value)
        console.log(invalid)
        t.equal(romanToArabic._.validateGroup(value, invalid), false)
    }
    t.end()
})

// test('Invalid Subgroups maximum repeat passed', function (t) {
//     t.equal(romanToArabic._.validateGroup('X','XXXX'), false)
//     t.end()
// })

// test('Get invalid Subgroups', function (t) {
//     t.throws(romanToArabic._.getSubgroups('X','XXXXIX'))
//     t.end()
// })

