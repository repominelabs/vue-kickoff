<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

// Data variables
const store = useStore()
const route = useRoute()

// Methods
async function search() {
    if (route.meta.search) {
        await store.dispatch(`${route.meta.search}/search`, {}).then(resp => {
            //
        }).catch(err => {
            //
        })
    }
}
</script>

<template>
    <div class="container">
        <div class="px-4 pt-5 mb-5 text-center">
            <!-- the Subheader Title -->
            <h1 class="display-4 mb-3">{{ route.name }}</h1>
            <div class="col-lg-6 mx-auto">
                <!-- the Subheader Subtitle - start -->
                <p class="lead mb-4">
                    Build modern, dynamic, customizable
                    <a href="https://github.com/repomine-labs/repomine-vue" target="_blank">Vue startup project</a> for
                    <code>:enterprise solutions</code> that includes many of the boilerplates.
                </p>
                <!-- the Subheader Subtitle - end -->
                <!-- Dynamic Search Form - start -->
                <form @submit.prevent="search">
                    <div class="row">
                        <div class="col-md-8 mx-auto">
                            <div class="input-group">
                                <input class="form-control border rounded-pill" type="search" />
                                <span class="input-group-append">
                                    <button @keyup.enter="search" class="btn btn-white btn-lg bg-white rounded-pill my-1 ms-n7" type="button">
                                        <i class="bi bi-search"></i>
                                    </button>
                                </span>
                            </div>
                        </div>
                    </div>
                </form>
                <!-- Dynamic Search Form - end -->
            </div>
        </div>
    </div>
</template>

<style scoped>
.ms-n7 {
    margin-left: -70px;
}
</style>