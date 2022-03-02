<template>
    <div class="body">
        <div class="form-align">
     <h1>Register </h1>
     <form @submit.prevent='handleSubmit' class="form-style">
         <input type="text" placeholder="Enter FirstName" v-model="firstName" class="form-control form-control-lg mt-4"  />
         <span v-show="formErrors.firstName" class="errorSpan" >{{formErrors.firstName}} </span>
         <input type="text" placeholder="Enter LastName" v-model="lastName" class="form-control form-control-lg mt-4" />
         <span v-show="formErrors.lastName" class="errorSpan" >{{formErrors.lastName}} </span>
         <input type="email" placeholder="Enter Email" v-model="email" class="form-control form-control-lg mt-4"/>
         <span v-show="formErrors.email" class="errorSpan" >{{formErrors.email}} </span>
         <input type="text" placeholder="Enter UserName" v-model="userName" class="form-control form-control-lg mt-4" />
         <span v-show="formErrors.userName" class="errorSpan" >{{formErrors.userName}} </span>
         <input type="password" placeholder="Enter Password" v-model="password" class="form-control form-control-lg mt-4" />
         <span v-show="formErrors.password" class="errorSpan" >{{formErrors.password}} </span>
         <input type="number" placeholder="Enter Phone" v-model="phone" class="form-control form-control-lg mt-4" />
         <span v-show="formErrors.phone" class="errorSpan" >{{formErrors.phone}} </span>
         <input type="submit" value="Register" class="submit" />
     </form>
        </div>
    </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid';

    export default {
        data(){
            return{
                firstName:'',
                lastName:'',
                email:'',
                userName:'',
                password:'',
                phone:'',
                errors:{},
                formErrors:{}
            }
        },
        methods:{
                
            runValidation(){
                if(this.firstName.trim().length==0){
                    this.errors.firstName="FirstName Required"
                }
                if(this.lastName.trim().length==0){
                    this.errors.lastName="LastName Required"
                }
                 const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                if(!re.test(String(this.email).toLowerCase())){
                    this.errors.email="Invalid Email"
                }
                if(this.email.trim().length==0){
                    this.errors.email="Email Required"
                }
                if(this.userName.trim().length==0){
                    this.errors.userName="UserName Required"
                }
                if(this.password.length<=5 || this.password.length>=10){
                    this.errors.password="Password Should not more than 10 and less than 5"
                }
                if(this.password.trim().length==0){
                    this.errors.password="Password Required"
                }
                if(this.phone.length==0){
                    this.errors.phone="Phone Number Required"
                }
                // if(this.phone.length<10){
                //     this.errors.phone="Invalid Format"
                // }
            },

            handleSubmit(){
                this.formErrors={}
                this.errors={}

                    this.runValidation()

                if(Object.keys(this.errors).length===0){
                    this.formErrors={}
                    const userData={
                    id:uuidv4(),
                    firstName:this.firstName,
                    lastName:this.lastName,
                    email:this.email,
                    userName:this.userName,
                    password:this.password,
                    phone:this.phone
                }
                console.log(userData)
                this.$router.push('/')

                this.firstName='',
                this.lastName='',
                this.email='',
                this.userName='',
                this.password='',
                this.phone=''
                }else{
                    Object.assign(this.formErrors,this.errors)
                }
                
            }
        }
        
    }
</script>

<style lang="css" scoped>
/* .form-style{ */
    /* border: 1px solid black; */
    /* padding: 5px 10px; */
    /* box-shadow: 5px 10px; */
    /* background: whitesmoke; */
    /* border-radius: 30px; */
/* } */
.submit{
    border: 1px solid black;
    padding: 8px;
    width: 200px;
    font-size: 20px;
    margin: 20px;
    border-radius: 25px;
    color: white;
     background-image: linear-gradient(to right,green , yellow);
     /* box-shadow: 5px 5px ; */
}
.body, input{
    text-align: center;
    align-content: center;
}
.body{
    /* background: rgb(166, 166, 230); */
     background-image: linear-gradient(to bottom right, rgb(177, 135, 135), rgb(173, 42, 53));
    height: 800px;
    width: 100%;
}
.form-align{
    width: 600PX;
    height: 100%;
    margin: 0 auto;
    /* background:white;    */
    padding: 0 20px;
    border-radius: 30px;
}
h1{
    font-family:cursive;
    font-weight: 100;
    color:rgba(0, 0, 0, 0.87);
    
}
.errorSpan{
    color: rgb(236, 225, 225);
    font-size: 17px;
    display: block;
}

</style>