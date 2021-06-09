import axios from 'axios'

export const citiesService = {
  listAllCity(indx, callback) {
    let url = process.env.API_URL + '/api/city/list?type=' + indx
    axios
      .get(url)
      .then(response => {
        let data = response.data.body.cities_list
        callback(data)
      })
      .catch(errors => {
        console.log(errors)
      })
  },
  listDestinationCityToBoardByShipingOperator(idOperator, callback) {
    let url =
      process.env.API_URL +
      '/api/city/' +
      idOperator +
      '/list-available-to-boarding'
    
    
    
    axios
      .get(url)
      .then(response => {
        let data = response.data.body.cities_list
        callback(data)
      })
      .catch(errors => {
        console.log(errors)
      })
  }
}
