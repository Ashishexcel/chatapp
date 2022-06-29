
const socket = io('http://localhost:3000');

const messageContainer = document.getElementById('message-container');
const messageFrom = document.getElementById('send-container');
const messageInput = document.getElementById('message-input');

let name;
while(!name){
    name = prompt('enter your name')
}

appendMessage('you joined');

socket.emit('new-user',name);


socket.on('chat-message',data=>{
    appendMessage(`${data.name}:${data.message}`)
})

socket.on('user-connected',name=>{
    appendMessage(`${name} connected`)
})

socket.on('user-disconnected',name=>{
    appendMessage(`${name} disconnected`)
})

messageFrom.addEventListener('submit',e=>{
    e.preventDefault();

    const message = messageInput.value
    appendMessage(`you : ${message}`)
    socket.emit('send-chat-message',message);
    message.value = ''
});

function appendMessage(message){
    const messageElement = document.createElement('div');
    messageElement.innerHTML = message
    messageContainer.append(messageElement)
}
