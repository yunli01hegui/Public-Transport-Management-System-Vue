<template>
  <div class="container max-w-3xl mx-auto">
    <Header></Header>
    <section class="add-location pb-5 mb-8">
      <div class="mt-10">
        <h1 class="text-xl font-bold mb-4">Add New Location</h1>
        <div class="form-control align-center flex items-center mb-3">
          <label for="city" class="basis-32 text-right">City Name</label>
          <input type="text" name="name" id="city" class="border rounded p-2 ml-4 flex-1" v-model="json.name">
        </div>
        <div class="form-control justify-center flex items-center mt-8 gap-8">
          <input type="submit" value="Submit" class="border rounded py-2 px-8 hover:bg-blue-500 hover:text-gray-100 cursor-pointer" @click="addCity">
        </div>
      </div>
    </section>
  </div>
  <div v-if="show" class="cover fixed top-0 left-0 grid place-content-center items-center w-[100vw] h-[100vh] bg-[rgba(0,0,0,0.15)]">
    <div class="grid place-content-center w-[400px] h-[200px] p-10 bg-white relative">
      <div class="absolute right-2 top-1 text-[red] cursor-pointer" @click="cancel" >X</div>
      <div class="text-center">
        <div class="text-xl ">{{msg}}</div>
      </div>
      <a v-if="isSuccess" @click.prevent="$router.push('/home')" href="#" class="text-center mt-[30px] self-center border border-blue-500 bg-blue-500 text-white px-4 py-2 rounded-lg cursor-pointer">Confirm</a>
    </div>
  </div>
</template>

<script setup>
import {reactive} from "vue"
import Header from "../components/Header.vue"
import {getCurrentInstance, ref} from "vue";
const json=reactive({
  'name':''
});
const show=ref(false);
const msg=ref('');
const {proxy}=getCurrentInstance();
const isSuccess=ref(false);
async function addCity(){
  if (!json.name){
    msg.value='Format error';
    show.value=true;
  }else {
    const res=await fetch(`${proxy.$FetchApi.url}/cities`,{method:'post',headers:proxy.$FetchApi.headers,body:JSON.stringify(json)})
    const data=await res.json();
    if (res.status!==200){
      msg.value=data.msg
      show.value=true;
    }else {
      msg.value=data.msg
      show.value=true;
      isSuccess.value=true;
    }
  }

}
function cancel(){
  show.value=false
}
</script>

<style scoped>

</style>