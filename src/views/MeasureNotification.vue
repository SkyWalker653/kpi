<template>
  <q-page :padding=true>
    <q-input type="text" v-model.trim="referenceId" :error="$v.referenceId.$error" placeholder="Reference ID" />
    <q-btn color="primary" class="q-mt-md" label="Search" @click.prevent="submitTryPayload()"/>

    <q-table
      title="Notifications"
      :data="measureNotifications"
      :columns="columns"
      row-key="name"
      class="q-mt-md"
    />
  </q-page>
</template>

<script>
import store from 'vuex-store'
import { required } from 'vuelidate/lib/validators'
export default {
  data () {
    return {
      referenceId: '',
      measureNotifications: [],
      columns: [
        { name: 'creationDate', label: 'Creation Date', field: 'creationDate', align: 'left' },
        { name: 'message', label: 'Message', field: 'message', align: 'left' }
      ]
    }
  },
  validations: {
    referenceId: { required }
  },
  methods: {
    submitTryPayload () {
      this.$v.referenceId.$touch()
      if (this.$v.referenceId.$error) {
        return false
      }
      store.dispatch('payload/testPayloadNotification', { refId: this.referenceId })
        .then(res => {
          this.measureNotifications = res
          // this.markNotificationasRead(res.id)
        })
        .catch((error) => {
          console.log(error)
          this.$q.notify({
            message: 'An error occurred. Please try again.',
            type: 'negative'
          })
        })
        .finally(() => {
          this.referenceId = ''
        })
    },
    markNotificationasRead (refId) {
      store.dispatch('payload/markNotificationAsRead', { 'refId': refId })
        .then(res => {
          console.log('Message marked as read')
        })
        .catch((error) => {
          console.log(error)
          this.$q.notify({
            message: 'An error occurred. Please try again.',
            type: 'negative'
          })
        })
        .finally(() => {
          this.referenceId = ''
        })
    }
  }
}
</script>
