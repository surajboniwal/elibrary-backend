const email = document.querySelector('#email')
const password = document.querySelector('#password')
const submit = document.querySelector('#submit')

submit.addEventListener('click', (e)=>{
    var http = new XMLHttpRequest();
    var url = 'http://192.168.0.108:3000/auth/login';
    var params = 'orem=ipsum&name=binny';
    http.open('POST', url, true);
    
    http.setRequestHeader('Content-type', 'application/json');

    http.onreadystatechange = function() {
        if(http.readyState == 4 && http.status == 200) {
            alert(http.responseText);
        }
    }
    http.send(params);
})

// let scanner = new Instascan.Scanner({ video: document.getElementById('preview') });
// scanner.addListener('scan', function (content) {
//     alert(content);
// });
// Instascan.Camera.getCameras().then(function (cameras) {
//     if (cameras.length > 0) {
//     scanner.start(cameras[0]);
//     } else {
//     console.error('No cameras found.');
//     }
// }).catch(function (e) {
//     console.error(e);
// });