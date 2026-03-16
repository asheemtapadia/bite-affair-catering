import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://sjdbqfcoewdgllzkawfz.supabase.co";
const supabaseKey = "sb_publishable_dLvHOHbs81qBOxE36RXeLg_6543yFY6";

export const supabase = createClient(
  supabaseUrl,
  supabaseKey,
  {
    global: {
      fetch: (...args) => fetch(...args)
    }
  }
);
