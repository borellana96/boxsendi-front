export default function noAuth({ next, router }) {
  // Se debe no estar autenticado para pasar normal el middleware
  if (router.app.$store.state.token !== null) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    window.console.log('It is already authenticated')
    next({
      path: '/'
    })
  } else {
    next()
  }
}
