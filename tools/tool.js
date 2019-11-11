const fs = require('fs')
// 获取count位随机码
exports.getRandomNumber = function (count) {
    var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    var res = ''
    for (var i = 0; i < count; i++) {
        var id = Math.ceil(Math.random() * 35);
        res += chars[id];
    }
    return res;
}
// 同步读取json文件，返回json文件中的数据对象
exports.readFiles = function (url) {
    var str = fs.readFileSync(url).toString()
    var obj = JSON.parse(str)
    return obj
}

// 同步向json文件中写入数据
exports.writeFiles = function (url, data) {
    fs.writeFileSync(url, JSON.stringify(data))
}