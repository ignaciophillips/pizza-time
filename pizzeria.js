/*
CODIGO A COMPLETAR
*/

function calculatePrice({
  nPepperonis,
  nBasils,
  nMushrooms,
  hasSauce,
  hasCheese
}) {
  let precio_total = 5;

  precio_total += nPepperonis * 0.5;
  precio_total += nBasils * 0.3;
  precio_total += nMushrooms * 0.1;

  if (hasSauce) {
    precio_total += 1;
  }

  if (hasCheese) {
    precio_total += 1.5;
  }

  return precio_total;
}

function displayInvoice({
  nPepperonis,
  nBasils,
  nMushrooms,
  hasSauce,
  hasCheese
}) {
  /*
  Escribir una funcion displayInvoice para mostrar un resumen de los ingredientes elegidos 
  y que incluya el precio total (utilizar función calculatePrice). Se recomienda agregar 
  elementos HTML apropiados en el DIV con id "order-summary". Por ejemplo, se pueden usar
  tags LI dentro de un tag UL para cada ingrediente, y mostrar un P que contenga el precio.
  */
  // document.getElementById(...);
  // document.createElement(...);
  // document.createTextNode(...);
  // elem.appendChild(...);
  // No es necesario retornar algo

  const summaryDiv = document.getElementById("order-summary");
  summaryDiv.innerHTML = "";
  const ul = document.createElement("ul");
  const createItem = (text) => {
    const li = document.createElement("li");
    li.appendChild(document.createTextNode(text));
    return li;
  };

  if (hasSauce) ul.appendChild(createItem("Salsa: Sí ($1)"));
  if (hasCheese) ul.appendChild(createItem("Queso: Sí ($1.5)"));
  if (nPepperonis > 0) ul.appendChild(createItem(`Pepperoni: ${nPepperonis} ($${nPepperonis * 0.5})`));
  if (nBasils > 0) ul.appendChild(createItem(`Albahaca: ${nBasils} ($${nBasils * 0.3})`));
  if (nMushrooms > 0) ul.appendChild(createItem(`Champiñones: ${nMushrooms} ($${nMushrooms * 0.1})`));

  const total = calculatePrice({ nPepperonis, nBasils, nMushrooms, hasSauce, hasCheese });

  const pTotal = document.createElement("p");
  pTotal.style.fontWeight = "bold";
  pTotal.appendChild(document.createTextNode(`Precio Total: $${total.toFixed(2)}`));

  summaryDiv.appendChild(ul);
  summaryDiv.appendChild(pTotal);
}

/*
CODIGO BASE (pueden leerlo)
*/

const form = document.querySelector("#pizza-form");
form.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
  // Evitamos el comportamiento default (POST a nueva URL)
  event.preventDefault();

  // Extraemos los valores del formulario usando el objeto FormData
  const formData = new FormData(event.target);
  // Creamos un objeto para contener las preferencias con su tipo apropiado
  const ingredientsData = {
    nPepperonis: +formData.get("pepperoniCount"),
    nBasils: +formData.get("basilCount"),
    nMushrooms: +formData.get("mushroomCount"),
    hasSauce: formData.get("sauceCheck") !== null,
    hasCheese: formData.get("cheeseCheck") !== null
  };
  // Usamos "destructuring assignment" para pasar un objeto a cada función
  // (ver firma de cada función, en particular al uso de llaves en los parámetros)
  // https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#desempacar_campos_de_objetos_pasados_como_par%C3%A1metro_de_funci%C3%B3n
  const price = calculatePrice(ingredientsData);
  console.log(price);
  displayPizza(ingredientsData);
  displayInvoice(ingredientsData);
}

function displayPizza({
  nPepperonis,
  nBasils,
  nMushrooms,
  hasSauce,
  hasCheese
}) {
  const ingredientsCount = {
    pepperoni: nPepperonis,
    basil: nBasils,
    mushroom: nMushrooms
  };
  for (const ingredient in ingredientsCount) {
    // Limpiamos la capa de ingredientes de la última ejecución
    const ingredientLayerElement = document.getElementById(ingredient);
    ingredientLayerElement.innerHTML = "";
    // Agregamos ingredientes a la capa en posiciones aleatorias
    for (let i = 0; i < ingredientsCount[ingredient]; i++) {
      const ingredientElement = document.createElement("div");
      ingredientElement.className = ingredient;
      ingredientElement.style.top = `${Math.floor(Math.random() * 60) + 20}%`;
      ingredientElement.style.left = `${Math.floor(Math.random() * 60) + 20}%`;
      ingredientLayerElement.appendChild(ingredientElement);
    }
  }

  // Agregamos o quitamos la capa de salsa y queso (por medio de clases CSS)
  const sauceLayer = document.getElementById("sauce");
  hasSauce
    ? sauceLayer.classList.add("sauce")
    : sauceLayer.classList.remove("sauce");
  const cheeseLayer = document.getElementById("cheese");
  hasCheese
    ? cheeseLayer.classList.add("cheese")
    : cheeseLayer.classList.remove("cheese");
}
