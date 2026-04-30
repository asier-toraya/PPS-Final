import { createClient } from "@supabase/supabase-js";
import { isNativePlatform } from "../config/platform";

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
  {
    auth: {
      detectSessionInUrl: !isNativePlatform(),
      flowType: "pkce"
    }
  }
);

