export function createChat(transporter) {
  function subscribe(observer) {
    transporter.subscribe(observer)
  }

  function send(content) {
    transporter.send(content)
  }

  return {
    send,
    subscribe,
  }
}
