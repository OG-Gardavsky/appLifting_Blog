<template>
    <div>
        <Navbar :authenticated="authenticatedGlobal"/>

        <div class="main" v-if="articleDetails !== null && articleComments !== null">

            <!-- main article -->
            <h1>{{articleDetails.title}}</h1>
            <author-date :name="articleDetails.authorName" :date="parseDate(articleDetails.ts)" />
            <img class="img-fluid" src="../assets/general_cat_image.jpg" alt="general cat">
            <vue-markdown :source="articleDetails.content" />
            <hr/>

            <!-- comment section -->
            <h2>Comments ({{articleComments.length}})</h2>
            <!-- adding comment -->
            <div>

                <div class="form-group">
                    <label class="d-flex" for="newCommentContent" v-if=" newComment.content !== '' ">Your comment</label>
                    <textarea id="newCommentContent" class="form-control" v-model="newComment.content" placeholder="Join the discussion"
                              :rows="newComment.content === '' ? 1 : 4"/>
                </div>

                <div v-if=" newComment.content !== '' ">

                    <div class="form-group">
                        <label for="newCommentAuthor" class="d-flex">Your name</label>
                        <input id="newCommentAuthor" type="text" class="form-control" v-model="newComment.author" placeholder="Your name" >

                    </div>

                    <generic-error :display="genericError.display" :text="genericError.text" />

                    <button class="btn btn-secondary" type="button" @click="createComment()">send comment</button>

                </div>

            </div>



            <!-- displaying comments -->
            <div class="d-flex flex-column comment"
                :key="comment._id" v-for="comment in articleComments">

                <div class="d-flex flex-row" >
                    <span class="font-weight-bold">{{comment.author}}</span>
                    <span style="padding: 0 10px">{{parseDate(comment.ts, true)}}</span>
                </div>

                <span>{{comment.content}}</span>

                <span class="voting">
                    <span>

                        <span v-if="comment.sumOfVotes !== null">
                            <span v-if="comment.sumOfVotes > 1">+</span>
                           {{comment.sumOfVotes}}
                        </span>

                        <span v-if="comment.sumOfVotes === undefined">0</span>
                    </span>
                    <i class="fas fa-chevron-up btn" @click="giveVoteToComment(comment._id, 1)"/>
                    <i class="fas fa-chevron-down btn" @click="giveVoteToComment(comment._id, -1)" />
                </span>
            </div>


        </div>

    </div>
</template>

<script>
import Navbar from "@/components/Navbar";
import VueMarkdown from 'vue-markdown';
import GenericError from "@/components/GenericError";
import AuthorDate from "@/components/AuthorDate";
export default {
    name: "ReadArticle",
    components: {
        AuthorDate,
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
                author: ''
            }
        }
    },
    methods: {
        parseDate (dateToParse, time = false) {
            const date = new Date(dateToParse);
            let dateString = `${date.getDate()}.${(date.getMonth() + 1)}.${date.getFullYear()}`;

            if (time) {
                dateString += ` ${date.getHours()}:${date.getMinutes()}`;
            }

            return dateString
        },
        async getArticleDetails(articleId) {
            const res = await this.sendHttpRequest(`/articles/id:${articleId}`, 'GET', false);

            if (res.status === 200) {
                this.articleDetails = await res.json();
            }
        },
        async createComment() {

            if ([this.newComment.content, this.newComment.author].includes('')) {
                return this.setGenericError(this.genericError, true, 'Please fill both your name and text of your comment');
            }

            this.newComment.articleId = this.articleId;
            const res = await this.sendHttpRequest(`/comments`, 'POST', false, this.newComment);

            if (res.status === 201) {
                await this.getArticleComments(this.articleId);
            }
        },
        async getArticleComments(articleId) {
            const res = await this.sendHttpRequest(`/comments/articleId:${articleId}`, 'GET', false);

            if (res.status === 200) {
                this.articleComments = await res.json();
                this.resetNewComment();
                this.setGenericError(this.genericError, false, '')
            }
        },
        async giveVoteToComment (commentId, value) {

            const body = {
                commentId,
                value
            };

            const res = await this.sendHttpRequest('/commentVotes', 'POST', true, body);

            if (res.status === 201) {
                await this.getArticleComments(this.articleId);
            }

        },
        resetNewComment() {
            this.newComment.content = '';
        }
    },
    created() {
        this.checkCredentials();

        this.articleId = this.$route.query.id

        this.getArticleDetails(this.articleId);
        this.getArticleComments(this.articleId);

    }

}
</script>

<style scoped lang="scss">

    .comment {
        margin: 15px 0;

        >span {
            padding: 5px;
        }
    }

    input {
        margin: 10px 0;
    }

</style>
