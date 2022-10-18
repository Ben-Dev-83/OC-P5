let getItem = JSON.parse(localStorage.getItem('items'));
let numberInit= 0
let initPrice =0

for(let item of getItem) {
    fetch(`http://localhost:3000/api/products/${item.id}`)
    .then(response => response.json())
    .then(data => {
    let section = document.getElementById("cart__items")
    let article = document.createElement("article")

    article.classList.add("cart__item")
    section.appendChild(article)
    article.dataId =item.id
    article.dataColor =item.color

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

    let itemTitle =document.createElement("h2")
    itemTitle.innerText = data.name
    contentDescription.appendChild(itemTitle)

    let color =document.createElement("p")
    color.innerText = item.color
    contentDescription.appendChild(color)

    let quantity =document.createElement("p")
    quantity.innerText = `${data.price} €`
    contentDescription.appendChild(quantity)

    let Contentsettings = document.createElement("div")
    Contentsettings.classList.add("cart__item__content__settings")
    divContent.appendChild(Contentsettings)
    
    let Contentquantity =document.createElement("p")
    Contentquantity.classList.add("cart__item__content__settings__quantity")
    quantity.innerText = `Qté: ${item.quantity}`
    Contentsettings.appendChild(Contentquantity)

    let price =document.createElement("p")
    Contentquantity.classList.add("cart__item__content__settings__quantity")
    quantity.innerText = `${data.price} €`
    Contentquantity.append(price)

    let addQuantity =document.createElement("input");
    addQuantity.name = "itemQuantity";
    addQuantity.value = item.quantity;
    addQuantity.min = 1;
    addQuantity.max = 100;
    addQuantity.type = "number";
    addQuantity.classList.add("itemQuantity");
    Contentsettings.appendChild(addQuantity);
    
    let totalQty = document.getElementById("totalQuantity");
    const total = getItem.map(item =>item.quantity).reduce((pre, curr) => pre +curr, 0);
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
    divDelete.appendChild(deleteItem)
    
    
})
}