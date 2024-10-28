const path = require('path');
let paths=["c/","/user"];
// console.log(...paths);
const joinedPath = path.join(...paths);//... spread operator spreads the element of paths array and then .join 
//join them in the path format of system
// console.log(joinedPath);


const resolvedPath = path.resolve('folder/path',"..","file.txt");
// const resolvedPath = path.resolve('folder');
// const resolvedPath = path.resolve('/absolute/myPath', 'file.txt');
console.log(resolvedPath); 
// Outputs: absolute path to 'anotherFolder/file.txt' based on the current working directory

