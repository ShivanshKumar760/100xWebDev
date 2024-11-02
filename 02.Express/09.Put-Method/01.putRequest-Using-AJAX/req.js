import fetch from 'node-fetch';

fetch('http://localhost:3000/update/1', {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({//we will convet json data into string and then at server express will automatically parse 
        //it using express.json()
        name: 'John Doe',
        age: 30,
    }),
})
.then(response => response.text())
.then(data => console.log(data))
.catch(error => console.error('Error:', error)); 