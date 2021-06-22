<template>
    <div>
        <Navbar />

        <form>
            <div class="col">

                <h1 >Log in</h1>

                <div class="form-group">
                    <label class="d-flex">Email</label>
                    <input type="text" class="form-control" id="email" placeholder="me@example.com" >
                </div>

                <div class="form-group">
                    <label class="d-flex">Password</label>
                    <input type="password" class="form-control" placeholder="***********" >
                    <button type="submit" class="btn btn-primary d-flex" >Log in</button>
                </div>

            </div>
        </form>

    </div>
</template>

<script>
import Navbar from "@/components/Navbar";
export default {
    name: "Login",
    components: {Navbar}
}
</script>

<style scoped lang="scss">
    .form-group {
        max-width: 40%;
        margin: 15px auto;
    }

    button {
        margin: 10px 0;
    }
</style>
