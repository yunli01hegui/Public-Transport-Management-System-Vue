export default {
    url:'http://127.0.0.1:8000/api/v1',
    headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
    },
    admin:localStorage.getItem('admin')?JSON.parse(localStorage.getItem('admin')):null,
    setAdmin(admin){
        this.admin=admin;
    }
}