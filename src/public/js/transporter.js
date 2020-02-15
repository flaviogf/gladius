export function createTransporter(id) {
  const observers = []

  const socket = io({
    query: {
      id,
    },
  })

  socket.on('message-received', notify)

  function send(content) {
    fetch(`/room/${id}/message`, {
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content }),
      method: 'POST',
    })
  }

  function subscribe(observer) {
    observers.push(observer)
  }

  function notify(message) {
    observers.forEach((it) => it(message))
  }

  return {
    send,
    subscribe,
  }
}
