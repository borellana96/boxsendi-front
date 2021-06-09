<template>

  <section class="newOrder ">

    <div class="s">

      <div class="bienvenido-admin">

        <h2>Bienvenido a Sendibox</h2>

        <p>Ahora enviar y recibir es más fácil de lo que imaginas</p>

        <div class="bienvenido-grid">

          <div class="bienvenido-grid-content">

            <img src="/static/img/welcome-bag.svg" alt="">

            <strong>Tus órdenes</strong>

            <p>Gestiona las órdenes de compra durante las 24/7.</p>

            <div class="text-center">
                <button type="submit" class="btn btn-primary btn-round btn-welcome" @click="gotoPage(1)">Continuar</button>
            </div>

          </div>

          <!-- <div class="bienvenido-grid-content">

            <img src="/static/img/welcome-ship.svg" alt="">

            <strong>Tus embarques</strong>

            <p>Gestiona los embarques generados las 24/7.</p>

            <div class="text-center">
                <button type="submit" class="btn btn-primary btn-round btn-welcome" @click="gotoPage(2)">Continuar</button>
            </div>

          </div> -->

          <!--<alert :title=title :dismissible=dismissible :type=type />-->

          <!-- <div class="bienvenido-grid-content">

            <img src="/static/img/welcome-profile.svg" alt="">

            <strong>Tu perfil</strong>

            <p>Gestiona tu información personal.</p>

            <div class="text-center">
                <button type="submit" id="submit" class="btn btn-primary btn-round btn-welcome"  @click="gotoPage(3)">Continuar</button>
            </div>

          </div>

          <div v-if ="$store.state.user.attributes.permissions_keys.includes(14)" class="bienvenido-grid-content">

            <img src="/static/img/welcome-users.svg" alt="">

            <strong>Usuarios</strong>

            <p>Gestiona los distintos usuarios y roles del sistema.</p>

            <div class="text-center">
                <button type="submit" class="btn btn-primary btn-round btn-welcome" @click="gotoPage(4)">Continuar</button>
            </div>

          </div> -->

        </div>

      </div>

    </div>

  </section>

</template>

<script>
import Chart from 'chart.js'
import Alert from '../widgets/Alert'
import InfoBox from '../widgets/InfoBox'
import ProcessInfoBox from '../widgets/ProcessInfoBox'

export default {
  name: 'Dashboard',
  components: {
    Alert,
    InfoBox,
    ProcessInfoBox
  },
  data() {
    return {
      generateRandomNumbers(numbers, max, min) {
        var a = []
        for (var i = 0; i < numbers; i++) {
          a.push(Math.floor(Math.random() * (max - min + 1)) + max)
        }
        return a
      },
      //Dar forma al Alerta que mostrará
      type: 'danger',
      dismissible: 2===3? true: false,
      title: 'este es ei título de la alerta'
    }
  },
  computed: {
    coPilotNumbers() {
      return this.generateRandomNumbers(12, 1000000, 10000)
    },
    personalNumbers() {
      return this.generateRandomNumbers(12, 1000000, 10000)
    },
    isMobile() {
      return window.innerWidth <= 800 && window.innerHeight <= 600
    }
  },
  mounted() {
/*     this.$nextTick(() => {
      var ctx = document.getElementById('trafficBar').getContext('2d')
      var config = {
        type: 'line',
        data: {
          labels: [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
          ],
          datasets: [
            {
              label: 'CoPilot',
              fill: false,
              borderColor: '#284184',
              pointBackgroundColor: '#284184',
              backgroundColor: 'rgba(0, 0, 0, 0)',
              data: this.coPilotNumbers
            },
            {
              label: 'Personal Site',
              borderColor: '#4BC0C0',
              pointBackgroundColor: '#4BC0C0',
              backgroundColor: 'rgba(0, 0, 0, 0)',
              data: this.personalNumbers
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: !this.isMobile,
          legend: {
            position: 'bottom',
            display: true
          },
          tooltips: {
            mode: 'label',
            xPadding: 10,
            yPadding: 10,
            bodySpacing: 10
          }
        }
      }

      new Chart(ctx, config) // eslint-disable-line no-new

      var pieChartCanvas = document
        .getElementById('languagePie')
        .getContext('2d')
      var pieConfig = {
        type: 'pie',
        data: {
          labels: ['HTML', 'JavaScript', 'CSS'],
          datasets: [
            {
              data: [56.6, 37.7, 4.1],
              backgroundColor: ['#00a65a', '#f39c12', '#00c0ef'],
              hoverBackgroundColor: ['#00a65a', '#f39c12', '#00c0ef']
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: !this.isMobile,
          legend: {
            position: 'bottom',
            display: true
          }
        }
      }

      new Chart(pieChartCanvas, pieConfig) // eslint-disable-line no-new
    }) */
  },
  methods:{
    gotoPage(val){
      if(val==1){
        this.$router.push({ name: 'Orders'});
      }
      if(val==2){
        this.$router.push({ name: 'shipments-list'});
      }
      if(val==3){
        this.$router.push({ name: 'Profile'});
      }
      
      if(val==4){
        this.$router.push({ name: 'Users'});
      }
    }
  }
}
</script>
<style>
.info-box {
  cursor: pointer;
}
.info-box-content {
  text-align: center;
  vertical-align: middle;
  display: inherit;
}
.fullCanvas {
  width: 100%;
}
</style>
