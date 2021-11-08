<script setup lang="ts">
import { computed } from '@vue/reactivity'
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
            <h1 class="display-3 mb-3">Search {{ route.name }}</h1>
            <div class="col-lg-6 mx-auto">
                <p class="lead mb-4">
                    Build modern, dynamic, customizable
                    <a href="https://github.com/oclk/vue-kickoff" target="_blank">Vue startup project</a> for
                    <code>:enterprise solutions</code> that includes many of the boilerplates.
                </p>
                <form @submit.prevent="search">
                    <div class="d-grid gap-2 d-sm-flex justify-content-sm-center mb-5">
                        <div class="input-group input-group-lg" style="width: 450px">
                            <input type="text" class="form-control rounded-pill" placeholder="search for a product, category or brand" />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>