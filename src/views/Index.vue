<template>
  <div class="container max-w-4xl mx-auto">
    <Header></Header>

    <section class="search mb-8">
      <div class="mt-10">
        <div class="mb-4 flex content-center justify-between ">
          <h1 class="text-xl font-bold">Search for Routes</h1>
          <div>
            <a @click.prevent="$router.push('/addLocation')" href="#" class="ml-3 hover:bg-blue-500 hover:text-white border border-blue-500 p-2 rounded-lg">Add New Location</a>
            <a @click.prevent="$router.push('/addRoute')" href="#" class="ml-3 hover:bg-blue-500 hover:text-white border border-blue-500 p-2 rounded-lg">Add New Route</a>
          </div>
        </div>
        <div class="flex">
          <input v-model="search.from" type="text"  list="cities" placeholder="From" class="border-2 border-gray-300 p-1 rounded-lg">
          <input v-model="search.to" type="text" list="cities" placeholder="To" class="ml-3 border-2 border-gray-300 p-1 rounded-lg">
          <input v-model="search.date" type="date" placeholder="Departure date" class="ml-3 border-2 border-gray-300 p-1 rounded-lg">
          <button class="ml-3 hover:bg-blue-500 hover:text-white border border-blue-500 p-2 rounded-lg" @click.prevent="searchList" >Search</button>
          <datalist id="cities">
            <option  v-for="item in cities" :key="item.id" :value="item.name" ></option>
          </datalist>
        </div>
      </div>
    </section>
    <section class="bus-info">
      <div class="router flex justify-between mt-{5em} border-t-2 py-5 relative" v-for="item in list" :key="item.id">
        <p v-if="item.valid_to" class="text-xs absolute top-0 left-0 text-white bg-[red] px-[5px] py-[2px] rounded-[4px]">Cancel</p>
        <div class="flex flex-col">
          <span>{{item.from_city}}</span>
          <span class="text-sm text-gray-400">Departure time: {{item.departure_time}}</span>
        </div>
        <div class="flex flex-col items-center">
          <span class="text-gray-400 text-sm">Seat available: {{item.seat_available}}/{{item.capacity}}</span>
          <span class="">--------------------------&gt;</span>
          <span class="text-gray-400 text-sm">{{item.distance}} km  ${{item.price}}</span>
        </div>
        <div class="fl ex flex-col">
          <span>{{item.to_city}}</span>
          <br/>
          <span class="text-sm text-gray-400">Arrival time: {{item.arrival_time}}</span>
        </div>
        <a @click.prevent="startRoute(item.id)" v-if="item.valid_to" href="#" class="self-center border border-blue-500 hover:bg-blue-500 hover:text-white px-4 py-2 rounded-lg cursor-pointer">Start</a>
        <a @click.prevent="cancelRoute(item.id)" v-else href="#" class="self-center border border-red-500 hover:bg-red-500 hover:text-white px-4 py-2 rounded-lg cursor-pointer" >Cancel</a>
      </div>
    </section>
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
import {getCurrentInstance, onMounted, ref,reactive} from 'vue';
  import Header from "../components/Header.vue"
  const {proxy}=getCurrentInstance();
  const list=ref([]);
  const cities=ref([]);
  const show=ref(false);
  const search=reactive({
    from:'',
    to:'',
    date:''
  });
  const msg=ref('Format Error')
  onMounted( ()=>{
    getData(search);
    getCities();
  })
  async function getData(search){
    let res=await fetch(`${proxy.$FetchApi.url}/routes?token=${proxy.$FetchApi.admin.remember_token}&from_city=${search.from}&to_city=${search.to}&date=${search.date}`)
    let data=await res.json();
    if(res.status===200){
        list.value=data.data;
    }
  }
async function getCities(){
  let res=await fetch(`${proxy.$FetchApi.url}/cities?token=${proxy.$FetchApi.admin.remember_token}`)
  let data=await res.json();
  if(res.status===200){
    cities.value=data.data;
  }
}
function searchList(){
    if (!search.from||!search.to||!search.date){
        show.value=true
    }
  getData(search);
}
function cancel(){
  show.value=false
}
  async function cancelRoute(id){
    let res=await fetch(`${proxy.$FetchApi.url}/cancelRoute/${id}?token=${proxy.$FetchApi.admin.remember_token}`)
    if(res.status===200){
      getData(search);
    }
  }
async function startRoute(id){
  let res=await fetch(`${proxy.$FetchApi.url}/startRoute/${id}?token=${proxy.$FetchApi.admin.remember_token}`)
  if(res.status===200){
    getData(search);
  }
}
</script>

<style scoped>

</style>