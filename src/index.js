import _ from 'lodash';

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

// pass up the tracking object and let the API do the work
    // The API will be responsible for tracking uniqueness
function analyze(guid){
    var dataObj = {
        owlGuid: guid,
        userAgent: navigator.userAgent
    }
    console.log('dataObj: ' + dataObj.userAgent);
    console.log('owlGuid: ' + dataObj.owlGuid);
}