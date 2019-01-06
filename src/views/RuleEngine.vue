<template>
  <q-page :padding=true>
    <q-table
      title="Payload Engine List"
      :data="rules()"
      :columns="columns"
      :filter="filter"
      row-key="measure_id">
      <q-td slot="body-cell-slno" slot-scope="row">
        {{ row.row.__index + 1 }}
      </q-td>
      <!-- <q-td slot="body-cell-action" slot-scope="props" :props="props">
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
            <q-item dense v-close-overlay>
              <q-item-side icon="delete" inverted color="negative" />
              <q-item-main label>Show</q-item-main>
              <q-item-side right icon="info" color="amber" />
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-td> -->

      <template slot="top-left" slot-scope="props">
        <q-search hide-underline color="secondary" v-model="filter" class="col-6" />
      </template>

      <template slot="body" slot-scope="props">
        <q-tr :props="props">
          <q-td key="slno" :props="props">
            <q-checkbox color="primary" v-model="props.expand" checked-icon="remove" unchecked-icon="add" class="q-mr-md" />
            {{ props.row.measure_id }}
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
                <q-item dense v-close-overlay>
                  <q-item-side icon="delete" inverted color="negative" />
                  <q-item-main label>Show</q-item-main>
                  <q-item-side right icon="info" color="amber" />
                </q-item>
              </q-list>
            </q-btn-dropdown>
          </q-td>
        </q-tr>
        <q-tr v-show="props.expand" :props="props">
          <q-td colspan="100%">
            <!--<div class="text-left">This is expand slot for row above: {{ props.row.measure_id }}.</div>-->
            <div class="text-left">
              <!--<template>
                <q-table title="Table Title" :data="props" :columns="innerColumns" row-key="name"></q-table>
              </template>-->
              Measure ID: {{ props.row.measure_id }}<br>
              Measure Field: {{ props.row.measure_field }}<br>
              Measure Value: {{ props.row.measure_value }}<br>
              Measure Condition: {{ props.row.measure_condition }}<br>
              Measure Type: {{ props.row.measure_type }}<br>
              Measure Suffix: {{ props.row.measure_suffix }}
            </div>
          </q-td>
        </q-tr>
      </template>

      <div slot="top-right" slot-scope="props" class="column">
        <q-btn round color="secondary" icon="add" />
      </div>

      <div slot="pagination" slot-scope="props" class="row flex-center q-py-sm">
        <q-btn round dense size="sm" icon="undo" color="secondary" class="q-mr-sm" :disable="props.isFirstPage" @click="props.prevPage" />
        <div class="q-mr-sm" style="font-size: small">
          Page {{ props.pagination.page }} / {{ props.pagesNumber }}
        </div>
        <q-btn round dense size="sm" icon="redo" color="secondary" :disable="props.isLastPage" @click="props.nextPage" />
      </div>
    </q-table>

    <q-modal no-backdrop-dismiss v-model="payLoadCreateModalStatus" content-css="padding: 20px">
      <h4>Basic Modal</h4>
      <q-btn color="primary" @click="opened = false" label="Close" />
    </q-modal>
  </q-page>
</template>

<script>
import store from 'vuex-store'
// import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      loading: false,
      filter: '',
      payLoadCreateModalStatus: false,
      columns: [
        { name: 'slno', label: '#', align: 'left' },
        { name: 'measurementid', label: 'Measurement ID', field: `measure_id`, align: 'left' },
        { name: 'payloadname', required: true, label: 'Payload Name', align: 'left', field: 'measure_payload_name', sortable: true },
        { name: 'user', label: 'User', field: 'measure_user', align: 'left' },
        { name: 'updated', label: 'Last Updated', field: 'payload_last_updated', sortable: true },
        { name: 'status', label: 'Status', field: 'measure_status', align: 'left' },
        { name: 'action', label: 'Action', align: 'right' }
      ],
      measureIds: [],
      measureData: [],
      parsedData: []
    }
  },
  methods: {
    init () {
      store.dispatch('rulesEngine/listMeasureId')
        .then((res) => {
          this.measureIds = res.message
          store.dispatch('rulesEngine/listMeasureDesc', {})
            .then((res) => {
              this.measureData = res.message
              this.parsedData = JSON.parse(this.measureData || '{}').measureDenomnators
            })
        })
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
    }
  },
  created () {
    this.init()
  }
}
</script>
