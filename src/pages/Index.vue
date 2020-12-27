<template>
  <q-page class="flex">
    <!-- <q-item>
      <q-item-section side>
        <q-avatar rounded size="48px">
          <img src="https://cdn.quasar.dev/img/avatar.png" />
          <q-badge floating color="teal">new</q-badge>
        </q-avatar>
      </q-item-section>
      <q-item-section>
        <q-item-label>{{sysUser.name ? sysUser.name:'未登録'}}</q-item-label>
        <q-item-label caption>{{sysUser.phone}}</q-item-label>
      </q-item-section>
      <q-item-section side>
        你已陪伴了我们 {{sysUser.createDatetime ? registerHowLong : 0 }} 天
      </q-item-section>
    </q-item> -->

    <div>
      <div class="q-pa-md">
        <q-ajax-bar
          ref="bar"
          position="bottom"
          color="accent"
          size="10px"
          skip-hijack
        />
        <q-btn color="primary" label="获取登陆人信息吗" @click="trigger" />
      </div>
      <div class="q-gutter-md" style="max-width: 300px; margin: 0px">
        <q-input filled v-model="sysUser.account" label="account" />
        <q-input filled v-model="sysUser.psword" label="password" />
        <q-btn outline color="primary" label="我们登陆吧" @click="login" />
      </div>
    </div>
  </q-page>
</template>

<script>
import { get, login } from '../api/account.js'
export default {
  name: 'PageIndex',
  data () {
    return {
      userId: 1,
      sysUser: {
        account: '',
        psword: ''
      },
      registerHowLong: 0
    }
  },
  methods: {
    trigger () {
      const bar = this.$refs.bar
      bar.start()
      this.loading = true
      get(this.userId).then(Response => {
        if (this.$refs.bar) {
          this.$refs.bar.stop()
        }
        this.loading = false
        console.log(Response)
        if (Response.errorCode === '0') {
          this.sysUser = Response.data
        }
      })
    },
    login () {
      const bar = this.$refs.bar
      bar.start()
      this.loading = true
      login(this.sysUser).then(Response => {
        if (this.$refs.bar) {
          this.$refs.bar.stop()
        }
        this.loading = false
        console.log(Response)
        if (Response.errorCode === '0') {
          this.sysUser = Response.data
          if (this.sysUser.createDatetime) {
            const times = new Date(this.sysUser.createDatetime).getTime()
            console.log(times)
          }
        }
      })
    }
  }
}
</script>
