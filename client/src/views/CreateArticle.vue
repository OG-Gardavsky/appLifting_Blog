<template>
    <div>
        <Navbar :authenticated="authenticatedGlobal"/>
        <div class="main" >

            <edit-article-page
                :page-headline=" 'Create new Article' "
                @on-save="createArticle"
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
            title: null,
            perex: null,
            content: null
        }
    },
    methods: {
        async createArticle(body) {

            const res = await this.sendHttpRequest('articles', 'POST', true, body);

            if (res.status === 201) {
                await router.push('/administration');
            } else {
                this.setGenericError(this.genericError, true, 'unable to save article');
            }
        }
    },
    async created() {
        await this.checkCredentials('/');
    }

}
</script>

<style scoped lang="scss">



</style>
