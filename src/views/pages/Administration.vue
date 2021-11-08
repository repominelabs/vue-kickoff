<script setup lang="ts">
import { shallowRef } from 'vue'
import Group from '../../components/ppages/administration/group/Group.vue'
import User from '../../components/ppages/administration/user/User.vue'
import Role from '../../components/ppages/administration/role/Role.vue'
import Privilege from '../../components/ppages/administration/privilege/Privilege.vue'
import UserAddMultiple from '../../components/ppages/administration/user/UserAddMultiple.vue'

const is = shallowRef(User)
</script>

<template>
    <div class="container">
        <nav class="mb-5">
            <div class="nav nav-tabs" id="nav-tab" role="tablist">
                <button @click="is = Group" class="nav-link" data-bs-toggle="tab">Groups</button>
                <button @click="is = User" class="nav-link active" data-bs-toggle="tab">Users</button>
                <button @click="is = Role" class="nav-link" data-bs-toggle="tab">Roles</button>
                <button @click="is = Privilege" class="nav-link" data-bs-toggle="tab">Privileges</button>
                <button @click="is = UserAddMultiple" class="nav-link" data-bs-toggle="tab">
                    <i class="bi bi-plus-lg"></i>
                    Add Multiple
                </button>
            </div>
        </nav>
        <component :is="is"></component>
    </div>
</template>