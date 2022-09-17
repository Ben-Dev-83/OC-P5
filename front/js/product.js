let str = window.location
let url = new URL(str)
let params = new URLSearchParams(url.search)
if(params.has("id")) {
    params.get('id')
}
let id = params.get('id')

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

    const chooseColor = document.getElementById('colors')
        data.colors.map(color => {
        const option = document.createElement("option")
        option.value = color
        option.innerText = color
        chooseColor.appendChild(option)
    })
    
    function quantity() {   
        let itemQuantity = document.getElementById("quantity");
        return itemQuantity.value
    }

    let arrayItem = []

    class Item {
        constructor(id, color, quantity) {
            this.id = id;
            this.color = color;
            this.quantity = quantity;
        }
    }

      const addToCart = document.getElementById('addToCart')
    addToCart.addEventListener('click', () => {
     
        let newItem = new Item(data._id, chooseColor.value, quantity())
        localStorage.setItem('item', JSON.stringify(newItem))
        arrayItem.push(JSON.parse(localStorage.getItem('item')))
        console.log(JSON.parse(localStorage.getItem('item')))
        })

    // function getCart() {
    //     let items = []
    //     if(localStorage.getItem('cart') != null) {
    //         items = JSON.parse(localStorage.getItem('cart'))
    //     }
    // }
    
    // function addCart(newItem) {
    //     let items = getCart()
    //     items = newItem
    //     localStorage.setItem("panier", JSON.stringify(items));
    // }
    // const addToCart = document.getElementById('addToCart')
    // addToCart.addEventListener('click', () => {
    //     let newItem = new Item(data.id, this.colors, quantity())
    //     addCart(newItem)
    //     console.log(newItem)
    // })
})

