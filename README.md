测试接口

node启动地址：http://10.1.62.116:55555/

1. 测试登录

地址：/api/login

返回用户相关信息，不区分get,post请求
 
返回数据：

    { 
      "code": 20000,
      "info": "success",
      "jwt": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHQiOjE1NzA3ODgxNjQ3NjcsInVpZCI6IjEiLCJpYXQiOjE1NzA3ODYzNjQ3NjcsImlwIjoiMTAuNC4wLjE0NyJ9.0oGnLppvrSCrENvWJVpD7baXr6iTwh26bWa5wGTNRNA",
      "data": {
      "userID": 1,
      "phone": 15196235245
      }
    }

2. 测试jwt

地址： /api/task/array

请求头中添加了jwt字段，且jwt字段的值等于登录时返回的jwt才能通过校验，正常返回数据

返回数据：

    {
        "code": 20000,
        "info": "success",
        "jwt": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHQiOjE1NzA3ODgxNjQ3NjcsInVpZCI6IjEiLCJpYXQiOjE1NzA3ODYzNjQ3NjcsImlwIjoiMTAuNC4wLjE0NyJ9.0oGnLppvrSCrENvWJVpD7baXr6iTwh26bWa5wGTNRNA",
        "data": [
            {
                "id": 1,
                "type": "addUser",
                "provinceid": 230
            },
            {
                "id": 2,
                "type": "deleteUser",
                "provinceid": 230
            }
        ]
    }



3. 测试错误响应码

地址：/api/err/random

随机返回一个错误信息

返回数据:

    {
      "code": 600001,
      "info": "数据查询失败",
      "jwt": "",
      "data": []
    }


