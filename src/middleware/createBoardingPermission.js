export default function createBoardingPermission({ next, router }) {
    
    
    
    if (!router.app.$store.state.user.attributes.permissions_keys.includes(15)) {
      next({
        path: '/'
      })
    } else {
      next()
    }
  }
  