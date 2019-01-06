<template>
  <q-layout>
    <q-page-container>
      <q-page>
        <div class="row gutter-md layout-padding">
          <div class="col-4">
            <q-card>
              <q-card-main class="text-center">
                <img src="../assets/img/payload.svg">
              </q-card-main>
              <q-card-separator />
              <q-card-actions>
                <q-btn class="full-width" color="primary" label="PayLoad Engine" @click="redirectTo('payload-engine')" />
              </q-card-actions>
            </q-card>
          </div>
          <div class="col-4">
            <q-card>
              <q-card-main class="text-center">
                <img src="../assets/img/clipboard.svg">
              </q-card-main>
              <q-card-separator />
              <q-card-actions>
                <q-btn class="full-width" color="primary" label="Rules Engine" @click="redirectTo('rule-engine')" />
              </q-card-actions>
            </q-card>
          </div>
          <div class="col-4">
            <q-card>
              <q-card-main class="text-center">
                <img src="../assets/img/notification.svg">
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
  .q-card-actions { padding: 0; }
</style>
