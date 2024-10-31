import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';

// const html=readFile("index.html").then((data)=>{return data; })
/*
readFile('index.html') .then(
    data => { html = data; }) .catch(err => { console.error('Error reading file:', err)});
why cant we directly assign it to html variable
You can't directly assign the result of an asynchronous operation, like readFile, 
to a variable because JavaScript doesn't wait for the promise to resolve. 
When using .then(), the html variable will initially be assigned undefined until the 
promise resolves. The code inside .then() runs asynchronously, so if you try to use 
html outside of .then() before it has resolved, you'll just get undefined.

This asynchronous nature ensures your server can handle other tasks while waiting 
for the file to be read, rather than blocking the execution. It's all about efficiency 
and non-blocking I/O operations.
*/
let html='';
readFile('./public/form.html') .then(
    data => { html = data; })
 .catch(err => { console.error('Error reading file:', err); });
const server = createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/') {
    // Serve the HTML form
    // const html = await readFile('index.html');//we are using the Promise verison of 
    //of readFile
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(html)
    res.end();
  } else if (req.method === 'POST' && req.url === '/submitForm') {
    let body = '';

    // Collect data from the request
    //.on is a event handler which will trigger when a chunck of data will come
    req.on('data', chunk => {
      body += chunk.toString(); // Convert Buffer to string
    });
    //that is one the data is received we use .on handler with end trigger 
    //to do the required functionality
    req.on('end', () => {
      // Parse the form data (application/x-www-form-urlencoded)
      const parsedData = new URLSearchParams(body);
      /* 
      new URLSearchParams(body) is used to parse URL-encoded form data. 
      It takes the body (a string of encoded parameters) and creates an instance of 
      URLSearchParams, which allows you to easily access the parameters.

For example, if body contains "name=Shivansh&email=shivansh@example.com",
 you can do the following:
      */
      const name = parsedData.get('Name');
      const email = parsedData.get('Age');

      // Respond with the collected data
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end(`Received data:\nName: ${name}\nEmail: ${email}`);
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

// Start the server
server.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});
