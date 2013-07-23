var url=require("url");
exports.mergePaths=function(first,second){
    var firstUrl=url.parse(first);
    var secondUrl=url.parse(second);
    if(!firstUrl.host){
        return false;
    }

    if(secondUrl.host){
        return second;
    }else{

        //when link is to the previos directory
        if(second[0]==='.' && second[1]==='.' && second[2]==='/'){
            secondArr=second.split('/');
            firstArr=first.split('/');
            if(!firstArr[(firstArr.length-1)]){
                firstArr.pop();
            }
            for(var t=0;t<secondArr.length;++t){
                if(secondArr[t]==='..'){
                    firstArr.pop();
                    secondArr.shift();
                }else{
                    t=secondArr.length+1;
                }
            }
            
            first=firstArr.join('/')+'/';
            firstUrl=url.parse(first);
            second=secondArr.join('/');
        }

        if(second[0]==="/"){
            return firstUrl.protocol+"//"+firstUrl.host+second;
        }else{
            return first+second;
        }
    }
}

exports.isSameDomain=function(first,second){
    var firstUrl=url.parse(first);
    var secondUrl=url.parse(second);

    if(!firstUrl.host){
        return false;
    }

    if(!secondUrl.host){
        return false;
    }

    if(firstUrl.host===secondUrl.host){
        return true;
    }
    return false
}

