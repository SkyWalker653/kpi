<template>
  <q-page :padding=true>
    <q-table
      title="Payload Engine List"
      :data="tableData"
      :columns="columns"
      :filter="filter"
      row-key="id">
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
              <q-item-side right icon="info" color="amber" />
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-td>

      <template slot="top-left" slot-scope="props">
        <q-search hide-underline color="secondary" v-model="filter" class="col-6" />
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
export default {
  data: () => ({
    loading: false,
    filter: '',
    payLoadCreateModalStatus: false,
    columns: [
      { name: 'slno', label: '#', align: 'left' },
      { name: 'payloadname', required: true, label: 'Payload Name', align: 'left', field: 'name', sortable: true },
      { name: 'desc', label: 'Description', field: 'desc', sortable: true },
      { name: 'updateby', label: 'Update By', field: 'updateby', sortable: true },
      { name: 'updatedate', label: 'Update Date', field: 'updatedate' },
      { name: 'status', label: 'Status', field: 'status' },
      { name: 'action', label: 'Action', align: 'right' }
    ],
    tableData: [
      {
        id: 1,
        name: 'MIPS',
        desc: 'Test Payload',
        updateby: 'Siba',
        updatedate: '1 Jan 2019',
        status: 'Active'
      },
      {
        id: 2,
        name: 'MIPS',
        desc: 'Test Payload',
        updateby: 'Siba',
        updatedate: '1 Jan 2019',
        status: 'Active'
      },
      {
        id: 3,
        name: 'MIPS',
        desc: 'Test Payload',
        updateby: 'Siba',
        updatedate: '1 Jan 2019',
        status: 'Active'
      },
      {
        id: 4,
        name: 'MIPS',
        desc: 'Test Payload',
        updateby: 'Siba',
        updatedate: '1 Jan 2019',
        status: 'Active'
      },
      {
        id: 5,
        name: 'MIPS',
        desc: 'Test Payload',
        updateby: 'Siba',
        updatedate: '1 Jan 2019',
        status: 'Active'
      },
      {
        id: 6,
        name: 'MIPS',
        desc: 'Test Payload',
        updateby: 'Siba',
        updatedate: '1 Jan 2019',
        status: 'Active'
      },
      {
        id: 7,
        name: 'MIPS',
        desc: 'Test Payload',
        updateby: 'Siba',
        updatedate: '1 Jan 2019',
        status: 'Active'
      },
      {
        id: 8,
        name: 'MIPS',
        desc: 'Test Payload',
        updateby: 'Siba',
        updatedate: '1 Jan 2019',
        status: 'Active'
      },
      {
        id: 9,
        name: 'MIPS',
        desc: 'Test Payload',
        updateby: 'Siba',
        updatedate: '1 Jan 2019',
        status: 'Active'
      },
      {
        id: 10,
        name: 'MIPS',
        desc: 'Test Payload',
        updateby: 'Siba',
        updatedate: '1 Jan 2019',
        status: 'Active'
      }
    ]
  })
}
</script>
