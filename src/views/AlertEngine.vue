<template>
  <q-page :padding=true>
    <q-table
      title="Alert Engine List"
      :data="sortedAlerts"
      :columns="columns"
      row-key="id">
      <q-td slot="body-cell-slno" slot-scope="row">
        {{ row.row.__index + 1 }}
      </q-td>
      <q-td slot="body-cell-mail" slot-scope="props" :props="props">
        <q-chip v-if="props.row.mail" square detail icon="mail" color="green" dense>ENABLED</q-chip>
        <q-chip v-else square detail icon="mail" color="red" dense>DISABLED</q-chip>
      </q-td>
      <q-td slot="body-cell-phoneNo" slot-scope="props" :props="props">
        <q-chip v-if="props.row.phone_no" square detail icon="phone" color="green" dense>ENABLED</q-chip>
        <q-chip v-else square detail icon="phone" color="red" dense>DISABLED</q-chip>
      </q-td>
      <q-td slot="body-cell-condition" slot-scope="props" :props="props">
        <q-btn flat color="primary" label="View" @click="showAlertConditionModal()"></q-btn>
      </q-td>
      <q-td slot="body-cell-template" slot-scope="props" :props="props">
        <q-btn flat color="primary" label="View" @click="showAlertTemplateModal()"></q-btn>
      </q-td>
      <q-td slot="body-cell-status" slot-scope="props" :props="props">
        <q-chip v-if="props.row.status === 'active'" square detail color="secondary" dense class="uppercase">{{ props.row.status }}</q-chip>
        <q-chip v-else square detail color="red" dense class="uppercase">{{ props.row.status }}</q-chip>
      </q-td>
      <q-td slot="body-cell-action" slot-scope="props" :props="props">
        <q-btn flat round color="primary" @click.native="showAlertEditModal(props.row)">
          <q-icon name="create" />
        </q-btn>
        <q-btn flat round color="primary" @click.native="deletePayload(props.row.payload_identifier)">
          <q-icon name="delete" />
        </q-btn>

        <!--<q-btn-dropdown color="primary" label="Action">
          <q-list link>
            <q-item dense v-close-overlay @click.native="showAlertEditModal(props.row)">
              <q-item-side icon="create" inverted color="primary" />
              <q-item-main label>Edit</q-item-main>
            </q-item>
            <q-item dense v-close-overlay @click.native="deletePayload(props.row.payload_identifier)">
              <q-item-side icon="delete" inverted color="negative" />
              <q-item-main label>Delete</q-item-main>
              <q-item-side right icon="info" color="warning" />
            </q-item>
          </q-list>
        </q-btn-dropdown>-->
      </q-td>

      <!--<template slot="top-left" slot-scope="props">
        <q-search hide-underline color="secondary" v-model="filter" class="col-6" />
      </template>-->
      <template slot="top-right" slot-scope="props" class="column">
        <q-btn round color="secondary" icon="add" @click.prevent="showCreateAlertModal()" />
      </template>

      <div slot="pagination" slot-scope="props" class="row flex-center q-py-sm">
        <q-btn round dense size="sm" icon="undo" color="secondary" class="q-mr-sm" :disable="props.isFirstPage" @click="props.prevPage" />
        <div class="q-mr-sm" style="font-size: small">
          Page {{ props.pagination.page }} / {{ props.pagesNumber }}
        </div>
        <q-btn round dense size="sm" icon="redo" color="secondary" :disable="props.isLastPage" @click="props.nextPage" />
      </div>
    </q-table>

    <!--<pre>{{ createAlertFormData }}</pre>-->

    <q-modal maximized v-model="showCreateModal" :content-css="{minWidth: '60vw', minHeight: '30vw'}">
      <q-modal-layout>
        <q-toolbar slot="header">
          <q-toolbar-title>Create Alert</q-toolbar-title>
        </q-toolbar>

        <q-stepper horizontal ref="stepper" color="secondary" v-model="currentStep" class="no-shadow">
          <q-step name="first" title="Step 1" class="no-outline" default>
            <div class="q-pa-md">
              <q-select multiple
                        filter
                        color="secondary"
                        placeholder="Select"
                        filter-placeholder="Select Measure ID"
                        :display-value="`${formData.measureIds}`"
                        v-model="formData.measureIds"
                        :options="getMeasureIdsDropDownOptions()"
                        @input="measureIdChanged()"
              />
            </div>
            <q-stepper-navigation class="q-mt-md">
              <q-btn color="dark" @click="validateStepOneFormData()" label="Next" />
            </q-stepper-navigation>
          </q-step>
          <q-step name="second" title="Step 2" class="no-outline" default>
            <div class="q-pa-md">
              <q-list>
                <q-collapsible separator v-for="(condition, measureId, index) in formData.conditions" :key="measureId" :label="measureId">
                  <table class='q-table'>
                    <thead>
                      <tr>
                        <th>Condition</th>
                        <th>Qualified</th>
                        <th>Non Qualified</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(value, key) in condition.qualified" :key="key">
                        <td>{{ key }}</td>
                        <td>
                          <q-checkbox v-model="formData.conditions[measureId].qualified[key]" />
                        </td>
                        <td>
                          <q-checkbox v-model="formData.conditions[measureId].nonQualified[key]" />
                        </td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr>
                        <td v-if="index === 0">
                          <q-checkbox v-model="formData.isConditionsIsSameForAllMeasureId" label="Same for all fields" />
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </q-collapsible>
              </q-list>
            </div>
            <q-stepper-navigation class="q-mt-md">
              <q-btn flat color="negative" class="q-mr-sm" @click="$refs.stepper.previous()" label="Back" />
              <q-btn color="dark" @click="validateStepTwoFormData()" label="Next" />
            </q-stepper-navigation>
          </q-step>
          <q-step name="third" title="Step 3" class="no-outline" default>
            <div class="q-pa-md">
              <q-list>
                <q-collapsible separator v-for="(item, index) in createAlertFormData" :key="index" :label="item.measure_id.toString()">
                  <div>
                    <q-field label="Measure ID">
                      <q-input readonly inverted :value="item.measure_id" />
                    </q-field>
                    <q-field label="SMS">
                      <q-toggle v-model="item.sms" />
                    </q-field>
                    <q-field label="Mobile" v-if="item.sms">
                      <q-input v-model="item.phone_no" />
                    </q-field>
                    <q-field label="Mail">
                      <q-toggle v-model="item.mail" />
                    </q-field>
                    <q-field label="Email ID" v-if="item.mail">
                      <q-input v-model="item.mail_id" />
                    </q-field>
                    <q-field label="Subject">
                      <q-input v-model="item.subject" />
                    </q-field>

                    <q-field label="Scheduled">
                      <q-toggle v-model="item.isScheduled" />
                    </q-field>

                    <q-field label="Scheduled Time" v-if="item.isScheduled">
                      <q-datetime v-model="item.scheduled" type="time" format24h />
                    </q-field>

                    <q-field label="Body">
                      <q-input v-model="item.body" />
                    </q-field>
                    <q-field label="Qualified">
                      <q-input v-model="item.qualified" />
                    </q-field>
                    <q-field label="Non Qualified">
                      <q-input v-model="item.non_qualified" />
                    </q-field>
                    <q-field label="Status">
                      <q-input v-model="item.status" />
                    </q-field>
                  </div>
                </q-collapsible>
              </q-list>
            </div>
            <q-stepper-navigation class="q-mt-md">
              <q-btn flat color="negative" class="q-mr-sm" @click="$refs.stepper.previous()" label="Back" />
              <q-btn color="dark" @click="validateStepThirdFormData()" label="Next" />
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

    <q-modal v-model="showConditionModal" :content-css="{minWidth: '60vw', minHeight: '30vw'}">
      <q-modal-layout>
        <table class="q-table q-table-horizontal-separator">
          <thead>
            <tr>
              <th>Qualified</th>
              <th>Not Qualified</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="data in getAlertConditions()" :key="data.measure_id">
              <td>{{ data.qualified }}</td>
              <td>{{ data.not_qualified }}</td>
            </tr>
          </tbody>
        </table>
        <q-toolbar slot="footer">
          <q-toolbar-title>
            <q-btn flat v-close-overlay label="close"></q-btn>
          </q-toolbar-title>
        </q-toolbar>
      </q-modal-layout>
    </q-modal>

    <q-modal v-model="showTemplateModal" :content-css="{minWidth: '60vw', minHeight: '30vw'}">
      <q-modal-layout>
        <table class="q-table q-table-horizontal-separator">
          <thead>
          <tr>
            <th>Subject</th>
            <th>Body</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="data in getAlertTemplates()" :key="data.measure_id">
            <td>{{ data.subject }}</td>
            <td>
              <ul>
                <li v-for="(item, index) in data.body.split(',')" :key="index">{{ item }}</li>
              </ul>
            </td>
          </tr>
          </tbody>
        </table>
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
import _ from 'lodash'
import QBtn from 'quasar-framework/src/components/btn/QBtn'
import QList from 'quasar-framework/src/components/list/QList'
import QTable from 'quasar-framework/src/components/table/QTable'
// import QDatetime from 'quasar-framework/src/components/datetime/QDatetime'
import { date } from 'quasar'
export default {
  components: { QTable, QList, QBtn },
  data () {
    return {
      currentStep: 'first',
      formData: {
        measureIds: [],
        conditions: {
          qualified: null,
          nonQualified: null
        },
        isConditionsIsSameForAllMeasureId: false
      },
      alertConditions: [],
      alertTemplates: [],
      columns: [
        { name: 'slno', label: '#', align: 'left' },
        { name: 'measureId', label: 'Measure ID', field: 'measure_id', align: 'left' },
        { name: 'mail', label: 'Mail', field: 'mail', align: 'left' },
        { name: 'phoneNo', label: 'Phone No', field: 'phone_no', align: 'left' },
        { name: 'condition', label: 'Condition', align: 'left' },
        { name: 'template', label: 'Template', align: 'left' },
        { name: 'status', label: 'Status', field: 'status', align: 'left' },
        { name: 'action', label: 'Action', align: 'right' }
      ],
      showCreateModal: false,
      showConditionModal: false,
      showTemplateModal: false,
      createAlertFormData: []
    }
  },
  computed: {
    ...mapGetters('alertEngine', ['alerts', 'conditions']),
    ...mapGetters('measures', ['measureIds']),
    sortedAlerts () {
      return _.orderBy(this.alerts, ['id'], ['desc'])
    }
    // createAlertFormData () {
    //   let data = this.formData.measureIds
    //   // data.map(i => {
    //   //   i['sms'] = false
    //   // })
    //   return data
    // }
  },
  methods: {
    init () {
      let _this = this
      store.dispatch('alertEngine/list')
      store.dispatch('alertEngine/conditions').then(() => {
        _this.setAlertConditions()
      })
      store.dispatch('measures/listMeasureId')
    },
    showCreateAlertModal () {
      this.showCreateModal = true
    },
    showAlertConditionModal () {
      this.showConditionModal = true
    },
    showAlertTemplateModal () {
      this.showTemplateModal = true
    },
    showAlertEditModal () {},
    getMeasureIdsDropDownOptions () {
      let options = []
      this.measureIds.forEach(i => {
        options.push({ 'display': i.measure_id, 'label': i.measure_id + ' - ' + i.measure_description, 'value': i.measure_id })
      })
      return _.orderBy(options, ['display'], ['asc'])
      // return this.alerts.map(el => el.measure_id)
    },
    getAlertConditions (measureId) {
      return this.alerts.filter(i => i.measure_id === 2309)
    },
    getAlertTemplates (measureId) {
      return this.alerts.filter(i => i.measure_id === 2309)
    },
    validateStepOneFormData () {
      this.currentStep = 'second'
    },
    validateStepTwoFormData () {
      this.currentStep = 'third'
    },
    validateStepThirdFormData () {
      return true
    },
    setAlertConditions () {
      let data = {}
      Object.keys(this.conditions).map(e => {
        data[e] = {
          'qualified': this.conditions[e],
          'nonQualified': this.conditions[e]
        }
      })
      this.formData.conditions = JSON.parse(JSON.stringify(data))
    },
    measureIdChanged () {
      this.createAlertFormData = []
      this.formData.measureIds.forEach(i => {
        this.createAlertFormData.push({
          'measure_id': i,
          'sms': false,
          'mail': false,
          'isScheduled': false,
          'scheduled': 0,
          'phone_no': '',
          'mail_id': '',
          'subject': '',
          'body': '',
          'qualified': '',
          'status': ''
        })
      })
    }
  },
  created () {
    this.init()
  }
}
</script>
