const openFormBtn = document.getElementById('openFormBtn'); 
const formContainer = document.getElementById('formContainer'); 
const closeFormBtn = document.getElementById('closeFormBtn'); 

openFormBtn.addEventListener('click', () => { 
    formContainer.style.display = 'grid'; 
    openFormBtn.style.display='none';
});


closeFormBtn.addEventListener('click', () => { 
    formContainer.style.display = 'none'; 
    openFormBtn.style.display='block';
});


