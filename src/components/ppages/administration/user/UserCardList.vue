<script setup lang="ts">
import UserCard from './UserCard.vue'
</script>

<template>
    <div v-for="i in 5" :key="i" class="mb-5">
        <user-card />
    </div>
</template>