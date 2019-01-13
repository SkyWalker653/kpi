<template>
  <q-layout>
    <q-page-container class="page-wrapper">
      <q-page>
        <div class="row">
          <div class="col-12">
            <h1 class="text-center text-primary text-weight-medium">KPI</h1>
          </div>
        </div>
        <div class="row gutter-md layout-padding absolute-center" style="width: 100%">
          <div class="col-4">
            <q-card class="card-wrap">
              <q-card-main class="text-center">
                <img class="ico-logo" src="../assets/img/payload.svg">
              </q-card-main>
              <q-card-separator />
              <q-card-actions>
                <q-btn class="full-width" color="primary" label="PayLoad Engine" @click="redirectTo('payload-engine')" />
              </q-card-actions>
            </q-card>
          </div>
          <div class="col-4">
            <q-card class="card-wrap">
              <q-card-main class="text-center">
                <img class="ico-logo" src="../assets/img/clipboard.svg">
              </q-card-main>
              <q-card-separator />
              <q-card-actions>
                <q-btn class="full-width" color="primary" label="Rules Engine" @click="redirectTo('rule-engine')" />
              </q-card-actions>
            </q-card>
          </div>
          <div class="col-4">
            <q-card class="card-wrap">
              <q-card-main class="text-center">
                <img class="ico-logo" src="../assets/img/notification.svg">
              </q-card-main>
              <q-card-separator />
              <q-card-actions>
                <q-btn class="full-width" color="primary" label="Alert Engine" @click="redirectTo('alert-engine')" />
              </q-card-actions>
            </q-card>
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
  .page-wrapper { background-color: #eeeeee; }
  .card-wrap { background-color: #ffffff; }
  .card-wrap:hover { cursor: pointer; box-shadow: 0 3px 5px -1px rgba(0,0,0,.2), 0 5px 8px rgba(0,0,0,.14), 0 1px 14px rgba(0,0,0,.12); }
  .ico-logo { height: 160px; }
</style>
