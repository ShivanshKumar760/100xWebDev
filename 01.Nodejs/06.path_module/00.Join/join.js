const path = require('path');
let paths=["c/","/user"];
// console.log(...paths);
const joinedPath = path.join(...paths);//... spread operator spreads the element of paths array and then .join 
//join them in the path format of system
console.log(joinedPath);

console.log(path.join("c","user","myfile","file.txt"));
console.log(path.join('/absolute/myPath', 'file.txt'));//will make this the absolute path