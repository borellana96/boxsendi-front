import axios from 'axios';

  export const weightUnitService = {
    listAllWeightUnit(callback) {
      let url = process.env.API_URL + '/api/weightUnit/list'
      axios
        .get(url)
        .then(response => {
          let data = response.data.body
          callback(data)
        })
        .catch(errors => {
          console.log(errors)
        })
    },

};
