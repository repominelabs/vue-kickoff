<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
import { useStore } from 'vuex'
import { IGroup, IAddToUserRequest, IRemoveFromUserRequest, IUser } from '../../../../types'

// Props
const props = defineProps<{
    group: IGroup,
    index: number
}>()

// Emits
// const emit = defineEmits<{
//     (e: 'update', value: { group: Igroup, index: number }): void
// }>()

// Data variables
const app = getCurrentInstance()
const $toast = app?.appContext.config.globalProperties.$toast
const $swal = app?.appContext.config.globalProperties.$swal
const store = useStore()
const editedGroup = Object.assign({}, props.group)
const flag = ref(true)

// Methods
async function updateGroupAsync() {
    await store.dispatch('identity/group/updateGroupAsync', editedGroup).then(resp => {
        flag.value = !flag.value
        $toast.fire({ icon: 'success', title: 'group updated' })
    }).catch(err => {
        $toast.fire({ icon: 'error', title: 'Update group failed' })
    })
}

async function deleteGroupAsync(group: IGroup | undefined) {
    await $swal.fire({ text: 'You will not be able to revert this!', icon: 'warning', showCancelButton: true, confirmButtonColor: '#0dcaf0' }).then((result: any) => {
        if (result?.isConfirmed) {
            store.dispatch('identity/group/deleteGroupAsync', { group, index: props.index }).then(resp => {
                $toast.fire({ icon: 'success', title: 'group deleted' })
            }).catch(err => {
                $toast.fire({ icon: 'error', title: 'Delete group failed' })
            })
        }
    })
}

async function addToUserAsync(user: IUser | undefined, userIndex: number) {
    const groupUserReq: IAddToUserRequest = { groupId: props.group?.groupId, userId: user?.userId }
    await store.dispatch('identity/group/addToUserAsync', { user, groupUserReq, groupIndex: props.index, userIndex }).then(resp => {
        $toast.fire({ icon: 'success', title: 'user added' })
    }).catch(err => {
        $toast.fire({ icon: 'error', title: 'Add user failed' })
    })
}

async function removeFromUserAsync(userId: number | undefined, userIndex: number) {
    const groupUserReq: IRemoveFromUserRequest = { groupId: props.group?.groupId, userId }
    await store.dispatch('identity/group/removeFromUserAsync', { groupUserReq, groupIndex: props.index, userIndex }).then(resp => {
        $toast.fire({ icon: 'success', title: 'user removed' })
    }).catch(err => {
        $toast.fire({ icon: 'error', title: 'Remove user failed' })
    })
}
</script>

<template>
    <div class="card">
        <div v-if="flag">
            <!-- Group Readonly Card Body - start -->
            <div class="card-body">
                <h5 class="card-title">
                    <span class="me-3">
                        <i class="bi bi-people"></i>
                        {{ group?.groupName }}
                    </span>
                    <a @click="flag = !flag" class="btn btn-outline-light border rounded me-2">
                        <i class="bi bi-pen text-black"></i>
                    </a>
                    <a @click="deleteGroupAsync(group)" class="btn btn-outline-light border rounded">
                        <i class="bi bi-trash text-black"></i>
                    </a>
                </h5>
                <p class="card-text mb-2">{{ group?.groupDescription }}</p>
                <p class="card-text pb-2">
                    <label class="mb-2 border-bottom">members</label>
                    <br />
                    <span v-for="(user, i) in group?.users" :key="i" class="badge bg-warning me-2">{{ user?.username }}</span>
                </p>
            </div>
            <!-- Group Readonly Card Body - end -->
        </div>
        <div v-else>
            <!-- Group Editable Card Body - start -->
            <div class="card-body">
                <form @submit.prevent="updateGroupAsync">
                    <h5 class="card-title mb-4">
                        <button @click="flag = !flag" class="btn btn-light rounded me-3">
                            <i class="bi bi-x-lg text-warning"></i>
                        </button>
                        <button type="submit" class="btn btn-light rounded">
                            <i class="bi bi-save text-info"></i>
                        </button>
                    </h5>
                    <input v-model="editedGroup.groupName" type="text" class="form-control mb-4" placeholder="Group name" required />
                    <input v-model="editedGroup.groupDescription" type="text" class="form-control mb-4" placeholder="Group Description" required />
                </form>
                <p class="card-text mb-3">
                    <label class="mb-3 border-bottom">Owned members</label>
                    <br />
                    <span v-for="(user, i) in editedGroup?.users" :key="i" class="position-relative badge me-3 bg-info">
                        {{ user?.username }}
                        <button @click="removeFromUserAsync(user?.userId, i)" class="btn btn-light border position-absolute top-0 start-100 translate-middle badge rounded-pill">
                            <i class="bi bi-x-lg text-warning"></i>
                            <span class="visually-hidden">delete</span>
                        </button>
                    </span>
                </p>
                <p class="card-text">
                    <label class="mb-3 border-bottom">All members</label>
                    <br />
                    <span v-for="(user, i) in editedGroup?.users" :key="i" class="position-relative badge me-3 bg-warning">
                        {{ user?.username }}
                        <button @click="addToUserAsync(user, i)" class="btn btn-light border position-absolute top-0 start-100 translate-middle badge rounded-pill">
                            <i class="bi bi-plus-lg text-info"></i>
                            <span class="visually-hidden">add</span>
                        </button>
                    </span>
                </p>
            </div>
            <!-- Group Editable Card Body - end -->
        </div>
    </div>
</template>