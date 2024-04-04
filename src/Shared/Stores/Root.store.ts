import AuthStore from './Auth.store';

// Root store all store present in root store
class Rootstore {
  authStore: AuthStore = new AuthStore();
  //   userStore: UserStore;
  //   constructor() {
  //     this.userStore = new UserStore();
  //   }
}
// const rootStore = new Rootstore();
export default new Rootstore();
