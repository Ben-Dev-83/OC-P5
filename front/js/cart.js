const getItem = JSON.parse(localStorage.getItem('items'));
let dataList= [];
const section = document.getElementById("cart__items")

//Appel de l'api pour récupérer toutes les données des produits
for(let item of getItem) {
    await fetch(`http://localhost:3000/api/products/${item.id}`)
    .then(response => response.json())
    .then(data => {
        dataList.push({...data, color: item.color, quantity: item.quantity, id: item.id});
    })
    .catch(error => {
        section.innerHTML = `<p>Erreur lors dans chargement des produits</p>`
    })
};

//Affichage des produits
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
                        <p>${item.price} €</p>
                    </div>
                    <div class="cart__item__content__settings">
                        <div class="cart__item__content__settings__quantity">
                            <p>Qté :</p>
                            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" data-id="${item._id}" data-color="${item.color}" value=${item.quantity}>
                        </div>
                        <div class="cart__item__content__settings__delete">
                            <p class="deleteItem">Supprimer</p>
                        </div>
                    </div>
                </div>
            </article>`;
    }
}
if(getItem.length === 0){
    section.innerHTML =`<p>Votre panier est vide</p>`
}

//Function pour trier les produits
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
displayTotalPrice.innerText = 0;

//Affiche la quantité totale des produits
const totalQuantity = function() {
    const totalItemQty = dataList.map(item => item.quantity).reduce((pre, curr) => pre + curr, 0);
    totalQty.innerHTML = Number(totalItemQty) ;
}
totalQuantity()

//Affiche le prix total des produits
const totalPrice = function() {
    for(let article of articles) {
        const item = dataList.find(element => element.id === article.dataset.id && element.color === article.dataset.color)
        item.subTotal = item.quantity * item.price;
        displayTotalPrice.innerHTML = dataList.map(item => item.subTotal).reduce((pre, curr) => pre + curr, 0);
    }
}
totalPrice()
    
//Fonction qui modifie le prix et la quantité totale des produits
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

//Function qui permet de supprimer un produit et de modifier le prix et la quantité totale des produits restant
const dltSelectItem = function() {
    const deleteItems = document.querySelectorAll('.deleteItem');
    deleteItems.forEach(deleteItem => {
        deleteItem.addEventListener("click", (e) => {
            e.preventDefault();
            const getItem = JSON.parse(localStorage.getItem('items'));
            const articleDlt = deleteItem.closest('article');
            articleDlt.remove();
            const dataFilter = dataList.filter(product => product.id !== articleDlt.dataset.id || product.color !== articleDlt.dataset.color);
            dataList = dataFilter;
            const itemsFilter = getItem.filter(product => product.id !== articleDlt.dataset.id || product.color !== articleDlt.dataset.color);
            localStorage.setItem('items', JSON.stringify(itemsFilter)); 
            displayTotalPrice.innerHTML = dataList.map(item => item.subTotal).reduce((pre, curr) => pre + curr, 0);
            totalQty.innerHTML = itemsFilter.map(item => item.quantity).reduce((pre, curr) => pre + curr, 0);
            if(itemsFilter.length === 0){
                return section.innerHTML +=`<p>Votre panier est vide</p>`;
            }
        })
    })
}
dltSelectItem()      

//Event pour valider le panier
const order = document.getElementById('order');
order.addEventListener('click', (e) => {
    e.preventDefault()
    
    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const address = document.getElementById('address');
    const city = document.getElementById('city');
    const email = document.getElementById('email');
    const contact = {};

    //Message erreur si le regex n'est pas valide
    const firstNameErrorMsg = document.getElementById('firstNameErrorMsg');
    const errorFirstName = function() {
        const regex = new RegExp(/^[a-zA-Zéêëèîïâäçù ,'-]{3,20}$/);
        if(!regex.test(firstName.value) || firstName.value.length === 0) {
            firstNameErrorMsg.style.display = "block";
            return firstNameErrorMsg.innerText = "Veuillez saisir un prénom valide";
        }
        if(regex.test(firstName.value)) {
            firstNameErrorMsg.style.display = "none";
            contact.firstName = firstName.value;
        }
    } 

    //Message erreur si le regex n'est pas valide
    const lastNameErrorMsg = document.getElementById('lastNameErrorMsg')
    const errorLastName = function() {
        const regex = new RegExp(/^[a-zA-Zéêëèîïâäçù ,'-]{3,20}$/);
        if(!regex.test(lastName.value) || lastName.value.length === 0) {
            lastNameErrorMsg.style.display = "block";
            return lastNameErrorMsg.innerText = "Veuillez saisir un nom valide";
        }
        if(regex.test(lastName.value)) {
            lastNameErrorMsg.style.display = "none";
            contact.lastName = lastName.value;
        }
    }

    //Message erreur si le regex n'est pas valide
    const addressErrorMsg = document.getElementById('addressErrorMsg')
    const errorAddress = function() {
        const regex = new RegExp(/^[0-9]{1,3}[a-zA-Zéêëèîïâäçù ,'-]{3,30}$/);
        if(!regex.test(address.value) || address.value.length === 0) {
            addressErrorMsg.style.display = "block";
            return addressErrorMsg.innerText = "Veuillez saisir une adresse valide";
        }
        if(regex.test(address.value)) {
            addressErrorMsg.style.display = "none";
            contact.address = address.value;
        }
    }

    //Message erreur si le regex n'est pas valide
    const cityErrorMsg = document.getElementById('cityErrorMsg')
    const errorCity = function() {
        const regex = new RegExp(/^[a-zA-Zéêëèîïâäçù ,'-]{3,20}$/);
        if(!regex.test(city.value) || city.value.length === 0) {
            cityErrorMsg.style.display = "block";
            return cityErrorMsg.innerText = "Veuillez saisir une ville valide";
        }
        if(regex.test(city.value)) {
            cityErrorMsg.style.display = "none";
            contact.city = city.value;
        }
    }

    //Message erreur si le regex n'est pas valide
    const emailErrorMsg = document.getElementById('emailErrorMsg')
    const errorEmail = function() {
        const regex = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
        if(!regex.test(email.value) || email.value.length === 0) {
            emailErrorMsg.style.display = "block";
            return emailErrorMsg.innerHTML = "Veuillez saisir un email valide";
        } 
        if(regex.test(email.value)) {
            emailErrorMsg.style.display = "none";
            contact.email = email.value;
        }
    }
    
    errorFirstName();
    errorLastName();
    errorAddress();
    errorCity();
    errorEmail();

    const products = dataList.map(product => product.id);

    //Envoi du formulaire et redirection vers la page 'confirmation'
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
            return response.json();
        }
    })
    .then(data => {
        if(products.length > 0 && contact.firstName && contact.lastName && contact.email && contact.city && contact.address) {
            window.location.href = `confirmation.html?orderId=${data.orderId}`;
            const dataList = [];
            localStorage.setItem('items', JSON.stringify(dataList));
        }
    })
})