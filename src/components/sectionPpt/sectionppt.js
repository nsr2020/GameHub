import {fotosppt} from "../../data/fotosppt/fotosppt"
import { activarBotonAhorcado, activarBotonAtras, activarBotonMemory, desactivarBotonAhorcado, desactivarBotonAtras, desactivarBotonMemory, desactivarBotonPpt } from "../header/header"

import "./sectionppt.css"
export const sectionppt = document.createElement("section")

export const createSectionPpt = () =>{
  sectionppt.innerHTML =""
  sectionppt.classList.add("sectionppt")
  const psecret = document.createElement("p")
  psecret.textContent = "5 aciertos para ganar, suerte!!!"
  psecret.classList.add("psecret")

  const divIzq = document.createElement("div")
  divIzq.classList.add("divizq")
  const divMarcador = document.createElement("div")
  divMarcador.classList.add("divmarcador")
  const h3Aciertos = document.createElement("h3")
  const h3Fallos = document.createElement("h3")
  const inputAciertos= document.createElement("input")
  const inputFallos = document.createElement("input")

  inputAciertos.textContent = 0;
  inputAciertos.value = 0
  inputFallos.textContent = 0;
  inputFallos.value =0

  inputAciertos.disabled= true;
  inputFallos.disabled = true;
 

  inputAciertos.classList.add("inputAciertos")
  inputFallos.classList.add("inputFallos")

  h3Aciertos.textContent = "Aciertos"
  h3Fallos.textContent ="Fallos"

  const divDer = document.createElement("div")
  divDer.classList.add("divder")
  const divBotones = document.createElement("div")
  divBotones.classList.add("divbotones")
  const btnStart = document.createElement("button")
  const btnStop = document.createElement("button")

  btnStart.textContent= "Check"
  btnStart.disabled= true;
  btnStop.textContent ="Stop"

  btnStart.classList.add("btnStart")
  btnStop.classList.add("btnStop")



 const  divImgs = document.createElement("div")
  divImgs.classList.add("divimgs")

  for( const emoji of fotosppt){
    const img = document.createElement("img")
    img.src = emoji.imagen
    img.alt = emoji.nombre
    img.classList.add(emoji.id)
    img.classList.add("imgs")
    divImgs.append(img)

    img.addEventListener("click", () => {
      btnStart.disabled = false;
      const imgs = document.querySelectorAll(".imgs");
      imgs.forEach((img) => {
        img.classList.remove("chosen");
      });
      img.classList.add("chosen");
    });
  }

  divMarcador.append(h3Aciertos)  
  divMarcador.append(inputAciertos)
  divMarcador.append(h3Fallos)
  divMarcador.append(inputFallos)
  divIzq.append(divMarcador)
  divIzq.append(divImgs)




  divBotones.append(btnStart)
  divBotones.append(btnStop)
  divDer.append(divBotones)


    const divImgRandom = document.createElement("div")
    divImgRandom.classList.add("divrandom")
    const imgRandom = document.createElement("img")
    imgRandom.src = "https://res.cloudinary.com/dnju3aw4b/image/upload/v1704796772/ppt/arcoiris_ocxzir.gif"
    imgRandom.alt ="foto Random"

    divImgRandom.append(imgRandom)

    divDer.append(divImgRandom)
  sectionppt.append(psecret)
  sectionppt.append(divIzq)
  sectionppt.append(divDer)
  document.body.append(sectionppt)

  btnStart.addEventListener("click",()=> {
   
    btnStop.disabled = false;
    desactivarBotonAtras()
    desactivarBotonAhorcado()
    desactivarBotonMemory()
    desactivarBotonPpt()
   
    startPpt(imgRandom)
    psecret.classList.add("aparecer")
   
    

  })

  btnStop.addEventListener("click", () =>{
    btnStart.disabled = false;
    btnStop.disabled = true; 
    activarBotonAhorcado()
    activarBotonAtras()
    activarBotonMemory()
    createSectionPpt()
    limpiarContadores()
    encenderImagenes()
    psecret.classList.remove("aparecer")
    desactivarRotacion()
    
    
  })


}

export const apagarSectionPpt = () => {
  sectionppt.style.display = "none";
  sectionppt.innerHTML = "";
};

export const encenderSectionPpt = () => {
  sectionppt.style.display = "flex";
  sectionppt.innerHTML = "";
};

const activarRotation = () =>{
  const imgs = document.querySelectorAll(".imgs");
  imgs.forEach((img)=>{
    img.classList.remove("chosen")
    img.classList.add("rotacion")
  })

}
const desactivarRotacion = () =>{
  const imgs = document.querySelectorAll(".imgs");
  imgs.forEach((img)=>{
    img.classList.remove("rotacion")
  })
}


const startPpt = (imagen) =>{

  let photoRandom = Math.floor(Math.random() * fotosppt.length);
  let selectedImage = fotosppt[photoRandom].imagen;
  let selectedIndex = fotosppt[photoRandom].id

  imagen.src ="https://res.cloudinary.com/dnju3aw4b/image/upload/v1704796772/ppt/arcoiris_ocxzir.gif"

  setTimeout(() => {
      imagen.classList.add("vuelta")
      imagen.src = selectedImage;
    const divContainer = document.querySelector(".divrandom");
    divContainer.innerHTML = ""; 
    divContainer.appendChild(imagen);
    
  }, 500);
  

  comprobarImg(selectedIndex)
}

let aciertos = 0;
let fallos = 0;

const comprobarImg = (index) => {
  const imgs = document.querySelectorAll(".imgs");

  imgs.forEach((img) => {
    if (img.classList.contains("chosen") && img.classList.contains(index)) {
      aciertos++;
    } else if (img.classList.contains("chosen")) {
      fallos++;
    }
  });

  if (aciertos === 5) {
    actualizarContadores();
    setTimeout(() => {
      alert("Felicidades, has conseguido acertar 5 imágenes!!!");
      endGame()
      activarRotation()
    }, 1000);
  }

  if (fallos === 10) {
    actualizarContadores();
    setTimeout(() => {
      alert("Lo sentimos, no has conseguido ganar!!!");
      endGame();
    }, 1000);
  }

  actualizarContadores();
};

const endGame = () =>{

  const btnStart = document.querySelector(".btnStart")
  const btnStop = document.querySelector(".btnStop")

  btnStart.disabled = true;
  btnStop.disabled = false; 
  limpiarContadores()
  apagarImagenes()

}
const apagarImagenes = () =>{
  const imgs = document.querySelectorAll(".imgs")
  imgs.forEach((img) =>{
    img.style.pointerEvents ="none"
  })
}
const encenderImagenes = () =>{
  const imgs = document.querySelectorAll(".imgs")
  imgs.forEach((img) =>{
    img.style.pointerEvents ="auto"
  })

}


const actualizarContadores = () => {
  const inputAciertos = document.querySelector(".inputAciertos");
  inputAciertos.classList.add("aciertos")
  inputAciertos.textContent = aciertos;
  inputAciertos.value = aciertos;

  const inputFallos = document.querySelector(".inputFallos");
  inputFallos.classList.add("fallos")
  inputFallos.textContent = fallos;
  inputFallos.value = fallos;
};

const limpiarContadores = () =>{
  const inputAciertos = document.querySelector(".inputAciertos");
  inputAciertos.classList.remove("aciertos")

  const inputFallos = document.querySelector(".inputFallos");
  inputFallos.classList.remove("fallos")

 aciertos = 0
 fallos = 0
  

}

