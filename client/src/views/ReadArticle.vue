<template>
    <div>
        <Navbar />

        <div class="main">

            <h1>{{articleDetails.title}}</h1>
            <img class="img-fluid" src="../assets/general_cat_image.jpg">
            <vue-markdown :source="articleDetails.content" />
            <hr/>

            <h2>Comments (4)</h2>

            <div class="input-group mb-3">
                <input type="text" class="form-control" v-model="newComment" placeholder="Join the discussion" >
                <div class="input-group-append" v-if="newComment !== ''">
                    <button class="btn btn-outline-secondary" type="button">send comment</button>
                </div>
            </div>



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
            newComment: ''
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
