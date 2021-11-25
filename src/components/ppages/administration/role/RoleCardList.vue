<script setup lang="ts">
import { ref } from 'vue'
import { useStore } from 'vuex'
import { IRole } from '../../../../types'
import RoleCard from './RoleCard.vue'

// Data variables
const store = useStore()
const roles = ref<IRole[]>(
    [
        { roleName: 'Admin', color: 'danger' },
        { roleName: 'Customer', color: 'warning', },
        { roleName: 'Vendor', color: 'info', },
    ]
)
</script>

<template>
    <RoleCard v-for="(role, i) in roles" :role="role" :index="i" :key="i" class="mb-5" />
</template>