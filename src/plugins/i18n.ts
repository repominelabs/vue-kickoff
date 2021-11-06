import { createI18n } from 'vue-i18n'
import { tr, en, de, fr, es, cn } from '../utils/locales'

// The structure of the locale message is the hierarchical object structure with each locale as the top property
const messages = { tr, en, de, fr, es, cn }

export const i18n = createI18n({
    locale: 'en',
    fallbackLocale: 'en',
    messages,
    silentFallbackWarn: true
})