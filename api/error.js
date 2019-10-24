const Res=require('./resCommon')
const error={
    random(){
        let errList=Res.getErrorList()
        let randomIndex=Math.floor(Math.random()*errList.length)
        console.log("TCL: random -> randomIndex", randomIndex)
        return Res.error(errList[randomIndex])
        
    }
}

module.exports=error