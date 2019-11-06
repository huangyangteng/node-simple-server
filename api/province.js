const fs=require('fs')

const Res=require('./resCommon')



const province={
    array(){
        let resData=JSON.parse(fs.readFileSync('data/province.json').toString())
        return Res.success(resData)
        
    },

}

module.exports=province