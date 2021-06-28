<template>
    <div>
        <form>

            <div class="adminHeadline">
                <h1>{{pageHeadline}}</h1>
                <button class="btn btn-primary" @click="createArticle()">Publish Article</button>
            </div>

            <generic-error :display="genericError.display" :text="genericError.text" />



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
        <div style="margin-top: 30px" v-if="![title, content].includes('')">
            <h2 class="d-flex">Preview</h2>
            <hr />
            <h1 class="d-flex">{{title}}</h1>
            <vue-markdown :source="content" />
        </div>

    </div>
</template>

<script>
import VueMarkdown from 'vue-markdown';
import GenericError from "@/components/GenericError";

export default {
    name: "EditArticlePage",
    components: {
        VueMarkdown,
        GenericError
    },
    props: {
        pageHeadline: String,
        titleProp: {
            default: ''
        },
        perexProp: {
            default: ''
        },
        contentProp: {
            default: ''
        }
    },
    data() {
        return {
            title: '',
            perex: '',
            content: ''
        }
    },
    methods: {

        async createArticle() {
            if ([this.title, this.perex, this.content].includes('')) {
                return this.setGenericError(this.genericError, true, 'Please fill "Title", "Perex" and "Content"');
            }

            const body = {
                title: this.title,
                perex: this.perex,
                content: this.content
            };

            this.$emit('on-save', body);
        }

    },
    created() {
        this.title = this.titleProp;
        this.perex = this.perexProp;
        this.content = this.contentProp;
    }
}
</script>

<style scoped>

</style>
