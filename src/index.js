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
    let isUnique = isUniqueSession(guid);
    // axios.post('http://localhost:3000/analyze', {
    axios.post('https://owlsight-api.onrender.com/analyze', {
        owlGuid: guid,
        userAgent: navigator.userAgent,
        unuqueSession: isUnique
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
}

function isUniqueSession(guid) {
    // do a call to the API to check and see if it's seen the GUID before on that organization
        // if so, do not increment the unique count
    return true;
}