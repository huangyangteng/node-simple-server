const {readFiles } = require('../tools/tool')

const Res = require('./resCommon')

const alarmNotice = {
    getAlarmNoticeList(req, res) {
        var reqData = req.query
        let alarmNoticeList = readFiles('./data/alarmNoticeList.json')
        let {
            pageNo,
            pageSize,
            alarm_type,
            locationId,
            rule_code,
            alarm_level,
            daterange
        } = reqData
        let searchCondition = ""
        alarm_type && (searchCondition += '&&item.alarm_type === alarm_type')
        locationId && (searchCondition += '&&item.location.id === locationId')
        rule_code && (searchCondition += '&& new RegExp(rule_code, "i").test(item.rule_code)')
        alarm_level && (searchCondition += '&&item.alarm_level === alarm_level')
        let searchNotices = alarmNoticeList.filter(item => {
            return eval(true + searchCondition)
        })
        let total = searchNotices.length
        searchNotices = searchNotices.slice((pageNo - 1) * pageSize, pageNo * pageSize)
        return Res.success({
            list: searchNotices,
            total: total
        })
    }
}

module.exports = alarmNotice