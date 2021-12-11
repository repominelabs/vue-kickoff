<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
import { useStore } from 'vuex'
import { IUser } from '../../../../types'

// Data variables
const app = getCurrentInstance()
const $toast = app?.appContext.config.globalProperties.$toast
const $swal = app?.appContext.config.globalProperties.$swal
const store = useStore()
const user = ref<IUser>({
    username: '',
    password: '',
    name: '',
    surname: '',
    email: '',
    phone: '',
    gender: '',
    address: ''
})

// Methods
async function saveUserAsync() {
    await store.dispatch('identity/user/saveUserAsync', user.value).then(resp => {
        $toast.fire({ icon: 'success', title: 'User created' })
    }).catch(err => {
        $toast.fire({ icon: 'error', title: 'Create user failed' })
    })
}
</script>

<template>
    <div class="card">
        <div class="card-body">
            <h5 class="card-title">
                <i class="bi bi-plus"></i>
                Add user
            </h5>
            <h6 class="card-subtitle mb-2 text-muted">Creating a single user</h6>
            <form class="my-4" @submit.prevent="saveUserAsync">
                <input v-model="user.username" type="text" class="form-control mb-4" placeholder="Username" required />
                <input v-model="user.password" type="password" class="form-control mb-4" placeholder="Password" required />
                <input type="text" class="form-control mb-4" placeholder="Name" required />
                <input type="text" class="form-control mb-4" placeholder="Surname" required />
                <input v-model="user.email" type="email" class="form-control mb-4" placeholder="Email" required />
                <input v-model="user.phone" type="text" class="form-control mb-4" placeholder="Phone number" required />
                <input type="date" class="form-control mb-4" placeholder="Date of birth" required />
                <div class="form-check form-check-inline">
                    <input v-model="user.gender" class="form-check-input" type="radio" name="inlineRadioOptions" value="female" />
                    <label class="form-check-label">Female</label>
                </div>
                <div class="form-check form-check-inline mb-4">
                    <input v-model="user.gender" class="form-check-input" type="radio" name="inlineRadioOptions" value="male" />
                    <label class="form-check-label">Male</label>
                </div>
                <button type="submit" class="btn btn-outline-warning w-100">Create</button>
            </form>
        </div>
    </div>
</template>