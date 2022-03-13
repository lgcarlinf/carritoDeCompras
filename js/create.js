
const  inputName = document.querySelector('#name')
const inputPrice = document.querySelector('#price')
const inputDescription = document.querySelector('#description')
const inputImageUrl = document.querySelector('#image')
const enviar = document.querySelector('#enviar')

const create = () => {
    const name = inputName.value
    const price = inputPrice.value
    const description = inputDescription.value
    const imageUrl = inputImageUrl.value
    const product = {
        name,
        price,
        description,
        imageUrl
    }
    if(product.name === '' || product.price === '' || product.description === '' || product.imageUrl === ''){
        alert('Todos los campos son obligatorios')
    }
    else{
        createProduct(product.name, product.price, product.description, product.imageUrl)
        alert('Producto creado')
    }
}

enviar.addEventListener('click', create)