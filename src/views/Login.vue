<template >
  <div class="w-screen bg-gray-300 h-screen grid place-items-center">
    <div>
      <h1 class="text-3xl font-bold mb-8">Admin Login</h1>
        <input type="email" placeholder="Email" class="border-2 border-gray-300 p-2 rounded-lg" v-model="submit.email">
        <input type="password" placeholder="Password" class="border-2 border-gray-300 p-2 rounded-lg" v-model="submit.password">
        <button class="bg-blue-500 text-white p-2 rounded-lg" @click="doLogin">Login</button>
    </div>
  </div>
  <div v-if="show" class="cover fixed top-0 left-0 grid place-content-center items-center w-[100vw] h-[100vh] bg-[rgba(0,0,0,0.15)]">
    <div class="grid place-content-center w-[400px] h-[200px] p-10 bg-white relative">
      <div class="absolute right-2 top-1 text-[red] cursor-pointer" @click="cancel" >X</div>
      <div class="text-center">
        <div class="text-xl">{{msg}}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {getCurrentInstance, reactive, ref} from "vue";
import router from "../router";
  const {proxy}=getCurrentInstance();
  const submit=reactive({
    'email':'admin@gmail.com',
    'password':'adminPass'
  })
  const show=ref(false);
  const msg=ref('The email or password is null');


   async function doLogin(){
     console.log(!!submit.email);
    if(!submit.email||!submit.password){
      show.value=true;
      msg.value='The email or password is null'
    }else {
      const res=await fetch(`${proxy.$FetchApi.url}/login`,{method:'post',headers:proxy.$FetchApi.headers,body:JSON.stringify(submit)})
      const data=await res.json();
      if (res.status!==200){
        show.value=true;
        msg.value=data.msg
      }else {
        proxy.$FetchApi.setAdmin(data.data)
        localStorage.setItem('admin',JSON.stringify(data.data))
        router.push('/home')
      }
    }
  }
function cancel(){
  show.value=false
}
</script>

<style scoped>

</style>