const administrator=require('./api/administrator')
const task=require('./api/task')
const error=require('./api/error')

const Controller={
    administrator,
    task,
    error
}
module.exports=Controller