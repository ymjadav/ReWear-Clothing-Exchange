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

  await supabase
    .from("users")
    .upsert({
      id: data.user?.id,
      name: `${data.user?.user_metadata.first_name || ""} ${
        data.user?.user_metadata.last_name || ""
      }`,
      avatar: data.user?.user_metadata.avatar_url || "",
      location: data.user?.user_metadata.location || "",
    })
    .single();

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

export async function getItemsByUser(userId: string) {
  const { data, error } = await supabase
    .from("items")
    .select("*")
    .eq("user_id", userId);

  if (error) throw error;
  return data;
}

export async function getOtherUsersItems(userId: string) {
  const { data, error } = await supabase
    .from("items")
    .select("*")
    .not("user_id", "eq", userId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

export async function searchItems(searchTerm: string) {
  // Searches only the title for the searchTerm (case-insensitive)
  const { data, error } = await supabase
    .from("items")
    .select("*")
    .ilike("title", `%${searchTerm}%`);

  if (error) throw error;
  return data;
}

export async function getItemById(itemId: string) {
  const { data, error } = await supabase
    .from("items")
    .select("*")
    .eq("id", itemId)
    .single();

  if (error) throw error;
  if (!data) throw new Error("Item not found");

  const uploaderUser = await supabase
    .from("users")
    .select("*")
    .eq("id", data.user_id)
    .single();
  console.log("Uploader user data:", uploaderUser);
  if (uploaderUser.error) throw uploaderUser.error;
  return {
    ...data,
    uploader: uploaderUser.data,
  };
}

export async function updateItem(
  itemId: string,
  updates: Partial<{
    title: string;
    description: string;
    category: string;
    size: string;
    condition: string;
    brand?: string;
    color?: string;
    tags?: string[];
    images?: string[];
  }>
) {
  const { data, error } = await supabase
    .from("items")
    .update(updates)
    .eq("id", itemId)
    .select("*")
    .single();

  if (error) throw error;
  return data;
}

export async function deleteItem(itemId: string) {
  const { error } = await supabase.from("items").delete().eq("id", itemId);
  if (error) throw error;
  return true;
}

export const createSwapRequest = async (
  itemId: string,
  requestedItemId: string,
  requesterId: string
) => {
  const { data, error } = await supabase
    .from("swap_requests")
    .insert([
      {
        item_id: itemId,
        requested_item_id: requestedItemId,
        requester_id: requesterId,
      },
    ])
    .select("*")
    .single();

  if (error) throw error;
  return data;
};
export const getSwapRequestsByItem = async (itemId: string) => {
  const { data, error } = await supabase
    .from("swap_requests")
    .select("*")
    .eq("item_id", itemId);

  if (error) throw error;
  return data;
};
