const path = require('path');
const resolvedPath1 = path.resolve('folder/path',"..","file.txt");//will move back 1 directory
//that is from d:/folder/path/file.txt to d:/folder/file.txt
const resolvedPath2 = path.resolve('folder');
const resolvedPath3 = path.resolve('/absolute/myPath', 'file.txt');//this will truncate
//the actual file path till our file resolve.js which contains the code and replace it 
//with drive:/absolute/myPath/file.txt
console.log(resolvedPath1);
console.log(resolvedPath2);
console.log(resolvedPath3);