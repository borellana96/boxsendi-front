import axios from 'axios'

export const luggageService = {
  listAllLuggageType(callback) {
    let url = process.env.API_URL + '/api/luggage/list-types'
    axios
      .get(url)
      .then(response => {
        let data = response.data.body.luggage_types_list
        callback(data)
      })
      .catch(errors => {
        console.log(errors)
      })
  },
  async addLuggageToShipment(id, dataObject) {
    let url = process.env.API_URL + '/api/boarding/' + id + '/add-luggage'
    let res = await axios
      .post(url, dataObject)
      .then(response => {
        var aux = new Object()
        aux = response.data.body
        return aux
      })
      .catch(error => {
        console.log(error)
        console.log(error.response.status)
        console.log(error.response)
        alert('error al agregar equipaje')
      })

    return res
  },
  async deleteLuggageItem(numeration, boardingId) {
    let url =
      process.env.API_URL +
      '/api/luggage/' +
      numeration +
      '/delete/' +
      boardingId
    console.log(url)

    let res = await axios
      .delete(
        url,
        {}
      )
      .then(response => {
        console.log(response.data)
        return true
      })
      .catch(error => {
        console.log(error)
        console.log(error.response.status)
        console.log(error.response)
        console.log('error al quitar equipaje')
        return false
      })

    return res
  }
}
