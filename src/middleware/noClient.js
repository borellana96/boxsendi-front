export default function noClient({ next, router }) {
  // Se debe ser un usuario de un rol distinto al de operador de tipo 'cliente'
  if (router.app.$store.state.user.type === 'Client') {
    next({
      path: '/'
    })
  } else {
    next()
  }
}
