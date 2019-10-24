const Res=require('./resCommon')
const administrator={
    login(){
        let data={
               id:1,
               name:'super admin',
               phoneNumber:'15812233158',
               email:'15812233158@ebupt.com',
               password:'271c3f3c8aa14d9a82703b4f3a6cfcdb',
               role:[],
               permission:[],
               createAdminId:-1,
               createData:'20190808',
               adminState:'00'

        }
        return Res.success(data)
        
    }
}

module.exports=administrator