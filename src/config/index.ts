import development from './development'
import production from './production'

const config = (import.meta.env.NODE_ENV === 'production') ? production : development;

export default config;