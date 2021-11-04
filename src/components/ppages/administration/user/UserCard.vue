<script setup lang="ts">
import { ref, PropType } from 'vue'
import { IUser } from '../../../../types'

const props = defineProps({
    user: {
        type: Object as PropType<IUser>,
    }
})
const flag = ref(true)
</script>

<template>
    <div class="card">
        <div v-if="flag">
            <h5 class="card-header">@{{ user?.username }}</h5>
            <div class="card-body">
                <h5 class="card-title">{{ user?.name }} {{ user?.surname }}</h5>
                <p class="card-text border-bottom pb-3">
                    Date of birth:
                    <strong>{{ user?.dateOfBirth }}</strong>,
                    gender:
                    <strong>{{ user?.gender }}</strong>,
                    phone number:
                    <strong>{{ user?.phone }}</strong>,
                </p>
                <p class="card-text border-bottom pb-3">
                    <span>Address</span>
                    {{ user?.address }}
                </p>
                <p class="card-text pb-3">
                    <span>Roles</span>
                    {{ user?.address }}
                    <br>
                    <span class="badge bg-danger me-2">Admin</span>
                    <span class="badge bg-warning me-2">Vendor</span>
                    <span class="badge bg-info">Customer</span>
                </p>
                <a @click="flag = !flag" class="btn btn-outline-info">Edit User</a>
            </div>
        </div>
        <div v-else>
            <div class="card-body">
                <form class="my-4 needs-validation">
                    <input type="text" class="form-control mb-4" placeholder="Username" required />
                    <input type="password" class="form-control mb-4" placeholder="Password" required />
                    <input type="email" class="form-control mb-4" placeholder="Email" required />
                    <input type="text" class="form-control mb-4" placeholder="Phone number" required />
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="inlineRadioOptions" value="female" />
                        <label class="form-check-label">Female</label>
                    </div>
                    <div class="form-check form-check-inline mb-4">
                        <input class="form-check-input" type="radio" name="inlineRadioOptions" value="male" />
                        <label class="form-check-label">Male</label>
                    </div>
                    <br />
                    <button @click="flag = !flag" type="submit" class="btn btn-outline-info w-100">Save</button>
                </form>
            </div>
        </div>
    </div>
</template>