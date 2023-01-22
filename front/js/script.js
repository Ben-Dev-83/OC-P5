// Appel de l'api pour afficher les produits dans la page d'accueil
const callApi = function () {
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
    }
  })
  .catch(error => {
    const itemContainer = document.querySelector('#items');
    itemContainer.innerHTML = `<p>Erreur lors du chargement des produits</p>`
})
}
callApi()
  



