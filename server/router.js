function router({ routes }) {
  return async (req, res) => {
    const route = routes[req.method]
    if (route) await route(req, res)
    else res.status(405).send()
  }
}

module.exports = router
