export default function auth({ next, router }) {
  // Se debe estar autenticado para pasar normal el middleware
  console.log(router.app.$store.state)
  if (
    !router.app.$store.state.token ||
    router.app.$store.state.token === 'null'
  ) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    window.console.log('Not authenticated')
    next({
      path: '/welcome'
    })
  } else {
    next()
  }
}
