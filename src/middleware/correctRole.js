export default function correctRole({ to, next, router }) {
  let path = to.path

  let basePath = '/login/'
  let role = path.substr(basePath.length, path.length)

  if (role !== 'admin' && role !== 'oper' && role !== 'client') {
    next({
      path: '/login/admin'
    })
  } else {
    next()
  }
}
