import axios from 'axios'

export const packagesService = {
  async sendStatesPackage(id, dataObject) {
    let url = process.env.API_URL + '/api/package/' + id + '/evaluate'
    let res = await axios
      .post(url, dataObject)
      .then(response => {
        var aux = new Object()
        aux = response.data.body
        return aux
      })
      .catch(errors => {
        console.log(errors.response.data)
        let errorResponse =  errors.response.data
        if ( typeof (errorResponse.errors) != "undefined") {
          //es un error de validacion de campos
          console.log("error de validacion de campos")
          if ( typeof (errorResponse.errors.correct_items_not_wasted) != "undefined") {
            console.log("es un error en el campo 'correct_items_not_waster'")
            let errorMessage = errorResponse.errors.correct_items_not_wasted[0]
            console.log(errorMessage);

            let code = parseInt(errorMessage.substring(0,errorMessage.indexOf('.')))
            console.log("Codigo: "+code)
            
            switch (code) {
              case 1:
                alert("Algunos items defectuosos o ausentes ya llegaron a su máxima cantidad de reposiciones, no puede continuar a menos que aumente la cantidad de items correctos.")
                break;
            
              default:
                alert("Error no identificado para 'correct_items_not_waster'");
            }
            
            
            
          }

          return
          
        }
        console.log("es un error de otro tipo")
        

        return
      })
    return res
  },
  async authorizeReposition(id, dataObject) {
    console.log('Estamos en service')

    let url =
      process.env.API_URL + '/api/package/' + id + '/authorize-reposition'
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

  getPackagesByOrderId(orderId, callback) {
    console.log('Estamos en service')

    let url =
      process.env.API_URL + '/api/package/' + orderId + '/list-packages-by-order'
    console.log(url)

   axios
      .get(url)
      .then(response => {
        console.log('Exito')

        console.log(response.data)
        let retrievedPackages = response.data.body

        callback(retrievedPackages)
      })
      .catch(errors => {
        console.log('Error')
        console.log(errors.response.data)
      })  
  },
  getPackageDetail(packageId, callback){
    console.log('Estamos en service')

    let url =
      process.env.API_URL + '/api/package/' + packageId + '/get'
    console.log(url)

   axios
      .get(url)
      .then(response => {
        console.log('Exito')

        console.log(response.data)
        let retrievedPackage = response.data.body

        callback(retrievedPackage)
      })
      .catch(errors => {
        console.log('Error')
        console.log(errors.response.data)
      })  
  },
  getPackageRepositionsDetail(packageId, callback){
    console.log('Estamos en service')

    let url =
      process.env.API_URL + '/api/package/' + packageId + '/list-package-repositions'
    console.log(url)

   axios
      .get(url)
      .then(response => {
        console.log('Exito')

        console.log(response.data)
        let retreivedPackageRepositions = response.data.body

        callback(retreivedPackageRepositions)
      })
      .catch(errors => {
        console.log('Error')
        console.log(errors.response.data)
      })  
  },
  getPackageRepositionsByDeficitIncidentId(deficitIncidentId, callback){
    console.log('Estamos en service')

    let url =
      process.env.API_URL + '/api/packageIncident/' + deficitIncidentId + '/list-package-repositions-by-deficit-type-id'
    console.log(url)

   axios
      .get(url)
      .then(response => {
        console.log('Exito')

        console.log(response.data)
        let retreivedPackageRepositions = response.data.body

        callback(retreivedPackageRepositions)
      })
      .catch(errors => {
        console.log('Error')
        console.log(errors.response.data)
      })  
  },
  
}  