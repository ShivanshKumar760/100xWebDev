const deleteBtns= document.getElementsByClassName('deleteBtn');
console.log(deleteBtns);
for (let i = 0; i < deleteBtns.length; i++) {
    deleteBtns[i].addEventListener('click', function(event) {
        alert("Hello world");
        // Your code to handle the form submission
        const li = this.parentNode; 
        const id = li.getAttribute('data-id');
        fetch(`/delete/${id}`, {method: 'DELETE'})
            .then(()=> {
                console.log("Deleted")
                window.location.reload();
            });
       
    });
};
