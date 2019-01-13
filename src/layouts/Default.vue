<template>
  <q-layout view="lHh Lpr lFf">
    <q-layout-header>
      <q-toolbar color="primary">
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
          icon="menu"
        />

        <q-toolbar-title>
          KPI Engine
          <div slot="subtitle">Key Performance Indicators Engine</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-layout-header>

    <q-layout-drawer
      v-model="leftDrawerOpen"
      :content-class="$q.theme === 'mat' ? 'bg-grey-2' : null"
    >
      <q-list
        no-border
        link
        inset-delimiter
      >
        <q-list no-border link inset-delimiter>
          <q-list-header>Navigation</q-list-header>
          <q-item to="/" exact>
            <q-item-side icon="home" />
            <q-item-main label="Home" />
          </q-item>
          <q-item to="/payload-engine" exact>
            <q-item-side icon="account_balance" />
            <q-item-main label="Payload Engine" />
          </q-item>
          <q-item to="/rule-engine">
            <q-item-side icon="assignment" />
            <q-item-main label="Rule Engine" />
          </q-item>
          <q-item to="/alert-engine">
            <q-item-side icon="notifications_active" />
            <q-item-main label="Alert Engine" />
          </q-item>
          <q-item to="/measure-notification">
            <q-item-side icon="speaker_notes" />
            <q-item-main label="Measure Notification" />
          </q-item>
          <q-item to="/about">
            <q-item-side icon="info_outline" />
            <q-item-main label="About" />
          </q-item>
          <!--<q-item-separator />
          <q-list-header>Essential Links</q-list-header>
          <q-item @click.native="openURL('http://quasar-framework.org')">
            <q-item-side icon="school" />
            <q-item-main label="Docs" sublabel="quasar-framework.org"></q-item-main>
          </q-item>
          <q-item @click.native="openURL('https://discord.gg/5TDhbDg')">
            <q-item-side icon="chat" />
            <q-item-main label="Discord Chat Channel" sublabel="https://discord.gg/5TDhbDg"></q-item-main>
          </q-item>
          <q-item @click.native="openURL('http://forum.quasar-framework.org')">
            <q-item-side icon="forum" />
            <q-item-main label="Forum" sublabel="forum.quasar-framework.org"></q-item-main>
          </q-item>
          <q-item @click.native="openURL('https://twitter.com/quasarframework')">
            <q-item-side icon="rss feed" />
            <q-item-main label="Twitter" sublabel="@quasarframework"></q-item-main>
          </q-item>-->
        </q-list>
      </q-list>
    </q-layout-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'

export default {
  name: 'LayoutDefault',
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop
    }
  },
  methods: {
    openURL
  }
}
</script>

<style>
</style>
