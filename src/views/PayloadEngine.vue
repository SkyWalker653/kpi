<template>
  <q-page :padding=true>
    <q-table
      title="Payload Engine List"
      :data="payloades"
      :columns="columns"
      :filter="filter"
      row-key="payload_identifier">
      <q-td slot="body-cell-slno" slot-scope="row">
        {{ row.row.__index + 1 }}
      </q-td>
      <q-td slot="body-cell-action" slot-scope="props" :props="props">
        <q-btn-dropdown color="primary" label="Action">
          <q-list dense link>
            <q-item dense v-close-overlay>
              <q-item-side icon="create" inverted color="primary" />
              <q-item-main label>Edit</q-item-main>
            </q-item>
            <q-item dense v-close-overlay>
              <q-item-side icon="delete" inverted color="negative" />
              <q-item-main label>Delete</q-item-main>
              <q-item-side right icon="info" color="warning" />
            </q-item>
            <q-item dense v-close-overlay @click.native="showPayloadDetails(props.row)">
              <q-item-side icon="visibility" inverted color="tertiary" />
              <q-item-main label>Show</q-item-main>
            </q-item>
            <q-item dense v-close-overlay @click.native="showPayloadTryModal(props.row)">
              <q-item-side icon="visibility" inverted color="tertiary" />
              <q-item-main label>Try</q-item-main>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-td>

      <template slot="top-left" slot-scope="props">
        <q-search hide-underline color="secondary" v-model="filter" class="col-6" />
      </template>
      <template slot="top-right" slot-scope="props" class="column">
        <q-btn round color="secondary" icon="add" @click.prevent="showCreatePayloadModal()" />
      </template>

      <div slot="pagination" slot-scope="props" class="row flex-center q-py-sm">
        <q-btn round dense size="sm" icon="undo" color="secondary" class="q-mr-sm" :disable="props.isFirstPage" @click="props.prevPage" />
        <div class="q-mr-sm" style="font-size: small">
          Page {{ props.pagination.page }} / {{ props.pagesNumber }}
        </div>
        <q-btn round dense size="sm" icon="redo" color="secondary" :disable="props.isLastPage" @click="props.nextPage" />
      </div>
    </q-table>

    <q-modal v-model="payLoadCreateModalStatus" :content-css="{minWidth: '60vw', minHeight: '80vh'}">
      <q-modal-layout>
        <q-stepper ref="stepper" color="secondary" v-model="currentStep">
            <q-step class="no-outline" default name="first" title="Step 1" subtitle="Here we go">
              <q-card>
                <q-card-title class="text-deep-orange text-weight-bold">
                  Do you have sample payload?
                </q-card-title>
                <q-card-separator />
                <q-card-main>
                  <div class="q-title text-weight-bold">Sample Payload</div>
                  <p>You can directly paste your json payload and test it or can use the existing sample payload and test it.</p>

                  <div class="q-title">Manual Payload</div>
                  <p>You have to follow the steps of choosing multiple fields and forming the json for testing.</p>
                </q-card-main>
                <q-card-actions class="justify-center">
                  <q-btn color="indigo" class="q-px-40" @click="viewSamplePayload(true)" label="Yes" />
                  <q-btn color="green" class="q-px-40" @click="viewSamplePayload(false)" label="No" />
                </q-card-actions>
              </q-card>
            </q-step>
            <q-step name="second" title="Step 2">
              <div v-if="isSamplePayload" style="padding: 25px">
                <q-field label="Organization">
                  <q-input v-model="formData.organisationName" :error="$v.formData.organisationName.$error" color="primary" float-label="Enter organisation name" />
                </q-field>
                <q-field label="Company">
                  <q-input v-model="formData.companyName" :error="$v.formData.companyName.$error" color="primary" float-label="Enter company name" />
                </q-field>
                <q-field label="Payload Name">
                  <q-input v-model="formData.payloadName" :error="$v.formData.payloadName.$error" float-label="Enter payload name">
                    <q-autocomplete separator :static-data="{field: 'payload_name', list: staticPayloadData()}" @selected="getPayloadData()" />
                  </q-input>
                </q-field>
                <q-field label="Status">
                  <q-select v-model="formData.payloadStatus" :error="$v.formData.payloadStatus.$error" :options="selectPayloadStatus" float-label="Select Payload Status"/>
                </q-field>
                <q-field label="Description">
                  <q-input v-model="formData.payloadDescription" :error="$v.formData.payloadDescription.$error" color="primary" float-label="Enter description" />
                </q-field>
              </div>
              <div v-if="!isSamplePayload" style="padding: 25px">
                <q-field label="Organization">
                  <q-input v-model="formData.organisationName" :error="$v.formData.organisationName.$error" color="primary" float-label="Enter organisation name" />
                </q-field>
                <q-field label="Company">
                  <q-input v-model="formData.companyName" :error="$v.formData.companyName.$error" color="primary" float-label="Enter company name" />
                </q-field>
                <q-field label="Status">
                  <q-select v-model="formData.payloadStatus" :error="$v.formData.payloadStatus.$error" :options="selectPayloadStatus" float-label="Select Payload Status"/>
                </q-field>
                <q-field label="Description">
                  <q-input v-model="formData.payloadDescription" :error="$v.formData.payloadDescription.$error" color="primary" float-label="Enter company name" />
                </q-field>
                <q-field label="Payload Data">
                  <q-input
                    v-model="formData.payloadData"
                    type="textarea"
                    float-label="Paste Payload Data"
                    :max-height="100"
                    rows="7"
                    inverted-light
                    color="grey-1"
                    :error="$v.formData.payloadData.$error"
                  />
                </q-field>
              </div>
              <q-stepper-navigation>
                <q-btn flat color="negative" class="q-mr-sm" @click="$refs.stepper.previous()" label="Back" />
                <q-btn color="positive" @click="submitStepTwoForm()" label="Next" />
              </q-stepper-navigation>
            </q-step>
            <q-step title="Step 3" name="third">
              <vue-json-pretty
                :data="formData.payloadData">
              </vue-json-pretty>
              <!--<pre>{{ formData.payloadData }}</pre>-->
              <q-stepper-navigation>
                <q-btn flat color="negative" class="q-mr-sm" @click="$refs.stepper.previous()" label="Back" />
                <q-btn color="positive" @click="createPayload()" label="Create Payload" />
              </q-stepper-navigation>
            </q-step>
        </q-stepper>
        <q-toolbar slot="footer">
          <q-toolbar-title>
            <q-btn flat v-close-overlay label="close"></q-btn>
          </q-toolbar-title>
        </q-toolbar>
      </q-modal-layout>
    </q-modal>
    <q-modal v-model="payLoadDetailShowModal" :content-css="{minWidth: '50vw'}">
      <q-modal-layout>
        <q-toolbar slot="header">
          <q-toolbar-title>Payload Description</q-toolbar-title>
        </q-toolbar>
        <div class="layout-padding">
          <q-card class="transition-generic">
          <q-card-main class="q-pa-30">
            <vue-json-pretty
              :data="payloadFullDescription">
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
    <q-modal v-model="payLoadTryModal" :content-css="{minWidth: '40vw'}">
      <q-modal-layout>
        <q-toolbar slot="header">
          <q-toolbar-title>Payload Try</q-toolbar-title>
        </q-toolbar>
        <div class="layout-padding">
          <q-input v-if="!payloadTest.responseData" v-model="payloadTest.data" type="textarea" float-label="Paste JSON data here !" :max-height="100" rows="7" />
          <div v-if="payloadTest.responseData">
            <h6>Please note down the Reference ID</h6>
            <pre>{{payloadTest.responseData}}</pre>
          </div>
        </div>
        <q-toolbar slot="footer">
          <q-toolbar-title class="text-right">
            <q-btn flat label="Submit" @click.prevent="submitTryPayload()"></q-btn>
            <q-btn flat v-close-overlay label="close"></q-btn>
          </q-toolbar-title>
        </q-toolbar>
      </q-modal-layout>
    </q-modal>
  </q-page>
