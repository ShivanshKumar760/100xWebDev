const deleteBtns= document.getElementsByClassName('deleteBtn');
console.log(deleteBtns);
for (let i = 0; i < deleteBtns.length; i++) {
    deleteBtns[i].addEventListener('click', function(event) {
        // Your code to handle the form submission
        const div = this.parentNode; 
        console.log(div);
        const _id = div.getAttribute('data-id');
        console.log(_id);
        fetch(`/blog/delete/${_id}`, {method: 'DELETE'})
            .then(()=> {
                console.log("Deleted")
                window.location.reload();
            });
       
    });
};
