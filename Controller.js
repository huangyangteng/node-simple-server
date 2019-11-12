const administrator = require('./api/administrator')
const task = require('./api/task')
const error = require('./api/error')
const role = require('./api/role')
const province = require('./api/province')
const alarmRule = require('./api/alarmRule')
const Controller = {
    administrator,
    task,
    error,
    role,
    province,
    alarmRule
}
module.exports = Controller