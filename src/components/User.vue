<template>
    <div>
        <h1>{{ msg }}</h1>
        <ul>
            <li v-for="user in users" v-bind:key="user.id">
                {{ user.username }} : {{ user.email }} 
                <button v-on:click="editUser(user)"> edit </button>
                <button v-on:click="deleteUser(user)"> hapus </button>
            </li>
        </ul>

        <br />
        <button v-on:click="showAdd">Lihat Form Tambah data </button>
        <br />
        <br />
            
        <form id="addUser" v-show="addForm" v-on:submit.prevent="addUser">
        
            <label> Username </label>
            <input type="text" v-model="newUser.username" placeholder="username">
            <br />
            <small v-if="validation.username!=''"> {{ validation.username }} </small>
            <br />
            <br />
            <label> Email </label>
            <input type="text" v-model="newUser.email" placeholder="email">
            <br />
            <small v-if="validation.email!=''"> {{ validation.email }} </small>
            <br />
            <br />
            <label> Password </label>
            <input type="password" v-model="newUser.password" placeholder="password">
            <br />
            <small v-if="validation.password!=''"> {{ validation.password }} </small>
            <br />
            <br />
            <input type="submit" value="Simpan">
       
        </form>

        <form id="updateUser" v-show="updateForm" v-on:submit.prevent="updateUser(newUser)">
            <label> Username </label>
            <input type="hidden" v-model="newUser.id">
            <input type="text" v-model="newUser.username" placeholder="username">
            <br />
            <br />
            <label> Email </label>
            <input type="text" v-model="newUser.email" placeholder="email">
            <br />
            <br />
            <input type="submit" value="Update">
        </form>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: 'User',
        data () {
            return {
                msg: 'List User',
                validation : {
                    username: "",
                    email   : "",
                    password: "",
                },
                newUser :{},
                users: [],
                addForm:false,
                updateForm:false, 
            }
        },
        methods: {
          
            showAdd: function(){
                this.addForm            = !this.addForm;
                this.updateForm         = false;
                this.newUser.username   = "";
                this.newUser.email      = "";
                this.newUser.password   = "";
            },

            addUser: function(){
                
                //Mengubah validasi jadi kosong
                this.validation.username ="";
                this.validation.email    ="";
                this.validation.password ="";


                axios
                    .post('http://127.0.0.1:3333/api/user', {
                        username: this.newUser.username,
                        email   : this.newUser.email,
                        password: this.newUser.password
                    })
                    .then((response) =>{
                        if(response.data.message=="Successfully created"){
                            this.users.push(response.data.data)
                            this.newUser.username = "";
                            this.newUser.email    = "";
                            this.newUser.password ="";

                                           
                        }
                        else{
                            let validation = response.data
                            let valid="";
                            if(valid = validation.find(x => x.field=="username")){
                                this.$set(this.validation, "username", valid.message)
                            }
                            
                            if(valid = validation.find(x => x.field=="email")){
                                this.$set(this.validation, "email", valid.message)
                            }

                            if(valid = validation.find(x => x.field=="password")){
                                this.$set(this.validation, "password", valid.message)
                            }
                            
                            //console.log(this.validation);
                        }
     
                    })
                    .catch((e) => {
                        console.log(e)
                    });
   
            },

            editUser: function(user){
                this.addForm        = false;
                this.updateForm     = true;
                this.newUser        = user
                this.newUser.index  = this.users.indexOf(user);
                //console.log(this.newUser);
            },

            updateUser: function(newUser, e){
                axios
                    .put('http://127.0.0.1:3333/api/user/'+ newUser.id,  {
                        username: newUser.username,
                        email   : newUser.email
                    })
                    .then((response, e) =>{
                        console.log(response.data.message)
                        if(response.data.message == "Successfully updated"){
                            this.users.$set(newUser.index, newUser);
                            e.preventDefault();  
                        }
                       
                    })
                    .catch((e) => {
                        console.log(e)
                    });

                  
            },

            deleteUser: function(user){
                axios
                    .delete('http://127.0.0.1:3333/api/user/'+ user.id)
                    .then((response) =>{
                        console.log(user.id)
                        if(response.data.message == "Data Successfully deleted"){
                            this.users.splice(this.users.indexOf(user),1);
                        }
                    });
                    
               
               
            }
        },
        created: function(e) {
           axios
                .get('http://127.0.0.1:3333/api/user')
                .then((response) =>{
                    //console.log(response)
                    this.users = response.data.data
                })
                .catch((e) => {
                    console.log(e)
                });
        }
        
        
    }

    /*var show = new Vue({
        el:'#showAdd',
        
         
    })*/
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h1, h2 {
        font-weight: normal;
    }
    ul {
        list-style-type: none;
        padding: 0;
    }
    li {
        display: block;
        margin: 0 10px;
    }
    a {
        color: #42b983;
    }
    small {
        color:red;
    }
</style>
