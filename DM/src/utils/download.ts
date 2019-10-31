const http = require('http');
const fs = require('fs');

export default function download( url, fileName ) {
    const file = fs.createWriteStream( fileName );
    const request = http.get(url, function(response) {
        response.pipe(file);
    });
}
