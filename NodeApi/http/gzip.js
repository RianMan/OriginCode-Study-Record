let fs = require('fs');
let path = require('path');
let zlib = require('zlib');

// zip a file
function gzip(src){
    fs.createReadStream(src)
        .pipe(zlib.createGzip())
        .pipe(fs.createWriteStream(src+'.gz'))
}
// gzip(path.join(__dirname,'./1.txt'));

//  unzip a file

function gunzip(src){
    fs.createReadStream(src)
        .pipe(zlib.createGunzip())
        .pipe(fs.createWriteStream(path.join(__dirname,path.basename(src,'.gz'))));
}
gunzip(path.join(__dirname,'1.txt.gz'));