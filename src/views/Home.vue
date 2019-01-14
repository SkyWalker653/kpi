<template>
  <q-layout>
    <q-page-container class="page-wrapper">
      <q-page class="page-bg">
        <div class="row gutter-md layout-padding">
          <div class="col-6">
            <div class="wrap" @click="redirectTo('payload-engine')">
              <div class="ico-wrap">
                <span class="mbr-iconfont fa-volume-up fa"></span>
              </div>
              <div class="text-wrap vcenter">
                <h5 class="mbr-fonts-style mbr-bold mbr-section-title3 display-5">PayLoad Engine</h5>
                <p class="mbr-fonts-style text1 mbr-text display-6">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum</p>
              </div>
            </div>
          </div>
          <div class="col-6">
            <div class="wrap" @click="redirectTo('rule-engine')">
              <div class="ico-wrap">
                <span class="mbr-iconfont fa-volume-up fa"></span>
              </div>
              <div class="text-wrap vcenter">
                <h5 class="mbr-fonts-style mbr-bold mbr-section-title3 display-5">Rule Engine</h5>
                <p class="mbr-fonts-style text1 mbr-text display-6">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum</p>
              </div>
            </div>
          </div>
          <div class="col-6">
            <div class="wrap" @click="redirectTo('alert-engine')">
              <div class="ico-wrap">
                <span class="mbr-iconfont fa-volume-up fa"></span>
              </div>
              <div class="text-wrap vcenter">
                <h5 class="mbr-fonts-style mbr-bold mbr-section-title3 display-5">Alert Engine</h5>
                <p class="mbr-fonts-style text1 mbr-text display-6">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum</p>
              </div>
            </div>
          </div>
          <div class="col-6">
            <div class="wrap" @click="redirectTo('measure-notification')">
              <div class="ico-wrap">
                <span class="mbr-iconfont fa-volume-up fa"></span>
              </div>
              <div class="text-wrap vcenter">
                <h5 class="mbr-fonts-style mbr-bold mbr-section-title3 display-5">Notification Engine</h5>
                <p class="mbr-fonts-style text1 mbr-text display-6">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum</p>
              </div>
            </div>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  methods: {
    redirectTo (url) {
      this.$router.push('/' + url)
    }
  }
}
</script>

<style scoped>
  /*.page-wrapper { background-color: #eeeeee; }*/
  /*.card-wrap { background-color: #ffffff; }*/
  /*.card-wrap:hover { cursor: pointer; box-shadow: 0 3px 5px -1px rgba(0,0,0,.2), 0 5px 8px rgba(0,0,0,.14), 0 1px 14px rgba(0,0,0,.12); }*/
  /*.ico-logo { height: 160px; }*/
</style>

<style scoped>
  .page-bg {
    background-color: #f1f4fa;
  }
  .wrap {
    display: flex;
    background: white;
    padding: 1rem 1rem 1rem 1rem;
    border-radius: 0.5rem;
    box-shadow: 7px 7px 30px -5px rgba(0,0,0,0.1);
    margin-bottom: 2rem;
    flex-wrap: nowrap;
  }

  .wrap:hover {
    background: linear-gradient(135deg,#6394ff 0%,#0a193b 100%);
    color: white;
    cursor: pointer;
  }

  .ico-wrap {
    margin: auto;
  }

  .mbr-iconfont {
    font-size: 4.5rem !important;
    color: #313131;
    margin: 1rem;
    padding-right: 1rem;
  }
  .vcenter {
    margin: auto;
  }

  .mbr-section-title3 {
    text-align: left;
  }
  h5 {
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  }
  .display-5 {
    font-family: 'Source Sans Pro',sans-serif;
    font-size: 1.4rem;
  }
  .mbr-bold {
    font-weight: 700;
  }

  p {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    line-height: 25px;
  }
  .display-6 {
    font-family: 'Source Sans Pro', sans-serif;
    font-size: 1rem;
  }
</style>
