

import { fotosAhorcado } from "../../data/fotosahorcado/fotosahorcado"
import { words } from "../../data/palabras/palabras"
import { activarBotonAhorcado, activarBotonAtras, activarBotonBingo, activarBotonMemory, desactivarBotonAhorcado, desactivarBotonAtras, desactivarBotonBingo, desactivarBotonMemory } from "../header/header"
import "./sectionahorcado.css"


const sectionahorcado = document.createElement("section")
sectionahorcado.classList.add("sectionahorcado")
const botonStart = document.createElement("button")
const botonStop = document.createElement("button")
botonStart.classList.add("botonstart")
botonStop.classList.add("botonstop")

//!En esta section creamos por una parte un div dónde van a aparecer una nueva palabra seleccionada al azar de entre un array de palabras y en otro lado, imágenes dependiendo de los fallos que se vayan teniendo, el max de fallos es 6, vas a ir viendo diferentes imágenes donde veras como el ahorcado poco a poco va formanadose hasta completarse.

export const createSectionAhorcado = (array) =>{
 sectionahorcado.innerHTML =""

 const imgift = document.createElement("img")
 const divBotonesInicio = document.createElement("div")
 divBotonesInicio.classList.add("divbotonesinicio")

  
 const divJuegoAhorcado = document.createElement("div")
 divJuegoAhorcado.classList.add("divJuegoAhorcado")
  const divImg = document.createElement("div")
  const divPalabra = document.createElement("div")
 

  divImg.classList.add("divimg")
  divPalabra.classList.add("divpalabra")
  imgift.classList.add("imgift")

  imgift.src = "https://res.cloudinary.com/dnju3aw4b/image/upload/v1703096059/Ahorcado/ahorgift_ch5k4y.gif"
  botonStart.textContent = "START"
  botonStop.textContent = "STOP"
  botonStart.classList.add("botonStart")

let contador = 1;
  for( const foto of array){
    
    const img = document.createElement("img")

    img.src = foto.img
    img.classList.add("img" + contador)

    divImg.append(img)
    contador++;
  }


  botonStart.addEventListener("click", () =>{
      botonStart.style.display= "none"
      botonStop.style.display = "flex"

    desactivarBotonAtras()
    desactivarBotonBingo()
    desactivarBotonMemory()
    desactivarBotonAhorcado()

    createSectionAhorcado(fotosAhorcado)
    startAhorcado()
  })
  botonStop.addEventListener("click",()=>{
    botonStart.style.display= "flex"
      botonStop.style.display = "none"



    activarBotonAtras()
    activarBotonBingo()
    activarBotonMemory()

    endGame()
    
  } )

  divBotonesInicio.append(botonStart)
  divBotonesInicio.append(botonStop)
  sectionahorcado.append(imgift)

 sectionahorcado.append(divBotonesInicio)

 divJuegoAhorcado.append(divPalabra)
 divJuegoAhorcado.append(divImg)
 sectionahorcado.append(divJuegoAhorcado)

  document.body.appendChild(sectionahorcado)
}

//!Lo mismo que en las anteriores, son sections que ayudan a poder cambiar de juego de forma correcta, limpiando el contenido.

export const apagarSectionAhorcado = () =>{
  /* const sectionAhorcado = document.querySelector(".sectionahorcado") */
  sectionahorcado.style.display = "none"
  sectionahorcado.innerHTML =""

}
export const encenderSectionAhorcado = () =>{
  sectionahorcado.style.display ="flex"
  sectionahorcado.innerHTML = ""

}

let selectedword;
let usedletters;
let mistakes;
let hits;

//!En esta parte se ocultan todas las imagenes con la clase opacity
const activarOpacidadFotos = () => {
  for (const foto of fotosAhorcado) {
    const imgElement = document.querySelector(`.img${foto.id}`);
   imgElement.classList.add("opacity")
  }
}

//!En caso de que la letra introducida sea incorrecta, se mostrará una imagen

const wrongLetter = () => {
  mistakes++;

  fotosAhorcado.forEach((foto, index) => {
    const imgElement = document.querySelector(`.img${foto.id}`);
    imgElement.style.opacity = index < mistakes ? 1 : 0;
    foto.selected = index < mistakes;
    
  });

  //! Verificar si todas las imágenes han sido mostradas y en caso de que el every de true pues se acaba el juego que significaría que hemos fallado 6
  const allImagesShown = fotosAhorcado.every((foto) => foto.selected);

  if (allImagesShown) {
    const imgElement1 = document.querySelector(".img6")
    imgElement1.style.opacity = 1;

    setTimeout(() => {
      alert("¡Ahorcado! Has alcanzado el límite de intentos.");
      endGame();
    }, 1000);
  }
};

//!En esta parte se limpian todo y se activa el botonStop para cambiar de section si se desea.
const endGame = () =>{

  document.removeEventListener("keydown",letterEvent)
 
 createSectionAhorcado(fotosAhorcado)
  activarBotonAtras()
  activarBotonBingo()
  activarBotonMemory()
botonStart.style.display="flex"
botonStop.style.display="none"

  activarOpacidadFotos()
  
}


//!En caso de que la letra sea correcta, quitaremos la clase hidden para que se muestren las letras 
const correctLetter = letter =>{
  const divPalabra = document.querySelector(".divpalabra")
  const {children} = divPalabra
  hits=0;
  for(let i =0; i<children.length; i++){
      if(children[i].innerHTML === letter){
        children[i].classList.remove("hidden")
        hits++
        
      }
  }
  const allLettersVisible = Array.from(children).every((child) => !child.classList.contains("hidden"));

  if (allLettersVisible) {
    // Agregar esta línea para asegurarse de que la última letra se haya vuelto visible
    children[children.length - 1].classList.remove("hidden");
    
    // Esperar un breve momento para que la última letra se muestre completamente
    setTimeout(() => {
      alert("¡Felicidades, has adivinado la palabra!");
      endGame();
    }, 1000);
  }

}

//!Aqui controlamos si la letra introducida esta en la palabra para enviarla a una funcion o a otra
const letterInput = (letter) => {
  if (selectedword.join("").includes(letter)) {
    correctLetter(letter);
  } else {
    wrongLetter();
  }
};

//!En esta función pasamos todas las letras introducidas a Mayúsculas
const letterEvent = (event) => {
  let newLetter = event.key.toUpperCase();
  if (newLetter.match(/^[a-zñ]$/i) && !usedletters.includes(newLetter)) {
    usedletters.push(newLetter);
    letterInput(newLetter);
  }
};

//!En esta parte va ligada al botonStart y es cuando obtenemos la palabra al azar 

export const startAhorcado = () =>{

  usedletters =[]
  mistakes = 0
  hits = 0
 
  selectedword = obtenerPalabraRandom(words);
  const palabraPintada = obtenerPalabraPintada(selectedword);

  activarOpacidadFotos()

  document.addEventListener("keydown", letterEvent);
}

//!Aqui obtenemos la palabra al azar
const obtenerPalabraRandom = array => {
  return array[Math.floor(Math.random() * array.length)].nombre.toUpperCase().split("");
};

//!en esta función pintamos en el div con spans la palabra que hayamos recibido.

  const obtenerPalabraPintada = (palabra) => {
    const divPalabra = document.querySelector(".divpalabra");
    divPalabra.innerHTML = "";
    palabra.forEach((letter) => {
      const letterElement = document.createElement("span");
      letterElement.innerHTML = letter.toUpperCase();
      letterElement.classList.add("letter");
      letterElement.classList.add("hidden");
      divPalabra.append(letterElement);
    });
  };

  



