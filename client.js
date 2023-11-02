const socket = io('http://localhost:8000');



const form = document.getElementById('send');
const messageInput = document.getElementById('messageInp')
const messageContainer = document.querySelector(".container")
var audio = new Audio('ringtone.wav');

const append = (message, position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position == 'left'){
        audio.play();
    }
   
}

const yourname = prompt("Enter your name to join") ;
socket.emit('new-user-joined', yourname)

socket.on('user-joined', yourname =>{
append(`${yourname} joined the chat`,'right')
})
form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right')
    socket.emit('send', message)
    messageInput.value = "";
})
socket.on('receive', data =>{
    append(`${data.yourname} : ${data.message}`,'left')
    })

    socket.on('leave', name =>{
        append(`${yourname} left the chat`,'right')
        })
    


 

 