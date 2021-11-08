<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
import { useStore } from 'vuex'
import { IPrivilege } from '../../../../types'

// Props
const props = defineProps<{
    privilege: IPrivilege,
    index: number
}>()

// Emits
// const emit = defineEmits<{
//     (e: 'update', value: { privilege: Iprivilege, index: number }): void
// }>()

// Data variables
const app = getCurrentInstance()
const $toast = app?.appContext.config.globalProperties.$toast
const $swal = app?.appContext.config.globalProperties.$swal
const store = useStore()
const editedPrivilege = Object.assign({}, props.privilege)
const flag = ref(true)

// Methods
async function update() {
    await store.dispatch('privilege/update', editedPrivilege).then(resp => {
        flag.value = !flag.value
        $toast.fire({ icon: 'success', title: 'Privilege updated' })
    }).catch(err => {
        $toast.fire({ icon: 'error', title: 'Update privilege failed' })
    })
}

async function deletePrivilege(privilegeId: number | undefined) {
    await $swal.fire({ text: 'You will not be able to revert this!', icon: 'warning', showCancelButton: true, confirmButtonColor: '#0dcaf0' }).then((result: any) => {
        if (result?.isConfirmed) {
            store.dispatch('privilege/delete', { privilegeId, index: props.index }).then(resp => {
                $toast.fire({ icon: 'success', title: 'Privilege deleted' })
            }).catch(err => {
                $toast.fire({ icon: 'error', title: 'Delete privilege failed' })
            })
        }
    })
}
</script>

<template>
    <div class="card">
        <div v-if="flag">
            <!-- Privilege Readonly Card Body - start -->
            <div class="card-body">
                <h5 class="card-title">
                    <span class="me-3">{{ privilege?.privilegeName }}</span>
                    <a @click="flag = !flag" class="btn btn-outline-light border rounded me-2">
                        <i class="bi bi-pen text-black"></i>
                    </a>
                    <a @click="deletePrivilege(privilege?.privilegeId)" class="btn btn-outline-light border rounded">
                        <i class="bi bi-trash text-black"></i>
                    </a>
                </h5>
            </div>
            <!-- Privilege Readonly Card Body - end -->
        </div>
        <div v-else>
            <!-- Privilege Editable Card Body - start -->
            <div class="card-body">
                <form @submit.prevent="update">
                    <h5 class="card-title mb-4">
                        <button @click="flag = !flag" class="btn btn-light rounded me-3">
                            <i class="bi bi-x-lg text-warning"></i>
                        </button>
                        <button type="submit" class="btn btn-light rounded">
                            <i class="bi bi-save text-info"></i>
                        </button>
                    </h5>
                    <input v-model="editedPrivilege.privilegeName" type="text" class="form-control mb-4" placeholder="Privilege name" required />
                </form>
            </div>
            <!-- Privilege Editable Card Body - end -->
        </div>
    </div>
</template>