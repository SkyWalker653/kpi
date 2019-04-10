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
    >
     <q-td slot="body-cell-payload" slot-scope="props" :props="props">
        <q-btn flat color="primary" label="View" @click="populateModalData(props.row.payload)"></q-btn>
      </q-td>
      <q-td slot="body-cell-message" slot-scope="props" :props="props">
        <q-btn flat color="primary" label="View" @click="populateModalData(props.row.message)"></q-btn>
      </q-td>
    </q-table>
    <q-modal v-model="showModal" :content-css="{minWidth: '50vw'}">
      <q-modal-layout>
        <q-toolbar slot="header">
          <q-toolbar-title>Details</q-toolbar-title>
        </q-toolbar>
        <div class="q-pa-md">
          <q-card>
            <q-card-main>
              <vue-json-pretty
                :data="modalData">
              </vue-json-pretty>
            </q-card-main>
          </q-card>
        </div>
        <q-toolbar slot="footer">
          <q-toolbar-title>
            <q-btn flat v-close-overlay label="close"></q-btn>
          </q-toolbar-title>
        </q-toolbar>
      </q-modal-layout>
    </q-modal>
  </q-page>
</template>

<script>
import store from 'vuex-store'
import VueJsonPretty from 'vue-json-pretty'
import { required } from 'vuelidate/lib/validators'
export default {
  data () {
    return {
     showModal: false,
     modalData:[],
      referenceId: '',
      measureNotifications: [],
      columns: [
        { name: 'ruleId', label: 'Rule Id', field: 'rule_id', align: 'left' },
        { name: 'transactionId', label: 'Transaction Id', field: 'transactionId', align: 'left' },
        { name: 'payload', label: 'Payload', field: 'payload', align: 'left' },
        { name: 'message', label: 'Response', field: 'message', align: 'left' },
        { name: 'creationDate', label: 'Creation Date', field: 'creationDate', align: 'left' }
      ]
    }
  },
  components: {
    VueJsonPretty
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
          if (res[0].error) {
            this.$q.notify({
              message: res[0].error,
              type: 'negative',
              position: 'top-right'
            })
          } else {
            this.referenceId = ''
            this.measureNotifications = res
            // this.markNotificationasRead(res.id)
          }
        })
        .catch((error) => {
          console.log(error)
        })
        .finally(() => {})
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
            type: 'negative',
            position: 'top-right'
          })
        })
        .finally(() => {
          this.referenceId = ''
        })
    },
    populateModalData(payload){
      //console.log(payload)
      this.modalData = JSON.parse(payload)
      this.showModal =true
    }

  }
}
</script>
