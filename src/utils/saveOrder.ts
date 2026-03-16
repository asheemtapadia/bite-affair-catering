export const saveOrder = async () => {

try {

const response = await fetch("/api/order", {
method: "POST"
});

const data = await response.json();

alert("Order saved successfully");

console.log(data);

} catch (error) {

alert("Error saving order");

console.error(error);

}

};
