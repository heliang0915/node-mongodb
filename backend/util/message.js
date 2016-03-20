exports.parseJSON=function(state,msg,data){
    data=data==undefined?{}:data;
    var msgJSON={};
    msgJSON.state=state;
    msgJSON.msg=msg;
    msgJSON.data=data;
    return msgJSON;
}