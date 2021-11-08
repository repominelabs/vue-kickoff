<script setup lang="ts">
import { ref } from 'vue'
import { useStore } from 'vuex'
import { IGroup } from '../../../../types'
import GroupCard from './GroupCard.vue'

// Data variables
const store = useStore()
const groups = ref<IGroup[]>(
    [
        { groupName: 'repomine-vue', groupDescription: 'Frontend Developers', users: [{ username: 'daisy' }, { username: 'wade' }] },
        { groupName: 'repomine-dotnet', groupDescription: 'Backend Developers', users: [{ username: 'stella' }, { username: 'dave' }] },
    ]
)
</script>

<template>
    <GroupCard v-for="(group, i) in groups" :group="group" :index="i" :key="i" class="mb-5" />
</template>