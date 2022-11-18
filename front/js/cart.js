let getItem = JSON.parse(localStorage.getItem('items'));
getItem.sort((a, b) => {
    if (a.id < b.id) {
      return -1;
    }
    if (a.id > b.id) {
      return 1;
    }
    return 0
})
let numberInit = 0
let initPrice = 0
for(let item of getItem) {

    fetch(`http://localhost:3000/api/products/${item.id}`)
    .then(response => response.json())
    .then(data => {

    let section = document.getElementById("cart__items")
    let article = document.createElement("article")

    article.classList.add("cart__item")
    section.appendChild(article)
    article.dataId = item.id
    article.dataColor = item.color

    let divImg = document.createElement("div")
    divImg.classList.add("cart__item__img")
    article.appendChild(divImg)
    
    let img = document.createElement("img")
    img.src = data.imageUrl
    img.alt = data.altTxt
    divImg.appendChild(img)

    let divContent = document.createElement("div")
    divContent.classList.add("cart__item__content")
    article.appendChild(divContent)

    let contentDescription =document.createElement("div")
    contentDescription.classList.add("cart__item__content__description")
    divContent.appendChild(contentDescription)

    let itemTitle =document.createElement("h2");
    itemTitle.innerText = data.name;
    contentDescription.appendChild(itemTitle);

    let color =document.createElement("p");
    color.innerText = item.color;
    contentDescription.appendChild(color);

    let quantity =document.createElement("p");
    quantity.innerText = `${data.price} €`;
    contentDescription.appendChild(quantity);

    let Contentsettings = document.createElement("div");
    Contentsettings.classList.add("cart__item__content__settings");
    divContent.appendChild(Contentsettings);
    
    let Contentquantity =document.createElement("p");
    Contentquantity.classList.add("cart__item__content__settings__quantity");
    quantity.innerText = `Qté: ${item.quantity}`;
    Contentsettings.appendChild(Contentquantity);

    let price =document.createElement("p");
    Contentquantity.classList.add("cart__item__content__settings__quantity");
    quantity.innerText = `${data.price} €`;
    Contentquantity.append(price);

    let addQuantity =document.createElement("input");
    addQuantity.name = "itemQuantity";
    addQuantity.value = item.quantity;
    addQuantity.min = 1;
    addQuantity.max = 100;
    addQuantity.type = "number";
    addQuantity.classList.add("itemQuantity");
    Contentsettings.appendChild(addQuantity);
    
    let totalQty = document.getElementById("totalQuantity");
    const total = getItem.map(item => item.quantity).reduce((pre, curr) => pre +curr, 0);
    totalQty.innerHTML = total;

    let totalPrice = document.getElementById("totalPrice");
    if(data._id === item.id) {
        item.price = data.price
        item.subTotal = item.quantity * item.price
        let totalItemPrice = getItem.map(item => item.subTotal).reduce((pre, curr) => pre + curr, 0)
        totalPrice.innerHTML = totalItemPrice 
    }
    
    addQuantity.addEventListener('change', (e) =>{
        item.quantity = Number(e.target.value);
        localStorage.setItem('items', JSON.stringify(getItem));
        const total = getItem.map(item =>item.quantity).reduce((pre, curr) => pre +curr, 0);
        totalQty.innerHTML = total;

        if(data._id === item.id) {
            item.subTotal = item.quantity * item.price
            let totalItemPrice = getItem.map(item => item.subTotal).reduce((pre, curr) => pre + curr, 0)
            totalPrice.innerHTML = totalItemPrice 
        }
    })
    
    let divDelete = document.createElement("div")
    divDelete.classList.add("cart__item__content__settings__delete")
    Contentsettings.appendChild(divDelete)
    
    let deleteItem = document.createElement("p")
    deleteItem.classList.add("deleteItem")
    deleteItem.innerText = "Supprimer"
    let dataId = article.dataset.id = item.id
    let dataColor = article.dataset.color = item.color
    divDelete.appendChild(deleteItem)
    deleteItem.addEventListener("click", () => {
        deleteItem.closest(".cart__item")
        section.removeChild(article)
        let itemsFilter = getItem.filter(cart => cart.id !== dataId || cart.color !== dataColor)
        let newItem = itemsFilter
        localStorage.setItem('items', JSON.stringify(newItem));
        item.price = data.price
        item.subTotal = item.price
        let totalItemPrice = itemsFilter.map(item => item.subTotal).reduce((pre, curr) => pre + curr, 0)
        let totalQuantity = itemsFilter.map(item => item.quantity).reduce((pre, curr) => pre + curr, 0)
        totalPrice.innerHTML = totalItemPrice 
        totalQty.innerHTML = totalQuantity;
        location.reload();
    })

    let firstName = document.getElementById('firstName')
    let firstNameErrorMsg = document.getElementById('firstNameErrorMsg')
    firstName.addEventListener('blur', (e) => {
        let text = e.target.value
        let regex = new RegExp(/^[a-zA-Zéêëèîïâäçù ,'-]{3,20}$/)
        if(!regex.test(text)) {
            firstNameErrorMsg.innerHTML = "Veuillez saisir votre prénom"
        }
        else {
            firstNameErrorMsg.innerHTML = ""
        }
    })

    let lastName = document.getElementById('lastName')
    let lastNameErrorMsg = document.getElementById('lastNameErrorMsg')
    lastName.addEventListener('blur', (e) => {
        let text = e.target.value
        let regex = new RegExp(/^[a-zA-Zéêëèîïâäçù ,'-]{3,20}$/)
        if(!regex.test(text)) {
            lastNameErrorMsg.innerHTML = "Veuillez saisir votre nom"
        }
        else {
            lastNameErrorMsg.innerHTML = ""
        }
    })

    let address = document.getElementById('address')
    let addressErrorMsg = document.getElementById('addressErrorMsg')
    address.addEventListener('blur', (e) => {
        let text = e.target.value
        let regex = new RegExp(/^[0-9]{1,3}[a-zA-Zéêëèîïâäçù ,'-]{3,30}$/)
        if(!regex.test(text)) {
            addressErrorMsg.innerHTML = "Veuillez saisir votre adresse"
        }
        else {
            addressErrorMsg.innerHTML = ""
        }
    })

    let city = document.getElementById('city')
    let cityErrorMsg = document.getElementById('cityErrorMsg')
    city.addEventListener('blur', (e) => {
        let text = e.target.value
        let regex = new RegExp(/^[a-zA-Zéêëèîïâäçù ,'-]{3,20}$/)
        if(!regex.test(text)) {
            cityErrorMsg.innerHTML = "Veuillez saisir votre ville"
        }
        else {
            cityErrorMsg.innerHTML = ""
        }
    })

    let email = document.getElementById('email')
    let emailErrorMsg = document.getElementById('emailErrorMsg')
    email.addEventListener('blur', (e) => {
        let text = e.target.value
        let regex = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
        console.log(regex.test(text))
        if(!regex.test(text)) {
            emailErrorMsg.innerHTML = "Email invalide"
        }
        else {
            emailErrorMsg.innerHTML = ""
        }
    })
    let order = document.getElementById('order')
    order.addEventListener('click', (e) => {
        e.preventDefault(e)
        let products = getItem.map(product => product.id)
        let contact = {
            firstName: firstName.value,
            lastName: lastName.value,
            address: address.value,
            city: city.value,
            email: email.value
        }
        
        fetch("http://localhost:3000/api/products/order", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "Accept": "application/json"
            },
            body: JSON.stringify({contact, products})
        })
        .then(response => {
            if(response.status === 201) {
                return response.json()
            }
        })
        .then(data => {
            window.location.href = `confirmation.html?orderId=${data.orderId}`;
            let getItem = []
            localStorage.setItem('items', JSON.stringify(getItem));

        })
        
    })
})
}