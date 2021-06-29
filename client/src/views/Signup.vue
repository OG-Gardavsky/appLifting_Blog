<template>
    <div>
        <Navbar :authenticated="authenticatedGlobal"/>

        <form class="main card">

            <h1 class="d-flex">Sign up</h1>

            <div class="form-group">
                <label class="d-flex">Email</label>
                <input type="text" class="form-control" v-model="email" placeholder="me@example.com" />
            </div>

            <div class="form-group">
                <label class="d-flex">Name (nickName at yours articles)</label>
                <input type="text" class="form-control" v-model="name" placeholder="Cat lover 42" />
            </div>

            <div class="form-group">
                <label class="d-flex">Password</label>
                <input type="password" class="form-control" v-model="password" placeholder="***********" />
            </div>
            <div class="form-group">
                <label class="d-flex">Re-type Password</label>
                <input type="password" class="form-control" v-model="passwordCheck" placeholder="***********" />
            </div>

            <!--      login button  + link to sign up        -->
            <div class="d-flex flex-row-reverse justify-content-between">
                <button class="btn btn-primary" @click="signup">Sign up</button>
                <router-link to="/login">
                    <button type="submit" class="btn btn-secondary">Log in</button>
                </router-link>
            </div>


            <!--       error area         -->
            <div class="alert alert-danger" v-if="genericError.display">
                <div class="card-body">{{genericError.text}}</div>
            </div>



        </form>

    </div>
</template>

<script>
import Navbar from "@/components/Navbar";
import router from "@/router";
export default {
name: "Signup",
    components: {Navbar},
    data() {
        return {
            genericError: {
                display: false,
                text: null
            },
            email: null,
            name: null,
            password: null,
            passwordCheck: null
        }
    },
    methods: {
        async signup() {

            if ([this.email, this.name, this.password, this.passwordCheck].includes(null)) {
                return this.setGenericError(this.genericError, true, 'Plase fill all fields');
            }

            const body = {
                email: this.email,
                name: this.name,
                password: this.password,
            };

            const res = await this.sendHttpRequest('/users', 'POST', false, body);

            let responseBody;
            if (res.status === 201) {
                responseBody = await res.json();
                localStorage.setItem('userToken', responseBody.token);
                return router.push('/administration');
            }

            try {
                responseBody = await res.json();
                if (responseBody.error) {
                    this.setGenericError(this.genericError, true, responseBody.error);
                } else if (responseBody.errors) {
                    this.setGenericError(this.genericError, true, responseBody.errors);
                }

            } catch (e) {
                this.setGenericError(this.genericError, true, 'Unable to login.');
            }

        }
    },
    created() {
        this.checkCredentials();
    }
}
</script>

<style scoped lang="scss">

    form {
        padding: 15px;
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
