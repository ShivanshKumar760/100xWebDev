document.getElementById('deleteUserForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission
    
    const userId = document.getElementById('userId').value;

    fetch(`/delete/user/${userId}`, {
    method: 'DELETE'})
    .then(response => response.text())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
});