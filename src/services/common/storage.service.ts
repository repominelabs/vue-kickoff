class StorageService {
    private static _instance?: StorageService

    // Fetches singleton object, so only one object is statically preserved in run time
    public static getInstance(): StorageService {
        if (!this._instance) this._instance = new StorageService()

        return this._instance
    }

    public setItem = (key: string, value: any) => {
        const byteValue = btoa(value)
        localStorage.setItem(key, byteValue)
    }

    public getItem = (key: string): any => {
        const value = localStorage.getItem(key) || ''
        return atob(value)
    }

    public removeItem = (key: string) => {
        localStorage.removeItem(key)
    }

    public removeItems = (keys: string[]) => {
        for (const key in keys) {
            localStorage.removeItem(key)
        }
    }

    public clear = () => {
        localStorage.clear()
    }
}

export default StorageService.getInstance()