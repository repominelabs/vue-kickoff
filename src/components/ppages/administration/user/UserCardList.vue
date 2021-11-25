<script setup lang="ts">
import { reactive } from 'vue'
import { useStore } from 'vuex'
import { IUser } from '../../../../types'
import UserCard from './UserCard.vue'

// Data variables
const store = useStore()
const users = reactive<IUser[]>(
    [
        { username: 'wade', name: 'Wade', surname: 'Harris', email: 'wade.harris@gmail.com', phone: '+90 533 443 23 12', gender: 'male', dateOfBirth: new Date(), address: 'Izmir, Turkey', roles: [{ roleId: 0, roleName: 'Customer', color: 'info' }, { roleId: 1, roleName: 'Vendor', color: 'warning' }, { roleId: 2, roleName: 'Admin', color: 'danger' }] },
        { username: 'dave', name: 'Dave', surname: 'Mitchell', email: 'dave.mitchell@outlook.com', phone: '+14 544 343 34 23', gender: 'male', dateOfBirth: new Date(), address: 'Los Angeles, USA', roles: [{ roleId: 0, roleName: 'Customer', color: 'info' }, { roleId: 1, roleName: 'Vendor', color: 'warning' }] },
        { username: 'daisy', name: 'Daisy', surname: 'Ramirez', email: 'daisy.ramirez@gmail.com', phone: '+16 435 543 34 76', gender: 'female', dateOfBirth: new Date(), address: 'Berlin, Germany', roles: [{ roleId: 0, roleName: 'Customer', color: 'info' }, { roleId: 1, roleName: 'Vendor', color: 'warning' }, { roleId: 2, roleName: 'Admin', color: 'danger' }] },
        { username: 'stella', name: 'Stella', surname: 'Singh', email: 'stella.singh@outlook.com', phone: '+90 578 467 67 89', gender: 'female', dateOfBirth: new Date(), address: 'Istanbul, Turkey', roles: [{ roleId: 0, roleName: 'Customer', color: 'info' }] },
    ]
)

store.dispatch('user/search', {}).then(resp => {
    // users = resp.Data
}).catch(err => {
    // $toast.fire({ icon: 'error', title: 'Create user failed' })
})
</script>

<template>
    <user-card v-for="(user, i) in users" :user="user" :index="i" :key="i" class="mb-5" />
</template>


