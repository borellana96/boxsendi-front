import axios from 'axios'

export const shipmentService = {
  async shipmentBasicCreate(dataObject) {
    let url = process.env.API_URL + '/api/boarding/basic-creation'
    
    let res = await axios
      .post(url, dataObject)
      .then(response => {
        var aux = new Object()
        aux = response.data.body

        console.log(aux)

        return aux
      })
      .catch(error => {
        console.log(error)
        console.log(error.response)
        console.log(error.response.status)
        
        alert('error al enviar formulario')
      })

    return res
  },
  getShipmentDetail: function(id, callback) {
    var url = process.env.API_URL + '/api/boarding/get/' + id
    //console.log('Estamos en el servicio get Shipment details')

    axios
      .get(url)
      .then(response => {
        var data = response.data.body
        //console.log('obtuvimos bien la data y deberia ir al callback')

        callback(data)
      })
      .catch(error => {
        console.log(error)
        console.log(error.response)
      })
  },
  async savePackages(id, dataObject) {
    var url = process.env.API_URL + '/api/boarding/' + id + '/save-packages'
    let res = await axios
      .post(url, dataObject)
      .then(response => {
        console.log('success')

        return response.data.body
      })
      .catch(error => {
        console.log('fail')
        console.log(error.response)
        console.log(error.response.data)
      })

    return res
  },
  async changeStateShipment(id, state){
    let url = process.env.API_URL + '/api/boarding/update-status/' + id + '?nextStep=' + state;
    let res = await axios
      .put(url)
      .then(response => {
        let data = response.data.body
        return data;
      })
      .catch(error => {
        console.log(error)
        console.log(error.response)
      })
    return res
  },
  async reprogramationShipmentState(id, dataObject){
    let url = process.env.API_URL + '/api/boarding/' + id + '/reschedule';
    let res = await axios
      .put(url,dataObject )
      .then(response => {
        let data = response.data.body
        return true;
      })
      .catch(error => {
        console.log(error)
        console.log(error.response)
        return false
      })
    return res
  },



}
