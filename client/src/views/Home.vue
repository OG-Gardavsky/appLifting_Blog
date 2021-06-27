<template>
    <div class="home">
        <Navbar />
        <div class="main">
            <h1>Recent articles</h1>
            <generic-error :display="genericError.display" :text="genericError.text" />

            <a :key="article._id" v-for="article in listOfArticles"
                href="#"
               class="primary"
            >

                <div class="d-flex flex-column article">
                    <h2>{{article.title}}</h2>
                    <span class="d-flex">
                    <span class="secondary">OG author</span>
                    <span>25.6.2021</span>
                </span>
                </div>
            </a>





        </div>
    </div>
</template>



<script>

import Navbar from "@/components/Navbar";
import GenericError from "@/components/GenericError";
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
        }

    }



</style>
