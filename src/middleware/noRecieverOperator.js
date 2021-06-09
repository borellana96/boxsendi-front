export default function noRecieverOperator({ next, router }) {
  // Se debe ser un usuario de un rol distinto al de operador de tipo 'de recepcion'
  if (router.app.$store.state.user.attributes.operator_type === 2) {
    next({
      path: '/'
    })
  } else {
    next()
  }
}
