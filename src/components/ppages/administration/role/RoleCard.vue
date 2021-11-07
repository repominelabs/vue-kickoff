<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
import { useStore } from 'vuex'
import { IRole, IRolePrivilegeReq, IPrivilege } from '../../../../types'

// Props
const props = defineProps<{
    role: IRole,
    index: number
}>()

// Emits
// const emit = defineEmits<{
//     (e: 'update', value: { role: Irole, index: number }): void
// }>()

// Data variables
const app = getCurrentInstance()
const $toast = app?.appContext.config.globalProperties.$toast
const $swal = app?.appContext.config.globalProperties.$swal
const store = useStore()
const editedRole = Object.assign({}, props.role)
const flag = ref(true)

// Methods
async function update() {
    await store.dispatch('role/update', editedRole).then(resp => {
        flag.value = !flag.value
        $toast.fire({ icon: 'success', title: 'Role updated' })
    }).catch(err => {
        $toast.fire({ icon: 'error', title: 'Update role failed' })
    })
}

async function deleteRole(roleId: number | undefined) {
    await $swal.fire({ text: 'You will not be able to revert this!', icon: 'warning', showCancelButton: true, confirmButtonColor: '#0dcaf0' }).then((result: any) => {
        if (result?.isConfirmed) {
            store.dispatch('role/delete', { roleId, index: props.index }).then(resp => {
                $toast.fire({ icon: 'success', title: 'Role deleted' })
            }).catch(err => {
                $toast.fire({ icon: 'error', title: 'Delete role failed' })
            })
        }
    })
}

async function addRolePrivilege(privilege: IPrivilege | undefined, privilegeIndex: number) {
    const rolePrivilegeReq: IRolePrivilegeReq = { roleId: props.role?.roleId, privilegeId: privilege?.privilegeId }
    await store.dispatch('role/addRolePrivilege', { privilege, rolePrivilegeReq, roleIndex: props.index, privilegeIndex }).then(resp => {
        $toast.fire({ icon: 'success', title: 'Privilege added' })
    }).catch(err => {
        $toast.fire({ icon: 'error', title: 'Add privilege failed' })
    })
}

async function deleteRolePrivilege(privilegeId: number | undefined, privilegeIndex: number) {
    const rolePrivilegeReq: IRolePrivilegeReq = { roleId: props.role?.roleId, privilegeId }
    await store.dispatch('role/deleteRolePrivilege', { rolePrivilegeReq, roleIndex: props.index, privilegeIndex }).then(resp => {
        $toast.fire({ icon: 'success', title: 'Privilege removed' })
    }).catch(err => {
        $toast.fire({ icon: 'error', title: 'Remove privilege failed' })
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
                    <a @click="flag = !flag" class="btn btn-outline-light rounded me-2">
                        <i class="bi bi-pen text-black"></i>
                    </a>
                    <a @click="deleteRole(role?.roleId)" class="btn btn-outline-light rounded">
                        <i class="bi bi-trash text-black"></i>
                    </a>
                </h5>
                <p class="card-text pb-2">
                    <label class="mb-2 border-bottom">Privileges</label>
                    <br />
                    <span v-for="(privilege, i) in role?.privileges" :key="i" class="badge bg-warning me-2">{{ privilege?.privilegeName }}</span>
                </p>
            </div>
            <!-- Role Readonly Card Body - end -->
        </div>
        <div v-else>
            <!-- Role Editable Card Body - start -->
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
                    <input v-model="editedRole.roleName" type="text" class="form-control mb-4" placeholder="Role name" required />
                    <div class="form-check form-check-inline">
                        <input v-model="editedRole.color" class="form-check-input" type="radio" value="danger" />
                        <label class="form-check-label">Danger</label>
                    </div>
                    <div class="form-check form-check-inline mb-4">
                        <input v-model="editedRole.color" class="form-check-input" type="radio" value="warning" />
                        <label class="form-check-label">Warning</label>
                    </div>
                    <div class="form-check form-check-inline mb-4">
                        <input v-model="editedRole.color" class="form-check-input" type="radio" value="info" />
                        <label class="form-check-label">Info</label>
                    </div>
                </form>
                <p class="card-text mb-3">
                    <label class="mb-3 border-bottom">Owned Privileges</label>
                    <br />
                    <span v-for="(privilege, i) in editedRole?.privileges" :key="i" class="position-relative badge me-3 bg-info">
                        {{ privilege?.privilegeName }}
                        <button @click="deleteRolePrivilege(privilege?.privilegeId, i)" class="btn btn-light border position-absolute top-0 start-100 translate-middle badge rounded-pill">
                            <i class="bi bi-x-lg text-warning"></i>
                            <span class="visually-hidden">delete</span>
                        </button>
                    </span>
                </p>
                <p class="card-text">
                    <label class="mb-3 border-bottom">All Privileges</label>
                    <br />
                    <span v-for="(privilege, i) in editedRole?.privileges" :key="i" class="position-relative badge me-3 bg-warning">
                        {{ privilege?.privilegeName }}
                        <button @click="addRolePrivilege(privilege, i)" class="btn btn-light border position-absolute top-0 start-100 translate-middle badge rounded-pill">
                            <i class="bi bi-plus-lg text-info"></i>
                            <span class="visually-hidden">add</span>
                        </button>
                    </span>
                </p>
            </div>
            <!-- Role Editable Card Body - end -->
        </div>
    </div>
</template>