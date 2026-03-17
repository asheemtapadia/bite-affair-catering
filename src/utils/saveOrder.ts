export const saveOrder = async (orderData: any) => {

  try {

    const res = await fetch("/api/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(orderData)
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.error || "Failed");
    }

    alert("Order saved successfully");

  } catch (err: any) {
    console.error(err);
    alert("Error saving order");
  }

};
