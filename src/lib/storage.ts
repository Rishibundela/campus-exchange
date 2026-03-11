import { supabase } from "./supabase";

export async function uploadImage(file: File): Promise<string> {
  const userId = (await supabase.auth.getUser()).data.user?.id;
  if (!userId) throw new Error("Must be authenticated to upload images");

  const ext = file.name.split(".").pop();
  const fileName = `${userId}/${Date.now()}.${ext}`;

  const { error } = await supabase.storage
    .from("item-images")
    .upload(fileName, file, { upsert: false });
  if (error) throw error;

  const { data } = supabase.storage
    .from("item-images")
    .getPublicUrl(fileName);
  return data.publicUrl;
}
