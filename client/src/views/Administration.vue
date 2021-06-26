<template>
    <div>
        <Navbar />
        <h1>Admin page</h1>
    </div>
</template>

<script>
import Navbar from "@/components/Navbar";
export default {
    name: "Administration",
    components: {Navbar},
    created() {
        this.checkCredentials('/');
    }
}
</script>

<style scoped>

</style>
