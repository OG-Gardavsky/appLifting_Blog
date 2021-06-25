<template>
    <div>
        <Navbar />

        <form class="card">
            <div class="col">

                <h1 class="d-flex">Log in</h1>

                <div class="form-group">
                    <label class="d-flex">Email</label>
                    <input type="email" class="form-control" v-model="email" placeholder="me@example.com" >
                </div>
                <div class="form-group">
                    <label class="d-flex">Password</label>
                    <input type="password" class="form-control" v-model="password" placeholder="***********" >
                </div>

                <!--      login button          -->
                <div class="d-flex flex-xl-row-reverse">
                    <button type="submit" class="btn btn-primary" @click="login">Log in</button>
                </div>

                <!--       error area         -->
                <div class="alert alert-danger" v-if="genericError.display">
                    <div class="card-body">{{genericError.text}}</div>
                </div>

            </div>
        </form>



    </div>
</template>

<script>
import Navbar from "@/components/Navbar";
export default {
    name: "Login",
    components: {
        Navbar
    },
    data() {
        return {
            genericError: {
                display: false,
                text: null
            },
            email: null,
            password: null
        }
    },
    methods: {
        login() {
            this.sendRequest('users/login', 'POST', false, {neco: 'neco'})
        }
    }
}
</script>

<style scoped lang="scss">

    form {
        max-width: 40%;
        margin: 30px auto;

        .col {
            padding: 15px;
        }
    }

    .form-group {
        margin: 15px 0;
    }

    button {
        margin: 10px 0;
    }
</style>
