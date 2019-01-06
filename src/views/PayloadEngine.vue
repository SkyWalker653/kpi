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

    <q-modal v-model="payLoadCreateModalStatus" :content-css="{minWidth: '80vw', minHeight: '80vh'}">
      <q-modal-layout>
        <div>
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
                <q-card-actions>
                  <q-btn color="negative" @click="viewSamplePayload(true)" label="Yes" />
                  <q-btn flat color="positive" @click="viewSamplePayload(false)" label="No" />
                </q-card-actions>
              </q-card>
            </q-step>

            <q-step name="second" title="Step 2">
              <div v-if="isSamplePayload" style="padding: 25px">
                <q-field label="Organization">
                  <q-input v-model="formData.organisationName" color="primary" float-label="Enter organisation name" />
                </q-field>
                <q-field label="Payload Name">
                  <q-input v-model="formData.payloadName" float-label="Enter payload name">
                    <q-autocomplete separator :static-data="{field: 'payload_name', list: staticPayloadData()}" @selected="getPayloadData()" />
                  </q-input>
                </q-field>
                <q-field label="Status">
                  <q-select v-model="formData.payloadStatus" :options="selectPayloadStatus" float-label="Select Payload Status"/>
                </q-field>
                <q-field label="Description">
                  <q-input v-model="formData.payloadDescription" color="primary" float-label="Enter company name" />
                </q-field>
              </div>
              <div v-if="!isSamplePayload" style="padding: 25px">
                <q-field label="Organization">
                  <q-input v-model="formData.organisationName" color="primary" float-label="Enter organisation name" />
                </q-field>
                <q-field label="Status">
                  <q-select v-model="formData.payloadStatus" :options="selectPayloadStatus" float-label="Select Payload Status"/>
                </q-field>
                <q-field label="Description">
                  <q-input v-model="formData.payloadDescription" color="primary" float-label="Enter company name" />
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
                  />
                </q-field>
              </div>
              <q-stepper-navigation>
                <q-btn color="negative" @click="$refs.stepper.previous()" label="Back" />
                <q-btn flat color="positive" @click="$refs.stepper.next()" label="Next" />
              </q-stepper-navigation>
            </q-step>

            <q-step title="Step 3" name="third">
              <vue-json-pretty
                :data="formData.payloadData">
              </vue-json-pretty>
              <!--<pre>{{ formData.payloadData }}</pre>-->
              <q-stepper-navigation>
                <q-btn flat color="negative" @click="$refs.stepper.previous()" label="Back" />
                <q-btn color="positive" @click="createPayload()" label="Create Payload" />
              </q-stepper-navigation>
            </q-step>
        </q-stepper>
        </div>

        <q-toolbar slot="footer">
          <q-toolbar-title>
            <q-btn flat v-close-overlay label="close"></q-btn>
          </q-toolbar-title>
        </q-toolbar>
      </q-modal-layout>
    </q-modal>
    <q-modal v-model="payLoadDetailShowModal" :content-css="{minWidth: '80vw', minHeight: '80vh'}">
      <q-modal-layout>
        <q-toolbar slot="header">
          <q-toolbar-title>Payload Description</q-toolbar-title>
        </q-toolbar>

        <div class="layout-padding">
          <q-card class="transition-generic">
          <q-card-main class="q-pa-none">
            <q-list no-border>
              <q-item>
                <q-item-main><q-item-tile label>Payload User</q-item-tile></q-item-main>
                <q-item-side right><q-item-tile>{{ payloadFullDescription.payload_user }}</q-item-tile></q-item-side>
              </q-item>
              <q-item>
                <q-item-main><q-item-tile label>payload_organisation</q-item-tile></q-item-main>
                <q-item-side right><q-item-tile>{{ payloadFullDescription.payload_organisation }}</q-item-tile></q-item-side>
              </q-item>
              <q-item>
                <q-item-main><q-item-tile label>payload_name</q-item-tile></q-item-main>
                <q-item-side right><q-item-tile>{{ payloadFullDescription.payload_name }}</q-item-tile></q-item-side>
              </q-item>
              <q-item>
                <q-item-main><q-item-tile label>payload_description</q-item-tile></q-item-main>
                <q-item-side right><q-item-tile>{{ payloadFullDescription.payload_description }}</q-item-tile></q-item-side>
              </q-item>
              <q-item>
                <q-item-main><q-item-tile label>payload_status</q-item-tile></q-item-main>
                <q-item-side right><q-item-tile>{{ payloadFullDescription.payload_status }}</q-item-tile></q-item-side>
              </q-item>
              <q-item>
                <q-item-main><q-item-tile label>payload_last_updated</q-item-tile></q-item-main>
                <q-item-side right><q-item-tile>{{ payloadFullDescription.payload_last_updated }}</q-item-tile></q-item-side>
              </q-item>
              <q-item>
                <q-item-main><q-item-tile label>payload_value</q-item-tile></q-item-main>
                <q-item-side right><q-item-tile>{{ payloadFullDescription.payload_value }}</q-item-tile></q-item-side>
              </q-item>
            </q-list>
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
import { mapGetters } from 'vuex'
import VueJsonPretty from 'vue-json-pretty'
import QModal from 'quasar-framework/src/components/modal/QModal'
import QModalLayout from 'quasar-framework/src/components/modal/QModalLayout'

export default {
  data: () => ({
    loading: false,
    currentStep: 'first',
    filter: '',
    payLoadCreateModalStatus: false,
    payLoadDetailShowModal: false,
    payloadFullDescription: [],
    isSamplePayload: true,
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
  computed: {
    ...mapGetters('payload', ['payloades'])
  },
  components: {
    QModalLayout,
    QModal,
    VueJsonPretty
  },
  methods: {
    init () {
      store.dispatch('payload/list', {})
    },
    showCreatePayloadModal () {
      this.payLoadCreateModalStatus = true
    },
    viewSamplePayload (val) {
      if (val) {
        this.isSamplePayload = true
      } else {
        this.isSamplePayload = false
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
        payloadName: this.formData.payloadName,
        data: postData
      }).then(res => {
        console.log('Response: ' + JSON.stringify(res))
      })
    },
    getPayloadData () {
      store.dispatch('payload/list').then((res) => {
        for (var i = 0; i < res.result.length; i++) {
          if (res.result[i].payload_name === this.formData.payloadName) {
            // console.log(this.parsedData[i])
            this.formData.payloadData = JSON.parse(res.result[i].payload_value)
          }
        }
      })
    },
    showPayloadDetails (data) {
      this.payloadFullDescription = data
      this.payLoadDetailShowModal = true
      console.log(data)
    },
    staticPayloadData () {
      /* for (var i = 0; i < this.payloades.length; i++) {
        this.payloades[i].push({
          'label': this.payloades[i].payload_name
        })
      } */
      this.payloades.forEach(item => {
        item.label = item.payload_name
      })

      return this.payloades
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
