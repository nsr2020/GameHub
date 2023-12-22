import { activarBotonAhorcado, activarBotonAtras, activarBotonBingo, activarBotonMemory } from "../header/header"
import { apagarSectionAhorcado } from "../sectionAhorcado/sectionahorcado"
import { apagarsectionbingo } from "../sectionBingo/sectionBingo"
import { apagarSectionMemory } from "../sectionMemory/sectionMemory"
import "./startpage.css"

//En esta section creo la página de inicio de nuestro juego dónde hay una animación de dados que si haces hover sobre ellos rotan y la escala se hace mayor, y el botón de comenzar que te lleva a un header con diferentes sections de juegos, en este juego he optado por hacer un Bingo, un Ahorcado y un Memory Game.

export const createPageStart = () =>{
  const divApp = document.querySelector(".app")

  const divStart = document.createElement("div")
  const h1 = document.createElement("h1")
  const botonstart = document.createElement("button")
  
  const img1 = document.createElement("img")
  const img2 = document.createElement("img")


h1.textContent = "Games-Hub"
botonstart.textContent= "START"

  img1.src = "https://res.cloudinary.com/dnju3aw4b/image/upload/v1702766679/UCDM/GamesHub/dado_mzwyym.png"
  img2.src = "https://res.cloudinary.com/dnju3aw4b/image/upload/v1702766541/UCDM/GamesHub/Pngtree_dice_vector_6277472_egivtr.png"

  img1.setAttribute("id", "color1")
  img2.setAttribute("id", "color2")

  botonstart.addEventListener("click",  ()=>{
    const divApp = document.querySelector(".app")
    divApp.style.display = "none"

    const header = document.querySelector(".header")
    header.style.display= "flex"
    apagarsectionbingo()
    apagarSectionAhorcado()
    apagarSectionMemory()

    activarBotonAtras()
    activarBotonBingo()
    activarBotonAhorcado()
    activarBotonMemory()


  })

  divStart.appendChild(img1)
  divStart.appendChild(img2)
  divApp.append(h1)
  divApp.append(botonstart)
  
  divApp.append(divStart)
}