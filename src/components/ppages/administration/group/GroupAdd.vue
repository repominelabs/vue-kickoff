<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
import { useStore } from 'vuex'
import { IGroup } from '../../../../types'

// Data variables
const app = getCurrentInstance()
const $toast = app?.appContext.config.globalProperties.$toast
const store = useStore()
const group = ref<IGroup>({
    groupName: '',
    groupDescription: '',
})

// Methods
async function create() {
    await store.dispatch('identity/group/saveGroupAsync', group.value).then(resp => {
        $toast.fire({ icon: 'success', title: 'Group created' })
    }).catch(err => {
        $toast.fire({ icon: 'error', title: 'Create group failed' })
    })
}
</script>

<template>
    <div class="card">
        <div class="card-body">
            <h5 class="card-title">
                <i class="bi bi-plus"></i>
                Add group
            </h5>
            <h6 class="card-subtitle mb-2 text-muted">Creating a single group</h6>
            <form class="my-4" @submit.prevent="create">
                <input v-model="group.groupName" type="text" class="form-control mb-4" placeholder="Group name" required />
                <input v-model="group.groupDescription" type="text" class="form-control mb-4" placeholder="Group Description" required />
                <button type="submit" class="btn btn-outline-warning w-100">Create</button>
            </form>
        </div>
    </div>
</template>