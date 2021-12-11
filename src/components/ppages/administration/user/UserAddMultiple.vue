<script setup lang='ts'>
import { ref, getCurrentInstance } from 'vue'
import { useStore } from 'vuex'

// Data variables
const app = getCurrentInstance()
const $toast = app?.appContext.config.globalProperties.$toast
const $swal = app?.appContext.config.globalProperties.$swal
const $xlsx = app?.appContext.config.globalProperties.$xlsx
const store = useStore()
const users = ref()
const headers = ['First Name', 'Last Name', 'Gender', 'Country', 'Age', 'Date', 'Id']

// Methods
function upload(e: Event) {
    const files = e?.target?.files
    if (!files.length) {
        return
    } else if (!/\.(xls|xlsx)$/.test(files[0].name.toLowerCase())) {
        return $swal.fire('', 'The upload format is incorrect. Please upload xls or xlsx format.', 'error')
    }
    const fileReader = new FileReader()
    fileReader.onload = ev => {
        try {
            const data = ev.target.result
            const workbook = $xlsx.read(data, {
                type: 'binary'
            })
            const wsname = workbook.SheetNames[0] // Take the first sheet，wb.SheetNames[0] :Take the name of the first sheet in the sheets
            users.value = $xlsx.utils.sheet_to_json(workbook.Sheets[wsname]) // Generate JSON table content，wb.Sheets[Sheet名]    Get the data of the first sheet
        } catch (e) {
            return $swal.fire('', 'Read failure.', 'error')
        }
    }
    fileReader.readAsBinaryString(files[0]);
}

async function saveMultipleUserAsync() {
    await store.dispatch('identity/user/saveMultipleUserAsync', users.value).then(resp => {
        $toast.fire({ icon: 'success', title: 'User created' })
    }).catch(err => {
        $toast.fire({ icon: 'error', title: 'Create user failed' })
    })
}
</script>

<template>
    <div class="card mb-5">
        <div class="card-body">
            <h5 class="card-title">
                <i class="bi bi-people"></i>
                Add multiple user
            </h5>
            <h6 class="card-subtitle mb-2 text-muted">Creating multiple users via files</h6>
            <div class="input-group my-4 w-50">
                <input @change="upload" type="file" class="form-control" />
                <button @click="saveMultipleUserAsync" class="btn btn-light border" type="button">
                    <i class="bi bi-upload text-black"></i>
                </button>
            </div>
            <div class="card-text mt-3">
                <div v-if="!users" class="alert alert-warning alert-dismissible fade show" role="alert">
                    <strong>Warning!</strong> Files must be selected in the specified (.csv, .xls, .xlsx) formats
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            </div>
            <div class="card-text" style="overflow-x: auto; overflow-y: auto; max-height: 600px">
                <table class="table table-hover" v-if="users">
                    <thead>
                        <tr>
                            <th class="table-light" colspan="2">#</th>
                            <th class="table-light" colspan="2" v-for="(header, i) in headers" :key="i">{{ header }}</th>
                            <th class="table-light" colspan="2">Test</th>
                            <th class="table-light" colspan="2">Test</th>
                            <th class="table-light" colspan="2">Test</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(user, i) in users" :key="i">
                            <th scope="row">{{ ++i }}</th>
                            <td colspan="2" v-for="(header, j) in headers" :key="j">{{ user[header] }}</td>
                            <td colspan="2">Test</td>
                            <td colspan="2">Test</td>
                            <td colspan="2">Test</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>