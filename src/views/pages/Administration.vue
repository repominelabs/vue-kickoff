<script setup lang="ts">
import { shallowRef } from 'vue'
import { useRoute } from 'vue-router'
import Group from '../../components/ppages/administration/group/Group.vue'
import User from '../../components/ppages/administration/user/User.vue'
import Role from '../../components/ppages/administration/role/Role.vue'
import Privilege from '../../components/ppages/administration/privilege/Privilege.vue'
import UserAddMultiple from '../../components/ppages/administration/user/UserAddMultiple.vue'

// Data variables
const route = useRoute()
const is = shallowRef(User)

// Methods
function setIs(component: any, search: string | null) {
    is.value = component
    route.meta.search = search
}
</script>

<template>
    <div class="container">
        <nav class="mb-5">
            <div class="nav nav-tabs" id="nav-tab" role="tablist">
                <button @click="setIs(Group, 'group')" class="nav-link" data-bs-toggle="tab">Groups</button>
                <button @click="setIs(User, 'user')" class="nav-link active" data-bs-toggle="tab">Users</button>
                <button @click="setIs(Role, 'role')" class="nav-link" data-bs-toggle="tab">Roles</button>
                <button @click="setIs(Privilege, 'privilege')" class="nav-link" data-bs-toggle="tab">Privileges</button>
                <button @click="setIs(Group, null)" class="nav-link" data-bs-toggle="tab">
                    <i class="bi bi-plus-lg"></i>
                    Add Multiple
                </button>
            </div>
        </nav>
        <component :is="is"></component>
    </div>
</template>