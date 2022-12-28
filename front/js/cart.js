const getItem = JSON.parse(localStorage.getItem('items'));
const dataList= [];

for(let item of getItem) {
    await fetch(`http://localhost:3000/api/products/${item.id}`)
    .then(response => response.json())
    .then(data => {
        dataList.push({...data, color: item.color, quantity: Number(item.quantity), id: item.id});
    })
};
const section = document.getElementById("cart__items")

const listItem =  function() {
    for(let item of dataList) {
        section.innerHTML += 
            `<article class="cart__item" data-id="${item._id}" data-color="${item.color}">
                <div class="cart__item__img">
                    <img src="${item.imageUrl}" alt="${item.altTxt}">
                </div>
                <div class="cart__item__content">
                    <div class="cart__item__content__description">
                        <h2>${item.name}</h2>
                        <p>${item.color}</p>
                        <p>${Number(item.price)} €</p>
                    </div>
                    <div class="cart__item__content__settings">
                        <div class="cart__item__content__settings__quantity">
                            <p>Qté :</p>
                            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" data-id="${item._id}" data-color="${item.color}" value=${Number(item.quantity)}>
                        </div>
                        <div class="cart__item__content__settings__delete">
                            <p class="deleteItem">Supprimer</p>
                        </div>
                    </div>
                </div>
            </article>`;
    }
}
if(dataList.length === 0){
    section.innerHTML +=`<p>Votre panier est vide</p>`
}
dataList.sort((a, b) => {
    if (a._id < b._id) {
        return -1;
    }
    if (a._id > b._id) {
        return 1;
    }
    return 0;
})
listItem()

const articles = document.querySelectorAll('.cart__item');
const totalQty = document.getElementById('totalQuantity');
const displayTotalPrice = document.getElementById('totalPrice');
displayTotalPrice.innerText = 0

const totalQuantity = function() {
    let totalItemQty = dataList.map(item => item.quantity).reduce((pre, curr) => pre + curr, 0);
    totalQty.innerHTML = totalItemQty ;
}
totalQuantity()

const totalPrice = function() {
    for(let article of articles) {
        let item = dataList.find(element => element.id === article.dataset.id && element.color === article.dataset.color)
        item.subTotal = item.quantity * item.price;
        displayTotalPrice.innerHTML = dataList.map(item => item.subTotal).reduce((pre, curr) => pre + curr, 0);
    }
}
totalPrice()
    
const changeTotal = function() {
    let changeQty = document.querySelectorAll('.itemQuantity');
    for(let qty of changeQty) {
        qty.addEventListener('change', (e) => {
            const getItem = JSON.parse(localStorage.getItem('items'));
            let getItemList = getItem.find(element => element.id === qty.dataset.id && element.color === qty.dataset.color);
            let item = dataList.find(element => element.id === qty.dataset.id && element.color === qty.dataset.color);
            getItemList.quantity = Number(e.target.value);
            let totalItemQty = getItem.map(item => item.quantity).reduce((pre, curr) => pre + curr, 0);
            totalQty.innerHTML = totalItemQty;
            item.subTotal = getItemList.quantity * item.price;
            let totalItemPrice = dataList.map(item => item.subTotal).reduce((pre, curr) => pre + curr, 0);
            localStorage.setItem('items', JSON.stringify(getItem));
            displayTotalPrice.innerHTML = totalItemPrice;
        })
    }
}
changeTotal()

const dltSelectItem = function() {
    const deleteItems = document.querySelectorAll('.deleteItem')
    deleteItems.forEach(deleteItem => {
        deleteItem.addEventListener("click", (e) => {
            e.preventDefault()
            const getItem = JSON.parse(localStorage.getItem('items'));
            const articleDlt = deleteItem.closest('article')
            let dataFilter = dataList.filter(product => product.id !== articleDlt.dataset.id || product.color !== articleDlt.dataset.color)
            let itemsFilter = getItem.filter(product => product.id !== articleDlt.dataset.id || product.color !== articleDlt.dataset.color)
            localStorage.setItem('items', JSON.stringify(itemsFilter));
            dataFilter.subTotal = dataFilter.price * getItem.quantity
            articleDlt.remove()
            displayTotalPrice.innerHTML = dataFilter.map(item => item.subTotal).reduce((pre, curr) => pre + curr, 0) 
            totalQty.innerHTML = itemsFilter.map(item => item.quantity).reduce((pre, curr) => pre + curr, 0);

            if(itemsFilter.length === 0){
                return section.innerHTML +=`<p>Votre panier est vide</p>`
            }
        })
    })
}
dltSelectItem()      

