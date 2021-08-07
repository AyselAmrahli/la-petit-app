
export const userToken = {
    
    key: 'acs_tkn',

    set(token: string): void {
        localStorage.setItem(this.key, token);
    },

    get(): string | null {
        return localStorage.getItem(this.key);
    },

    remove():void {
        localStorage.removeItem(this.key);
    },

    isAuthenticated():boolean {
        
    const token = localStorage.getItem(this.key);
  
    if (token && token !== 'undefined' && token !== 'null') return true;
        return false;
    }
};
