alert("Hello");
document.getElementById('patchTodoForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission
    
    const userId = document.getElementById('todoId').value;
    const attribute = document.getElementById('attr').value;
    const value = document.getElementById('val').value;
    const obj={};
    obj[attribute]=value;
    fetch(`/patch/${userId}`, {
    method: 'PATCH',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj)})
    .then(response => response.text())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
});