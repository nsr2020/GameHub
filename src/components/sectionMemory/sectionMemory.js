import { cartas } from "../../data/cartas";
import { activarBotonAhorcado, activarBotonAtras, activarBotonBingo, desactivarBotonAhorcado, desactivarBotonAtras, desactivarBotonBingo, desactivarBotonMemory } from "../header/header";
import "./sectionMemory.css";

const sectionMemory = document.createElement("section");
const articleGame = document.createElement("article");

let flippedCards = [];

//? En esta section he creado un juego de Memory Game, en el que primeramente pongo una animación y los botones de start y stop
export const createsectionMemory = (array) => {
  const gift = document.createElement("img");
  const divBotones = document.createElement("div");
  const botonStart = document.createElement("button");
  const botonStop = document.createElement("button");

  sectionMemory.classList.add("sectionMemory");
  gift.classList.add("gift");
  articleGame.classList.add("articlegame");

  gift.src =
    "https://res.cloudinary.com/dnju3aw4b/image/upload/v1703097374/MemoryGame/giftpensar_hrvyfa.gif";

  botonStart.textContent = "START";
  botonStop.textContent = "STOP";

  
  botonStart.addEventListener("click", () => {
    desactivarBotonAtras()
    desactivarBotonAhorcado()
    desactivarBotonBingo()
    desactivarBotonMemory()
    startGame(array);
    botonStart.style.display ="none"
    botonStop.style.display = "flex"
  });

  botonStop.addEventListener("click", () =>{
    activarBotonAhorcado()
    activarBotonAtras()
    activarBotonBingo()
    resetGame()
    botonStart.style.display ="flex"
    botonStop.style.display = "none"
  });


  divBotones.append(botonStart);
  divBotones.append(botonStop);

  sectionMemory.append(gift);
  sectionMemory.append(articleGame);
  sectionMemory.append(divBotones);

  document.body.append(sectionMemory);
}

//?Aqui lo que hago es dos sections para el limpiado para cuando se cambie de section 

export const apagarSectionMemory = () => {
  sectionMemory.style.display = "none";
  sectionMemory.innerHTML = "";
};

export const encenderSectionMemory = () => {
  sectionMemory.style.display = "flex";
  sectionMemory.innerHTML = "";
};

//? Función para iniciar el juego que va enlazada con el botón start, aquí vamos generar un array con todas las imagenes de forma aleatoria y sin repetirse que van a estar dentro de los divs con una opacity 0 

const startGame = (array) => {
  console.log("Inniciando Juego");
  articleGame.innerHTML = ""; 
  flippedCards = [];

  const shuffledArray = shuffleArray(array);

  shuffledArray.forEach((element, index) => {
    const divCarta = document.createElement("div");
    const carta = document.createElement("img");

    carta.src = element.img;
    carta.classList.add("carta");
    carta.classList.add(`id-${element.id}`);
    carta.dataset.id = element.id;
    carta.dataset.index = index;

    divCarta.append(carta);
    articleGame.append(divCarta);
  });
  articleGame.addEventListener("click", handleCardClick);
  
};


//? Función para manejar el clic en las cartas, donde no nos va a dejar mostrar más de imagenes a la vez
const handleCardClick = (event) => {
  console.log("Click en elemento:", event.target);
  const targetDiv = event.target.closest(".carta");

  if (targetDiv) {
    console.log("Clases del div:", targetDiv.classList);

    if (!targetDiv.classList.contains("showed") && flippedCards.length < 2) {
     
      flipCard(targetDiv);
    }
  }

  if (flippedCards.length === 2) {
    
    checkMatch();
  }
};


//? Función para poner la clase showed y que se muestre la primera imagen
const flipCard = (div) => {
  div.classList.add("showed");
  const id = div.dataset.id; 
  flippedCards.push({
    id,
    index: div.dataset.index,
  });
  console.log("Volteando carta");
};



//? Función que cuando has volteado la segunda imagen, comprueba si son iguales, en este caso las dejaría mostradas y de lo contrario las ocultaría de nuevo.
const checkMatch = () => {
  const [card1, card2] = flippedCards;

  if (Math.abs(card1.id - card2.id) === 10 && card1.index !== card2.index) {
    const matchingCards = articleGame.querySelectorAll(`.carta[data-id="${card1.id}"], .carta[data-id="${card2.id}"]`);
    matchingCards.forEach((div) => {
      div.classList.add("showed");
      div.dataset.selected = "true"; 
    });

    const allCards = articleGame.querySelectorAll(".carta");
    const showedCards = articleGame.querySelectorAll(".carta.showed");

    if (allCards.length === showedCards.length ) {
     
      setTimeout(() => {
        alert("¡Enhorabuena! Has completado el juego.");
      }, 1000);
      
    }

    flippedCards = [];
  } else {
    setTimeout(() => {
      articleGame.querySelectorAll(".carta").forEach((div) => {
        if (div.dataset.selected === "true") {
          div.classList.add("showed"); 
        } else {
          div.classList.remove("showed");
        }
        
      });
      flippedCards = [];
    }, 1000);
  }
};

//?En esta función estamos reseteando todo, quitando el evento click de article y asignando false a la propiedad de cada imagen.

const resetGame = () => {
  articleGame.removeEventListener("click", handleCardClick);
  articleGame.querySelectorAll(".carta").forEach((div) => {
  div.dataset.selected = false;
  });
  
};

//? en esta section es dónde se creamos el nuevo array de forma aleatoria con todas las imagenes 
const shuffleArray = (array) => {
  const shuffledArray = array.slice();
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};


