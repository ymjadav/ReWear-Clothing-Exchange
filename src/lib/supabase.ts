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

export async function getUser() {
  const { data, error } = await supabase.auth.getUser();
  if (error) throw error;
  return data.user;
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

export async function uploadImage(
  file: File,
  bucket: string = "rewear-images",
  path?: string
): Promise<string> {
  if (!file) throw new Error("No file provided.");

  const filePath = path || `${Date.now()}_${file.name}`;
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) throw error;

  // Get public URL
  const { data: urlData } = supabase.storage
    .from(bucket)
    .getPublicUrl(filePath);
  if (!urlData?.publicUrl) throw new Error("Could not get public URL.");

  return urlData.publicUrl;
}

export async function deleteImage(
  filePath: string,
  bucket: string = "rewear-images"
): Promise<void> {
  const { error } = await supabase.storage.from(bucket).remove([filePath]);
  if (error) throw error;
}

export async function addItem(item: {
  user_id: string;
  title: string;
  description: string;
  category: string;
  size: string;
  condition: string;
  brand?: string;
  color?: string;
  tags?: string[];
  images?: string[];
}): Promise<{ id: string }> {
  const { data, error } = await supabase
    .from("items")
    .insert([item])
    .select("id")
    .single();

  if (error) throw error;
  return { id: data.id };
}
