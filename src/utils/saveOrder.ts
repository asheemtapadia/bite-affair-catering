import { supabase } from "@/lib/supabase";

export const saveOrder = async () => {

  const { data, error } = await supabase
    .from("orders")
    .insert([
      {
        customer_name: "Test Customer",
        phone: "9999999999",
        package: "Standard Veg",
        guests: 20,
        status: "pending"
      }
    ]);

  if (error) {
    console.error("Order Error:", error);
    alert("Error saving order");
  } else {
    console.log("Order Saved:", data);
    alert("Test Order Saved!");
  }

};
