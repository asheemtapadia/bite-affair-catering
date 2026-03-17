import { supabase } from "@/lib/supabase";

export const saveOrder = async (orderData: any) => {

  const { data, error } = await supabase
    .from("orders")
    .insert([orderData]);

  if (error) {
    console.error("Order Error:", error);
    alert("Error saving order");
  } else {
    alert("Order saved successfully");
  }

};
