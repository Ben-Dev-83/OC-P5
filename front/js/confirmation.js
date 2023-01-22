const params = new URLSearchParams(document.location.search);
const id = params.get("orderId");
document.querySelector("#orderId").innerHTML = id;