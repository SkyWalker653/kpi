<template>
  <q-page :padding=true>
    <q-table
      title="Payload Engine List"
      :data="measures"
      :columns="columns"
      :filter="filter"
      row-key="measure_id">

      <template slot="top-left" slot-scope="props">
        <q-search hide-underline color="secondary" v-model="filter" class="col-6" />
      </template>
      <template slot="body" slot-scope="props">
        <q-tr :props="props">
          <q-td key="slno" :props="props">
            <q-checkbox color="primary" v-model="props.expand" checked-icon="remove" unchecked-icon="add" class="q-mr-md" />
          </q-td>
          <q-td key="measurementid" :props="props">{{ props.row.measure_id }}</q-td>
          <q-td key="payloadname" :props="props">{{ props.row.measure_payload_name }}</q-td>
          <q-td key="user" :props="props">{{ props.row.measure_user }}</q-td>
          <q-td key="updated" :props="props">{{ props.row.payload_last_updated }}</q-td>
          <q-td key="status" :props="props">{{ props.row.measure_status }}</q-td>
          <q-td key="action" :props="props">
            <q-btn-dropdown color="primary" label="Action">
              <q-list dense link>
                <q-item dense v-close-overlay>
                  <q-item-side icon="create" inverted color="primary" />
                  <q-item-main label>Edit</q-item-main>
                </q-item>
                <q-item dense v-close-overlay>
                  <q-item-side icon="delete" inverted color="negative" />
                  <q-item-main label>Delete</q-item-main>
                  <q-item-side right icon="info" color="amber" />
                </q-item>
              </q-list>
            </q-btn-dropdown>
          </q-td>
        </q-tr>
        <q-tr v-show="props.expand" :props="props">
          <q-td colspan="100%" class="no-padding">
            <template>
              <q-table :data="measureConditionData(props.row.measure_id)"
                :columns="measuresConditionsColumns" row-key="measure_key" hide-bottom color="primary"
              />
            </template>
          </q-td>
        </q-tr>
      </template>
      <div slot="top-right" slot-scope="props" class="column">
        <q-btn round color="secondary" icon="add" @click.prevent="showCreateModal()" />
      </div>
      <div slot="pagination" slot-scope="props" class="row flex-center q-py-sm">
        <q-btn round dense size="sm" icon="undo" color="secondary" class="q-mr-sm" :disable="props.isFirstPage" @click="props.prevPage" />
        <div class="q-mr-sm" style="font-size: small">
          Page {{ props.pagination.page }} / {{ props.pagesNumber }}
        </div>
        <q-btn round dense size="sm" icon="redo" color="secondary" :disable="props.isLastPage" @click="props.nextPage" />
      </div>
    </q-table>

    <q-modal maximized v-model="showRuleEngineCreateModal" :content-css="{minWidth: '60vw', minHeight: '80vh'}">
      <q-modal-layout>
        <q-toolbar slot="header">
          <q-toolbar-title>Create Rule Engine</q-toolbar-title>
        </q-toolbar>

        <q-stepper vertical ref="stepper" color="secondary" v-model="currentStep" class="no-shadow">
          <q-step name="first" title="Step 1: Measure Details" class="no-outline" default>
            <div>
              <q-field label="Measure ID">
                <q-input v-model="measureId" :error="$v.formMeasure.measure_id.$error" color="primary" float-label="Enter measure ID" />
              </q-field>
              <q-field label="Description">
                <q-input v-model="formMeasure.measure_description" :error="$v.formMeasure.measure_description.$error" color="primary" float-label="Enter measure description" />
              </q-field>
              <q-field label="Payload Name">
                <q-input v-model="formMeasure.measure_payload_name" :error="$v.formMeasure.measure_payload_name.$error" float-label="Enter payload name">
                  <q-autocomplete separator :static-data="{field: 'value', list: payloadNames}" @selected="setPayloadField()"></q-autocomplete>
                </q-input>
              </q-field>
              <q-field label="Status">
                <q-select v-model="formMeasure.measure_status" :error="$v.formMeasure.measure_status.$error" :options="measureStatus" float-label="Select measure Status"/>
              </q-field>
            </div>
            <q-stepper-navigation class="q-mt-md">
              <q-btn color="dark" @click="$refs.stepper.next()" label="Next" />
            </q-stepper-navigation>
          </q-step>
          <q-step name="second" title="Step 2: Denominator">
            <q-table :data="formDenominator" :columns="denominatorColumns" row-key="measure_key" hide-bottom>
              <template slot="top-right" slot-scope="props" class="column">
                <q-btn color="secondary" class="q-mr-sm" @click="addRow('formDenominator')" label="Add Row" />
              </template>
              <template slot="body" slot-scope="props">
                <q-tr :props="props">
                  <q-td key="field" :props="props">
                    <q-input v-model="props.row.measure_field" color="primary" float-label="Enter denominator field">
                      <q-autocomplete separator :static-data="{field: 'value', list: fieldValues}"></q-autocomplete>
                    </q-input>
                  </q-td>
                  <q-td key="value" :props="props">
                    <q-input v-model="props.row.measure_value" color="primary" float-label="Enter denominator value" />
                  </q-td>
                  <q-td key="condition" :props="props">
                    <q-select v-model="props.row.measure_condition" :options="selectOptions.conditions" float-label="Enter denominator condition" />
                  </q-td>
                  <q-td key="type" :props="props">
                    <q-select v-model="props.row.measure_type" :options="selectOptions.type" float-label="Enter denominator type" />
                  </q-td>
                  <q-td key="suffix" :props="props">
                    <q-select v-model="props.row.measure_suffix" :options="selectOptions.suffix" float-label="Enter denominator suffix" />
                  </q-td>
                  <q-td key="action" :props="props">
                    <q-btn flat round color="negative" icon="delete" @click="removeRow('formDenominator', props.row.__index)" />
                  </q-td>
                </q-tr>
              </template>
            </q-table>
            <!--<div>
              <q-field label="Field">
                <q-input v-model="formDenominator.field" :error="$v.formDenominator.field.$error" color="primary" float-label="Enter denominator field" />
              </q-field>
              <q-field label="Value">
                <q-input v-model="formDenominator.value" :error="$v.formDenominator.value.$error" color="primary" float-label="Enter denominator value" />
              </q-field>
              <q-field label="Condition">
                <q-select v-model="formDenominator.condition" :error="$v.formDenominator.condition.$error" :options="selectOptions.conditions" float-label="Enter denominator condition" />
              </q-field>
              <q-field label="Type">
                <q-select v-model="formDenominator.type" :error="$v.formDenominator.type.$error" :options="selectOptions.type" float-label="Enter denominator type" />
              </q-field>
              <q-field label="Suffix">
                <q-select v-model="formDenominator.suffix" :error="$v.formDenominator.suffix.$error" :options="selectOptions.suffix" float-label="Enter denominator suffix" />
              </q-field>
            </div>-->
            <q-stepper-navigation class="q-mt-md">
              <q-btn flat color="negative" class="q-mr-sm" @click="$refs.stepper.previous()" label="Back" />
              <q-btn color="dark" @click="$refs.stepper.next()" label="Next" />
            </q-stepper-navigation>
          </q-step>
          <q-step name="third" title="Step 3: Denominator Exception">
            <q-table :data="measureDenominatorException" :columns="denominatorColumns" row-key="measure_key" hide-bottom>
              <template slot="top-right" slot-scope="props" class="column">
                <q-btn color="secondary" class="q-mr-sm" @click="addRow('measureDenominatorException')" label="Add Row" />
              </template>
              <template slot="body" slot-scope="props">
                <q-tr :props="props">
                  <q-td key="field" :props="props">
                    <q-input v-model="props.row.measure_field" color="primary" float-label="Enter denominator field">
                      <q-autocomplete separator :static-data="{field: 'value', list: fieldValues}"></q-autocomplete>
                    </q-input>
                  </q-td>
                  <q-td key="value" :props="props">
                    <q-input v-model="props.row.measure_value" color="primary" float-label="Enter denominator value" />
                  </q-td>
                  <q-td key="condition" :props="props">
                    <q-select v-model="props.row.measure_condition" :options="selectOptions.conditions" float-label="Enter denominator condition" />
                  </q-td>
                  <q-td key="type" :props="props">
                    <q-select v-model="props.row.measure_type" :options="selectOptions.type" float-label="Enter denominator type" />
                  </q-td>
                  <q-td key="suffix" :props="props">
                    <q-select v-model="props.row.measure_suffix" :options="selectOptions.suffix" float-label="Enter denominator suffix" />
                  </q-td>
                  <q-td key="action" :props="props">
                    <q-btn flat round color="negative" icon="delete" @click="removeRow('measureDenominatorException', props.row.__index)" />
                  </q-td>
                </q-tr>
              </template>
            </q-table>
            <q-stepper-navigation class="q-mt-md">
              <q-btn flat color="negative" class="q-mr-sm" @click="$refs.stepper.previous()" label="Back" />
              <q-btn color="dark" @click="$refs.stepper.next()" label="Next" />
            </q-stepper-navigation>
          </q-step>
          <q-step name="fourth" title="Step 4: Denominator Exclusion">
            <q-table :data="measureDenominatorExclusion" :columns="denominatorColumns" row-key="measure_key" hide-bottom>
              <template slot="top-right" slot-scope="props" class="column">
                <q-btn color="secondary" class="q-mr-sm" @click="addRow('measureDenominatorExclusion')" label="Add Row" />
              </template>
              <template slot="body" slot-scope="props">
                <q-tr :props="props">
                  <q-td key="field" :props="props">
                    <q-input v-model="props.row.measure_field" color="primary" float-label="Enter denominator field">
                      <q-autocomplete separator :static-data="{field: 'value', list: fieldValues}"></q-autocomplete>
                    </q-input>
                  </q-td>
                  <q-td key="value" :props="props">
                    <q-input v-model="props.row.measure_value" color="primary" float-label="Enter denominator value" />
                  </q-td>
                  <q-td key="condition" :props="props">
                    <q-select v-model="props.row.measure_condition" :options="selectOptions.conditions" float-label="Enter denominator condition" />
                  </q-td>
                  <q-td key="type" :props="props">
                    <q-select v-model="props.row.measure_type" :options="selectOptions.type" float-label="Enter denominator type" />
                  </q-td>
                  <q-td key="suffix" :props="props">
                    <q-select v-model="props.row.measure_suffix" :options="selectOptions.suffix" float-label="Enter denominator suffix" />
                  </q-td>
                  <q-td key="action" :props="props">
                    <q-btn flat round color="negative" icon="delete" @click="removeRow('measureDenominatorExclusion', props.row.__index)" />
                  </q-td>
                </q-tr>
              </template>
            </q-table>
            <q-stepper-navigation class="q-mt-md">
              <q-btn flat color="negative" class="q-mr-sm" @click="$refs.stepper.previous()" label="Back" />
              <q-btn color="dark" @click="$refs.stepper.next()" label="Next" />
            </q-stepper-navigation>
          </q-step>
          <q-step name="fifth" title="Step 5: Numerators">
            <q-table :data="measureNumerators" :columns="denominatorColumns" row-key="measure_key" hide-bottom>
              <template slot="top-right" slot-scope="props" class="column">
                <q-btn color="secondary" class="q-mr-sm" @click="addRow('measureNumerators')" label="Add Row" />
              </template>
              <template slot="body" slot-scope="props">
                <q-tr :props="props">
                  <q-td key="field" :props="props">
                    <q-input v-model="props.row.measure_field" color="primary" float-label="Enter denominator field">
                      <q-autocomplete separator :static-data="{field: 'value', list: fieldValues}"></q-autocomplete>
                    </q-input>
                  </q-td>
                  <q-td key="value" :props="props">
                    <q-input v-model="props.row.measure_value" color="primary" float-label="Enter denominator value" />
                  </q-td>
                  <q-td key="condition" :props="props">
                    <q-select v-model="props.row.measure_condition" :options="selectOptions.conditions" float-label="Enter denominator condition" />
                  </q-td>
                  <q-td key="type" :props="props">
                    <q-select v-model="props.row.measure_type" :options="selectOptions.type" float-label="Enter denominator type" />
                  </q-td>
                  <q-td key="suffix" :props="props">
                    <q-select v-model="props.row.measure_suffix" :options="selectOptions.suffix" float-label="Enter denominator suffix" />
                  </q-td>
                  <q-td key="action" :props="props">
                    <q-btn flat round color="negative" icon="delete" @click="removeRow('measureNumerators', props.row.__index)" />
                  </q-td>
                </q-tr>
              </template>
            </q-table>
            <q-stepper-navigation class="q-mt-md">
              <q-btn flat color="negative" class="q-mr-sm" @click="$refs.stepper.previous()" label="Back" />
              <q-btn color="dark" @click="$refs.stepper.next()" label="Next" />
            </q-stepper-navigation>
          </q-step>
          <q-step name="sixth" title="Step 6: Numerator Exclusion">
            <q-table :data="measureNumeratorExclusion" :columns="denominatorColumns" row-key="measure_key" hide-bottom>
              <template slot="top-right" slot-scope="props" class="column">
                <q-btn color="secondary" class="q-mr-sm" @click="addRow('measureNumeratorExclusion')" label="Add Row" />
              </template>
              <template slot="body" slot-scope="props">
                <q-tr :props="props">
                  <q-td key="field" :props="props">
                    <q-input v-model="props.row.measure_field" color="primary" float-label="Enter denominator field">
                      <q-autocomplete separator :static-data="{field: 'value', list: fieldValues}"></q-autocomplete>
                    </q-input>
                  </q-td>
                  <q-td key="value" :props="props">
                    <q-input v-model="props.row.measure_value" color="primary" float-label="Enter denominator value" />
                  </q-td>
                  <q-td key="condition" :props="props">
                    <q-select v-model="props.row.measure_condition" :options="selectOptions.conditions" float-label="Enter denominator condition" />
                  </q-td>
                  <q-td key="type" :props="props">
                    <q-select v-model="props.row.measure_type" :options="selectOptions.type" float-label="Enter denominator type" />
                  </q-td>
                  <q-td key="suffix" :props="props">
                    <q-select v-model="props.row.measure_suffix" :options="selectOptions.suffix" float-label="Enter denominator suffix" />
                  </q-td>
                  <q-td key="action" :props="props">
                    <q-btn flat round color="negative" icon="delete" @click="removeRow('measureNumeratorExclusion', props.row.__index)" />
                  </q-td>
                </q-tr>
              </template>
            </q-table>
            <q-stepper-navigation class="q-mt-md">
              <q-btn flat color="negative" class="q-mr-sm" @click="$refs.stepper.previous()" label="Back" />
              <q-btn color="dark" @click="createMeasure()" label="Create" />
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
  </q-page>
