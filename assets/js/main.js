const productName = document.getElementById("product-name");
const productCategory = document.getElementById("product-category");
const productPrice = document.getElementById("product-price");
const productDiscount = document.getElementById("product-discount");
const productQuantity = document.getElementById("product-quantity");
const productDescription = document.getElementById("product-description");
const addProductButton = document.querySelector("#add-product");
const updateProductButton = document.querySelector("#update-product");
const searchInput = document.getElementById("searchInput");
const tbody = document.querySelector("tbody");
let productsObjects = JSON.parse(localStorage.getItem("productsObject")) || [];

// ================ add product ============
console.log(productsObjects);
showProductsInTable(productsObjects);

addProductButton.addEventListener("click", () => {
  if (checkValid()) {
    const product = {
      Name: productName.value,
      Category: productCategory.value,
      Price: productPrice.value,
      Discount: productDiscount.value,
      Quantity: productQuantity.value,
      Description: productDescription.value,
    };
    productsObjects.push(product);
    localStorage.setItem("productsObject", JSON.stringify(productsObjects));
    console.log(productsObjects);
    //   console.log(productId);
    showProductsInTable(productsObjects);
    clearInputs();
  } else {
    alert(" InValid");
  }
});

function showProductsInTable() {
  tbody.innerHTML = ``;
  for (let i = 0; i < productsObjects.length; i++) {
    tbody.innerHTML += `
    <tr data-id="">
      <td>${productsObjects[i].Name}</td>
      <td>${productsObjects[i].Category}</td>
      <td>${productsObjects[i].Price}</td>
      <td>${productsObjects[i].Discount}</td>
      <td>${productsObjects[i].Quantity}</td>
      <td>${productsObjects[i].Description}</td>
      <td><i class="fa-solid fa-pen-to-square" onclick='updateProduct(${i})'></i></td>
      <td><i class="fa-solid fa-rectangle-xmark" onclick='deleteProduct(${i})'></i></td>
    </tr>
  `;
  }
}

// ==================== delete product ===============
// let deleteButtons = document.querySelectorAll(".fa-rectangle-xmark");
function deleteProduct(index) {
  productsObjects.splice(index, 1);
  console.log(productsObjects);
  localStorage.setItem("productsObject", JSON.stringify(productsObjects));
  showProductsInTable();
}

// =================== clear inputs values ==========
function clearInputs() {
  productName.value = ``;
  productCategory.value = ``;
  productPrice.value = ``;
  productDiscount.value = ``;
  productQuantity.value = ``;
  productDescription.value = ``;
}

// ==================== search ============
searchInput.addEventListener("input", () => {
  tbody.innerHTML = ``;
  productsObjects.forEach((product) => {
    if (product.Category.toLowerCase() === searchInput.value.toLowerCase()) {
      tbody.innerHTML += `
        <tr data-id="">
          <td>${product.Name}</td>
          <td>${product.Category}</td>
          <td>${product.Price}</td>
          <td>${product.Discount}</td>
          <td>${product.Quantity}</td>
          <td>${product.Description}</td>
          <td><i class="fa-solid fa-pen-to-square"></i></td>
          <td><i class="fa-solid fa-rectangle-xmark"></i></td>
        </tr>
      `;
    }
  });
});

// ================= update =========
let globalIndex = 0;
function updateProduct(index) {
  globalIndex = index;
  productName.value = productsObjects[index].Name;
  productCategory.value = productsObjects[index].Category;
  productPrice.value = productsObjects[index].Price;
  productDiscount.value = productsObjects[index].Discount;
  productQuantity.value = productsObjects[index].Quantity;
  productDescription.value = productsObjects[index].Description;
  addProductButton.classList.add("d-none");
  updateProductButton.classList.remove("d-none");
  console.log(globalIndex);
}

updateProductButton.addEventListener("click", function () {
  productsObjects[globalIndex].Name = productName.value;
  productsObjects[globalIndex].Category = productCategory.value;
  productsObjects[globalIndex].Price = productPrice.value;
  productsObjects[globalIndex].Discount = productDiscount.value;
  productsObjects[globalIndex].Quantity = productQuantity.value;
  productsObjects[globalIndex].Description = productDescription.value;
  showProductsInTable();
  localStorage.setItem("productsObject", JSON.stringify(productsObjects));
  clearInputs();
});

function checkValid() {
  let regex = /^\w{2,15}$/;
  if (regex.test(productName.value)) {
    return true;
  } else {
    return false;
  }
}
