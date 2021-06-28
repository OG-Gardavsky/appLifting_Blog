<template>
    <span class="d-flex text-secondary date">
        <span>{{ name }}</span>
        <span>•</span>
        <span>{{ date }}</span>
    </span>
</template>

<script>
export default {
    name: "AuthorDate",
    props: {
        name: String,
        date: String
    }
}
</script>

<style scoped lang="scss">

    .date  {
        span {
            margin-right: 10px;
        }
    }

</style>
