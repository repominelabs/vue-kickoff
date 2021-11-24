// src/components/HelloWorld.spec.ts
import { mount } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'
import theHeader from '../../../../src/components/common/theHeader.vue'

describe('theHeader.vue', () => {
    it('should display header text', () => {
        const i18n = createI18n({
            // vue-i18n options here ...
        })

        const wrapper = mount(theHeader, {
            global: {
                plugins: [i18n]
            }
        })

        expect(wrapper.vm.t).toBeTruthy()
    })
})