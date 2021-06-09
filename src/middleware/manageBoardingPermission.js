export default function manageBoardingPermission({ next, router }) {
    
    
    
    if (!router.app.$store.state.user.attributes.permissions_keys.includes(19)) {
      next({
        path: '/'
      })
    } else {
      next()
    }
  }
  