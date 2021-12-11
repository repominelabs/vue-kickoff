<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
import { useStore } from 'vuex'
import { IRole } from '../../../../types'

// Props
const props = defineProps<{
    role: IRole,
    index: number
}>()

// Data variables
const app = getCurrentInstance()
const $toast = app?.appContext.config.globalProperties.$toast
const $swal = app?.appContext.config.globalProperties.$swal
const store = useStore()
const editedRole = Object.assign({}, props.role)
const flag = ref(true)

// Methods
async function updateRoleAsync() {
    await store.dispatch('identity/role/updateRoleAsync', editedRole).then(resp => {
        flag.value = !flag.value
        $toast.fire({ icon: 'success', title: 'Role updated' })
    }).catch(err => {
        $toast.fire({ icon: 'error', title: 'Update role failed' })
    })
}

async function deleteRoleAsync(roleId: number | undefined) {
    await $swal.fire({ text: 'You will not be able to revert this!', icon: 'warning', showCancelButton: true, confirmButtonColor: '#0dcaf0' }).then((result: any) => {
        if (result?.isConfirmed) {
            store.dispatch('identity/role/deleteRoleAsync', { roleId, index: props.index }).then(resp => {
                $toast.fire({ icon: 'success', title: 'Role deleted' })
            }).catch(err => {
                $toast.fire({ icon: 'error', title: 'Delete role failed' })
            })
        }
    })
}
</script>

<template>
    <div class="card">
        <div v-if="flag">
            <!-- Role Readonly Card Body - start -->
            <div class="card-body">
                <h5 class="card-title">
                    <span class="me-3">{{ role?.roleName }}</span>
                    <a @click="flag = !flag" class="btn btn-outline-light border rounded me-2">
                        <i class="bi bi-pen text-black"></i>
                    </a>
                    <a @click="deleteRoleAsync(role?.roleId)" class="btn btn-outline-light border rounded">
                        <i class="bi bi-trash text-black"></i>
                    </a>
                </h5>
            </div>
            <!-- Role Readonly Card Body - end -->
        </div>
        <div v-else>
            <!-- Role Editable Card Body - start -->
            <div class="card-body">
                <form @submit.prevent="updateRoleAsync">
                    <h5 class="card-title mb-4">
                        <button @click="flag = !flag" class="btn btn-light rounded me-3">
                            <i class="bi bi-x-lg text-warning"></i>
                        </button>
                        <button type="submit" class="btn btn-light rounded">
                            <i class="bi bi-save text-info"></i>
                        </button>
                    </h5>
                    <input v-model="editedRole.roleName" type="text" class="form-control mb-4" placeholder="Role name" required />
                </form>
            </div>
            <!-- Role Editable Card Body - end -->
        </div>
    </div>
</template>