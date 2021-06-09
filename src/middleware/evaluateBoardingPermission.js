export default function evaluateBoardingPermission({ next, router }) {
    
    
    
    if (!router.app.$store.state.user.attributes.permissions_keys.includes(18)) {
      next({
        path: '/'
      })
    } else {
      next()
    }
  }
  