<template>
    <div>
        <Navbar />
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
                        <td>{{article.title}}</td>
                        <td>{{article.perex}}</td>
                        <td>42</td>
                        <td>
                            <div class="d-flex">
                                <i class="far fa-edit actionIcon" />
                                <i class="fas fa-trash actionIcon"></i>
                            </div>
                        </td>
                    </tr>

                </tbody>
            </table>


        </div>

    </div>
</template>

<script>
import Navbar from "@/components/Navbar";
export default {
    name: "Administration",
    components: {Navbar},
    data() {
        return {
            listOfArticles: null
        }
    },
    methods: {
        async getListOfArticles() {
            const res = await this.sendRequest('/articles/my', 'GET', true)

            if (res.status === 200) {
                this.listOfArticles = await res.json();
            }
        }
    },
    created() {
        this.checkCredentials('/');

        this.getListOfArticles();
    }
}
</script>

<style scoped lang="scss">
    td {

    }


</style>
