// src/components/HelloWorld.spec.ts
import { mount } from '@vue/test-utils'
import theHeader from '../../../../src/components/common/theHeader.vue'

describe('theHeader', () => {
    it('should display header text', () => {
        // const msg = 'Hello Vue 3'
        const wrapper = mount(theHeader)

        expect(wrapper.find('h1').text()).toEqual('Hello')
    })
})