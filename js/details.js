const params = new URLSearchParams(window.location.search);
const productId = params.get("productId");

const buildDetail = (title, price,description, photoUrl, ) => {
    
    let containerDetails = document.createElement('div')
    let Image = document.createElement("img");
    let containerInfo = document.createElement("div");
    let Title = document.createElement("h2");
    let Price = document.createElement("h4");
    let Description = document.createElement("p");
    let containerBtn = document.createElement("div");
    let editBtn = document.createElement("a");
    let deleteBtn = document.createElement("a");
  
    // agregando clases de bootstrap
    containerDetails.classList.add("details","d-flex", "justify-content-center");
    containerInfo.classList.add("container-info","d-flex", "flex-column", "align-items-center","justify-content-center","p-3");
    containerBtn.classList.add("btn-container","w-100","d-flex", "justify-content-evenly");
    editBtn.classList.add( "btn-details","btn", "btn-primary","btn-edit");
    deleteBtn.classList.add("btn-details","btn", "btn-danger","btn-delete");
    
  
    // agregando los valores a los elementos
    Image.src = photoUrl;
    Title.innerText = title;
    Price.innerText = `Price: $ ${price}`;
    Description.innerText = description;
    editBtn.innerText = "Edit";
    deleteBtn.innerText = "Delete";
  
    // creando los hijos de cardcontainer
    containerDetails.appendChild(Image);
    containerDetails.appendChild(containerInfo);
    containerInfo.appendChild(Title);
    containerInfo.appendChild(Price);
    containerInfo.appendChild(Description);
    containerInfo.appendChild(containerBtn);
    containerBtn.appendChild(editBtn);
    containerBtn.appendChild(deleteBtn);
  
    return containerDetails;
};

 const getProducts = (id) => {
    const url = `https://retokodemia-51b33-default-rtdb.firebaseio.com/products/${id}.json`;

    fetch(url)
      .then((res) => {
        return res.json();
      })
      .then((product) => {
         const { title, price, description, imageUrl } = product;
  
        const card = buildDetail(
          title,
          price,
          description,
          imageUrl,
          
        ); 
      
        mainContent.appendChild(card); 
       
        })
        .catch(err => console.log(err))
    };

    getProducts(productId)
 
 const deleteProduct = (productId) => {
  const url = `https://retokodemia-51b33-default-rtdb.firebaseio.com/products/${productId}.json`;

  fetch(url, {
    method: "DELETE",
  }).then((res) => {
    if (res.ok) {
      window.location.href = "/index.html";
    } else {
      console.error(res);
    }
  });
};

setTimeout(() => {
    const deleteBtn = document.querySelector(".btn-delete");
    const editBtn = document.querySelector(".btn-edit");

    deleteBtn.addEventListener("click", () => {
        deleteProduct(productId);
      });
      
      editBtn.addEventListener("click", () => {
        window.location.href = `/update.html?productId=${productId}`;
      });
}, 1000);




 
 