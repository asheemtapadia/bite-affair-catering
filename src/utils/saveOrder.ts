import { supabase } from "@/lib/supabase";

export const saveOrder = async () => {

  const { data, error } = await supabase
    .from("orders")
    .insert([
      {
        customer_name: "Test Customer",
        phone: "9999999999",
        package_name: "Standard Veg",
        persons: 20,
        total_price: 9980,
        status: "pending"
      }
    ]);

  if (error) {
    alert("SUPABASE ERROR: " + error.message);
  } else {
    alert("Order saved successfully");
  }

};