</template>

<script>
import store from 'vuex-store'
import _ from 'lodash'
import { required } from 'vuelidate/lib/validators'
// import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      loading: false,
      filter: '',
      showRuleEngineCreateModal: false,
      columns: [
        { name: 'slno', label: '#', align: 'left' },
        { name: 'measurementid', label: 'Measurement ID', field: `measure_id`, align: 'left' },
        { name: 'payloadname', required: true, label: 'Payload Name', align: 'left', field: 'measure_payload_name', sortable: true },
        { name: 'user', label: 'User', field: 'measure_user', align: 'left' },
        { name: 'updated', label: 'Last Updated', field: 'payload_last_updated', sortable: true },
        { name: 'status', label: 'Status', field: 'measure_status', align: 'left' },
        { name: 'action', label: 'Action', align: 'right' }
      ],
      measuresConditionsColumns: [
        { name: 'measureKey', label: 'Measure Key', field: `measure_key` },
        { name: 'measureField', label: 'Measure Field', field: `measure_field` },
        { name: 'measureValue', label: 'Measure Value', field: `measure_value` },
        { name: 'measureCondition', label: 'Measure Condition', field: `measure_condition` },
        { name: 'measureType', label: 'Measure Type', field: `measure_type` },
        { name: 'measureSuffix', label: 'Measure Suffix', field: `measure_suffix` }
      ],
      measures: [],
      measuresConditions: [],
      currentStep: 'first',
      measureId: '',
      formMeasure: {
        measure_id: '',
        measure_description: '',
        measure_payload_name: '',
        measure_status: ''
      },
      formDenominator: [
        {
          measure_id: '',
          measure_field: '',
          measure_value: '',
          measure_condition: '',
          measure_type: '',
          measure_suffix: ''
        }
      ],
      measureDenominatorException: [
        {
          measure_id: '',
          measure_field: '',
          measure_value: '',
          measure_condition: '',
          measure_type: '',
          measure_suffix: ''
        }
      ],
      measureDenominatorExclusion: [
        {
          measure_id: '',
          measure_field: '',
          measure_value: '',
          measure_condition: '',
          measure_type: '',
          measure_suffix: ''
        }
      ],
      measureNumerators: [
        {
          measure_id: '',
          measure_field: '',
          measure_value: '',
          measure_condition: '',
          measure_type: '',
          measure_suffix: ''
        }
      ],
      measureNumeratorExclusion: [
        {
          measure_id: '',
          measure_field: '',
          measure_value: '',
          measure_condition: '',
          measure_type: '',
          measure_suffix: ''
        }
      ],
      measureStatus: [
        {
          label: 'Active',
          value: 'Active'
        },
        {
          label: 'Archive',
          value: 'Archive'
        },
        {
          label: 'InBuild',
          value: 'InBuild'
        },
        {
          label: 'Paused',
          value: 'Paused'
        }
      ],
      selectOptions: {
        conditions: [
          { label: 'Not equal to', value: 'Not equal to' },
          { label: 'Equal to', value: 'Equal to' },
          { label: 'Contains this', value: 'Contains this' },
          { label: 'Greater than', value: 'Greater than' },
          { label: 'Less than', value: 'Less than' },
          { label: 'Greater or equal to', value: 'Greater or equal to' },
          { label: 'Less or equal to', value: 'Less or equal to' }
        ],
        suffix: [
          {
            label: 'AND',
            value: 'AND'
          },
          {
            label: 'OR',
            value: 'OR'
          },
          {
            label: 'NO SUFFIX',
            value: 'NO SUFFIX'
          }
        ],
        type: [
          { label: 'Date (MM/DD/YYYY)', value: 'Date (MM/DD/YYYY)' },
          { label: 'Date Time', value: 'Date Time' },
          { label: 'Number', value: 'Number' },
          { label: 'Decimal', value: 'Decimal' },
          { label: 'Boolean', value: 'Boolean' },
          { label: 'String', value: 'String' }
        ]
      },
      denominatorColumns: [
        { name: 'field', label: 'FIELD' },
        { name: 'value', label: 'VALUE' },
        { name: 'condition', label: 'CONDITION' },
        { name: 'type', label: 'TYPE' },
        { name: 'suffix', label: 'SUFFIX' },
        { name: 'action', label: 'ACTION' }
      ],
      payloadNames: [],
      fieldValues: []
    }
  },
  watch: {
    measureId: function (val) {
      this.formMeasure.measure_id = val
      this.formDenominator.forEach((el) => { el.measure_id = val })
      this.measureDenominatorException.forEach((el) => { el.measure_id = val })
      this.measureDenominatorExclusion.forEach((el) => { el.measure_id = val })
      this.measureNumerators.forEach((el) => { el.measure_id = val })
    }
  },
  validations: {
    formMeasure: {
      measure_id: { required },
      measure_description: { required },
      measure_payload_name: { required },
      measure_status: { required }
    },
    formDenominator: {
      measure_field: { required },
      measure_value: { required },
      measure_condition: { required },
      measure_type: { required },
      measure_suffix: { required }
    }
  },
  methods: {
    init () {
      store.dispatch('rulesEngine/listMeasureId')
        .then((res) => {
          this.measures = res.message
          store.dispatch('rulesEngine/listMeasureDesc', {})
            .then((res) => {
              this.measuresConditions = JSON.parse(res.message || '{}')
            })
        })
    },
    measureConditionData (measureId) {
      let finalArray = []
      Object.keys(this.measuresConditions).forEach(item => {
        finalArray.push(this.measuresConditions[item].filter(function (el) {
          el.measure_key = item
          return el.measure_id === measureId
        })[0])
      })
      _.remove(finalArray, function (n) {
        return n == null
      })
      return finalArray
    },
    rules () {
      var rulesEngine = []
      for (var i = 0; i < this.measureIds.length; i++) {
        // console.log()
        var data = {
          // 'measure_data': this.measureIds[i]
          'measure_id': this.measureIds[i].measure_id,
          'measure_payload_name': this.measureIds[i].measure_payload_name,
          'measure_user': this.measureIds[i].measure_user,
          'payload_last_updated': this.measureIds[i].payload_last_updated,
          'measure_status': this.measureIds[i].measure_status,
          // 'measure_status': this.measureIds[i].measure_status,
          // 'rule_desc': this.measureIds[i].measure_description,
          // 'rule_data': this.getRuleData(this.measureIds[i].measure_id)
          // 'measure_denomnators': this.getRuleData(this.measureIds[i].measure_id)

          'measure_field': this.getRuleData(this.measureIds[i].measure_id).measure_field,
          'measure_value': this.getRuleData(this.measureIds[i].measure_id).measure_value,
          'measure_condition': this.getRuleData(this.measureIds[i].measure_id).measure_condition,
          'measure_type': this.getRuleData(this.measureIds[i].measure_id).measure_type,
          'measure_suffix': this.getRuleData(this.measureIds[i].measure_id).measure_suffix
        }
        rulesEngine.push(data)
      }
      return rulesEngine

      /* this.measureIds.forEach((el) => {
        var data = {
          'rule_id': el.measure_id,
          'rule_desc': el.measure_description
          // 'rule_data': this.getRuleData(el.measure_id)
        }
        console.log('Rules: ' + JSON.stringify(data))
        this.rulesEngine.push(data)
      }) */
    },
    getRuleData (ruleId) {
      // var dataOutput=$("#txt_stringjson").val();
      // dataOutput=dataOutput.replace(new RegExp("\\\\\"","g"),'"');
      // $("#lbl_output").val(dataOutput);

      // return parsedData.filter(item => {
      //   item
      // })
      for (var i = 0; i < this.parsedData.length; i++) {
        if (this.parsedData[i].measure_id === ruleId) {
          // console.log(this.parsedData[i])
          return this.parsedData[i]
        }
      }

      // console.log('Length: ' + parsedData.length)
      // parsedData.forEach(function (obj) {
      //   console.log('>>>')
      //   console.log(obj)
      // })
      // return a

      // parsedData.forEach((item) => {
      //   return item
      // })
      // for (var i of this.parsedData) {
      //   if (i.message.include(ruleId)) {
      //     return i.message
      //   }
      // }
      // return 'aa'
    },
    showCreateModal () {
      this.showRuleEngineCreateModal = true
      this.getPayloadNames()
    },
    removeRow (formName, index) {
      if (formName === 'formDenominator') {
        this.formDenominator.splice(index, 1)
      } else if (formName === 'measureDenominatorException') {
        this.measureDenominatorException.splice(index, 1)
      } else if (formName === 'measureDenominatorExclusion') {
        this.measureDenominatorExclusion.splice(index, 1)
      } else if (formName === 'measureNumerators') {
        this.measureNumerators.splice(index, 1)
      } else if (formName === 'measureNumeratorExclusion') {
        this.measureNumeratorExclusion.splice(index, 1)
      }
    },
    addRow (formName) {
      if (formName === 'formDenominator') {
        if (_.last(this.formDenominator).measure_suffix !== 'NO SUFFIX' && _.last(this.formDenominator).measure_suffix !== '') {
          this.formDenominator.push({
            measure_id: '',
            measure_field: '',
            measure_value: '',
            measure_condition: '',
            measure_type: '',
            measure_suffix: ''
          })
        } else {
          this.$q.notify({
            message: 'Please select a valid Suffix',
            type: 'negative'
          })
        }
      } else if (formName === 'measureDenominatorException') {
        if (_.last(this.measureDenominatorException).measure_suffix !== 'NO SUFFIX' && _.last(this.measureDenominatorException).measure_suffix !== '') {
          this.measureDenominatorException.push({
            measure_id: '',
            measure_field: '',
            measure_value: '',
            measure_condition: '',
            measure_type: '',
            measure_suffix: ''
          })
        } else {
          this.$q.notify({
            message: 'Please select a valid Suffix',
            type: 'negative'
          })
        }
      } else if (formName === 'measureDenominatorExclusion') {
        if (_.last(this.measureDenominatorExclusion).measure_suffix !== 'NO SUFFIX' && _.last(this.measureDenominatorExclusion).measure_suffix !== '') {
          this.measureDenominatorExclusion.push({
            measure_id: '',
            measure_field: '',
            measure_value: '',
            measure_condition: '',
            measure_type: '',
            measure_suffix: ''
          })
        } else {
          this.$q.notify({
            message: 'Please select a valid Suffix',
            type: 'negative'
          })
        }
      } else if (formName === 'measureNumerators') {
        if (_.last(this.measureNumerators).measure_suffix !== 'NO SUFFIX' && _.last(this.measureNumerators).measure_suffix !== '') {
          this.measureNumerators.push({
            measure_id: '',
            measure_field: '',
            measure_value: '',
            measure_condition: '',
            measure_type: '',
            measure_suffix: ''
          })
        } else {
          this.$q.notify({
            message: 'Please select a valid Suffix',
            type: 'negative'
          })
        }
      } else if (formName === 'measureNumeratorExclusion') {
        if (_.last(this.measureNumeratorExclusion).measure_suffix !== 'NO SUFFIX' && _.last(this.measureNumeratorExclusion).measure_suffix !== '') {
          this.measureNumeratorExclusion.push({
            measure_id: '',
            measure_field: '',
            measure_value: '',
            measure_condition: '',
            measure_type: '',
            measure_suffix: ''
          })
        } else {
          this.$q.notify({
            message: 'Please select a valid Suffix',
            type: 'negative'
          })
        }
      }
    },
    createMeasure () {
      let postData = {
        'measureMaster': this.formMeasure,
        'measureDenomnators': this.formDenominator,
        'measureDenominatorExclusion': this.measureDenominatorExclusion,
        'MeasureNumeratorExclusion': this.MeasureNumeratorExclusion,
        'measureDenominatorException': this.measureDenominatorException,
        'measureNumerators': this.measureNumerators
      }

      store.dispatch('rulesEngine/create', postData)
        .then(res => {
          this.showRuleEngineCreateModal = false
          this.$router.push({ path: '/rule-engine' })
          // this.clearFormData()
          this.init()
          this.$q.notify({
            message: res.message,
            type: 'positive'
          })
        })
        .catch((error) => {
          this.$q.notify({
            message: error.message,
            type: 'negative'
          })
        })
    },
    getPayloadNames () {
      store.dispatch('rulesEngine/payloadNames')
        .then(res => {
          // console.log(res.substr(1).slice(0, -1).split(','))
          let data = res.substr(1).slice(0, -1).split(',')
          data.forEach(el => {
            this.payloadNames.push({
              label: el.trim(),
              value: el.trim()
            })
          })
        })
    },
    setPayloadField () {
      store.dispatch('rulesEngine/fieldValue', this.formMeasure.measure_payload_name)
        .then(res => {
          Object.keys(res).forEach((item) => {
            this.fieldValues.push({
              label: item,
              value: item
            })
          })
        })
    }
  },
  created () {
    this.init()
  }
}
</script>
