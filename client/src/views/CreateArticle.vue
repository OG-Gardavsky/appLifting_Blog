<template>
    <div>
        <Navbar />
        <div class="main" >

            <div class="adminHeadline">
                <h1>Create new Article</h1>
                <button class="btn btn-primary">Publish Article</button>
            </div>

            <form>
                <div class="form-group">
                    <label class="d-flex">Article Title</label>
                    <input type="password" class="form-control" v-model="title" placeholder="My first article" />
                </div>

                <div class="form-group">
                    <label class="d-flex">Featured image (not implemented)</label>
                    <button class="btn btn-secondary d-flex">Upload an image</button>
                </div>

                <div class="form-group">
                    <label class="d-flex">Perex</label>
                    <textarea class="form-control"  v-model="perex" placeholder="Leading Paragraph" />
                </div>

                <div class="form-group">
                    <label class="d-flex">Content</label>
                    <textarea class="form-control"  v-model="content" placeholder="Supports markdown. Yay!" />
                </div>


            </form>




        </div>
    </div>
</template>

<script>
import Navbar from "@/components/Navbar";
export default {
    name: "CreateArticle",
        components: {Navbar},
    data() {
        return {
            title: null,
            perex: null,
            content: null
        }
    }

}
</script>

<style scoped>

</style>
