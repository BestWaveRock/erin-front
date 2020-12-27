<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="header-class" elevated>
      <q-toolbar class="text-primary">
        <q-btn flat round dense icon="menu" @click="leftDrawerOpen = !leftDrawerOpen"/>
        <q-toolbar-title class="toolbar-title-class">
          轻社区Keeplife
        </q-toolbar-title>
        <q-btn flat round dense icon="more_vert" />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-slide-transition>
        <div v-show="notLoginFlag" class="loginRow">
          <div class="col">
            <q-btn :loading="loginLoading" @click="toLogin" class="customBtn" icon="send" size="10px" color="black" label="登陆">
            </q-btn>
          </div>
          <div class="col">
            <q-btn @click="toRegister()" class="customBtn" icon="map" size="10px" color="white" text-color="blck" label="注册"/>
          </div>
        </div>
      </q-slide-transition>
      <q-slide-transition>
        <div v-show="!notLoginFlag" class="loginRow">
          <q-item clickable v-ripple>
            <q-item-section side>
              <q-avatar rounded size="48px">
                <img src="https://portrait.gitee.com/uploads/avatars/user/754/2264334_Jrxsr_1578970198.png!avatar200" />
                <q-badge floating color="teal">new</q-badge>
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label>Mary</q-item-label>
              <q-item-label v-if="true" caption>2 new messages</q-item-label>
            </q-item-section>
            <q-item-section side>
              <!-- 3 min ago -->
              <q-btn @click="notLoginFlag = true" class="customBtn" flat text-color="red" size="3px" label="登出"/>
            </q-item-section>
          </q-item>
          <!-- <div class="logout">
          </div> -->
        </div>
      </q-slide-transition>
      <q-list>
        <q-item-label
          header
          class="text-grey-8"
        >
          收集的一些没用的链接
        </q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view :path="index"/>
    </q-page-container>

  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'
import { register, login } from '../api/account.js'

const linksData = [
  {
    title: 'Start',
    caption: 'boot',
    icon: 'school',
    link: '#'
  },
  {
    title: 'wuxuan0215',
    caption: 'chat on gitee',
    icon: 'chat',
    link: 'https://gitee.com/wuxuan0215'
  },
  {
    title: 'Jrxsr',
    caption: 'chat on gitee',
    icon: 'chat',
    link: 'https://gitee.com/Jrxsr'
  },
  {
    title: 'Gitee',
    caption: 'gitee.com/wuxuan0215/sharelife',
    icon: 'code',
    link: 'https://gitee.com/wuxuan0215/sharelife'
  },
  {
    title: 'Issue',
    caption: 'issues',
    icon: 'code',
    link: 'https://gitee.com/wuxuan0215/sharelife/issues'
  },
  {
    title: 'Awesome',
    caption: 'star projects',
    icon: 'favorite',
    link: '#awesome'
  }
]

export default {
  name: 'MainLayout',
  components: { EssentialLink },
  data () {
    return {
      leftDrawerOpen: false,
      essentialLinks: linksData,
      notLoginFlag: true,
      loginLoading: false,
      registerLoading: false,
      text: '',
      login: {
        name: '123123',
        psword: '123'
      },
      register: {
        name: '112323',
        phone: '33333'
      },
      sysUser: {}
    }
  },
  methods: {
    toLogin () {
      this.loginLoading = true
      login(this.login).then(Response => {
        this.notLoginFlag = false
        this.loginLoading = false
        if (Response.errorCode === 0) {
          this.sysUser = Response.data
        }
      })
    },
    toRegister () {
      register(this.register).then(Response => {
        if (Response.errorCode === 0) {
          this.registerLoading = true
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>

body {
  font-weight: 300;
}
.header-class {
  background-color: white;
}
.toolbar-title-class{
  font-weight: 300;
  color: black;
}
.bg-grey-1 {
  .loginRow {
    height: 60px;
    .col {
        margin: 5px;
        .logout{
          width: 20px;
          height: 100%;
          line-height: 100%;
          float: right;
        }
    }
    .customBtn {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
