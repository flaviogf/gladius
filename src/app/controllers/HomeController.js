class HomeController {
  index(req, res) {
    console.log(req.user)

    return res.render('home-index', { username: req.user.username })
  }
}

export default HomeController
