<script setup lang="ts">
import { ref } from 'vue'
import { useStore } from 'vuex'
import { IPrivilege } from '../../../../types'
import PrivilegeCard from './PrivilegeCard.vue'

// Data variables
const store = useStore()
const privileges = ref<IPrivilege[]>(
    [
        { privilegeName: 'Paymant Team' },
        { privilegeName: 'Order Team' },
        { privilegeName: 'Paymant Team' },
    ]
)
</script>

<template>
    <PrivilegeCard v-for="(privilege, i) in privileges" :privilege="privilege" :index="i" :key="i" class="mb-5" />
</template>


