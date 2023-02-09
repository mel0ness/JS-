// Récupération des pièces depuis le fichier JSON
const reponse = await fetch("pieces-autos.json");
let pieces = await reponse.json();

for (let i of pieces) {
  const article = i;
  const imageElement = document.createElement("img");
  imageElement.src = article.image;
  const nomElement = document.createElement("h2");
  nomElement.innerText = article.nom;
  const prixElement = document.createElement("p");
  prixElement.innerText = `Prix: ${article.prix} € (${
    article.prix < 35 ? "€" : "€€€"
  })`;
  const descrElement = document.createElement("p");
  descrElement.innerText =
    article.description ?? "Pas de description pour le moment.";
  const stockElement = document.createElement("p");
  stockElement.innerText = article.disponnibilite
    ? "En stock"
    : "Rupture de stock";
  stockElement.style.background = article.disponnibilite ? "green" : "red";
  stockElement.style.color = "white";
  const categorieElement = document.createElement("p");
  categorieElement.innerText = article.categorie ?? "Aucune catégorie";

  const fiches = document.createElement("section");
  fiches.classList.add("fiches");
  fiches.appendChild(imageElement);
  fiches.appendChild(nomElement);
  fiches.appendChild(prixElement);
  fiches.appendChild(categorieElement);
  fiches.appendChild(descrElement);
  fiches.appendChild(stockElement);

  const main = document.querySelector("main");
  main.appendChild(fiches);
}

let piecesOrdre = null;
let piecesOrdreTwo = null;
const piecesOrigin = Array.from(pieces);

const boutonTrier = document.querySelector(".btn-trier");
boutonTrier.addEventListener("click", function () {
  if (piecesOrdre == null && piecesOrdreTwo == null) {
    piecesOrdre = Array.from(pieces);
    pieces.sort(function (a, b) {
      return a.prix - b.prix;
    });
  } else if (piecesOrdre == null && piecesOrdreTwo != null) {
    piecesOrdre = Array.from(pieces);
    pieces.sort(function (a, b) {
      return a.prix - b.prix;
    });
    piecesOrdreTwo = null;
  } else {
    pieces = piecesOrdre;
    piecesOrdre = null;
  }
  console.log(pieces);
  console.log(piecesOrdre);
});

const boutonTrierDec = document.querySelector(".btn-trierdec");
boutonTrierDec.addEventListener("click", function () {
  if (piecesOrdreTwo == null && piecesOrdre == null) {
    piecesOrdreTwo = Array.from(pieces);
    pieces.sort(function (a, b) {
      return b.prix - a.prix;
    });
  } else if (piecesOrdreTwo == null && piecesOrdre != null) {
    piecesOrdreTwo = Array.from(pieces);
    pieces.sort(function (a, b) {
      return b.prix - a.prix;
    });
    piecesOrdre = null;
  } else {
    pieces = piecesOrdreTwo;
    piecesOrdreTwo = null;
  }
  console.log(pieces);
  console.log(piecesOrdreTwo);
});

let piecestri = null;

const boutonFilter = document.querySelector(".btn-filtrer");
boutonFilter.addEventListener("click", function () {
  if (piecestri == null) {
    piecestri = pieces.filter(function (e) {
      return e.prix < 35;
    });
  } else {
    piecestri = null;
  }
  console.log(piecestri);
});

let piecesDescr = null;

const boutonFilterDescr = document.querySelector(".btn-filtrerdescr");
boutonFilterDescr.addEventListener("click", function () {
  if (piecesDescr == null) {
    piecesDescr = pieces.filter(function (e) {
      return e.description !== undefined;
    });
  } else {
    piecesDescr = null;
  }
  console.log(piecesDescr);
});