</template>

<script>
import store from 'vuex-store'
import { mapGetters } from 'vuex'
import VueJsonPretty from 'vue-json-pretty'
import { required } from 'vuelidate/lib/validators'

export default {
  data: () => ({
    loading: false,
    currentStep: 'first',
    filter: '',
    payLoadCreateModalStatus: false,
    payLoadDetailShowModal: false,
    payLoadTryModal: false,
    payloadFullDescription: [],
    isSamplePayload: true,
    payloadTest: {
      organisation: '',
      company: '',
      data: '',
      isResponseAvailable: '',
      responseData: ''
    },
    columns: [
      { name: 'slno', label: '#', align: 'left' },
      { name: 'organisation', label: 'Organisation', field: 'payload_organisation', align: 'left' },
      { name: 'payloadname', required: true, label: 'Payload Name', align: 'left', field: 'payload_name', sortable: true },
      { name: 'user', label: 'User', align: 'left', field: 'payload_user' },
      { name: 'updated', label: 'Last Updated', field: 'payload_last_updated', sortable: true },
      { name: 'status', label: 'Status', field: 'payload_status', align: 'left' },
      { name: 'action', label: 'Action', align: 'right' }
    ],

    formData: {
      organisationName: '',
      companyName: '',
      payloadName: '',
      payloadData: [],
      payloadStatus: '',
      payloadDescription: null
    },
    selectPayloadStatus: [
      {
        label: 'Active',
        value: 'Active'
      },
      {
        label: 'Archive',
        value: 'Archive'
      },
      {
        label: 'In Build',
        value: 'In Build'
      }
    ]
  }),
  validations: {
    formData: {
      organisationName: { required },
      companyName: { required },
      payloadName: { required },
      payloadData: { required },
      payloadStatus: { required },
      payloadDescription: { required }
    }
  },
  computed: {
    ...mapGetters('payload', ['payloades'])
  },
  components: {
    VueJsonPretty
  },
  methods: {
    init () {
      store.dispatch('payload/list')
    },
    showCreatePayloadModal () {
      this.payLoadCreateModalStatus = true
    },
    viewSamplePayload (val) {
      if (val) {
        this.isSamplePayload = true
        this.formData.payloadData = []
        this.$v.formData.$reset()
      } else {
        this.isSamplePayload = false
        this.formData.payloadData = []
        this.$v.formData.$reset()
      }
      this.currentStep = 'second'
    },
    createPayload () {
      const postData = {
        'description': this.formData.payloadDescription,
        'status': this.formData.payloadStatus,
        'user': this.formData.payloadName,
        'payload': this.formData.payloadData
      }

      store.dispatch('payload/create', {
        organisation: this.formData.organisationName,
        companyName: this.formData.companyName,
        data: postData
      })
        .then(res => {
          this.payLoadCreateModalStatus = false
          this.clearFormData()
          this.init()
          this.$q.notify({
            message: res.data.result,
            type: 'positive'
          })
        })
        .catch((error) => {
          this.$q.notify({
            message: error.data.result,
            type: 'negative'
          })
        })
    },
    getPayloadData () {
      store.dispatch('payload/list').then((res) => {
        for (var i = 0; i < res.result.length; i++) {
          if (res.result[i].payload_name === this.formData.payloadName) {
            this.formData.payloadData = JSON.parse(res.result[i].payload_value)
          }
        }
      })
    },
    showPayloadDetails (data) {
      this.payloadFullDescription = JSON.parse(data.payload_value)
      this.payLoadDetailShowModal = true
    },
    showPayloadTryModal (data) {
      console.log(data)
      this.payloadTest.organisation = data.payload_organisation
      this.payloadTest.company = data.payload_name
      this.payLoadTryModal = true
    },
    staticPayloadData () {
      this.payloades.forEach(item => {
        item.label = item.payload_name
      })
      return this.payloades
    },
    submitStepTwoForm () {
      this.$v.formData.$touch()
      if (this.isSamplePayload) {
        if (this.$v.formData.organisationName.$error || this.$v.formData.companyName.$error || this.$v.formData.payloadName.$error || this.$v.formData.payloadStatus.$error || this.$v.formData.payloadDescription.$error) {
          this.$q.notify('Please fill all the fields.')
        } else {
          this.currentStep = 'third'
        }
      } else {
        if (this.$v.formData.organisationName.$error || this.$v.formData.companyName.$error || this.$v.formData.payloadData.$error || this.$v.formData.payloadStatus.$error || this.$v.formData.payloadDescription.$error) {
          this.$q.notify('Please fill all the fields.')
        } else {
          this.currentStep = 'third'
        }
      }
    },
    clearFormData () {
      this.formData.organisationName = ''
      this.formData.companyName = ''
      this.formData.payloadName = ''
      this.formData.payloadData = []
      this.formData.payloadStatus = ''
      this.formData.payloadDescription = null
      this.$v.formData.$reset()
      this.currentStep = 'first'
    },
    submitTryPayload () {
      store.dispatch('payload/testPayload', {
        organisation: this.payloadTest.organisation,
        company: this.payloadTest.company,
        data: JSON.parse(this.payloadTest.data || {})
      })
        .then(res => {
          // this.payLoadTryModal = false
          this.payloadTest.responseData = res
        })
        .catch(error => {
          this.$q.notify({
            message: error.data,
            type: 'negative'
          })
        })
        .finally(() => {
          this.payloadTest.organisation = ''
          this.payloadTest.company = ''
          this.payloadTest.data = ''
        })
    }
  },
  created () {
    this.init()
  }
}
</script>

<style scoped>
  .q-stepper { box-shadow: none; }
</style>
