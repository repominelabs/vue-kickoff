<script setup lang="ts">
import UserAdd from './UserAdd.vue'
import UserAddMultiple from './UserAddMultiple.vue'
import UserCardList from './UserCardList.vue'
</script>

<template>
    <div class="row">
        <div class="col-lg-3">
            <UserCardList />
        </div>
        <div class="col-lg-3">
            <UserAdd />
        </div>
        <div class="col-lg-6">
            <UserAddMultiple />
        </div>
    </div>
</template>