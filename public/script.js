let username = prompt('Введите Ваше имя')

const socket = io()

socket.on('connect', () => {
  console.log('connected:', socket.id)
  username = username ? username : socket.id
  document.getElementById('username').innerText = username
})

socket.on('newmsg', (user, msgtext) => {
  const message = createNewMessage(user, msgtext)
  document.getElementById('message-area').appendChild(message)
})

const timeToString = (time) => {
  const formatter = new Intl.DateTimeFormat('ru', {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  })

  return(formatter.format(time))
}

const createNewMessage = (user, message) => {
  const username = document.createElement('em')
  username.innerText = `${timeToString(Date.now())} ${user}:`

  const messageText = document.createElement('blockquote')
  // p.classList.add('message')
  messageText.append(message)

  const messageBlock = document.createElement('div')
  messageBlock.append(username)
  messageBlock.append(messageText)

  return messageBlock
}

const formSubmitHandler = async (e) => {
  e.preventDefault()

  const msg = e.target.message.value.trim()

  if (msg === '')
    return alert('Введите сообщение')

  await socket.emit('msg', username, msg)

  e.target.message.value = ''
}

const  submitOnEnter = (e) => {
  if (e.which === 13) {
    e.target.form.dispatchEvent(new Event('submit', { cancelable: true }));
    e.preventDefault();
    e.target.value = ''
  }
}

document.getElementById('message').addEventListener('keypress', submitOnEnter);
document.getElementById('message-form').addEventListener('submit', formSubmitHandler)
