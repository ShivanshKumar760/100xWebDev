const deleteBtns= document.getElementsByClassName('deleteBtn');
console.log(deleteBtns);
for (let i = 0; i < deleteBtns.length; i++) {
    deleteBtns[i].addEventListener('click', function(event) {
        // Your code to handle the form submission
        const li = this.parentNode; 
        const id = li.getAttribute('data-id');
        fetch(`/api/deletePosts/${id}`, {method: 'DELETE'})
            .then(()=> {
                console.log("Deleted")
                window.location.reload();
            });
       
    });
};
