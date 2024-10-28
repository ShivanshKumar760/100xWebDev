import {URL} from "url";
import { fileURLToPath } from "url";
import url from "url";

// let myURL=new URL("https://www.example#site.com:8080/p/a/t/h?q=123#hash");
let myURL=new URL("https://www.example.com:8080/p/a/t/h?q=234g#hash");

console.log(myURL.hash);//will return back any hash started value
console.log(myURL.hostname);//will return back the hostname or domain name 
console.log(myURL.port);//will return back any port number associated with the url
console.log(myURL.protocol);//will return back the request and response protocol of the url like http or https 
console.log(myURL.href);//will return back the refrence that is whole url
console.log(myURL.search);//will return back the query parameter string after ?
console.log(myURL.searchParams);//will return back  a object with key value pair that will hold parameter like in this case q
//and parameter value like 234g 

let fileURL=new URL('file:///C:/path/').pathname;//will  convert filepath into a unix format
console.log(fileURL);
console.log(fileURLToPath("file:///C:/path/"));//will conver filepath into perticular os format


const parsedUrl = url.parse('https://example.com:8000/path/name?query=string#hash', true);
console.log(parsedUrl);


const urlObject = {
    protocol: 'https:',
    host: 'example.com:8000',
    pathname: '/path/name',
    search: '?query=string',
    hash: '#hash'
};

const urlString = url.format(urlObject);//fomat the object into url
console.log(urlString); // Outputs: 'https://example.com:8000/path/name?query=string#hash'


let getFilePath=fileURLToPath(import.meta.url);
console.log(getFilePath);