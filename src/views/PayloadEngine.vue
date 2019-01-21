<template>
  <q-page :padding=true>
    <q-table
      title="Payload Engine List"
      :data="sortedPayloades"
      :columns="columns"
      :filter="filter"
      row-key="payload_identifier">
      <q-td slot="body-cell-slno" slot-scope="row">
        {{ row.row.__index + 1 }}
      </q-td>
      <q-td slot="body-cell-action" slot-scope="props" :props="props">
        <q-btn-dropdown color="primary" label="Action">
          <q-list dense link>
            <q-item dense v-close-overlay @click.native="showPayloadEditModal(props.row)">
              <q-item-side icon="create" inverted color="primary" />
              <q-item-main label>Edit</q-item-main>
            </q-item>
            <q-item dense v-close-overlay @click.native="deletePayload(props.row.payload_identifier)">
              <q-item-side icon="delete" inverted color="negative" />
              <q-item-main label>Delete</q-item-main>
              <q-item-side right icon="info" color="warning" />
            </q-item>
            <q-item dense v-close-overlay @click.native="showPayloadDetails(props.row)">
              <q-item-side icon="visibility" inverted color="tertiary" />
              <q-item-main label>Show</q-item-main>
            </q-item>
            <q-item dense v-close-overlay @click.native="showPayloadValidationModal(props.row)">
              <q-item-side icon="visibility" inverted color="tertiary" />
              <q-item-main label>Validate</q-item-main>
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
              <q-card class="no-shadow layout-padding">
                <q-card-title class="text-deep-orange text-weight-bold text-center">
                  Do you have sample payload?
                </q-card-title>
                <q-card-separator />
                <q-card-main>
                  <div class="q-title text-weight-bold">Sample Payload</div>
                  <p>You can directly paste your json payload and test it or can use the existing sample payload and test it.</p>

                  <div class="q-title">Manual Payload</div>
                  <p>You have to follow the steps of choosing multiple fields and forming the json for testing.</p>
                </q-card-main>
                <div class="text-center q-mt-md">
                  <q-btn color="indigo" class="q-px-xl q-mx-md" @click="viewSamplePayload(true)" label="Yes" />
                  <q-btn color="green" class="q-px-xl q-mx-md" @click="viewSamplePayload(false)" label="No" />
                </div>
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
                    class="q-ma-md"
                    v-model="formData.payloadData"
                    type="textarea"
                    float-label="Paste Payload Data"
                    :max-height="100"
                    rows="15"
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
        <div class="q-pa-md">
          <q-card>
            <q-card-main>
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
    <q-modal @hide="clearValidatePayloadForm()" v-model="dataTypeValidationModal" :content-css="{minWidth: '800px'}">
      <q-modal-layout>
        <q-toolbar slot="header">
          <q-toolbar-title>Payload Validation</q-toolbar-title>
        </q-toolbar>
        <div>
          <q-input class="q-ma-md" v-if="!payloadTest.responseData" v-model="payloadTest.data" @input="prettifyPayloadTestData()" type="textarea" float-label="Paste JSON data here !" :max-height="100" rows="15" />
          <!--<v-jsoneditor v-model="payloadTest.data" ></v-jsoneditor>-->
          <div v-if="payloadTest.responseData">
            <pre>{{payloadTest.responseData}}</pre>
          </div>
        </div>
        <q-toolbar slot="footer">
          <q-toolbar-title class="text-right">
            <span class="json-validation-success-msg float-left" v-if="payloadTest.isValidJson === true">Valid JSON data</span>
            <span class="json-validation-error-msg float-left" v-if="payloadTest.isValidJson === false">Invalid JSON data</span>
            <q-btn flat label="Format" @click.prevent="prettifyPayloadTestData()"></q-btn>
            <q-btn flat label="Submit" @click.prevent="submitValidationPayload()"></q-btn>
            <q-btn flat v-close-overlay label="close"></q-btn>
          </q-toolbar-title>
        </q-toolbar>
      </q-modal-layout>
    </q-modal>

    <q-modal @hide="clearPayloadEditModal()" v-model="payLoadEditModal" :content-css="{minHeight: '300px', minWidth: '800px'}">
      <q-modal-layout>
        <q-toolbar slot="header">
          <q-toolbar-title>Payload Edit</q-toolbar-title>
        </q-toolbar>
          <q-input class="q-ma-md" type="textarea" v-model="payLoadEditModalFormData.postData" @input="prettifyPayLoadEditModalFormData()" :max-height="100" rows="15" />
          <!--<v-jsoneditor v-model="payLoadEditModalFormData.postData" ></v-jsoneditor>-->
        <q-toolbar slot="footer">
          <q-toolbar-title class="text-right">
            <q-btn flat label="Format" @click.prevent="prettifyPayLoadEditModalFormData()"></q-btn>
            <q-btn flat label="Submit" @click.prevent="submitEditPayload()"></q-btn>
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
import _ from 'lodash'
// import VJsoneditor from 'vue-jsoneditor'

