
if(url=='a'){
    // do something
    console.log('a')
}else if(url=='b'){
    // do something
}else if(url=='c'){

}else if(url=='d'){

}

// ----------------------
const MAP_URL={
    'a':function(){
        console.log('a')
    },
    'b':function(){

    },
    'c':function(){

    },
    'd':function(){

    }
}

function doSomeThingByUrl(url){
    MAP_URL[url]()
}

doSomeThingByUrl('a')