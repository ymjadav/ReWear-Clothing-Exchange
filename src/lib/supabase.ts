import { createClient } from "@supabase/supabase-js";

console.log("Supabase URL:", import.meta.env.VITE_SUPABASE_URL);
console.log("Supabase Anon Key:", import.meta.env.VITE_SUPABASE_ANON_KEY);

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function login(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
  return { user: data.user, session: data.session };
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
  return true;
}

export async function registerUser({
  email,
  password,
  confirmPassword,
  firstName,
  lastName,
  agreeToTerms,
}: {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  agreeToTerms: boolean;
}) {
  if (!agreeToTerms) {
    throw new Error("You must agree to the terms.");
  }
  if (!email || !password || !confirmPassword || !firstName || !lastName) {
    throw new Error("All fields are required.");
  }
  if (password !== confirmPassword) {
    throw new Error("Passwords do not match.");
  }
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        first_name: firstName,
        last_name: lastName,
      },
    },
  });
  if (error) throw error;
  return { user: data.user, session: data.session };
}
