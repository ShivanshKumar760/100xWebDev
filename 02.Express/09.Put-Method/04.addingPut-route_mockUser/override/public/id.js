// alert("hell0");
document.getElementById('userId').addEventListener('input', function() {
    const userId = this.value; // Get the value from the User ID input
    const form = document.getElementById('userForm');

    // Update the action attribute to include the dynamic user ID
   
    form.action = `/update/${userId}?_method=PUT`;
    console.log(form.action);
    
});