import type { User } from '@supabase/supabase-js';
import { getContext, setContext } from 'svelte';

class UserState {
  private user = $state<User | null>(null);

  setUser(p: User | null) {
    this.user = p;
  }

  getUser() {
    return this.user;
  }
}

const USER_KEY = Symbol('userKey');

export const initUserState = () => {
  return setContext(USER_KEY, new UserState());
};

export const fromUserState = () => {
  return getContext<ReturnType<typeof initUserState>>(USER_KEY);
};
