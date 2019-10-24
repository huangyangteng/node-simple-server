const Jwt=require('./jwt')

class ResCommon{
    constructor(){
        this.mapErrorInfo={
            '40001':'令牌无效',
            '50000':'系统错误',
            '60000':'数据库操作失败',
            '70000':'文件操作失败'
        }
        this.errorList=[40001,50000,60000,70000]
    }
    success(data=[]){
        return {
            code:'20000',
            info:'success',
            jwt:Jwt.getJwt(),
            data:data
        }
    }
    error(code){
        return {
            code,
            info:this.mapErrorInfo[code],
            jwt:'',
            data:[]
        }
    }
    interceptor(token){
        if(Jwt.validateJwt(token)){
            return {
                validation:true
            }
        }else{
            return {
                validation:false,
                res:this.error(40001)
            }
        }
        

    }
    getErrorList(){
        return this.errorList
    }
}

module.exports=new ResCommon()
