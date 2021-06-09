import axios from 'axios'

export const ordersService = {
  listOrdersByCityAndOperator(senderOperatorId, destinationId, callback) {
    let url =
      process.env.API_URL +
      '/api/purchaseOrder/list-orders-destination/' +
      senderOperatorId +
      '?idCity=' +
      destinationId
    console.log(url)
    console.log("-------------------------------------------");
    

    axios
      .get(url)
      .then(response => {
        console.log(response.data)

        let ordersList = response.data.body
        callback(ordersList)
      })
      .catch(errors => {
        console.log(errors)
        console.log(errors.response)

        return
      })
  },
  async updateBuyingOrder(id, data) {
    let url =
      process.env.API_URL + '/api/purchaseOrder/update-order-grabr/' + id
    console.log(url)
    console.log(data)
    let res = await axios
      .put(url, data)
      .then(response => {
        if (response.data.status) {
          let dataResponse = response.data.body
          return dataResponse
        } else {
          console.log('Algo raro paso')
          alert('no se pudo actualizar los datos')
        }
      })
      .catch(error => {
        console.log(error.response)
        return
      })
    return res
  },
  async authorizeReposition(id, dataObject) {
    console.log('Estamos en service')

    let url =
      process.env.API_URL + '/api/purchaseOrder/' + id + '/authorize-reposition'
    console.log(url)

    let res = await axios
      .post(url, dataObject)
      .then(response => {
        console.log('Exito')

        console.log(response.data)

        return true
      })
      .catch(errors => {
        console.log('Error')
        console.log(errors.response.data)

        return false
      })
    return res
  },
  async updateBuyingLinioOrder(id, data) {
    let url = process.env.API_URL + '/api/purchaseOrder/update-order-linio/' + id
    console.log(url)
    console.log(data)
    let res = await axios
      .put(url, data)
      .then(response => {
        if (response.data.status) {
          let dataResponse = response.data.body
          return dataResponse
        } else {
          console.log('Algo raro paso')
          alert('no se pudo actualizar los datos')
        }
      })
      .catch(error => {
        console.log(error.response)
        return
      })
    return res
  },
  async updateBuyingMeliOrder(id, data) {
    let url = process.env.API_URL + '/api/purchaseOrder/update-order-meli/' + id
    console.log(url)
    console.log(data)
    let res = await axios
      .put(url, data)
      .then(response => {
        if (response.data.status) {
          let dataResponse = response.data.body
          return dataResponse
        } else {
          console.log('Algo raro paso')
          alert('no se pudo actualizar los datos')
        }
      })
      .catch(error => {
        console.log(error.response)
        return
      })
    return res
  },
  async updateBuyingOrderNoGrabr(id, data) {
    let url =
      process.env.API_URL + '/api/purchaseOrder/update-order-no-grabr/' + id
    console.log(url)
    console.log(data)
   
    let res = await axios
      .put(url, data)
      .then(response => {
        if (response.data.status) {
          let dataResponse = response.data.body
          return dataResponse
        } else {
          console.log('Algo raro paso')
          alert('no se pudo actualizar los datos')
        }
      })
      .catch(error => {
        console.log(error.response)
        return null;
      })
    return res
  }
}