const firstName = document.getElementById('firstName')
const lastName = document.getElementById('lastName')
const address = document.getElementById('address')
const city = document.getElementById('city')
const email = document.getElementById('email')

const firstNameErrorMsg = document.getElementById('firstNameErrorMsg')
const errorFirstName = function() {
    firstName.addEventListener('input', (e) => {
        let regex = new RegExp(/^[a-zA-Zéêëèîïâäçù ,'-]{3,20}$/)
        if(!regex.test(e.target.value)) {
            firstNameErrorMsg.style.display = "block"
            firstNameErrorMsg.innerText = "Veuillez saisir un prénom valide"
        }
        if(regex.test(e.target.value) || e.target.value.length === 0) {
            firstNameErrorMsg.style.display = "none"
        }
    })
} 
errorFirstName()

let lastNameErrorMsg = document.getElementById('lastNameErrorMsg')
const errorLastName = function() {
    lastName.addEventListener('input', (e) => {
        let regex = new RegExp(/^[a-zA-Zéêëèîïâäçù ,'-]{3,20}$/)
        if(!regex.test(e.target.value)) {
            lastNameErrorMsg.style.display = "block"
            lastNameErrorMsg.innerText = "Veuillez saisir un nom valide"
        }
        if(regex.test(e.target.value) || e.target.value.length === 0) {
            lastNameErrorMsg.style.display = "none"
        }
    })
}
errorLastName()

let addressErrorMsg = document.getElementById('addressErrorMsg')
const errorAddress = function() {
    address.addEventListener('input', (e) => {
        let regex = new RegExp(/^[0-9]{1,3}[a-zA-Zéêëèîïâäçù ,'-]{3,30}$/)
        console.log(regex.test(e.target.value))
        if(!regex.test(e.target.value)) {
            addressErrorMsg.style.display = "block"
            addressErrorMsg.innerText = "Veuillez saisir une adresse valide"
        }
        if(regex.test(e.target.value) || e.target.value.length === 0) {
            addressErrorMsg.style.display = "none"
        }
    }) 
}
errorAddress()

let cityErrorMsg = document.getElementById('cityErrorMsg')
const errorCity = function() {
    city.addEventListener('input', (e) => {
        let regex = new RegExp(/^[a-zA-Zéêëèîïâäçù ,'-]{3,20}$/)
        if(!regex.test(e.target.value)) {
            cityErrorMsg.style.display = "block"
            cityErrorMsg.innerText = "Veuillez saisir votre ville"
        }
        if(regex.test(e.target.value) || e.target.value.length === 0) {
            cityErrorMsg.style.display = "none"
        }
    })
}
errorCity()

let emailErrorMsg = document.getElementById('emailErrorMsg')
const errorEmail = function() {
    email.addEventListener('input', (e) => {
        let regex = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
        if(!regex.test(e.target.value)) {
            emailErrorMsg.style.display = "block"
            emailErrorMsg.innerHTML = "Veuillez saisir un email valide"
        } 
        if(regex.test(e.target.value) || e.target.value.length ===0) {
            emailErrorMsg.style.display = "none"
        }
    })
}
errorEmail()

let order = document.getElementById('order')
order.addEventListener('click', (e) => {
    e.preventDefault(e)
    errorFirstName()
    if(firstName.value.length, lastName.value.length, address.value.length, city.value.length, email.value.length  === 0) {
        firstNameErrorMsg.style.display = "block"
        firstNameErrorMsg.innerText = "Veuillez saisir votre prénom"
        lastNameErrorMsg.style.display = "block"
        lastNameErrorMsg.innerText = "Veuillez saisir votre nom"
        addressErrorMsg.style.display = "block"
        addressErrorMsg.innerText = "Veuillez saisir votre adresse"
        cityErrorMsg.style.display = "block"
        cityErrorMsg.innerText = "Veuillez saisir votre ville"
        emailErrorMsg.style.display = "block"
        emailErrorMsg.innerText = "Email invalide"
    } else {
        firstNameErrorMsg.style.display = "none"
        lastNameErrorMsg.style.display = "none"
        addressErrorMsg.style.display = "none"
        cityErrorMsg.style.display = "none"
        emailErrorMsg.style.display = "none"
    }

    let products = dataList.map(product => product.id)
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
        if(dataList && contact) {
            window.location.href = `confirmation.html?orderId=${data.orderId}`;
            let dataList = []
            localStorage.setItem('items', JSON.stringify(dataList));
        }
    })
})
