function router({ routes }) {
  return async (request, response) => {
    const route = routes[request.method]
    if (route) await route(request, response)
    else response.status(405).send()
  }
}

module.exports = router
