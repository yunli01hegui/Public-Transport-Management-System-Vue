<template>
  <header class="mt-3 border-b-2">
    <nav class="flex justify-between">
      <router-link to="/home"><div class="logo font-bold text-2xl">BusLines</div></router-link>
      <ul class="flex">
        <li class="mr-6">
          <router-link to="/home"> <span  :class="['text-gray-700' ,'font-medium',{'active':$route.name==='home'}]">Home</span></router-link>
        </li>
        <li class="mr-6">
          <router-link to="/bookings"><span  :class="['text-gray-700' ,'font-medium',{'active':$route.name==='bookings'}]">Bookings</span></router-link>
        </li>
      </ul>
      <div class="flex gap-2" v-if="proxy.$FetchApi.admin.name">
        <span>{{proxy.$FetchApi.admin.name}}</span>
        <span>/</span>
        <a href="#" @click.prevent="doLogout" class="text-blue-500 hover:text-blue-800">Logout</a>
      </div>
    </nav>
  </header>
</template>

<script setup>
  import {getCurrentInstance} from "vue";
  import router from "../router";
  const {proxy}=getCurrentInstance();
  async function doLogout(){
    let res= await fetch(`${proxy.$FetchApi.url}/logout?token=${proxy.$FetchApi.admin.remember_token}`)
    if (res.status===200){
      proxy.$FetchApi.setAdmin('')
      localStorage.removeItem('admin')
      router.push('/login')
    }
  }
</script>

<style scoped>
 .active{
   @apply text-blue-500 hover:text-blue-800
 }
</style>