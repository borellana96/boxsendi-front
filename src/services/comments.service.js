import axios from 'axios'

export const commentsService = {
  listCommentsByOrderId(orderId, callback) {
    let url = process.env.API_URL + '/api/comments/list-by-order/' + orderId
    console.log(url)

    axios
      .get(url)
      .then(response => {
        console.log(response.data)
        if (response.data.status) {
          let comments = response.data.body
          callback(comments)
        } else {
          alert('Error de servicio')
        }
      })
      .catch(errors => {
        console.log(errors)
        console.log(errors.response)
        alert('Error de servidor')
        return
      })
  },
  async createComment(commentData) {
    let url = process.env.API_URL + '/api/comments/register'

    let res = await axios
      .post(url, commentData)
      .then(response => {
        if (response.data.status) {
          let commentCreated = response.data.body
          console.log(commentCreated)

          return true
        } else {
          alert('Error de servicio')
          return false
        }
      })
      .catch(errors => {
        console.log(errors)
        console.log(errors.response)
        alert('Error de conexión al servidor')
        return false
      })
    return res
  },

  async updateComment(id, commentData) {
    let url = process.env.API_URL + '/api/comments/' + id + '/update'

    let res = await axios
      .put(url, commentData)
      .then(response => {
        if (response.data.status) {
          let commentUpdated = response.data.body
          console.log('Comment updated:')

          console.log(commentUpdated)

          return true
        } else {
          alert('Error de servicio')
          return false
        }
      })
      .catch(errors => {
        console.log(errors)
        console.log(errors.response)
        alert('Error de conexión al servidor')
        return false
      })
    return res
  },

  async deleteComment(id) {
    let url = process.env.API_URL + '/api/comments/' + id + '/delete'

    let res = await axios
      .delete(url, {})
      .then(response => {
        if (response.data.status) {
          let deleteReponse = response.data.body
          console.log(deleteReponse)

          return true
        } else {
          alert('Error de servicio')
          return false
        }
      })
      .catch(errors => {
        console.log(errors)
        console.log(errors.response)
        alert('Error de conexión al servidor')
        return false
      })
    return res
  }
}
