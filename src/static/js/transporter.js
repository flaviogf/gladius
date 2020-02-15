export function createHttpTransporter() {
  async function send({ id, content }) {
    const response = await fetch(`/room/${id}/message`, {
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content }),
      method: 'POST',
    })

    const { data } = await response.json()

    return data
  }

  return {
    send,
  }
}
