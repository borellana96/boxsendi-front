import axios from 'axios';

  export const operatorService = {

    listOperatorsDestination(id, callback) {
      let url = process.env.API_URL + '/api/operator/' + id + '/get-operators-destination';
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

    listSenderOperators(callback) {
      let url = process.env.API_URL + '/api/operator/list-senders';
      axios
        .get(url)
        .then(response => {
          let data = response.data.body
          callback(data)
        })
        .catch(errors => {
          console.log(errors)
        })
    }

};
