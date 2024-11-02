alert("Hello");
document.getElementById('updateUserForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission
    
    const userId = document.getElementById('userId').value;
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;

    fetch(`/update/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, age }),
    })
    .then(response => response.text())
    .then(data => {
        console.log('User updated:', data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
});