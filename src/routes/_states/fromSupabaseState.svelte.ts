import type { SupabaseClient } from '@supabase/supabase-js';
import { getContext, setContext } from 'svelte';

class SupabaseState {
  private supabase = $state<SupabaseClient>();

  set(p: SupabaseClient) {
    this.supabase = p;
  }

  get() {
    return this.supabase;
  }
}

const SUPABASE_KEY = Symbol('supabaseKey');

export const initSupabase = () => {
  return setContext(SUPABASE_KEY, new SupabaseState());
};

export const fromSupabaseState = () => {
  return getContext<ReturnType<typeof initSupabase>>(SUPABASE_KEY);
};
