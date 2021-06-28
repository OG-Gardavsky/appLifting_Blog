<template>
    <div class="home">
        <Navbar />
        <div class="main">
            <h1>Recent articles</h1>
            <generic-error :display="genericError.display" :text="genericError.text" />

            <router-link :to="`/readArticle?id=${article._id}`"
                :key="article._id" v-for="article in listOfArticles"
            >

                <div class="d-flex flex-row article">

                    <img class="rounded" src="../assets/general_cat_image_small.jpg" width="250">

                    <!-- text fields -->
                    <div class="d-flex flex-column">
                        <h3>{{article.title}}</h3>
                        <span class="d-flex text-secondary date">
                            <span>OG author</span>
                            <span>•</span>
                            <span>25.6.2021</span>
                        </span>

                        <span class="text-justify">{{article.perex}}</span>

                        <span class="comments-read">
                            <span class="text-primary">Read whole article</span>
                            <!-- TODO -->
                            <!-- sum of comments -->
                            <span class="text-secondary">4 comment</span>
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
export default {
    name: 'Home',
    components: {
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
            const res = await this.sendHttpRequest('/articles', 'GET', false);

            if (res.status === 200) {
                this.listOfArticles = await res.json();
            }
        },
        goViewArticle(articleId) {
            router.push(`readArticle?id=${articleId}`);
        }
    },
    created() {
        this.getListOfArticlesticles();
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

            .date  {
                span {
                    margin-right: 10px;
                }


            }

            .comments-read {
                span {
                    margin: 20px 25px;
                }
            }
        }

    }



</style>
