const callApi = async function () {

  fetch("http://localhost:3000/api/products")
  .then(response => response.json())
  .then(data => {
    
    for(items of data) {
      
      
      const itemContainer = document.querySelector('#items');
      itemContainer.innerHTML += `
      <a href="./product.html?id=${items._id}">
      <article>
        <img src="${items.imageUrl}" alt="${items.altTxt}">
        <h3 class="productName">${items.name}</h3>
        <p class="productDescription">${items.description}</p>
      </article>
    </a>`
      // const a = document.createElement("a");
      // a.href = `./product.html?id=${items._id}`
      // itemContainer.appendChild(a);
      
      // const article = document.createElement("article");
      // a.appendChild(article);
      
      // const img = document.createElement("img");
	    // img.src = items.imageUrl;
	    // img.alt = items.altTxt;
	    // article.appendChild(img);
      
      // const title = document.createElement("h3");
      // title.classList.add('productName')
	    // title.innerText = items.name;
	    // article.appendChild(title);
      
      // const p = document.createElement('p')
      // p.classList.add('description')
      // p.innerText = items.description;
      // article.appendChild(p);
    }
    
  })
}
callApi()
  



