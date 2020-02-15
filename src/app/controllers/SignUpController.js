import uuid4 from 'uuid/v4'

class SignUpController {
  constructor({ database }) {
    this.database = database
  }

  create(req, res) {
    return res.render('sign-up__create')
  }

  async store(req, res) {
    const { username, password } = req.body

    const isUsernameAlreadyTaken = await this.database.users.findOne({
      where: {
        username,
      },
    })

    if (isUsernameAlreadyTaken) {
      req.flash('error', 'Invalid email or password.')

      return res.render('sign-up__create')
    }

    await this.database.users.create({
      id: uuid4(),
      username,
      password,
    })

    return res.redirect('/sign-in')
  }
}

export default SignUpController
