<template>
  <div class="container max-w-3xl mx-auto">
    <Header></Header>
    <section class="add-location pb-5 mb-8">
      <div class="mt-10">
        <h1 class="text-xl font-bold mb-4 text-center">Add New Route</h1>
        <div class="form-control align-center flex items-center mb-3">
          <label for="to" class="basis-32 text-right">From</label>
          <select name="from" id="from" class="border rounded p-2 ml-4 flex-1" v-model="json.from_city_id" @change="isDistance">
            <option v-for="item in cities" :key="item.id" :value="item.id" :selected="json.from_city_id===item.id">{{item.name}}</option>
          </select>
        </div>
        <div class="form-control align-center flex items-center mb-3">
          <label for="to" class="basis-32 text-right">To</label>
          <select name="to" id="to" class="border rounded p-2 ml-4 flex-1" v-model="json.to_city_id" @change="isDistance">
            <option v-for="item in cities" :key="item.id" :value="item.id" :selected="json.to_city_id===item.id">{{item.name}}</option>
          </select>
        </div>
        <div class="form-control align-center flex items-center mb-3">
          <label for="shuttle_type" class="basis-32 text-right">Shuttle Type</label>
          <select name="shuttle_type" id="shuttle_type" class="border rounded p-2 ml-4 flex-1" v-model="json.shuttle_type_id">
            <option v-for="item in shuttle" :key="item.id" :value="item.id" :selected="json.shuttle_type_id===item.id" >{{item.name}}</option>
          </select>
        </div>
        <div class="form-control align-center flex items-center mb-3">
          <label for="price" class="basis-32 text-right">Price</label>
          <input type="number" name="price" id="price" class="border rounded p-2 ml-4 flex-1" v-model="json.price">
        </div>
        <div class="form-control align-center flex items-center mb-3">
          <label for="departure_time" class="basis-32 text-right">Departure Time</label>
          <input type="text" name="departure_time" id="departure_time" class="border rounded p-2 ml-4 flex-1" placeholder="00:00:00" v-model="json.departure_time">
        </div>
        <div class="form-control align-center flex items-center mb-3">
          <label for="duration" class="basis-32 text-right">Duration</label>
          <input type="number" name="duration" id="duration" class="border rounded p-2 ml-4 flex-1" v-model="json.duration">
        </div>
        <div class="form-control align-center flex items-center mb-3" v-if="showDistance">
          <label for="distance" class="basis-32 text-right">Distance</label>
          <input type="number" name="distance" id="distance" class="border rounded p-2 ml-4 flex-1" v-model="json.distance">
        </div>
        <div class="form-control justify-center flex items-center mt-8 gap-8">
          <input type="submit" value="Submit" class="border rounded py-2 px-8 hover:bg-blue-500 hover:text-gray-100 cursor-pointer" @click="submit">
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
import Header from "../components/Header.vue"
import {getCurrentInstance, onMounted, ref,reactive} from "vue";
const {proxy}=getCurrentInstance();
const cities=ref([]);
const shuttle=ref([]);
const show=ref(false);
const isSuccess=ref(false);
const msg=ref('Format error');
const showDistance=ref(true);
const json=reactive(
    {
      "from_city_id":'',
      "to_city_id":'',
      "shuttle_type_id":'',
      "price":'',
      "departure_time":'',
      "duration":'',
      "distance":''
    }
);
onMounted(()=>{
  getCities()
  getShuttle()
})
async function getCities(){
  let res=await fetch(`${proxy.$FetchApi.url}/cities?token=${proxy.$FetchApi.admin.remember_token}`)
  let data=await res.json();
  if(res.status===200){
    cities.value=data.data;
  }
}
async function getShuttle(){
  let res=await fetch(`${proxy.$FetchApi.url}/shuttle-type?token=${proxy.$FetchApi.admin.remember_token}`)
  let data=await res.json();
  if(res.status===200){
    shuttle.value=data.data;
  }
}
function cancel(){
  show.value=false
}
async function submit(){
  if (json.from_city_id===json.to_city_id||!json.from_city_id||!json.to_city_id||!json.shuttle_type_id||!json.price||!json.duration||!json.distance||!json.departure_time){
    show.value=true;
    msg.value='Format error';
  }else {
    const res=await fetch(`${proxy.$FetchApi.url}/routes?token=${proxy.$FetchApi.admin.remember_token}`,{method:'post',headers:proxy.$FetchApi.headers,body:JSON.stringify(json)})
    const data=await res.json();
    if (res.status!==200){
      if (res.status===420){
          json.departure_time='';
      }else if(res.status===421){
          json.distance='';
      }
      show.value=true;
      msg.value=data.msg
    }else {
      show.value=true;
      msg.value=data.msg;
      isSuccess.value=true;
    }
  }

}
async function isDistance(){
  if (json.from_city_id===json.to_city_id){
    json.from_city_id='';
    json.to_city_id='';
  }
  if (json.from_city_id&&json.to_city_id){

    const res=await fetch(`${proxy.$FetchApi.url}/isDistance?token=${proxy.$FetchApi.admin.remember_token}&from_city_id=${json.from_city_id}&to_city_id=${json.to_city_id}`)
    const data=await res.json();
    if (res.status===200){
      showDistance.value=data.isDistance
      json.distance=1;
    }
  }
}
</script >

<style scoped>

</style>