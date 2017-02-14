module.exports = {
    'M': {
        value: 1000,
        repeat_times: 3,
        can_substract: ['C']
    },
    'D': {
        value: 500,
        repeat_times: 1,
        can_substract: ['C']
    },
    'C': {
        value: 100,
        repeat_times: 3,
        can_substract: ['X']
    },
    'L': {
        value: 50,
        repeat_times: 1,
        can_substract: ['X']
    },
    'X': {
        value: 10,
        repeat_times: 3,
        can_substract: ['I']
    },
    'V': {
        value: 5,
        repeat_times: 1,
        can_substract: ['I']
    },
    'I': {
        value: 1,
        repeat_times: 3,
        can_substract: []
    }
}