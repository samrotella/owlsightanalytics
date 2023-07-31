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

function analyze(guid){
  var MyDate = new Date();
  var MyDateString;

  MyDate.setDate(MyDate.getDate());

  MyDateString = ('0' + (MyDate.getMonth()+1)).slice(-2) + '-' 
              + ('0' + MyDate.getDate()).slice(-2) + '-'
              + MyDate.getFullYear();

    axios.post('https://owlsight-api.onrender.com/analyze', {
        owlGuid: guid,
        accountGuid: null,
        userAgent: navigator.userAgent,
        fullURL: window.location.href,
        baseURL: window.location.hostname,
        pathURL: window.location.pathname,
        operatingSystem: navigator.platform,
        language: navigator.language,
        timeStamp: MyDateString
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
}
