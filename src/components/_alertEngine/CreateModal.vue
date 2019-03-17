<template>
  <q-modal v-model="showModal" :content-css="{minWidth: '50vw'}">
    <q-modal-layout>
      <q-toolbar slot="header">
        <q-toolbar-title>Create Alert</q-toolbar-title>
      </q-toolbar>
      <div class="q-pa-md">
        Demo
      </div>
      <q-toolbar slot="footer">
        <q-toolbar-title>
          <q-btn flat v-close-overlay label="close"></q-btn>
        </q-toolbar-title>
      </q-toolbar>
    </q-modal-layout>
  </q-modal>
</template>

<script>
export default {
  props: ['showCreateModal'],
  computed: {
    showModal () {
      return this.showCreateModal
    }
  }
}
</script>
