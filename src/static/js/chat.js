export function createChat(transporter) {
  const listeners = []

  function subscribe(listener) {
    listeners.push(listener)
  }

  async function send({ id, content }) {
    const message = await transporter.send({ id, content })
    listeners.forEach((it) => it(message))
  }

  return {
    send,
    subscribe,
  }
}
