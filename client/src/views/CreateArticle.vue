<template>
    <div>
        <Navbar />
        <div class="main" >

            <div class="adminHeadline">
                <h1>Create new Article</h1>
                <button class="btn btn-primary" @click="createArticle()">Publish Article</button>
            </div>

            <generic-error :display="genericError.display" :text="genericError.text" />

            <form>
                <div class="form-group">
                    <label class="d-flex">Article Title</label>
                    <input type="text" class="form-control" v-model="title" placeholder="My first article" />
                </div>

                <div class="form-group">
                    <label class="d-flex">Featured image (not implemented)</label>
                    <button class="btn btn-secondary d-flex">Upload an image</button>
                </div>

                <div class="form-group">
                    <label class="d-flex">Perex</label>
                    <textarea class="form-control" id="perex"  v-model="perex" placeholder="Leading Paragraph" rows="4"/>
                </div>

                <div class="form-group">
                    <label class="d-flex">Content</label>
                    <textarea class="form-control" id="content"  v-model="content" placeholder="Supports markdown. Yay!" rows="18"/>
                </div>
            </form>


            <!-- markdown preview -->
            <div style="margin-top: 30px" v-if="![title, content].includes(null)">
                <h2 class="d-flex">Preview</h2>
                <hr />
                <h1 class="d-flex">{{title}}</h1>
                <vue-markdown :source="content" />
            </div>



        </div>
    </div>
</template>

<script>
import Navbar from "@/components/Navbar";
import VueMarkdown from 'vue-markdown';
import GenericError from "@/components/GenericError";
import router from "@/router";

export default {
    name: "CreateArticle",
        components: {
            GenericError,
            Navbar,
            VueMarkdown
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
