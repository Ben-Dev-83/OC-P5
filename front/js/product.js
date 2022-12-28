let str = window.location;
let url = new URL(str);
let params = new URLSearchParams(url.search);
if(params.has("id")) {
    params.get('id');
}
let id = params.get('id');

 fetch(`http://localhost:3000/api/products/${id}`)
.then(response => response.json())
.then(data => {
    const itemImg = document.querySelector(".item__img");
    itemImg.innerHTML = `<img src="${data.imageUrl}" alt="${data.altTxt}">`;

    const title = document.getElementById('title');
    title.innerText = data.name;
    
    const price = document.getElementById('price');
    price.innerText = data.price;

    const description = document.getElementById('description');
    description.innerText = data.description;

    const colors = document.getElementById('colors');
    const chooseColor = function() {
        for(let color of data.colors) {
            colors.innerHTML += `<option value="${color}">${color}</option>`
        }
    }
    chooseColor()
    
    let itemQuantity = document.getElementById("quantity");
    itemQuantity.value = 1
    function quantity() {   
        return Number(itemQuantity.value);
    }
    
    class Item {
        constructor(id, color, quantity, img) {
            this.id = id;
            this.color = color;
            this.quantity = quantity;
        }
    }
    
    const addToCart = document.getElementById('addToCart');
    addToCart.addEventListener('click', () => {
        let newItem = new Item(data._id, colors.value, Number(quantity()));
        let getItem = JSON.parse(localStorage.getItem('items'));
        if(newItem.color && newItem.quantity >= 1 && newItem.quantity <= 100){
            if(getItem){
                let changeQty = getItem.find(element => element.id == newItem.id && element.color == newItem.color )
                if(changeQty) {
                    changeQty.quantity = newItem.quantity
                    localStorage.setItem('items', JSON.stringify(getItem));
                }
                else {
                    getItem.push(newItem);
                    localStorage.setItem('items', JSON.stringify(getItem));
                }
            }
            else {
                getItem= [];
                getItem.push(newItem);
                localStorage.setItem('items', JSON.stringify(getItem));
            }
        }

        const errorColor= function() {
            let itemColor = document.querySelector('.item__content__settings__color')
            let errorColor = document.createElement('p');
            let displayErrorColor = document.querySelector('.item__content__settings__color p')
            if(!displayErrorColor && !colors.value) {
                errorColor.innerText = "Veuillez selectionner une couleur"
                itemColor.append(errorColor)
            }
            if(colors.value && displayErrorColor !== null)  {
                displayErrorColor.remove()
            }
        }
        errorColor()

        const errorQty= function() {
            let itemQty = document.querySelector('.item__content__settings__quantity')
            let errorQty = document.createElement('p') 
            let displayErrorQty = document.querySelector('.item__content__settings__quantity p')
            if((quantity() < 1 || quantity() > 100) && !displayErrorQty) {
                errorQty.innerText = "Veuillez selectionner une quantité entre 1 et 100"
                itemQty.append(errorQty)
            }
            if(quantity() >= 1 && quantity() <= 100 && displayErrorQty !== null)  {
                displayErrorQty.remove()
            }
        }
        errorQty()
    })
})
