<template>
  <div class="container max-w-3xl mx-auto">
    <Header></Header>
    <section class="my-bookings w-{100%}">
      <h1 class="text-xl mt-8 mb-3 text-center font-bold">Bookings</h1>
      <table class="mx-auto border">
        <thead>
        <tr class="border">
          <th class="border text-center">Booking No</th>
          <th class="border p-3">Booking Date</th>
          <th class="border p-3">From</th>
          <th class="border p-3">To</th>
          <th class="border p-3">Departure Time</th>
          <th class="border text-center">Seats</th>
          <th class="border p-3">Status</th>
          <th class="border p-3">Seat No</th>
          <th class="border p-3">User</th>
          <th class="border p-3"></th>
        </tr>
        </thead>
        <tbody>
        <tr class="border p-2" v-for="item in list" :key="item.id">
          <td class="border text-center">{{item.id}}</td>
          <td class="border p-3">{{item.booking_date}}</td>
          <td class="border p-3">{{item.from_city}}</td>
          <td class="border p-3">{{item.to_city}}</td>
          <td class="border p-3">{{item.departure_date }}</td>
          <td class="border text-center">{{item.no_of_seats}}</td>
          <td class="border p-3">{{item.status}}</td>
          <td class="border p-3">
            <span v-for="value in item.seat_on" :key="value.seat_no">No.{{value.seat_no}}<br/></span>
          </td>
          <td class="border p-3">{{item.user}}</td>
          <td class="border p-3 ">

            <a v-if="item.status==='PENDING'||item.status==='PAID'"  @click.prevent="cancel(item.id)" href="#" class="self-center border border-red-500 hover:bg-red-500 hover:text-white px-4 py-2 rounded-lg cursor-pointer">Cancel</a>
          </td>
        </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<script setup>
import Header from "../components/Header.vue"
import {getCurrentInstance, onMounted, ref} from "vue";
const {proxy}=getCurrentInstance();
const list=ref([]);
onMounted(()=>{
  getData();
})
async function getData(){
  let res=await fetch(`${proxy.$FetchApi.url}/bookings?token=${proxy.$FetchApi.admin.remember_token}`);
  let data=await res.json();
  if (res.status===200){
    list.value=data.data
    console.log(data.data[0]);
  }
}
async function cancel(id){
  let res=await fetch(`${proxy.$FetchApi.url}/bookings/${id}?token=${proxy.$FetchApi.admin.remember_token}`);
  if (res.status===200){
   this.getData();
  }
}

</script>

<style scoped>

</style>