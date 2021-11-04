<script setup lang="ts">
import PrivilegeAddForm from './PrivilegeAddForm.vue'
import PrivilegeCardList from './PrivilegeCardList.vue'

</script>

<template>
    <div class="row">
        <div class="col-lg-7">
            <PrivilegeCardList />
        </div>
        <div class="col-lg-5">
            <PrivilegeAddForm />
        </div>
    </div>
</template>