export default {
  data: () => ({
    loading: false,
    currentStep: 'first',
    filter: '',
    payLoadEditModal: false,
    payLoadEditModalFormData: {
      payloadId: null,
      postData: [],
      organisation: null,
      company: null
    },
    payLoadCreateModalStatus: false,
    payLoadDetailShowModal: false,
    dataTypeValidationModal: false,
    payloadFullDescription: [],
    isSamplePayload: true,
    payloadTest: {
      organisation: '',
      company: '',
      data: '',
      isResponseAvailable: '',
      responseData: '',
      isValidJson: null
    },
    columns: [
      { name: 'slno', label: '#', align: 'left' },
      { name: 'organisation', label: 'Organisation', field: 'payload_organisation', align: 'left' },
      { name: 'payloadname', required: true, label: 'Company Name', align: 'left', field: 'payload_name', sortable: true },
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
    ...mapGetters('payload', ['payloades']),
    sortedPayloades () {
      return _.orderBy(this.payloades, ['payload_identifier'], ['desc'])
    }
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
            type: 'positive',
            position: 'top-right'
          })
        })
        .catch((error) => {
          this.$q.notify({
            message: error.data.result,
            type: 'negative',
            position: 'top-right'
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
    showPayloadValidationModal (data) {
      this.payloadTest.organisation = data.payload_organisation
      this.payloadTest.company = data.payload_name
      this.payloadTest.data = ''
      this.dataTypeValidationModal = true
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
          this.$q.notify({
            message: 'Please fill all the fields.',
            type: 'negative',
            position: 'top-right'
          })
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
    submitValidationPayload () {
      console.log(this.payloadTest.data)
      store.dispatch('payload/validationPayload', {
        organisation: this.payloadTest.organisation,
        company: this.payloadTest.company,
        data: JSON.parse(this.payloadTest.data || {})
      })
        .then(res => {
          this.payloadTest.responseData = res
          this.$q.notify({
            message: 'Data validated successfully',
            type: 'positive',
            position: 'top-right'
          })
        })
        .catch(error => {
          this.$q.notify({
            message: JSON.stringify(error.response.data.result),
            type: 'negative',
            position: 'top-right'
          })
        })
        .finally(() => {
          // this.payloadTest.organisation = ''
          // this.payloadTest.company = ''
          // this.payloadTest.data = ''
        })
    },
    clearValidatePayloadForm () {
      this.payloadTest.organisation = ''
      this.payloadTest.company = ''
      this.payloadTest.data = ''
      this.payloadTest.responseData = ''
    },
    showPayloadEditModal (data) {
      let postData = {
        'description': data.payload_description,
        'status': data.payload_status,
        'user': data.payload_user,
        'payload': JSON.parse(data.payload_value)
      }

      this.payLoadEditModalFormData.payloadId = data.payload_identifier
      this.payLoadEditModalFormData.organisation = data.payload_organisation
      this.payLoadEditModalFormData.company = data.payload_name
      this.payLoadEditModalFormData.postData = JSON.stringify(postData)

      // console.log(this.payLoadEditModalFormData)

      this.payLoadEditModal = true
    },
    submitEditPayload () {
      console.log(this.payLoadEditModalFormData)
      store.dispatch('payload/update', {
        payloadId: this.payLoadEditModalFormData.payloadId,
        organisation: this.payLoadEditModalFormData.organisation,
        companyName: this.payLoadEditModalFormData.company,
        data: this.payLoadEditModalFormData.postData
      })
        .then(res => {
          console.log(res)
        })
    },
    clearPayloadEditModal () {
      this.payLoadEditModalFormData.payloadId = null
      this.payLoadEditModalFormData.organisation = null
      this.payLoadEditModalFormData.company = null
      this.payLoadEditModalFormData.postData = []
    },
    deletePayload (payloadId) {
      this.$q.dialog({
        title: 'Confirm',
        message: 'Are to sure? You want to delete the selected Payload data?',
        ok: 'Yes',
        cancel: 'No'
      }).then(() => {
        store.dispatch('payload/delete', { payloadId: payloadId })
          .then((res) => {
            this.init()
            console.log(res)
            this.$q.notify({
              message: 'Record Deleted successfully',
              type: 'positive',
              position: 'top-right'
            })
          })
          .catch((error) => {
            console.log(error)
            this.$q.notify({
              message: 'An error occured.',
              type: 'negative',
              position: 'top-right'
            })
          })
      }).catch(() => {
        // this.$q.notify('Disagreed...')
      })
    },
    prettifyPayLoadEditModalFormData () {
      let data = JSON.parse(this.payLoadEditModalFormData.postData)
      this.payLoadEditModalFormData.postData = JSON.stringify(data, undefined, 4)
    },
    isValidJSON (str) {
      try {
        return (JSON.parse(str) && !!str)
      } catch (e) {
        return false
      }
    },
    prettifyPayloadTestData () {
      let validJson = this.isValidJSON(this.payloadTest.data)
      console.log(validJson)
      if (validJson) {
        this.payloadTest.isValidJson = true
        let data = JSON.parse(this.payloadTest.data)
        this.payloadTest.data = JSON.stringify(data, undefined, 4)
      } else {
        this.payloadTest.isValidJson = false
      }
    }
  },
  created () {
    this.init()
  }
}
</script>

<style scoped>
  .q-stepper { box-shadow: none; }
  .ace_content { height: 250px !important; }
  .json-validation-success-msg {
    /*position: relative;*/
    font-size: 14px;
    margin-top: 7px;
    background: darkgreen;
    padding: 4px 10px;
  }
  .json-validation-error-msg {
    /*position: relative;*/
    font-size: 14px;
    margin-top: 7px;
    background: red;
    padding: 4px 10px;
  }
</style>
