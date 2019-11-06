const Jwt=require('./jwt')

class ResCommon{
    constructor(){
        this.mapErrorInfo={
            '400001':'令牌无效',
            '500000':'系统错误',
            '600000':'数据库操作失败',
            '70000':'文件操作失败',
            '80000':'前端HTTP方法错误'
        }
        this.errorList=[400001,500000,600000,700000]
    }
    success(data=[]){
        return {
            code:'200000',
            info:'success',
            jwt:Jwt.getJwt(),
            data:data
        }
    }
    error(code,info){
        info= info || this.mapErrorInfo[code]
        return {
            
            code,
            info,
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
                res:this.error(400001)
            }
        }
        

    }
    getErrorList(){
        return this.errorList
    }
    getReqData(arr){
        return JSON.parse(arr.concat().toString())
    }
}

module.exports=new ResCommon()
