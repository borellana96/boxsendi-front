export default function usersDashboardPermission({ next, router }) {
    console.log("...................................")
    console.log(router.app.$store.state.user.attributes.permissions_keys)
    
    
    if (!router.app.$store.state.user.attributes.permissions_keys.includes(14)) {
      next({
        path: '/'
      })
    } else {
      next()
    }
  }
  