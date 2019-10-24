const fakeJwt='eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHQiOjE1NzA3ODgxNjQ3NjcsInVpZCI6IjEiLCJpYXQiOjE1NzA3ODYzNjQ3NjcsImlwIjoiMTAuNC4wLjE0NyJ9.0oGnLppvrSCrENvWJVpD7baXr6iTwh26bWa5wGTNRNA'

class Jwt {
    constructor(jwt){
        this.jwt=jwt
    }
    validateJwt(reqJwt){
        return reqJwt===this.jwt ? true : false
    }
    getJwt(){
        return this.jwt
    }
}

module.exports=new Jwt(fakeJwt)

