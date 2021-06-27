<template>
    <div>
        <Navbar />

        <div class="main">

            <h1>{{articleDetails.title}}</h1>

            <img class="img-fluid" src="../assets/general_cat_image.jpg">



            <vue-markdown :source="articleDetails.content" />



        </div>


    </div>
</template>

<script>
import Navbar from "@/components/Navbar";
import VueMarkdown from 'vue-markdown';
export default {
    name: "ReadArticle",
    components: {
        Navbar,
        VueMarkdown
    },
    data() {
        return {
            articleDetails: null,
        }
    },
    methods: {
        async getArticleDetails(articleId) {
            const res = await this.sendHttpRequest(`/articles/id:${articleId}`, 'GET', false);

            if (res.status === 200) {
                this.articleDetails = await res.json();
            }
        }
    },
    created() {

        this.getArticleDetails(this.$route.query.id);

    }

}
</script>

<style scoped>

</style>
