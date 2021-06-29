<template>
    <div>
        <Navbar :authenticated="authenticatedGlobal"/>
        <div class="main">
            <div class="adminHeadline">
                <h1>My articles</h1>

                <router-link to="/createArticle" >
                    <button class="btn btn-primary">Create new Article</button>
                </router-link>
            </div>


            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">Article title</th>
                        <th scope="col">Perex</th>
                        <th scope="col"># of comments</th>
                        <th scope="col">actions</th>
                    </tr>
                </thead>

                <tbody>
                    <tr :key="article._id" v-for="article in listOfArticles">
                        <!--solve max length title + perex-->
                        <td>{{article.title}}</td>
                        <td>{{article.perex}}</td>
                        <td>{{article.countOfComments}}</td>
                        <td>
                            <div class="d-flex">
                                <span  class="btn" @click="goEditArticle(article._id)">
                                    <i class="far fa-edit actionIcon"/>
                                </span>

                                <button type="button" class="btn" data-toggle="modal" data-target="#exampleModal"
                                    @click="articleToDelete = article"
                                >
                                    <i class="fas fa-trash actionIcon" />
                                </button>

                            </div>
                        </td>
                    </tr>

                </tbody>
            </table>


            <!-- modal -->
            <div class="modal fade" id="exampleModal" role="dialog" v-if="articleToDelete !== null">

                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            Are you sure you want to delete article '{{articleToDelete.title}}'?
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-danger" data-dismiss="modal" @click="deleteArticle(articleToDelete._id)">delete</button>
                        </div>
                    </div>

                </div>
            </div>


        </div>

    </div>
</template>

<script>
import Navbar from "@/components/Navbar";
import router from "@/router";
export default {
    name: "Administration",
    components: {Navbar},
    data() {
        return {
            articleToDelete: null,
            listOfArticles: null
        }
    },
    methods: {
        async getListOfArticles() {
            const res = await this.sendHttpRequest('/articles/my', 'GET', true)

            if (res.status === 200) {
                this.listOfArticles = await res.json();
            }
        },
        goEditArticle(articleId) {
            router.push(`/editArticle?id=${articleId}`);
        },
        async deleteArticle(articleId) {

            const res = await this.sendHttpRequest(`/articles/id:${articleId}`, 'DELETE', true);

            if (res.status === 200) {
                await this.getListOfArticles();
            }

            // this.articleToDelete = null;


        }
    },
    async created() {
        await this.checkCredentials('/');

        if (this.authenticatedGlobal) {
            await this.getListOfArticles();
        }

    }
}
</script>

<style scoped lang="scss">
    td {

    }


</style>
