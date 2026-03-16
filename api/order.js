import { createClient } from "@supabase/supabase-js";

export default async function handler(req, res) {

const supabase = createClient(
"https://sjdbqfcoewdgllzkawfz.supabase.co",
process.env.SUPABASE_SERVICE_ROLE_KEY
);

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
return res.status(500).json({error:error.message});
}

return res.status(200).json({success:true,data});

}
