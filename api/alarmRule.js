const { getRandomNumber, readFiles, writeFiles } = require('../tools/tool')

const Res = require('./resCommon')
const alarmRule = {
    addAlarm(req, res, reqData) {
        var alarmRuleList = readFiles("./data/AlarmRules.json")
        var contactsList = readFiles("./data/administrator.json")
        var locations = readFiles('./data/province.json')
        var contacts = reqData.contact.split(',')
        var result = {
            id: getRandomNumber(6),
            error_count: reqData.error_count,
            alarm_indicator: reqData.alarm_indicator,
            alarm_type: reqData.alarm_type,
            aggregate_day: reqData.aggregate_day,
            receive_type: reqData.receive_type == 1 ? '邮箱' : reqData.receive_type == 2 ? '短信' : '邮箱+短信',
            contacts: [],
            location: locations.find(location => location.id == reqData.locationId),
            rule_code: getRandomNumber(11)
        }
        contacts.forEach(item => {
            var contactData = contactsList.list.find(contact => {
                return contact.id == item
            })
            result.contacts.push(contactData)
        })
        alarmRuleList.list.unshift(result)

        writeFiles('./data/AlarmRules.json', alarmRuleList)
        return Res.success({
            desc: '添加规则成功'
        })
    },
    eidtRule(req, res, reqData) {
        var alarmRuleList = readFiles("./data/AlarmRules.json")
        var contactsList = readFiles("./data/administrator.json")
        var locations = readFiles('./data/province.json')
        var contacts = reqData.contact.split(',')
        var result = {
            id: reqData.id,
            error_count: reqData.error_count,
            alarm_indicator: reqData.alarm_indicator,
            alarm_type: reqData.alarm_type,
            aggregate_day: reqData.aggregate_day,
            receive_type: reqData.receive_type == 1 ? '邮箱' : reqData.receive_type == 2 ? '短信' : '邮箱+短信',
            contacts: [],
            location: locations.find(location => location.id == reqData.locationId),
            rule_code: reqData.rule_code
        }
        contacts.forEach(item => {
            var contactData = contactsList.list.find(contact => {
                return contact.id == item
            })
            result.contacts.push(contactData)
        })
        var index = alarmRuleList.list.findIndex(item => item.id == reqData.id)
        if (index === -1) return Res.error('600001', '无此告警规则')
        alarmRuleList.list.splice(index, 1, result)
        writeFiles('./data/AlarmRules.json', alarmRuleList)
        return Res.success({
            desc: '修改成功!'
        })

    },
    getAlarmRuleList(req, res, reqData) {
        var alarmRuleList = readFiles("./data/AlarmRules.json")
        var {
            pageNo,
            pageSize,
            alarm_type,
            locationId,
            rule_code
        } = reqData
        var searchCondition = ''
        rule_code && (searchCondition += '&& new RegExp(rule_code, "i").test(item.rule_code)')
        alarm_type && (searchCondition += '&& item.alarm_type == alarm_type')
        locationId && (searchCondition += '&& item.location.id == locationId')
        var searchRules = alarmRuleList.list.filter(item => {
            return eval(true + searchCondition)
        })
        var total = searchRules.length
        searchRules = searchRules.slice((pageNo - 1) * pageSize, pageNo * pageSize)

        return Res.success({
            list: searchRules,
            total: total
        })
    },
    deleteAlarmRule(req, res, reqData) {
        var alarmRuleList = readFiles("./data/AlarmRules.json")
        var id = reqData.id
        var deleteIndex = alarmRuleList.list.findIndex(item => item.id === id)
        if (deleteIndex == -1) return Res.error('600001', '无此告警规则')
        alarmRuleList.list.splice(deleteIndex, 1)

        writeFiles('./data/AlarmRules.json', alarmRuleList)
        return Res.success({
            desc: '删除成功!'
        })
    }
}
module.exports = alarmRule