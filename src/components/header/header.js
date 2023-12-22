import { cartas } from "../../data/cartas"
import { fotosAhorcado } from "../../data/fotosahorcado/fotosahorcado"
import { numerosbingo } from "../../data/numerosBingo/numerosbingo"
import { createSectionAhorcado, apagarSectionAhorcado,encenderSectionAhorcado } from "../sectionAhorcado/sectionahorcado"
import { apagarsectionbingo, createSectionBingo, encendersectionbingo, startBingo } from "../sectionBingo/sectionBingo"
import { apagarSectionMemory, createsectionMemory, encenderSectionMemory } from "../sectionMemory/sectionMemory"
import "./header.css"


// En esta función creo el header con todas las imagenes cliclables que llevan de un juego a otro
export const createHeader = ()=>{

  const header = document.createElement("header")
  const nav = document.createElement("nav")
  const img1 = document.createElement("img")
  const img2 = document.createElement("img")
  const img3 = document.createElement("img")
  const img4 = document.createElement("img")

  header.classList.add("header")

  img4.src = "https://res.cloudinary.com/dnju3aw4b/image/upload/v1702777568/UCDM/GamesHub/flecha-hacia-atras_ijswt9.png"
  img1.src = "https://res.cloudinary.com/dnju3aw4b/image/upload/v1702776884/UCDM/GamesHub/bingo_yrwlz6.png"
  img2.src = "https://res.cloudinary.com/dnju3aw4b/image/upload/v1702776883/UCDM/GamesHub/horca_jrudjw.png"
  img3.src = "https://res.cloudinary.com/dnju3aw4b/image/upload/v1702776886/UCDM/GamesHub/pregunta_zb0we3.png"

  img4.classList.add("boton-atras")
  img1.classList.add("boton-bingo")
  img2.classList.add("boton-ahorcado")
  img3.classList.add("boton-mgame")

  nav.appendChild(img4)
  nav.appendChild(img1)
  nav.appendChild(img2)
  nav.appendChild(img3)

//vuelta atrás

  img4.addEventListener("click", ()=>{
  const divApp = document.querySelector(".app")
  divApp.style.display ="flex"
  const header = document.querySelector("header")
  header.style.display="none"
 apagarsectionbingo()
 apagarSectionAhorcado()
 apagarSectionMemory()
 
})


//acceso a section bingo

img1.addEventListener("click", ()=>{
  const divApp = document.querySelector(".app")
  divApp.style.display ="none"
  encendersectionbingo()
  apagarSectionAhorcado()
  apagarSectionMemory()
  createSectionBingo(numerosbingo)


  desactivarBotonBingo()
  activarBotonAhorcado()
  activarBotonMemory()
  activarBotonAtras()

  
})

//acceso al ahorcado

img2.addEventListener("click", ()=>{
  const divApp = document.querySelector(".app")
  divApp.style.display ="none"
  encenderSectionAhorcado()
  apagarsectionbingo()
  apagarSectionMemory()
  createSectionAhorcado(fotosAhorcado)

  desactivarBotonAhorcado()
  activarBotonAtras()
  activarBotonBingo()
  activarBotonMemory()
 
})
//acceso al memory game

img3.addEventListener("click", ()=>{
  const divApp = document.querySelector(".app")
  divApp.style.display ="none"
  encenderSectionMemory()
  apagarsectionbingo()
  apagarSectionAhorcado()
  createsectionMemory(cartas)

  desactivarBotonMemory()
  activarBotonAhorcado()
  activarBotonBingo()
  activarBotonAtras()

})

header.appendChild(nav)
document.body.appendChild(header)
}


//Todos estos botones sirven para la activación y desactivación de cada uno de ellos, en base de si un juego está activo o no, para que no interfiera en el proceso de cada juego, si en cada juego le damos al botón de stop, todos los imagenes excepto la que propia del juego dónde estés se activarán para que pueda cambiar de section si lo deseas.


export const activarBotonAtras = () =>{
  const botonAtras = document.querySelector(".boton-atras")
  botonAtras.style.pointerEvents = "auto"

}

export const desactivarBotonAtras = () =>{
  const botonAtras = document.querySelector(".boton-atras")
  botonAtras.style.pointerEvents = "none"


}

export const activarBotonBingo = () =>{

  const botonBingo = document.querySelector(".boton-bingo")
  botonBingo.style.pointerEvents ="auto"

}
export const desactivarBotonBingo = () =>{

  const botonBingo = document.querySelector(".boton-bingo")
  botonBingo.style.pointerEvents ="none"

}

export const activarBotonAhorcado = () =>{

  const botonBingo = document.querySelector(".boton-ahorcado")
  botonBingo.style.pointerEvents ="auto"

}

export const desactivarBotonAhorcado = () =>{

  const botonBingo = document.querySelector(".boton-ahorcado")
  botonBingo.style.pointerEvents ="none"

}

export const activarBotonMemory = () =>{

  const botonBingo = document.querySelector(".boton-mgame")
  botonBingo.style.pointerEvents ="auto"

}

export const desactivarBotonMemory = () =>{

  const botonBingo = document.querySelector(".boton-mgame")
  botonBingo.style.pointerEvents ="none"

}