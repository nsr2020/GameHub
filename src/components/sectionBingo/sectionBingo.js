import "../../data/numerosBingo/numerosbingo"
import { numerosbingo } from "../../data/numerosBingo/numerosbingo"
import { activarBotonAhorcado, activarBotonAtras, activarBotonBingo, activarBotonMemory, desactivarBotonAhorcado, desactivarBotonAtras, desactivarBotonBingo, desactivarBotonMemory } from "../header/header"

import "./sectionBingo.css"


//!ESto lo puse fuera como scope global ya que me estaba dando problemas a la hora de que reconociese la clase en otras funciones y decidí ponerlo así, no obstante, se que podría haber optado por enviarlo a través de una función, pero la verdad que cómo me estaba dándo muchos fallos, lo deje así!!

const sectionBingo = document.createElement("section")
sectionBingo.classList.add("sectionbingo")
const botonStart = document.createElement("button")
const botonPause = document.createElement("button")
const botonResume = document.createElement("button")
const botonStop = document.createElement("button")
const imgBolaCantada = document.createElement("img")

//!En esta funcion se crea todo el contenido de la section Bingo 

export const createSectionBingo = (array) =>{
  console.log("Entrando en createSectionBingo");
  sectionBingo.innerHTML = ""
  resetSeleccionado()
  window.speechSynthesis.cancel();
  estado= "esperando"
  stop=false;

  const imgBingo = document.createElement("img")
  const divIzq = document.createElement("div")
  const divBotones = document.createElement("div")
  const divBola = document.createElement("div")
  const divTablero = document.createElement("div")


  divIzq.classList.add("divizq")
  divTablero.classList.add("divtablero")
  divBola.classList.add("divbola")
  divBotones.classList.add("divbotones")
  imgBingo.src = "https://res.cloudinary.com/dnju3aw4b/image/upload/v1702836817/UCDM/GamesHub/imgBingo_izsgys.gif"
  imgBolaCantada.src = "https://res.cloudinary.com/dnju3aw4b/image/upload/v1703009635/UCDM/GamesHub/imagenbingoazar_zxjqyu.png"
  imgBolaCantada.classList.add("imgbolacantada")

  botonStart.textContent= "Comenzar"
  botonPause.textContent = "Pausar"
  botonResume.textContent = "Reanudar"
  botonStop.textContent = "Stop"
  botonStart.classList.add("botonstart")
  botonPause.classList.add("botonpause")
  botonResume.classList.add("botonresume")
  botonPause.disabled = true
  botonResume.disabled = true
  botonStop.disabled = true

let contador = 1;
  for(const numero of array){
    const divbolatablero = document.createElement("div")
    const imgBolaTablero = document.createElement("img")

    const idBola = "bola" + numero.id; // Generar un ID único para cada bola

    imgBolaTablero.classList.add("imgbolatablero", idBola);
    divbolatablero.classList.add("divbolatablero", idBola);

    imgBolaTablero.src = numero.img
    divbolatablero.append(imgBolaTablero)
    divTablero.append(divbolatablero)
    contador++;

  }

        divBotones.append(botonStart)
        divBotones.append(botonPause)
        divBotones.append(botonResume)
        divBotones.append(botonStop)
        divIzq.append(imgBingo)
        divIzq.append(divBotones)
        divIzq.append(divBola)
        divBola.append(imgBolaCantada)
        sectionBingo.appendChild(divIzq)
        sectionBingo.appendChild(divTablero)

      document.body.appendChild(sectionBingo)

//!Eventos para start, pause ,resume y el stop del bingo
      botonStart.addEventListener("click", ()=>{

        const imgBolaTablero = document.querySelectorAll(".imgbolatablero")
        const divbolatablero = document.querySelectorAll(".divbolatablero");

        imgBolaTablero.forEach((img) => {
          img.style.opacity = "1";
        });

        divbolatablero.forEach((div) => {
          div.style.border = "none";
        });
      
        botonStart.disabled = true;
        botonPause.disabled = false;
        botonResume.disabled = true;
        botonStop.disabled = true;

       

          desactivarBotonAhorcado()
          desactivarBotonAtras()
          desactivarBotonBingo()
          desactivarBotonMemory()

       
          if (estado === "esperando") {
            // Resto del código...
            estado = "iniciado";
            stop = false;
            startBingo(numerosbingo, estado, stop);
          }

      })


        botonPause.addEventListener("click", ()=>{
          console.log("Botón de pausa presionado");
        estado = "pausado"
        botonStart.disabled = true;
        botonPause.disabled = true;
          botonResume.disabled = false;
          botonStop.disabled = false;

          pausarBingo(estado)

        })

        botonResume.addEventListener("click", ()=>{

          if (estado === "pausado" ) {
            estado = "iniciado";
            botonStart.disabled = true;
            botonResume.disabled = true;
            botonPause.disabled = false;
            botonStop.disabled = true;
            // Reanudar el juego
            startBingo(numerosbingo, estado, false);
          }
          

        })

        botonStop.addEventListener("click",() =>{
          estado = "iniciado"

          botonStart.disabled = false;
          botonResume.disabled = true;
          botonPause.disabled = true;
          botonStop.disabled = true;
          pararBingo(estado)

          activarBotonAhorcado()
          activarBotonAtras()
        activarBotonMemory()
} )


}

