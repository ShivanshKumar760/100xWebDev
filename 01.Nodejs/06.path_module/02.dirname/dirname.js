const path = require('path');
const filePath=`D:/coding/development/Web Development/100x/100xWebDev/01.Nodejs/06.path_module/01.reslove/folder/file.txt`
const _dirname=path.dirname(filePath);//will return back all the directory till file
console.log(_dirname);