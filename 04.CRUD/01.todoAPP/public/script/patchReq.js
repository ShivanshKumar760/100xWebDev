alert("Hello");
document.getElementById('patchTodoForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission
    
    const _id = document.getElementById('todoId').value;
    console.log(_id)
    const attribute = document.getElementById('attr').value;
    console.log(attribute);
    const value = document.getElementById('val').value;
    console.log(value);
    const obj={};
    obj[attribute]=value;
    console.log(obj);
    fetch(`/patch/${_id}`, {
    method: 'PATCH',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj)})
    .then((response) =>
    { 
        console.log(response);
        return response.json()
    })
    .then((data) => {
        console.log(data);
        // window.location.href = 'http://localhost:3000/';
        console.log("Done");
        setTimeout(()=>{
            window.location.href = 'http://localhost:3000/';
        },3000);

    })
    .catch(error => console.error('Error:', error));
});