//---------------botones del header para cambiar de section o ir al principio--------------------------------------
//!Estas funciones basicamente realizan el limpiado de las sectionBingo cuando se cambie de un juego a otro.
export const apagarsectionbingo = () =>{
  sectionBingo.style.display="none"
  sectionBingo.innerHTML =""
  clearInterval(intervalId)
 estado = "esperando"
 stop =false;
  
}
export const encendersectionbingo = () =>{
  
  resetSeleccionado()
  sectionBingo.innerHTML=""
  clearInterval(intervalId)
  estado = "esperando"
  sectionBingo.style.display = "flex"
}
//-------------------------------------------------------------funciones para start, pausar y reanudar el bingo-----------------------

let intervalId;
let utterance;

let estado ="esperando"
let stop = false;

//! Función para generar el cantado de los numeros con voz
const createUtterance = (text) => {
  utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'es-ES';
};

     
//!En esta parte es el boton Start que va a estar desactivado hasta que se clique stop, aqui le paso el array de numeros, el estado en ql que esta el juego y si está o no finalizado, para de esta forma poder controlar los botones de pausa, reanudar y stop
export const startBingo = (array, estado, finalizado) => {
  console.log("Entrando en startBingo", estado, finalizado);
      let contador= 0;
     
    
      if(estado ==="iniciado" && !finalizado){
       
        intervalId = setInterval(() => {
         
          const numeroAleatorio = obtenerNumeroAleatorio(array.length);


          if (numeroAleatorio === null ||finalizado === true ) {
            
            clearInterval(intervalId)
           
            botonStart.disabled = false;
            botonPause.disabled=true
            botonResume.disabled=true
            botonStop.disabled = true

            const imgBolaTablero = document.querySelectorAll(".imgbolatablero")
            const divbolatablero = document.querySelectorAll(".divbolatablero");
          
            imgBolaTablero.forEach((img) => {
              img.style.opacity = "1";
            });
          
            divbolatablero.forEach((div) => {
              div.style.border = "none";
            });
            resetSeleccionado(); 
            alert("El bingo ha finalizado!!!!")
            createSectionBingo(numerosbingo)
          
            return; 
          }
          //!En esta parte si el juego esta iniciado, entonces procede a mostrar la bola que haya salido y pintarla en el tablero
          const imgSrc = array[numeroAleatorio].img;

         
          imgBolaCantada.src = imgSrc

          
          imgBolaCantada.style.display = "flex";

          
          const idBolaSalida = "bola" + array[numeroAleatorio].id;

          
          const imgBolaTablero = document.querySelector("." + idBolaSalida);
          const divbolatablero = document.querySelector("." + idBolaSalida);

         
          imgBolaTablero.style.opacity = "0.5";
          divbolatablero.style.border = "2px dotted black";

            
            const numeroCantado = array[numeroAleatorio].id.toString();
            createUtterance(numeroCantado);
            window.speechSynthesis.speak(utterance);
        

          contador++;
        }, 3000); 
      }else if (estado ==="pausado"){
        clearInterval(intervalId)
       
      }else if (estado === "esperando"){
        createSectionBingo(numerosbingo)

      }
}



//!En esta función pausamos el juego y se activa reanudar y también el botón de Stop
const pausarBingo = (estado) =>{
  console.log("Pausando el bingo", estado);
stop = false
startBingo(numerosbingo, estado, stop)
}

//!En esta función se reanuda el juego y sólo esta activa si presionas pausar, sinno esta desactivada.
const reanudarBingo = (estado) =>{
  console.log("Reanudando el bingo", estado);
  stop = false
  startBingo(numerosbingo, estado, stop);

}

//!Esta función va enlazada con el botonStop y detiene el juego, 
const pararBingo = (estado) => {
  alert("El bingo ha sido detenido")
  stop = true;
  clearInterval(intervalId)
  createSectionBingo(numerosbingo);
  return;
};

//!Este apartado es para poner en false la propiedad del array numerosbingo para que empiezen con este valor cuando se inice una nueva partida 
const resetSeleccionado = () => {
  for (const numero of numerosbingo) {
    numero.selected = false;
  }
};


//! Aqui estamos obteniendo los numeros aleatorios y que no se repitan
const obtenerNumeroAleatorio = (max) => {
 
  const todosLosNumerosSeleccionados = numerosbingo.every(numero => numero.selected);
  if (todosLosNumerosSeleccionados) {
    return null;
  }


  let numeroAleatorio;
  do {
    numeroAleatorio = Math.floor(Math.random() * max);
  } while (numerosbingo[numeroAleatorio].selected);

  
  numerosbingo[numeroAleatorio].selected = true;

  return numeroAleatorio;
};

