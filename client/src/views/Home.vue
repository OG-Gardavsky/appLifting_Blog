<template>
    <div class="home">
        <Navbar :authenticated="authenticatedGlobal"/>
        <div class="main">
            <h1>Recent articles</h1>
            <generic-error :display="genericError.display" :text="genericError.text" />

            <router-link :to="`/readArticle?id=${article._id}`"
                :key="article._id" v-for="article in listOfArticles"
            >

                <div class="d-flex flex-row article">

                    <img class="rounded img-fluid" src="../assets/general_cat_image_small.jpg" width="250" alt="cat image">

                    <!-- text fields -->
                    <div class="d-flex flex-column">
                        <h3>{{article.title}}</h3>

                        <author-date :date="parseDate(article.ts)" :name="article.authorName"/>

                        <span class="text-justify">{{shortenPerex(article.perex, 300)}}</span>

                        <span class="comments-read">
                            <span class="text-primary">Read whole article</span>
                            <span class="text-secondary">{{article.countOfComments}} comment</span>
                        </span>
                    </div>
                </div>
            </router-link>





        </div>
    </div>
</template>



<script>

import Navbar from "@/components/Navbar";
import GenericError from "@/components/GenericError";
import router from "@/router";
import AuthorDate from "@/components/AuthorDate";
export default {
    name: 'Home',
    components: {
        AuthorDate,
        GenericError,
        Navbar
    },
    data() {
        return {
            listOfArticles: null
        }
    },
    methods: {
        async getListOfArticlesticles() {
            const res = await this.sendHttpRequest('/articles/list', 'GET', false);

            if (res.status === 200) {
                this.listOfArticles = await res.json();
            }
        },
        goViewArticle(articleId) {
            router.push(`readArticle?id=${articleId}`);
        },
        parseDate (dateToParse) {
            let date = new Date(dateToParse);
            return `${date.getDate()}/${(date.getMonth() + 1)}/${date.getFullYear()}`;
        },
    },

    async created() {
        await this.checkCredentials();
        await this.getListOfArticlesticles();
    }
}

</script>

<style scoped lang="scss">
    .main {

        a:hover {
            text-decoration: none;
        }

        .article {
            margin: 30px 0;
            color: #2C3E50;

            img {
                margin-right: 20px;
            }


            .comments-read {
                span {
                    margin: 20px 25px;
                }
            }
        }

    }



</style>
