import uuid4 from 'uuid/v4'
import Message from '../models/Message'
import User from '../models/User'

class RoomController {
  constructor({ database }) {
    this.database = database
  }

  create(req, res) {
    return res.render('room__create')
  }

  async store(req, res) {
    const { name } = req.body

    const isNameAlreadyTaken = await this.database.rooms.findOne({
      where: {
        name,
      },
    })

    if (isNameAlreadyTaken) {
      req.flash('error', 'This name is already taken.')

      return res.render('room__create')
    }

    const room = await this.database.rooms.create({
      id: uuid4(),
      name,
    })

    await req.user.addRoom(room)

    req.flash('info', `The ${room.name} room has been created.`)

    return res.redirect('/room')
  }

  async index(req, res) {
    const rooms = await req.user.getRooms({
      order: [['name', 'ASC']],
    })

    return res.render('room__index', { rooms })
  }

  async show(req, res) {
    const { id } = req.params

    const room = await this.database.rooms.findOne({
      where: {
        id,
      },
      include: [
        {
          model: Message,
          as: 'messages',
          include: [
            {
              model: User,
              as: 'user',
            },
          ],
        },
      ],
    })

    if (!room) {
      return res.status(404).render('404')
    }

    return res.render('room__show', { room })
  }
}

export default RoomController
