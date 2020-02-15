import uuid4 from 'uuid/v4'

class MessageController {
  constructor({ database }) {
    this.database = database
  }

  async store(req, res) {
    const { id } = req.params

    const { content } = req.body

    const room = await this.database.rooms.findOne({
      where: {
        id,
      },
    })

    if (!room) {
      return res
        .status(404)
        .json({ data: null, errors: ["This room doesn't exist."] })
    }

    const message = await this.database.messages.create({
      id: uuid4(),
      content,
      user_id: req.user.id,
      room_id: id,
    })

    return res.status(200).json({ data: message, errors: [] })
  }
}

export default MessageController
