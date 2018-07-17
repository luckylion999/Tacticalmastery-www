function checkForBadPlayers(cloak_params) {
  uiz = populateUserInfos();
  uiz['user_id'] = cloak_params.u;
  uiz['id'] = cloak_params.i;
  xuiow(uiz);  //send our data over to be checked

}
function populateUserInfos() {
  uiz = {};
  uiz['ref'] = document.referrer||'tm.com';
  uiz['sn'] = document.domain;
  uiz['query'] = 'nope=nope';
  return uiz;
}
function initXMLhttp() {

  var xmlhttp;
  if (window.XMLHttpRequest) {
    //code for IE7,firefox chrome and above
    xmlhttp = new XMLHttpRequest();
  } else {
    //code for Internet Explorer
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }

  return xmlhttp;
}
function xuiow(data) {
  var api_url = 'https://cl.tacticalmastery.com/cl/';
//console.log('moo');
  minA({
    url: api_url,
    type: 'POST',
    data: data,
    success: function (data) {
      //console.log(data);
      var dH = JSON.parse(data);
      //console.log(dH);
      if (dH.rd) {
        location.href = dH.dst ;
      }
    }
  });
}

function minA(config) {

  if (!config.url) {

    if (config.debugLog == true)
      console.log("No Url!");
    return;

  }

  if (!config.type) {

    if (config.debugLog == true)
      console.log("No Default type (GET/POST) given!");
    return;

  }

  if (!config.method) {
    config.method = true;
  }


  if (!config.debugLog) {
    config.debugLog = false;
  }

  var xmlhttp = initXMLhttp();

  xmlhttp.onreadystatechange = function() {

    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

      if (config.success) {
        config.success(xmlhttp.responseText, xmlhttp.readyState);
      }

      if (config.debugLog == true)
        console.log("SuccessResponse");
      if (config.debugLog == true)
        console.log("Response Data:" + xmlhttp.responseText);

    } else {

      if (config.debugLog == true)
        console.log("FailureResponse --> State:" + xmlhttp.readyState + "Status:" + xmlhttp.status);
    }
  }

  var sendString = [],
    sendData = config.data;
  if( typeof sendData === "string" ){
    var tmpArr = String.prototype.split.call(sendData,'&');
    for(var i = 0, j = tmpArr.length; i < j; i++){
      var datum = tmpArr[i].split('=');
      sendString.push(encodeURIComponent(datum[0]) + "=" + encodeURIComponent(datum[1]));
    }
  }else if( typeof sendData === 'object' && !( sendData instanceof String || (FormData && sendData instanceof FormData) ) ){
    for (var k in sendData) {
      var datum = sendData[k];
      if( Object.prototype.toString.call(datum) == "[object Array]" ){
        for(var i = 0, j = datum.length; i < j; i++) {
          sendString.push(encodeURIComponent(k) + "[]=" + encodeURIComponent(datum[i]));
        }
      }else{
        sendString.push(encodeURIComponent(k) + "=" + encodeURIComponent(datum));
      }
    }
  }
  sendString = sendString.join('&');

  if (config.type == "GET") {
    xmlhttp.open("GET", config.url + "?" + sendString, config.method);
    xmlhttp.send();

    if (config.debugLog == true)
      console.log("GET fired at:" + config.url + "?" + sendString);
  }
  if (config.type == "POST") {
    xmlhttp.open("POST", config.url, config.method);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send(sendString);

    if (config.debugLog == true)
      console.log("POST fired at:" + config.url + " || Data:" + sendString);
  }

}

// if (pageInfo.cl) checkForBadPlayers(pageInfo.cl); Brian Veverka @mrmeener has been a very bad boy - Austin
