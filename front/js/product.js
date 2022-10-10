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
    const imgBlock = document.querySelector(".item__img");
    const img = document.createElement("img");
    img.src = data.imageUrl;
    img.alt = data.altTxt;
    imgBlock.appendChild(img);

    const title = document.getElementById('title');
    title.innerText = data.name;
    
    const price = document.getElementById('price');
    price.innerText = data.price;
    
    const description = document.getElementById('description');
    description.innerText = data.description;

    const chooseColor = document.getElementById('colors');
        data.colors.map(color => {
        const option = document.createElement("option");
        option.value = color;
        option.innerText = color;
        chooseColor.appendChild(option);
    })
    
    function quantity() {   
        let itemQuantity = document.getElementById("quantity");
        return Number(itemQuantity.value);
    }
    
    class Item {
        constructor(id, color, quantity, img) {
            this.id = id;
            this.color = color;
            this.quantity = quantity;
            this.img = img
        }
    }
    
    const addToCart = document.getElementById('addToCart');
    addToCart.addEventListener('click', () => {
        
        let newItem = new Item(data._id, chooseColor.value, quantity());
        let getItem = JSON.parse(localStorage.getItem('items'));

        if(getItem){
            let changeQty = getItem.find(element => element.id == newItem.id && element.color == newItem.color )
            if(changeQty) {
                changeQty.quantity += newItem.quantity
                localStorage.setItem('items', JSON.stringify(getItem));
            }
            else {
                newItem.img = data.imageUrl
                getItem.push(newItem);
                localStorage.setItem('items', JSON.stringify(getItem));
            }
        }
        else {
            getItem= [];
            newItem.img = data.imageUrl
            getItem.push(newItem);
            localStorage.setItem('items', JSON.stringify(getItem));
        }
        // localStorage.clear(('items'))
    })
})

