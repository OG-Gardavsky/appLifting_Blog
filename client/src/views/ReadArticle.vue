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
            <h2>Comments ({{articleComments.length}})</h2>
            <!-- adding comment -->
            <div>

                <div class="form-group">
                    <label class="d-flex" v-if=" newComment.content !== '' ">Your comment</label>
<!--                    <input type="text" class="form-control" v-model="newComment.content" placeholder="Join the discussion" >-->
                    <textarea class="form-control" v-model="newComment.content" placeholder="Join the discussion"
                              :rows="newComment.content === '' ? 1 : 4"/>
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
            <div class="d-flex flex-column comment"
                :key="comment._id" v-for="comment in articleComments">

                <div class="d-flex flex-row">
                    <span class="font-weight-bold">{{comment.author}}</span>
                    <span>{{comment.ts}}</span>
                </div>

                <span>{{comment.content}}</span>


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
                this.resetNewComment();
            }
        },
        resetNewComment() {
            this.newComment.content = '';
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

    .comment {
        margin: 15px 0;

        span {
            padding: 5px;
        }
    }

    input {
        margin: 10px 0;
    }

</style>
