const getItem = JSON.parse(localStorage.getItem('items'));
const dataList= [];

for(let item of getItem) {
    await fetch(`http://localhost:3000/api/products/${item.id}`)
    .then(response => response.json())
    .then(data => {
        data.color = item.color;
        data.quantity = Number(item.quantity);
        data.id= item.id;
        dataList.push(data);
    })
};
const listItem =  function() {
    for(let item of dataList) {
        const section = document.getElementById("cart__items")
        section.innerHTML += 
        `<article class="cart__item" data-id="${item._id}" data-color="${item.color}">
            <div class="cart__item__img">
                <img src="${item.imageUrl}" alt="${item.altTxt}">
            </div>
            <div class="cart__item__content">
                <div class="cart__item__content__description">
                    <h2>${item.name}</h2>
                    <p>${item.color}</p>
                    <p>${item.price} €</p>
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
dataList.sort((a, b) => {
    if (a._id < b._id) {
        return -1;
    }
    if (a._id > b._id) {
        return 1;
    }
    return 0
})
listItem()

const articles = document.querySelectorAll('.cart__item')
const displayTotalPrice = document.getElementById('totalPrice')
const totalQty = document.getElementById('totalQuantity')

const totalQuantity = function() {
    let totalItemQty = dataList.map(item => item.quantity).reduce((pre, curr) => pre + curr, 0)
    totalQty.innerHTML = totalItemQty 
}
totalQuantity()

const totalPrice = function() {
    for(let article of articles) {
        let item = dataList.find(element => element.id === article.dataset.id && element.color === article.dataset.color)
        item.subTotal = item.quantity * item.price;
        let totalItemPrice = dataList.map(item => item.subTotal).reduce((pre, curr) => pre + curr, 0)
        localStorage.setItem('items', JSON.stringify(dataList));
        displayTotalPrice.innerHTML = totalItemPrice;
        console.log(item.subTotal)
    }
}
totalPrice()
    
const changeTotal = function() {
    let changeQty = document.querySelectorAll('.itemQuantity')
    for(let qty of changeQty) {
        qty.addEventListener('change', (e) => {
            let item = dataList.find(element => element.id === qty.dataset.id && element.color === qty.dataset.color)
            item.quantity = Number(e.target.value)
            let totalItemQty = dataList.map(item => item.quantity).reduce((pre, curr) => pre + curr, 0)
            totalQty.innerHTML = totalItemQty;
            item.subTotal = item.quantity * item.price;
            let totalItemPrice = dataList.map(item => item.subTotal).reduce((pre, curr) => pre + curr, 0)
            console.log(dataList)
            localStorage.setItem('items', JSON.stringify(dataList));
            displayTotalPrice.innerHTML = totalItemPrice 
        })
    }
}
changeTotal()

    // dataList.sort((a, b) => {
    //     if (a._id < b._id) {
    //         return -1;
    //     }
    //     if (a._id > b._id) {
    //         return 1;
    //     }
    //     return 0
    // })

// let firstName = document.getElementById('firstName')
// let firstNameErrorMsg = document.getElementById('firstNameErrorMsg')
// firstName.addEventListener('blur', (e) => {
//     let text = e.target.value
//     let regex = new RegExp(/^[a-zA-Zéêëèîïâäçù ,'-]{3,20}$/)
//     if(!regex.test(text)) {
//         firstNameErrorMsg.innerHTML = "Veuillez saisir votre prénom"
//     }
//     else {
//         firstNameErrorMsg.innerHTML = ""
//     }
// })

// let lastName = document.getElementById('lastName')
// let lastNameErrorMsg = document.getElementById('lastNameErrorMsg')
// lastName.addEventListener('blur', (e) => {
//     let text = e.target.value
//     let regex = new RegExp(/^[a-zA-Zéêëèîïâäçù ,'-]{3,20}$/)
//     if(!regex.test(text)) {
//         lastNameErrorMsg.innerHTML = "Veuillez saisir votre nom"
//     }
//     else {
//         lastNameErrorMsg.innerHTML = ""
//     }
// })

// let address = document.getElementById('address')
// let addressErrorMsg = document.getElementById('addressErrorMsg')
// address.addEventListener('blur', (e) => {
//     let text = e.target.value
//     let regex = new RegExp(/^[0-9]{1,3}[a-zA-Zéêëèîïâäçù ,'-]{3,30}$/)
//     if(!regex.test(text)) {
//         addressErrorMsg.innerHTML = "Veuillez saisir votre adresse"
//     }
//     else {
//         addressErrorMsg.innerHTML = ""
//     }
// })

// let city = document.getElementById('city')
// let cityErrorMsg = document.getElementById('cityErrorMsg')
// city.addEventListener('blur', (e) => {
//     let text = e.target.value
//     let regex = new RegExp(/^[a-zA-Zéêëèîïâäçù ,'-]{3,20}$/)
//     if(!regex.test(text)) {
//         cityErrorMsg.innerHTML = "Veuillez saisir votre ville"
//     }
//     else {
//         cityErrorMsg.innerHTML = ""
//     }
// })

// let email = document.getElementById('email')
// let emailErrorMsg = document.getElementById('emailErrorMsg')
// email.addEventListener('blur', (e) => {
//     let text = e.target.value
//     let regex = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
//     if(!regex.test(text)) {
//         emailErrorMsg.innerHTML = "Email invalide"
//     }
//     else {
//         emailErrorMsg.innerHTML = ""
//     }
// })

// let order = document.getElementById('order')
// order.addEventListener('click', (e) => {
//     e.preventDefault(e)
//     let products = dataList.map(product => product.id)
//     let contact = {
//         firstName: firstName.value,
//         lastName: lastName.value,
//         address: address.value,
//         city: city.value,
//         email: email.value
//     }
    
//     fetch("http://localhost:3000/api/products/order", {
//         method: "POST",
//         headers: {
//             'Content-Type': 'application/json',
//             "Accept": "application/json"
//         },
//         body: JSON.stringify({contact, products})
//     })
//     .then(response => {
//         if(response.status === 201) {
//             return response.json()
//         }
//     })
//     .then(data => {
//         if(dataList && contact) {
//             window.location.href = `confirmation.html?orderId=${data.orderId}`;
//             let dataList = []
//             localStorage.setItem('itemstest', JSON.stringify(dataList));
//         }
//     })
// })
