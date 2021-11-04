<script setup lang="ts">
import { ref } from 'vue'
import { IUser } from '../../../../types'

const users: IUser[] | null = ref<IUser[] | null>(null)
</script>

<template>
    <div class="card">
        <div class="card-body">
            <h5 class="card-title">
                <i class="bi bi-plus"></i>
                Add Multiple User
            </h5>
            <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
            <div class="input-group my-4">
                <input type="file" class="form-control" />
                <button class="btn btn-outline-secondary" type="button">Button</button>
            </div>
        </div>
    </div>
</template>