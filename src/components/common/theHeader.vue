<script setup lang="ts">
import { ref } from 'vue'

// Data variables
const features = ref([
    { name: 'Mailbox', icon: 'bi bi-mailbox', to: 'mailbox' },
    { name: 'Chat', icon: 'bi bi-chat-square-text', to: 'chat' },
    { name: 'Api Module', icon: 'bi bi-code-slash', to: 'api-module' },
    { name: 'Administration', icon: 'bi bi-shield-lock', to: 'administration' },
    { name: 'Dashboard', icon: 'bi bi-bar-chart', to: 'dashboard' },
])

// Methods
function logout() {
    // auth store logout
}
</script>

<template>
    <div class="container">
        <nav class="py-2">
            <div class="d-flex flex-wrap">
                <!-- Top Left Menu - start -->
                <ul class="nav me-auto">
                    <li class="nav-item">
                        <router-link to="/products" class="nav-link link-dark px-2 active">Products</router-link>
                    </li>
                    <div class="d-flex divider-nav">
                        <div class="vr"></div>
                    </div>
                    <li class="nav-item">
                        <router-link to="/orders" class="nav-link link-dark px-2">Orders</router-link>
                    </li>
                    <div class="d-flex divider-nav">
                        <div class="vr"></div>
                    </div>
                    <li class="nav-item">
                        <router-link to="/pricing" class="nav-link link-dark px-2">Pricing</router-link>
                    </li>
                    <div class="d-flex divider-nav">
                        <div class="vr"></div>
                    </div>
                    <li class="nav-item">
                        <router-link to="/faqs" class="nav-link link-dark px-2">FAQs</router-link>
                    </li>
                    <div class="d-flex divider-nav">
                        <div class="vr"></div>
                    </div>
                    <li class="nav-item">
                        <router-link to="about" class="nav-link link-dark px-2">About</router-link>
                    </li>
                </ul>
                <!-- Top Left Menu - end -->
                <!-- Top Right Menu - start -->
                <ul class="nav">
                    <li class="nav-item">
                        <router-link to="login" class="nav-link link-dark px-2">Login</router-link>
                    </li>
                    <div class="d-flex divider-nav">
                        <div class="vr"></div>
                    </div>
                    <li class="nav-item">
                        <router-link to="register" class="nav-link link-dark px-2">Register</router-link>
                    </li>
                    <div class="d-flex divider-nav">
                        <div class="vr"></div>
                    </div>
                    <li class="nav-item">
                        <a @click="logout" class="nav-link link-dark px-2">Logout</a>
                    </li>
                </ul>
                <!-- Top Right Menu - end -->
            </div>
        </nav>
        <!-- Main Header - start -->
        <header class="d-flex px-4 flex-wrap justify-content-center py-4 border rounded">
            <!-- Header Title - start -->
            <router-link to="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
                <span class="fs-4">Vue Kickoff</span>
            </router-link>
            <!-- Header Title - end -->
            <ul class="nav nav-pills">
                <!-- Features Dropdown Menu - start -->
                <li class="nav-item">
                    <div class="btn-group">
                        <button type="button" class="btn btn-warning dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">Features</button>
                        <ul class="dropdown-menu">
                            <div v-for="(feature, i) in features" :key="i">
                                <li>
                                    <router-link class="dropdown-item" :to="feature.to">
                                        <i :class="[feature.icon]" class="me-2"></i>
                                        {{ feature.name }}
                                    </router-link>
                                </li>
                                <li v-if="i != features.length - 1">
                                    <hr class="dropdown-divider" />
                                </li>
                            </div>
                        </ul>
                    </div>
                </li>
                <!-- Features Dropdown Menu - end -->
                <div class="d-flex divider">
                    <div class="vr"></div>
                </div>
                <!-- Shopping Char Btn - start -->
                <li class="nav-item ml-4">
                    <button type="button" class="btn btn-outline-info position-relative">
                        <i class="bi bi-cart2"></i>
                        <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning">
                            99+
                            <span class="visually-hidden">unread messages</span>
                        </span>
                    </button>
                </li>
                <!-- Shopping Char Btn - end -->
            </ul>
        </header>
        <!-- Main Header - end -->
    </div>
</template>

<style scoped>
.divider {
    height: 20px;
    margin-left: 10px;
    margin-right: 10px;
    margin-top: 10px;
}

.divider-nav {
    height: 20px;
    margin-left: 5px;
    margin-right: 5px;
    margin-top: 11px;
}
</style>