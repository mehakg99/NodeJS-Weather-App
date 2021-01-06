console.log("Hello! I am a javascript file")


const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const message_1 = document.getElementById('message-1')
const message_2 = document.getElementById('message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    message_1.textContent = 'Loading...';
    message_2.textContent = '';

    fetch('/weather?address='+search.value).then((response) => {
        response.json().then((data) => {
            if(data.Error){
                message_1.textContent = data.Error;
            }
            else{
                message_1.textContent = data.location;
                message_2.textContent = data.forecast;
            }
        })
    })
})