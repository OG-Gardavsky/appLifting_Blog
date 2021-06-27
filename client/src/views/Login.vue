<template>
    <div>
        <Navbar />

        <form class="card">
            <div class="col">

                <h1 class="d-flex">Log in</h1>

                <!--       email         -->
                <div class="form-group">
                    <label class="d-flex">Email</label>
                    <input type="text" class="form-control" v-model="email" placeholder="me@example.com" />
<!--                    TODO -->
<!--                    <div class="invalid-feedback"></div>-->
                </div>

                <div class="form-group">
                    <label class="d-flex">Password</label>
                    <input type="password" class="form-control" v-model="password" placeholder="***********" />
                </div>

                <!--      login button  + link to sign up        -->
                <div class="d-flex flex-row-reverse justify-content-between">
                    <button type="submit" class="btn btn-primary" @click="login">Log in</button>
                    <router-link to="/signup">
                        <button class="btn btn-secondary">Sign up</button>
                    </router-link>
                </div>

                <generic-error :display="genericError.display" :text="genericError.text" />

            </div>
        </form>



    </div>
</template>

<script>
import Navbar from "@/components/Navbar";
import router from "@/router";
import GenericError from "@/components/GenericError";
export default {
    name: "Login",
    components: {
        GenericError,
        Navbar
    },
    data() {
        return {
            email: null,
            password: null
        }
    },
    methods: {
        async login() {
            if (this.email === null || this.password === null) {
                return this.setGenericError(this.genericError, true, 'Please fill both email and password');
            }

            const body = {
                email: this.email,
                password: this.password
            };

            const res = await this.sendRequest('users/login', 'POST', false, body);

            let responseBody;
            if (res.status === 200) {
                responseBody = await res.json();
                localStorage.setItem('userToken', responseBody.token);
                return router.push('/administration');
            }

            try {
                responseBody = await res.json();
                if (responseBody.error) {
                    this.setGenericError(this.genericError, true, responseBody.error);
                }
            } catch (e) {
                this.setGenericError(this.genericError, true, 'Unable to login.');
            }


        }
    },
    async created() {
        const authorized = await this.checkCredentials();

        if (authorized) {
            await router.push('/administration');
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
