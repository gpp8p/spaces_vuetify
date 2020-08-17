<template>
    <span>
        <span v-if="this.logStatus===this.NOT_LOGGED" class="notLogged">
            <span>
                 Welcome Guest !
            </span>
            <span>
                <a @click="showLogin">Please Log In</a>
            </span>
        </span>
        <span v-if="this.logStatus===this.SHOW_LOGIN" class="login">

                     <label class="labelStyle" for="email">Mail:</label>
                    <input type="text" id="email" name="email" size="30" v-model="email" ref="emailField" class="loginField"/>

                    <label class="labelStyle" for="password">Password:</label>
                    <input type="password" id="password" size="30" maxlength="65" v-model="password" class="loginField"/>


                     <span class="labelLinkStyle" @click="doLogin">Login </span>
                     <span class="labelLinkStyle" @click="cancelLogin">Cancel</span>


        </span>
        <span v-if="this.logStatus===this.LOGGED_IN" >
            <span v-if="this.credentials.loggedInUser==='GuestUser'" class="loggedIn">
                 <span>
                     Welcome Guest !
                </span>
                <span>
                    <a @click="showLogin">Please Log In</a>
                </span>
            </span>
            <span v-else class="loggedIn">
                 <span>
                     Welcome {{this.credentials.loggedInUser}}
                </span>
                <span>
                    <a @click="doLogout">Log Out</a>
                </span>
            </span>
        </span>
        <span v-if="this.logStatus===this.LOGIN_ERROR" class="loggedIn">
                 <span>
                     Sorry - That Login Failed
                </span>
                <span>
                    <a @click="showLogin">Try Again</a>
                </span>
        </span>
    </span>
</template>

<script>
    import axios from "axios";
    import store from "../store";
    export default {
        name: "loginComponent",
        created(){
            this.showLoginFields=false;
        },
        mounted(){
            if(sessionStorage.length>0) {
                this.credentials.bearerToken = sessionStorage.getItem('bearerToken');
                this.credentials.loggedInUser = sessionStorage.getItem('loggedInUser');
                this.credentials.loggedInUserId = sessionStorage.getItem('loggedInUserId');
                this.credentials.is_admin = sessionStorage.getItem('is_admin');
                this.default_org = sessionStorage.getItem('default_org');

                store.commit('setBearerToken', this.credentials.bearerToken);
                store.commit('setLoggedInUserId', this.credentials.loggedInUserId);
                store.commit('setLoggedInUser', this.credentials.loggedInUser);
                store.commit('setIsAdmin', this.credentials.is_admin);
                store.commit('setDefaultOrg', this.default_org);

            }else{
                this.sendLogin('GuestUser@nomail.com', 'GuestUser', this.setLoginStatus);
            }
//            console.log(this.$store.getters.getDefaultOrg[0]);
        },
        data(){
            return {
                logStatus: 0,
                NOT_LOGGED:0,
                SHOW_LOGIN:1,
                LOGGED_IN:2,
                LOGIN_ERROR:-1,
                showLoginFields:false,
                email:'',
                password:'',
                credentials:{
                    bearerToken: '',
                    loggedInUserId: '',
                    loggedInUser: '',
                    is_admin: 0
                },
            }
        },
        methods:{
            doLogin(){

                this.sendLogin(this.email, this.password, this.setLoginStatus);
            },
            showLogin(){
                this.setLoginStatus(this.SHOW_LOGIN);
            },
            cancelLogin(){
                this.setLoginStatus(this.LOGGED_IN);
            },
            doLogout(){
                this.sendLogin('GuestUser@nomail.com', 'GuestUser', this.setLoginStatus);
            },
            setLoginStatus(newStatus){
//                debugger;
               if(newStatus<0){
                   this.email='';
                   this.password='';
               }
               this.logStatus=newStatus;
                this.$forceUpdate();
            },
            sendLogin(email, password, setStatus){
                debugger;
                axios.post('http://localhost:8000/api/auth/login?XDEBUG_SESSION_START=15022', {
                    email: email,
                    password: password,
                    default_org: this.$store.getters.getDefaultOrg[0]
                }).then(response=>
                {
                    this.credentials.bearerToken = response.data.access_token;
                    this.credentials.loggedInUser = response.data.userName;
                    this.credentials.loggedInUserId = response.data.userId;
                    this.credentials.is_admin = response.data.is_admin;

                    store.commit('setOrgId', response.data.orgId);
                    store.commit('setOrgHome', response.data.orgHome);


                    console.log('login successful');
                    console.log(response.data);
                    setStatus(this.LOGGED_IN);


                }).catch(function(error) {
//                    debugger;
                    console.log(error);
                    setStatus(-1);
                });
            },
        }
    }
</script>

<style scoped>
    .loggedIn {
        display: grid;
        grid-template-columns: 100%;
        grid-template-rows: 50% 50%;
        color: blue;
        font-size: smaller;

    }
    .notLogged {
        display: grid;
        grid-template-columns: 100%;
        grid-template-rows: 50% 50%;
        justify-items: center;
        color: blue;
        font-size: smaller;
    }
    .login {
        margin-top: 5px;
        display: grid;
        grid-template-columns: 22% 60%;
        grid-template-rows: 33% 33% 33%;
        row-gap: 3px;
        justify-items: left;
        color: blue;
        font-size: 12px;
    }
    .labelStyle {
        color:blue;
        font-family: Arial;

    }

    .labelLinkStyle {
        color:blue;
        font-family: Arial;
        margin-right: 15px;
    }
    .labelLinkStyle:hover {
        color:red;
        font-weight: bold;
    }
    .loginField {
        background-color: #dbddd0;
    }



</style>
