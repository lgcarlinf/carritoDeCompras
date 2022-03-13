const params = new URLSearchParams(window.location.search);
const productId = params.get("productId");

const nameProduct = document.getElementById("name");
const descriptionProduct = document.getElementById("description");
const imgUrl = document.getElementById("image");
const priceProduct = document.getElementById("price");
const submitBtn = document.getElementById("enviar");

const getData = (e) => {
  e.preventDefault()
  const title = nameProduct.value;
  const price = priceProduct.value;
  const description = descriptionProduct.value;
  const photoUrl = imgUrl.value;

  
  updateProduct(title, price ,description, photoUrl, productId);
};

submitBtn.addEventListener("click", getData);

const placeProductData = async() => {
  const url = `https://retokodemia-51b33-default-rtdb.firebaseio.com/products/${productId}.json`;
  
  try {
    const res = await fetch(url) 
    const product = await res.json();
    const { title,price, description, imageUrl } = product; 
 
      nameProduct.value = title;
      priceProduct.value = price;
      descriptionProduct.value = description;
      imgUrl.value = imageUrl;

  } catch (error) {
      console.log(error)
  }
    
};

placeProductData();


