<template>
  <q-page :padding=true>
    <q-table
      title="Table Title"
      :data="tableData"
      :columns="columns"
      row-key="name">
      <q-td slot="body-cell-desc" slot-scope="props" :props="props">
        <q-chip small color="secondary">{{ props.value }}</q-chip>
      </q-td>
    </q-table>

    <q-btn-dropdown
      color="primary"
      label="Dropdown"
    >
      <q-list link>
        <q-item v-for="n in 2" :key="`1.${n}`" v-close-overlay @click.native="handlerFunction">
          <q-item-side icon="folder" inverted color="primary" />
          <q-item-main>
            <q-item-tile label>Photos</q-item-tile>
            <q-item-tile sublabel>February 22, 2016</q-item-tile>
          </q-item-main>
          <q-item-side right icon="info" color="amber" />
        </q-item>
        <q-item-separator inset />
        <q-list-header inset>Files</q-list-header>
        <q-item v-close-overlay @click.native="handlerFunction">
          <q-item-side icon="assignment" inverted color="secondary" />
          <q-item-main>
            <q-item-tile label>Vacation</q-item-tile>
            <q-item-tile sublabel>February 22, 2016</q-item-tile>
          </q-item-main>
          <q-item-side right icon="info" color="amber" />
        </q-item>
      </q-list>
    </q-btn-dropdown>
  </q-page>
</template>

<script>
export default {
  data: () => ({
    columns: [
      { name: 'desc', required: true, label: 'Dessert (100g serving)', align: 'left', field: 'name', sortable: true },
      { name: 'calories', label: 'Calories', field: 'calories', sortable: true },
      { name: 'fat', label: 'Fat (g)', field: 'fat', sortable: true },
      { name: 'carbs', label: 'Carbs (g)', field: 'carbs' },
      { name: 'protein', label: 'Protein (g)', field: 'protein' },
      { name: 'sodium', label: 'Sodium (mg)', field: 'sodium' },
      { name: 'calcium', label: 'Calcium (%)', field: 'calcium', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
      { name: 'iron', label: 'Iron (%)', field: 'iron', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
      { name: 'action', label: 'Action', field: 'action' }
    ],
    tableData: [
      {
        name: 'Frozen Yogurt',
        calories: 159,
        fat: 6.0,
        carbs: 24,
        protein: 4.0,
        sodium: 87,
        calcium: '14%',
        iron: '1%'
      },
      {
        name: 'Frozen Yogurt2',
        calories: 159,
        fat: 6.0,
        carbs: 24,
        protein: 4.0,
        sodium: 87,
        calcium: '14%',
        iron: '1%'
      }
    ]
  })
}
</script>
