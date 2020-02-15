class JoinToTheRoomController {
  constructor({ database }) {
    this.database = database
  }

  create(req, res) {
    return res.render('join-to-the-room__create')
  }

  async store(req, res) {
    const { name } = req.body

    const room = await this.database.rooms.findOne({
      where: {
        name,
      },
    })

    if (!room) {
      req.flash('error', "This room doesn't exist.")

      return res.render('join-to-the-room__create')
    }

    await req.user.addRoom(room)

    return res.redirect(`/room/${room.id}`)
  }
}

export default JoinToTheRoomController
