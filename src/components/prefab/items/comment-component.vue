<template lang="html">

    <div class="comments-item">
      
        <div v-if="ownComment" class="message send">

          <div class="mesagge-all">

            <div class="message-avatar"></div>

            <div v-if="!editCommentFlag" class="message-block">

              <span  class="message-title">{{comment.attributes.writer.attributes.name}} {{comment.attributes.writer.attributes.surnames}}</span>

              <span  class="message-content">{{comment.attributes.content}} </span>

              <div class="metadata">

                <span class="metadata-time">{{comment.attributes.updated_at.date|spanishTime}}</span>

                <span class="metadata-date">{{comment.attributes.updated_at.date|spanishDate}}</span>

                <span class="metadata-rol">
                  {{comment.attributes.writer.attributes.userable_type == 'admin' ? 'Administrador general':
                  (comment.attributes.writer.attributes.userable_type == 'client'? 'Cliente':
                  (comment.attributes.writer.attributes.userable.attributes.operator_type == 1? 'Operador de envío':'Operador de recepción')
                  )}}
                </span>
                
              </div>

              <span class="edit-box edit-comment"  @click="editComment(comment.id)" v-if ="comment.enable">

                  Editar 
                  <i class="fas fa-edit"></i>
              </span>
              <span class="edit-box edit-comment"  v-else>
                  Editar 
                  <i class="fas fa-edit"></i>
              </span>
              <span class="edit-box delete-comment" @click="deleteComment(comment.id)" v-if ="comment.enable">
                  Eliminar
                  <i class="fas fa-times"></i>
              </span>
              <span class="edit-box delete-comment" v-else>
                  Eliminar
                  <i class="fas fa-times"></i>
              </span>

            </div>
            
            <div v-else class="message-block">
              <div class="form-group input-edit-comment">
                <label for class="float-left">Edita tu comentario</label>
                <textarea
                type="text"
                v-model="newContent"
                aria-describedby="email"
                class="form-control null "
                :maxlength="1000"
                >
                </textarea>
              </div>

              <div class="">

                  <span class="edit-box" v-if="oldContent!=newContent"  @click="updateComment(comment.id)"
                  >Guardar cambios</span>
                  <span class="edit-box" v-else
                  >Guardar cambios</span>

                  <span class="edit-box"  @click="cancelEditComment">Cancelar <i class="fas fa-times"></i></span>
                  
              </div>

            </div>

            
              
          </div>

          

        </div>

        <div v-else-if="otherComment" class="message received">

          <div class="mesagge-all">

            <div class="message-avatar"></div>

            <div class="message-block">

              <span  class="message-title">{{comment.attributes.writer.attributes.name}} {{comment.attributes.writer.attributes.surnames}}</span>

              <span  class="message-content">{{comment.attributes.content}}</span>

              <div class="metadata">

                <span class="metadata-time">{{comment.attributes.updated_at.date|spanishTime}}</span>

                <span class="metadata-date">{{comment.attributes.updated_at.date|spanishDate}}</span>

                <span class="metadata-rol">
                  {{comment.attributes.writer.attributes.userable_type == 'admin' ? 'Administrador general':
                  (comment.attributes.writer.attributes.userable_type == 'client'? 'Cliente':
                  (comment.attributes.writer.attributes.userable.attributes.operator_type == 1? 'Operador de envío':'Operador de recepción')
                  )}}
                </span>
                
              </div>

            </div>
              
            </div>

        </div>

        <div v-else-if="systemComment" class="message system">

          <div class="mesagge-all">

            <span  class="message-content">{{comment.attributes.content}} </span>

            <div class="metadata">

              <span class="metadata-time">{{comment.attributes.updated_at.date|spanishTime}}</span>

              <span class="metadata-date">{{comment.attributes.updated_at.date|spanishDate}}</span>

              <span class="metadata-rol">Mensaje del sistema</span>
              
            </div>

          </div>

        </div>
      
    </div>

</template>

<script>
import { commentsService } from '@/services/comments.service'

export default {
  props: ['orderCancelledFlag','comment'],
  data() {
    return {
      oldContent: this.comment.attributes.content,
      newContent: this.comment.attributes.content,
      editCommentFlag: false
    }
  },
  updated(){
    console.log("En updated de ")
    console.log(this.comment)
    
    if (!this.editCommentFlag){
      this.oldContent = this.comment.attributes.content
      this.newContent = this.comment.attributes.content
    }
    
  },

  methods: {
    editComment(commentId) {
      console.log('estamos en editComment')

      this.editCommentFlag = true
      this.$emit('in-edition', commentId)
    },
    cancelEditComment() {
      this.editCommentFlag = false
      this.$emit('cancel-edition')
    },

    async updateComment(commentId) {
      let commentData = {}
      console.log('Estamos en update comment')

      if (this.currentContent != '') {
        commentData.content = this.newContent
        let res = false
        res = await commentsService.updateComment(commentId, commentData)
        console.log(res)

        if (res) {
          this.editCommentFlag = false
          this.$emit('display-comments')
        }
      }
    },
    async deleteComment(commentId) {
      console.log('Estamos en delete comment')

      let res = false
      res = await commentsService.deleteComment(commentId)
      console.log(res)

      if (res) {
        this.$emit('comment-deleted')
      }
    }
  },
  computed: {
    ownComment(){

      return this.comment.attributes.writer.attributes.userable.id == this.$store.state.user.id &&
        (this.comment.attributes.cancelled == null  || this.comment.attributes.cancelled == 0 )
    },
    otherComment(){

      return this.comment.attributes.writer.attributes.userable.id != this.$store.state.user.id && 
          (this.comment.attributes.cancelled == null  || this.comment.attributes.cancelled == 0 )
    },
    systemComment(){
      return this.comment.attributes.cancelled == 1
    }
   
  },
}
</script>