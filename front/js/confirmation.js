let params = new URLSearchParams(document.location.search);
let id = params.get("orderId");
document.querySelector("#orderId").innerHTML = id;