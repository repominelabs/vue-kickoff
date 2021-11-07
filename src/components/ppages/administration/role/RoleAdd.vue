<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
import { useStore } from 'vuex'
import { IRole } from '../../../../types'

// Data variables
const app = getCurrentInstance()
const $toast = app?.appContext.config.globalProperties.$toast
const store = useStore()
const role = ref<IRole>({
    roleName: '',
    color: '',
})

// Methods
async function create() {
    await store.dispatch('role/save', role.value).then(resp => {
        $toast.fire({ icon: 'success', title: 'role created' })
    }).catch(err => {
        $toast.fire({ icon: 'error', title: 'Create role failed' })
    })
}
</script>

<template>
    <div class="card">
        <div class="card-body">
            <h5 class="card-title">
                <i class="bi bi-plus"></i>
                Add role
            </h5>
            <h6 class="card-subtitle mb-2 text-muted">Creating a single role</h6>
            <form class="my-4" @submit.prevent="create">
                <input v-model="role.roleName" type="text" class="form-control mb-4" placeholder="Role name" required />
                <div class="form-check form-check-inline">
                    <input v-model="role.color" class="form-check-input" type="radio" value="danger" />
                    <label class="form-check-label text-danger">Danger</label>
                </div>
                <div class="form-check form-check-inline mb-4">
                    <input v-model="role.color" class="form-check-input" type="radio" value="warning" />
                    <label class="form-check-label text-warning">Warning</label>
                </div>
                <div class="form-check form-check-inline mb-4">
                    <input v-model="role.color" class="form-check-input" type="radio" value="info" />
                    <label class="form-check-label text-info">Info</label>
                </div>
                <button type="submit" class="btn btn-outline-warning w-100">Create</button>
            </form>
        </div>
    </div>
</template>