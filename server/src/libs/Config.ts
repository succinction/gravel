import config from '../config.json'

class Config {
    state!: any

    constructor() {
        this.state = config.default
        this.state.env = process.env.NODE_ENV || 'test'
        Object.assign(this.state, (config as any)[this.state.env])        
    }

    /**
     * Get
     */
    get(path: string, defaulter = ''): string {
        return this.state[path] || defaulter
    }

}


export default new Config()
