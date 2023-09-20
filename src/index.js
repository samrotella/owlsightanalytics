import _ from 'lodash';
const axios = require('axios');
let localStorageGuid = window.localStorage.getItem('owlGuid');

if (localStorageGuid) {
    analyze(localStorageGuid);
}
else {
    let localGuid = createGuid();
    window.localStorage.setItem('owlGuid', localGuid);
    analyze(localGuid);
}

function createGuid() {
    return 'aaaaaaaa-aaaa-4aaa-yaaa-aaaaaaaaaaaa'.replace(/[ay]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'a' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function analyze(guid, conv){
  var MyDate = new Date();
  // let src = window.location.href.searchParams.get("utm_source");
  let params = new URL(document.location).searchParams;
  let name = params.get("utm_source"); // is the string "Twitter".
  let campaignName = params.get("utm_campaign");
  let mediumName = params.get("utm_medium");
  let contentName = params.get("utm_content");

  axios.post('https://owlsight-api.onrender.com/analyze', {
      owlGuid: guid,
      userAgent: navigator.userAgent,
      fullURL: window.location.href,
      baseURL: window.location.hostname,
      pathURL: window.location.pathname,
      operatingSystem: navigator.platform,
      language: navigator.language,
      timeStamp: MyDate,
      conversion: conv,
      source: name,
      campaign: campaignName,
      medium: mediumName,
      content: contentName
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}

export function hello() {
  console.log('hello');
}
export function conversions(friendlyName, value) {
  let guid = window.localStorage.getItem('owlGuid');
  let convObj = {
    name: friendlyName,
    val: value
  }

  analyze(guid, convObj);
  console.log('conversions'); 
}