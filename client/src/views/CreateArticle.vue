<template>
    <div>
        <Navbar />
        <div class="main" >

            <div class="adminHeadline">
                <h1>Create new Article</h1>
                <button class="btn btn-primary" @click="saveArticle()">Publish Article</button>
            </div>

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

export default {
    name: "CreateArticle",
        components: {
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
        saveArticle() {
            console.log(this.content);
        }
    }

}
</script>

<style scoped lang="scss">



</style>
