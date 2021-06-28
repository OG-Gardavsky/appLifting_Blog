<template>
    <div>
        <Navbar />

        <div class="main">

            <!-- main article -->
            <h1>{{articleDetails.title}}</h1>
            <img class="img-fluid" src="../assets/general_cat_image.jpg">
            <vue-markdown :source="articleDetails.content" />
            <hr/>

            <!-- comment section -->
            <h2>Comments (4)</h2>

            <!-- adding comment -->
            <div>

                <div class="form-group">
                    <label class="d-flex" v-if=" newComment.content !== '' ">Your comment</label>
                    <input type="text" class="form-control" v-model="newComment.content" placeholder="Join the discussion" >
                </div>

                <div v-if=" newComment.content !== '' ">

                    <div class="form-group">
                        <label class="d-flex">Your name</label>
                        <input type="text" class="form-control" v-model="newComment.author" placeholder="Your name" >
                    </div>

                    <button class="btn btn-secondary" type="button" @click="createComment()">send comment</button>

                </div>

            </div>

            <generic-error :display="genericError.display" :text="genericError.text" />

            <!-- displaying comments -->
            <div
                :key="comment._id" v-for="comment in articleComments"
            >
                <p> {{comment.content}}  {{comment.author}} </p>

            </div>


        </div>

    </div>
</template>

<script>
import Navbar from "@/components/Navbar";
import VueMarkdown from 'vue-markdown';
import GenericError from "@/components/GenericError";
export default {
    name: "ReadArticle",
    components: {
        GenericError,
        Navbar,
        VueMarkdown
    },
    data() {
        return {
            articleId: null,
            articleDetails: null,
            articleComments: null,
            newComment: {
                content: '',
                author: null
            }
        }
    },
    methods: {
        async getArticleDetails(articleId) {
            const res = await this.sendHttpRequest(`/articles/id:${articleId}`, 'GET', false);

            if (res.status === 200) {
                this.articleDetails = await res.json();
            }
        },
        async createComment() {

            if ([this.newComment.content, this.newComment.author].includes(null)) {
                return this.setGenericError(this.genericError, true, 'Please fill both your name and text of your comment');
            }

            this.newComment.articleId = this.articleId;
            const res = await this.sendHttpRequest(`comments`, 'POST', false, this.newComment);

            if (res.status === 201) {
                await this.getArticleComments(this.articleId);
            }
        },
        async getArticleComments(articleId) {
            const res = await this.sendHttpRequest(`/comments/articleId:${articleId}`, 'GET', false);

            if (res.status === 200) {
                this.articleComments = await res.json();
            }
        }
    },
    created() {
        this.articleId = this.$route.query.id

        this.getArticleDetails(this.articleId);
        this.getArticleComments(this.articleId);

    }

}
</script>

<style scoped lang="scss">

    input {
        margin: 10px 0;
    }

</style>
