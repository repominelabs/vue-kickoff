<script setup lang="ts">
import RoleAddForm from './RoleAddForm.vue'
import RoleCardList from './RoleCardList.vue'

</script>

<template>
    <div class="row">
        <div class="col-lg-7">
            <RoleCardList />
        </div>
        <div class="col-lg-5">
            <RoleAddForm />
        </div>
    </div>
</template>