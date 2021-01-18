const fetch = require('node-fetch');
var randomize = require('randomatic');
var random = require('random-name');
const readline = require("readline-sync");

const functionRegist = (email, reff) => new Promise((resolve, reject) => {
    const bodys = {
        receiver_email: email,
        code: reff
     } 
   
       fetch('http://49.247.204.193:5000/user/confirm-invite-code', { 
        method: 'POST', 
        body: JSON.stringify(bodys),
        headers: {
            'accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json;charset=utf-8',
            'Content-Length': 133,
            'Host': '49.247.204.193:5000',
            'Connection': 'Keep-Alive',
            'Accept-Encoding': 'gzip',
            'User-Agent': 'okhttp/3.14.3'
        }
       })
       .then(res => res.json())
       .then(result => {
           resolve(result);
       })
       .catch(err => reject(err))
   });
   
(async () => {
    const reff = readline.question('[?] Kode reff: ')
    const jumlah = readline.question('[?] Jumlah reff: ')
    console.log("")
    for (var i = 0; i < jumlah; i++){
        try {
            const user = random.first().toLocaleLowerCase()
            const rand = randomize('0', 7)
            const email = `${user}${rand}@gmail.com`
            const reg = await functionRegist(email, reff)
            if(reg.result == 1){
                console.log('[+] Berhasil Reff !')
            } else {
                console.log('[!] Gagal Reff !')
            }
        } catch (e) {
            console.log(e)
    }
}
})()