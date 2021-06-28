<template>
    <div class="alert alert-danger" v-if="display">
        <div class="card-body">{{text}}</div>
    </div>
</template>

<script>
export default {
    name: "GenericError",
    props: {
        display: Boolean,
        text: String
    }
}
</script>

<style scoped>

</style>
