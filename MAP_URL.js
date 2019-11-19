const Controller = require('./Controller')

function getMapKey(map, url) {
    for (var key in map) {
        if (url == key) {///匹配顺序 user -> /user/add ->/login.html 
            return key
        } else if (url.indexOf(key) != -1) {
            return key
        }
    }
}


const { administrator, task, error, role, province, alarmRule, alarmNotice } = Controller

const MAP_URL = {//顺序很重要 遍历时是按照顺序进行的  /user /user/add 
    'default': Controller.default,
    '/api/administrator/login': administrator.login,
    '/api/administrator/all': administrator.all,
    '/api/administrator/add': administrator.add,
    '/api/administrator/edit': administrator.edit,
    '/api/administrator//batch/delete': administrator.delete,
    '/task/array': task.array,
    'error': error.random,
    '/api/role/all': role.all,
    '/api/role/add': role.add,
    '/api/role/delete': role.delete,
    '/api/province/array': province.array,
    '/api/flow/array': task.flow,
    '/api/alarm/addAlarm.do': alarmRule.addAlarm,
    '/api/alarm/getRuleList.do': alarmRule.getAlarmRuleList,
    '/api/alarm/deleteRule.do': alarmRule.deleteAlarmRule,
    '/api/alarm/editAlarm.do': alarmRule.eidtRule,
    '/api/alarm/getNoticeList.do': alarmNotice.getAlarmNoticeList,
    '/api/task/array':task.array,
    '/api/task':task.chooseMethod,
}




module.exports = {
    MAP_URL: MAP_URL,
    getMapKey: getMapKey
}