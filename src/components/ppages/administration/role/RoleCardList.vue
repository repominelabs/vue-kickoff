<script setup lang="ts">
import { ref } from 'vue'
import { useStore } from 'vuex'
import { IRole } from '../../../../types'
import RoleCard from './RoleCard.vue'

// Data variables
const store = useStore()
const roles = ref<IRole[]>(
    [
        { roleName: 'Admin', color: 'danger', privileges: [{ privilegeName: 'Paymant Team' }, { privilegeName: 'Order Team' }] },
        { roleName: 'Customer', color: 'warning', privileges: [{ privilegeName: 'Order Team' }] },
        { roleName: 'Vendor', color: 'info', privileges: [{ privilegeName: 'Paymant Team' }, { privilegeName: 'Order Team' }, { privilegeName: 'Product Team' }] },
    ]
)
</script>

<template>
    <RoleCard v-for="(role, i) in roles" :role="role" :index="i" :key="i" class="mb-5" />
</template>