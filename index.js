const fs = require('fs');
const path = require('path');


// const directorypath = `./tests/step1/` ;
const directorypath = `./tests/step1/` ;



const check = (s) => {
    if(s[0] !== "{" || s[s.length-1]!== "}"){
        return false;
    }
   
    s=s.trim();
    st = s.slice(1, -1);

    if(st.split(",").length >1){
        for(let i of st.trim().split(",")){
            if(i){
                let key = i.trim().split(":")[0].trim()
                let val = i.trim().split(":")[1]
                val.trim()
                if(typeof key !== "string"){
                    return false
                }

                if (typeof val === undefined) {
                    return false;
                }

                if (key[0] !== '"' || key[key.length - 1] !== '"') {
                    return false;
                }

                console.log(val)
                if (val.indexOf("'") !== -1) {
                    console.log(val)
                    return false;
                }

            }
        }
    }

    

    const lastLine = s.split("}")[0].trim();
    if (lastLine[lastLine.length - 1] === ",") {
        return false;
    }
   
    return true;

}


fs.readdir(directorypath,(Err,files) => {

    if(Err){
        console.error("Error reading directory:", Err);
    }

    else{
        for(let i=0;i<files.length;i++){
            let file = files[i]

            if(path.extname(file) === ".json" || path.extname(file) === ".JSON"){
               const filepath =  path.join(directorypath,file)
               fs.readFile(filepath,"utf-8", (Err,data)=>{
                  if( data && check(data.trim())){
                    console.log( `${file} This file is Valid`)
                  }
                  else{
                    console.log( `${file} This file is InValid`)
                  }
               })


            }
        }
    }

})

