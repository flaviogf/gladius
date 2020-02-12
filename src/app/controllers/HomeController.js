class HomeController {
  index(req, res) {
    return res.render('home-index', { username: req.user.username })
  }
}

export default HomeController
