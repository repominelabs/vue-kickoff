<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
import { useStore } from 'vuex'
import { IPrivilege } from '../../../../types'

// Data variables
const app = getCurrentInstance()
const $toast = app?.appContext.config.globalProperties.$toast
const store = useStore()
const privilege = ref<IPrivilege>({
    privilegeName: '',
})

// Methods
async function create() {
    await store.dispatch('privilege/save', privilege.value).then(resp => {
        $toast.fire({ icon: 'success', title: 'Privilege created' })
    }).catch(err => {
        $toast.fire({ icon: 'error', title: 'Create privilege failed' })
    })
}
</script>

<template>
    <div class="card">
        <div class="card-body">
            <h5 class="card-title">
                <i class="bi bi-plus"></i>
                Add privilege
            </h5>
            <h6 class="card-subtitle mb-2 text-muted">Creating a single privilege</h6>
            <form class="my-4" @submit.prevent="create">
                <input v-model="privilege.privilegeName" type="text" class="form-control mb-4" placeholder="Privilege name" required />
                <button type="submit" class="btn btn-outline-warning w-100">Create</button>
            </form>
        </div>
    </div>
</template>