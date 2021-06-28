<template>
    <div>
        <Navbar />
        <div class="main" >

            <div class="adminHeadline">
                <h1>Create new Article</h1>
                <button class="btn btn-primary" @click="createArticle()">Publish Article</button>
            </div>

            <generic-error :display="genericError.display" :text="genericError.text" />

            <edit-article-page :content="content" :perex="perex" :title="title"/>

        </div>
    </div>
</template>

<script>
import Navbar from "@/components/Navbar";
import GenericError from "@/components/GenericError";
import router from "@/router";
import EditArticlePage from "@/components/EditArticlePage";

export default {
    name: "CreateArticle",
        components: {
            EditArticlePage,
            GenericError,
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
        async createArticle() {
            if ([this.title, this.perex, this.content].includes(null)) {
                return this.setGenericError(this.genericError, true, 'Please fill "Title", "Perex" and "Content"');
            }

            const body = {
                title: this.title,
                perex: this.perex,
                content: this.content
            };

            const res = await this.sendHttpRequest('articles', 'POST', true, body);

            if (res.status === 201) {
                await router.push('/administration');
            } else {
                //TODO
                //enhance error handling
                this.setGenericError(this.genericError, true, 'unable to save article');
            }
        }
    }

}
</script>

<style scoped lang="scss">



</style>
