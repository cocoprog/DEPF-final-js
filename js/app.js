let amountProduct = document.querySelector('.count-product');
document.addEventListener('DOMContentLoaded', () => {

    let allContainerCart = document.querySelector('.products');
    let containerBuyCart = document.querySelector('.card-items');
    let priceTotal = document.querySelector('.price-total')



    let buyThings = [];
    let totalCard = 0;
    let countProduct = 0;
    let storageTotal = 0;
    //functions
    loadEventListenrs();
    function loadEventListenrs() {
        allContainerCart.addEventListener('click', addProduct);

        containerBuyCart.addEventListener('click', deleteProduct);

    }

    function addProduct(e) {
        e.preventDefault();
        if (e.target.classList.contains('btn-add-cart')) {
            const selectProduct = e.target.parentElement;
            readTheContent(selectProduct);
            Swal.fire({
                title: '<h2 class="sweet">Agregado al carrito</h2>',
                position: 'top-end',
                showConfirmButton: false,
                timer: 1500,
            });
        }

    }

    function deleteProduct(e) {
        if (e.target.classList.contains('delete-product')) {
            const deleteId = e.target.getAttribute('data-id');

            buyThings.forEach(value => {
                if (value.id == deleteId) {
                    let priceReduce = parseFloat(value.price) * parseFloat(value.amount);
                    totalCard = totalCard - priceReduce;
                    totalCard = totalCard.toFixed(2);
                }
            });
            buyThings = buyThings.filter(product => product.id !== deleteId);
            countProduct--;
            localStorage.setItem('carrito', JSON.stringify(buyThings))
        }

        if (buyThings.length == 0) {
            priceTotal.innerHTML = 0;
            amountProduct.innerHTML = 0;
        }
        loadHtml(true);

    }

    function readTheContent(product) {
        const infoProduct = {
            image: product.querySelector('div img').src,
            title: product.querySelector('.title').textContent,
            price: product.querySelector('div p span').textContent,
            id: product.querySelector('a').getAttribute('data-id'),
            amount: 1
        }

        totalCard = parseFloat(totalCard) + parseFloat(infoProduct.price);
        totalCard = totalCard.toFixed(2);

        const exist = buyThings.some(product => product.id === infoProduct.id);
        if (exist) {
            const pro = buyThings.map(product => {
                if (product.id === infoProduct.id) {
                    product.amount++;
                    return product;
                } else {
                    return product
                }
            });
            buyThings = [...pro];
        } else {
            buyThings = [...buyThings, infoProduct]
            countProduct++;
        }
        addLocalStorage(totalCard)
        loadHtml(true);

    }

    function loadHtml(add = false) {
        clearHtml();
        buyThings.forEach(product => {
            const { image, title, price, amount, id } = product;
            const row = document.createElement('div');
            row.classList.add('item');
            row.innerHTML = `
            <img src="${image}" alt="">
            <div class="item-content">
                <h5>${title}</h5>
                <h5 class="cart-price">${price}$</h5>
                <h6>Cantidad: ${amount}</h6>
            </div>
            <span class="delete-product" data-id="${id}">X</span>
            
        `;
            if (!add) {
                totalCard += parseFloat(price * amount);
            }
            priceTotal.innerHTML = totalCard;
            containerBuyCart.appendChild(row);
            amountProduct.innerHTML = countProduct;


        });

    }

    function clearHtml() {
        containerBuyCart.innerHTML = '';
    }


    /////////////// localStorage
    function addLocalStorage(totalCard) {
        localStorage.setItem('carrito', JSON.stringify(buyThings))
    }

    window.onload = function () {
        const storage = JSON.parse(localStorage.getItem('carrito'));
        if (storage) {
            countProduct = JSON.parse(localStorage.getItem('carrito')).length;
            buyThings = storage;
            amountProduct.textContent = buyThings.length
            loadHtml()
        }
    }

});

let btnFinalizarCompra = document.getElementById("btnFinalizarCompra");
btnFinalizarCompra.addEventListener("click", validarCompra);


function validarCompra(e) {
    e.preventDefault();

    Swal.fire({
        title: '<h2 class="sweet">Compra realizada!</h2>',
        html: '<h4 class="sweet">Dejanos tu contacto</h4>',
        confirmButtonColor: 'rgb(0, 0, 0)',
        confirmButtonText: '<h3 class="swee">ENVIAR</h3>',
        input: 'text',
        inputPlaceHolder: 'email',
        type: 'success',
        
    },).then(function(){ location.reload(); }, localStorage.removeItem('carrito'));
}


///// FETCH

/*
function render(lista) {
    for (const people of lista) {
        console.log(`Nombre: ${people.name}
        Altura: ${people.height}
        Género: ${people.gender}
        Color: ${people.skin_color}
        Peso: ${people.mass}`)
    }
}
fetch('https://swapi.dev/api/people')
    .then((response) => response.json())
    .then((data) => render(data.results))

    */

    const lista = document.getElementById("listado");
    fetch("/data.json")
    .then(response => response.json())
    .then(productos => {
      productos.forEach(producto => {
        const li = document.createElement("li");
        li.innerHTML = `
          <h4>${producto.nombre}</h4>
          <p>Precio $ ${producto.precio}</p>
          <p>ID: ${producto.id}</p>
          <hr />
        `;
        lista.append(li);
      });
    });