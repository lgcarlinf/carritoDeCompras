let mainContent = document.querySelector('.container');

const buildCard = (title, price, description, photoUrl , productId) => {

    let cardContainer = document.createElement("div");
    let cardImage = document.createElement("img");
    let cardBody = document.createElement("div");
    let cardTitle = document.createElement("h3");
    let cardText = document.createElement("p");
    let cardPrice = document.createElement("h4");
    let containerButton = document.createElement("div");
    let cardButton = document.createElement("a");
    let addButton = document.createElement('a')
  
    // agregando clases de bootstrap
    cardContainer.classList.add("card", "custom-card", "m-2","p-3");
    cardImage.classList.add("card-img","card-img-top", "custom-card-image");
    cardBody.classList.add("card-body");
    cardTitle.classList.add("card-title");
    cardPrice.classList.add("card-text");
    cardText.classList.add("card-text");
    containerButton.classList.add('w-100',"d-flex", "justify-content-between");
    cardButton.classList.add("btn", `btn-primary`); 
    addButton.classList.add('add',"btn", `btn-success`);
  
    // agregando los valores a los elementos
    cardImage.src = photoUrl;
    cardTitle.innerText = title;
    cardPrice.innerText = `Price: $ ${price}`;
    cardText.innerText = description;
    cardButton.innerText = "Details";
    addButton.innerText = "Add to cart";
    cardButton.href = `/details.html?productId=${productId}`;
  
    // creando los hijos de cardcontainer
    cardContainer.appendChild(cardImage);
    cardContainer.appendChild(cardBody);
  
    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardPrice);
    cardBody.appendChild(cardText);
    cardBody.appendChild(containerButton);
    containerButton.appendChild(cardButton);
    containerButton.appendChild(addButton);
  
    return cardContainer;
  };

  const createProduct = (title, price,description, imageUrl) => {
    const url =
      "https://retokodemia-51b33-default-rtdb.firebaseio.com/products.json";
  
    const product = {
      title: title,
      price: price,
      description: description,
      imageUrl: imageUrl,
    };
  
    let productId = "";
    fetch(url, {
      method: "POST",
      body: JSON.stringify(product),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((product) => {
        productId = product.name;
        window.location.href = `/details.html?productId=${productId}`;
      });
  };

const getAllProducts = () => {
    const url = `https://retokodemia-51b33-default-rtdb.firebaseio.com/products.json`;
  
    fetch(url)
      .then((res) => {
        return res.json();
      })
      .then((products) => {
        for (const key in products) {
          const product = products[key];
  
          const card = buildCard(
            product.title,
            product.price,
            product.description,
            product.imageUrl,
            key
          );
  
          mainContent.appendChild(card);
        }
      })
      .catch(err => console.log(err))
  };

const updateProduct = (title, price, description, photoUrl, productId) => {
    const url = `https://retokodemia-51b33-default-rtdb.firebaseio.com/products/${productId}.json`;
  
    const product = {
      title: title,
      price: price,
      description: description,
      imageUrl: photoUrl,
    };
  
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    }).then((res) => {
      console.log(res)
      if (res.ok) {
        window.location.href = `/details.html?productId=${productId}`;
      } else {
        console.error('===>',res);
      }
    })
    .catch(err => console.log(err))
  };
  
//Carrito de Compras
 let btnCart = document.getElementById('cart-item') ;

btnCart.addEventListener('click', ()=>{
  carrito.classList.toggle('show-cart')

}) 
let cart = []
const tbody = document.querySelector('tbody')
const carrito = document.getElementById('carrito');

 setTimeout(() => {
  const addButton = document.querySelectorAll('.add')
  addButton.forEach(btn => {

  btn.addEventListener('click',addToCartItem)
  })
}, 1000);
 
const addToCartItem = (e) => {
  const select = e.target
  const item = select.closest('.card')
  const title = item.querySelector('.card-title').textContent
  const price = item.querySelector('.card-text').textContent
  const image = item.querySelector('.card-img-top').src

  let cleanPrice = price.split(':')
  let priceItem = cleanPrice[1].split('$')
  priceItem = priceItem[1]
 

  const product = {
    title,
    priceItem,
    image
  }

  addItemCart(product)
}

const addItemCart=(product)=>{

  cart.push(product)
  console.log(cart)
  renderCart()
}

const boton = document.querySelector('#vaciar-carrito')
boton.addEventListener('click', () => {
    cart = []
    renderCart()
})

renderCart = () => {
  tbody.innerHTML = ''
  cart.map(item => {
    const tr = document.createElement('tr')
    tr.classList.add('ItemCarrito')
    const Content = `
    <tr class='ItemCarrito'>
    <td>

    <img class="imgMin" src="${item.image}" alt="">
    </td>
    <td class='title'>${item.title}</td>
    <td>${item.priceItem}</td>
    <td>
   <span class='delete'>x</span>
    </td>
    </tr>
   
        
    `
    tr.innerHTML = Content
    tbody.appendChild(tr)

    tr.querySelector('.delete').addEventListener('click',removeItem)
   
  })
  addLocalStorage()
}

const removeItem = (e) => {
  const tr = e.target.closest('.ItemCarrito')
  const title = tr.querySelector('.title').textContent
  for(let i=0; i<cart.length; i++){
    if(cart[i].title.trim() === title.trim()){
      cart.splice(i,1)
    }
  }
  tr.remove()
  renderCart()
  console.log(cart)

}

const removeAll = () => {
  tbody.innerHTML = ''
  cart = []
  renderCart()
  
}

const addLocalStorage = () => {
  localStorage.setItem('cart', JSON.stringify(cart))
}

window.onload = function(){
  const storage = JSON.parse(localStorage.getItem('cart'))
  if(storage){
    cart = storage
    renderCart()
  }
}