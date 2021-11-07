<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
import { useStore } from 'vuex'
import { IUser, IUserRoleReq, IRole } from '../../../../types'

// Props
const props = defineProps<{
    user: IUser,
    index: number
}>()

// Emits
// const emit = defineEmits<{
//     (e: 'update', value: { user: IUser, index: number }): void
// }>()

// Data variables
const app = getCurrentInstance()
const $toast = app?.appContext.config.globalProperties.$toast
const $swal = app?.appContext.config.globalProperties.$swal
const store = useStore()
const editedUser = Object.assign({}, props.user)
const flag = ref(true)

// Methods
async function update() {
    await store.dispatch('user/update', editedUser).then(resp => {
        flag.value = !flag.value
        $toast.fire({ icon: 'success', title: 'User updated' })
    }).catch(err => {
        $toast.fire({ icon: 'error', title: 'Update user failed' })
    })
}

async function deleteUser(userId: number | undefined) {
    await $swal.fire({ text: 'You will not be able to revert this!', icon: 'warning', showCancelButton: true, confirmButtonColor: '#0dcaf0' }).then((result: any) => {
        if (result?.isConfirmed) {
            store.dispatch('user/delete', { userId, index: props.index }).then(resp => {
                $toast.fire({ icon: 'success', title: 'User deleted' })
            }).catch(err => {
                $toast.fire({ icon: 'error', title: 'Add user failed' })
            })
        }
    })
}

async function addUserRole(role: IRole | undefined, roleIndex: number) {
    const userRoleReq: IUserRoleReq = { userId: props.user?.userId, roleId: role?.roleId }
    await store.dispatch('user/addUserRole', { role, userRoleReq, userIndex: props.index, roleIndex }).then(resp => {
        $toast.fire({ icon: 'success', title: 'Role added' })
    }).catch(err => {
        $toast.fire({ icon: 'error', title: 'Add role failed' })
    })
}

async function deleteUserRole(roleId: number | undefined, roleIndex: number) {
    const userRoleReq: IUserRoleReq = { userId: props.user?.userId, roleId }
    await store.dispatch('user/deleteUserRole', { userRoleReq, userIndex: props.index, roleIndex }).then(resp => {
        $toast.fire({ icon: 'success', title: 'Role removed' })
    }).catch(err => {
        $toast.fire({ icon: 'error', title: 'Remove role failed' })
    })
}
</script>

<template>
    <div class="card">
        <div v-if="flag">
            <!-- User Readonly Card Header -->
            <h5 class="card-header">@{{ user?.username }}</h5>
            <!-- User Readonly Card Body - start -->
            <div class="card-body">
                <h5 class="card-title">
                    <span class="me-3">{{ user?.name }} {{ user?.surname }}</span>
                    <a @click="flag = !flag" class="btn btn-outline-light rounded me-2">
                        <i class="bi bi-pen text-black"></i>
                    </a>
                    <a @click="deleteUser(user?.userId)" class="btn btn-outline-light rounded">
                        <i class="bi bi-trash text-black"></i>
                    </a>
                </h5>
                <p class="card-text mt-3">
                    <label class="mb-2 border-bottom">General</label>
                    <br />
                    <label>
                        <i class="bi bi-calendar2-check"></i>
                    </label>
                    <span class="badge bg-light text-dark ms-2 mb-1">{{ user?.dateOfBirth?.toLocaleString()?.split(' ')[0] }}</span>
                    <br />
                    <label>
                        <i class="bi bi-envelope"></i>
                    </label>
                    <span class="badge bg-light text-dark ms-2 mb-1">{{ user?.email }}</span>
                    <br />
                    <label>
                        <i class="bi bi-gender-ambiguous"></i>
                    </label>
                    <span class="badge bg-light text-dark ms-2 mb-1">{{ user?.gender }}</span>
                    <br />
                    <label>
                        <i class="bi bi-phone"></i>
                    </label>
                    <span class="badge bg-light text-dark ms-2">{{ user?.phone }}</span>
                </p>
                <p class="card-text">
                    <label class="mb-2 border-bottom">Address</label>
                    <br />
                    <span class="fw-light">{{ user?.address }}</span>
                </p>
                <p class="card-text pb-2">
                    <label class="mb-2 border-bottom">Roles</label>
                    <br />
                    <span v-for="(role, i) in user?.roles" :key="i" :class="`badge me-2 bg-${role?.color}`">{{ role?.roleName }}</span>
                </p>
            </div>
            <!-- User Readonly Card Body - end -->
        </div>
        <div v-else>
            <!-- User Editable Card Body - start -->
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
                    <input v-model="editedUser.username" type="text" class="form-control mb-4" placeholder="Username" required />
                    <input v-model="editedUser.password" type="password" class="form-control mb-4" placeholder="Password" required />
                    <input v-model="editedUser.name" type="text" class="form-control mb-4" placeholder="Name" required />
                    <input v-model="editedUser.surname" type="text" class="form-control mb-4" placeholder="Surname" required />
                    <input v-model="editedUser.email" type="email" class="form-control mb-4" placeholder="Email" required />
                    <input v-model="editedUser.phone" type="text" class="form-control mb-4" placeholder="Phone number" required />
                    <input v-model="editedUser.dateOfBirth" type="date" class="form-control mb-4" placeholder="Date of birth" required />
                    <div class="form-check form-check-inline">
                        <input v-model="editedUser.gender" class="form-check-input" type="radio" name="inlineRadioOptions" value="female" />
                        <label class="form-check-label">Female</label>
                    </div>
                    <div class="form-check form-check-inline mb-4">
                        <input v-model="editedUser.gender" class="form-check-input" type="radio" name="inlineRadioOptions" value="male" />
                        <label class="form-check-label">Male</label>
                    </div>
                </form>
                <p class="card-text mb-3">
                    <label class="mb-3 border-bottom">Owned Roles</label>
                    <br />
                    <span v-for="(role, i) in editedUser?.roles" :key="i" :class="`position-relative badge me-3 bg-${role?.color}`">
                        {{ role?.roleName }}
                        <button @click="deleteUserRole(role?.roleId, i)" class="btn btn-light border position-absolute top-0 start-100 translate-middle badge rounded-pill">
                            <i class="bi bi-x-lg text-warning"></i>
                            <span class="visually-hidden">delete</span>
                        </button>
                    </span>
                </p>
                <p class="card-text">
                    <label class="mb-3 border-bottom">All Roles</label>
                    <br />
                    <span v-for="(role, i) in editedUser?.roles" :key="i" :class="`position-relative badge me-3 bg-${role?.color}`">
                        {{ role?.roleName }}
                        <button @click="addUserRole(role, i)" class="btn btn-light border position-absolute top-0 start-100 translate-middle badge rounded-pill">
                            <i class="bi bi-plus-lg text-info"></i>
                            <span class="visually-hidden">add</span>
                        </button>
                    </span>
                </p>
            </div>
            <!-- User Editable Card Body - end -->
        </div>
    </div>
</template>