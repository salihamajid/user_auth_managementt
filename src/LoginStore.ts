import { create } from 'zustand';

interface LoginStore {
  isLogin: boolean;
  setIsLogin: (login: boolean) => void;
}

const useLoginStore = create<LoginStore>((set: (arg0: () => { isLogin: any; }) => any) => ({
  isLogin: false,
  setIsLogin: (login: any) =>
    set(() => ({
      isLogin: login,
    })),
}));

export default useLoginStore;
