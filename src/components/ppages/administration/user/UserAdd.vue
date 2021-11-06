<script setup lang="ts">
import { ref } from 'vue'
import { IUser } from '../../../../types'

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
function create() {
    console.log(user.value)
}
</script>

<template>
    <div class="card">
        <div class="card-body">
            <h5 class="card-title">
                <i class="bi bi-plus"></i>
                Add User
            </h5>
            <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
            <form class="my-4">
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
                <button @click="create" type="submit" class="btn btn-outline-warning w-100">Create</button>
            </form>
        </div>
    </div>
</template>