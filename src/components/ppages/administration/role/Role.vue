<script setup lang="ts">
import RoleAdd from './RoleAdd.vue'
import RoleCardList from './RoleCardList.vue'
</script>

<template>
    <div class="row">
        <div class="col-lg-4">
            <RoleCardList />
        </div>
        <div class="col-lg-4">
            <RoleAdd />
        </div>
    </div>
</template>