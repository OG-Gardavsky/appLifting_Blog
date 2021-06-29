<template>
    <div>
        <Navbar :authenticated="authenticatedGlobal"/>
        <div class="main" >

            <edit-article-page v-if="articleDetails !== null"
                :page-headline=" 'Edit article' "
                :content-prop="articleDetails.content"
                :perex-prop="articleDetails.perex"
                :title-prop="articleDetails.title"

                @on-save="updateArticle"
            />

            <generic-error />

        </div>
    </div>
</template>

<script>
import Navbar from "@/components/Navbar";
import router from "@/router";
import EditArticlePage from "@/components/EditArticlePage";
import GenericError from "@/components/GenericError";

export default {
    name: "CreateArticle",
        components: {
            GenericError,
            EditArticlePage,
            Navbar
        },
    data() {
        return {
            articleDetails: null,
            articleId: null
        }
    },
    methods: {
        async updateArticle(body) {

            const res = await this.sendHttpRequest(`articles/id:${this.articleId}`, 'PUT', true, body);

            if (res.status === 200) {
                await router.push('/administration');
            } else {
                this.setGenericError(this.genericError, true, 'unable to save article');
            }
        },
        async getArticleDetails() {

            const res = await this.sendHttpRequest( `articles/id:${this.articleId}`, 'GET', false);

            if (res.status === 200) {
                this.articleDetails = await res.json();
            } else {
                this.setGenericError(this.genericError, true, 'unable to save article');
            }
        },
    },
    async created() {
        await this.checkCredentials('/');

        if (this.authenticatedGlobal) {
            this.articleId = this.$route.query.id;

            await this.getArticleDetails();
        }

    }

}
</script>

<style scoped lang="scss">



</style>
