import '/style.css'
import './PiedraPapelTijeras.css'

import { createButton } from '../Button/Button'

const opciones = [
  { name: 'piedra', image: '/Assets/Piedra-icon.png' },
  { name: 'papel', image: '/Assets/Papel-icon.png' },
  { name: 'tijeras', image: '/Assets/Tijeras-icon.png' }
]

export const PiedraPapelTijeras = (nodoPadre) => {
  const sectionPpt = document.createElement('section')
  sectionPpt.id = 'sectionPpt'
  sectionPpt.classList.add('flex-container')

  const art1Ppt = document.createElement('article')
  const art2Ppt = document.createElement('article')
  art1Ppt.classList.add('flex-container')
  art2Ppt.classList.add('flex-container')

  const divMaquina = document.createElement('div')
  divMaquina.classList.add('flex-container')
  const divUsuario = document.createElement('div')
  divUsuario.classList.add('divUsuario', 'flex-container')

  const divPuntUsuario = document.createElement('div')
  const divPuntMaquina = document.createElement('div')
  divPuntUsuario.classList.add('divPuntUsuario', 'flex-container')
  divPuntMaquina.classList.add('divPuntMaquina', 'flex-container')

  art2Ppt.appendChild(divPuntUsuario)
  art2Ppt.appendChild(divPuntMaquina)

  let puntuacionMaquina = 0
  let puntuacionUsuario = 0
  let divEleccionSeleccionada = null

  const cargarPuntuacionDesdeLocalStorage = () => {
    const puntuacionMaquinaGuardada = localStorage.getItem('puntuacionMaquina')
    const puntuacionUsuarioGuardada = localStorage.getItem('puntuacionUsuario')

    if (
      puntuacionMaquinaGuardada !== null &&
      puntuacionUsuarioGuardada !== null
    ) {
      puntuacionMaquina = parseInt(puntuacionMaquinaGuardada)
      puntuacionUsuario = parseInt(puntuacionUsuarioGuardada)
      actualizarPuntuacionEnInterfaz()
    }
  }

  const guardarPuntuacionEnLocalStorage = () => {
    localStorage.setItem('puntuacionMaquina', puntuacionMaquina.toString())
    localStorage.setItem('puntuacionUsuario', puntuacionUsuario.toString())
  }

  const actualizarPuntuacionEnInterfaz = () => {
    const h3PuntMaquina = document.createElement('h3')
    const h3PuntUsuario = document.createElement('h3')
    h3PuntMaquina.innerHTML = 'VS   ' + puntuacionMaquina
    h3PuntUsuario.innerHTML = 'TÚ   ' + puntuacionUsuario
    divPuntUsuario.innerHTML = ''
    divPuntMaquina.innerHTML = ''
    divPuntUsuario.appendChild(h3PuntUsuario)
    divPuntMaquina.appendChild(h3PuntMaquina)
  }

  const resetear = () => {
    puntuacionMaquina = 0
    puntuacionUsuario = 0
    divPuntUsuario.innerHTML = ''
    divPuntMaquina.innerHTML = ''
    divMaquina.innerHTML = ''
  }
  const comprobar = () => {
    if (
      divMaquina.className === 'papel' &&
      divEleccionSeleccionada.classList.contains('piedra')
    ) {
      puntuacionMaquina++
    }
    if (
      divMaquina.className === 'papel' &&
      divEleccionSeleccionada.classList.contains('tijeras')
    ) {
      puntuacionUsuario++
    }
    if (
      divMaquina.className === 'piedra' &&
      divEleccionSeleccionada.classList.contains('tijeras')
    ) {
      puntuacionMaquina++
    }
    if (
      divMaquina.className === 'piedra' &&
      divEleccionSeleccionada.classList.contains('papel')
    ) {
      puntuacionUsuario++
    }
    if (
      divMaquina.className === 'tijeras' &&
      divEleccionSeleccionada.classList.contains('papel')
    ) {
      puntuacionMaquina++
    }
    if (
      divMaquina.className === 'tijeras' &&
      divEleccionSeleccionada.classList.contains('piedra')
    ) {
      puntuacionUsuario++
    }
    const h3PuntMaquina = document.createElement('h3')
    const h3PuntUsuario = document.createElement('h3')
    h3PuntMaquina.innerHTML = 'VS   ' + puntuacionMaquina
    h3PuntUsuario.innerHTML = 'TÚ   ' + puntuacionUsuario
    divPuntUsuario.innerHTML = ''
    divPuntMaquina.innerHTML = ''
    divPuntUsuario.appendChild(h3PuntUsuario)
    divPuntMaquina.appendChild(h3PuntMaquina)
  }
  const botonReset = createButton(art2Ppt)
  botonReset.classList.add('botonReset')
  botonReset.classList.add('reset')
  const imgBoton = document.createElement('img')
  imgBoton.src = '/Assets/Reset-icon.png'
  botonReset.appendChild(imgBoton)

  botonReset.addEventListener('click', resetear)

  const eleccionMaquina = () => {
    while (divMaquina.firstChild) {
      divMaquina.removeChild(divMaquina.firstChild)
    }

    const imgMaquina = document.createElement('img')
    const randomIndex = Math.floor(Math.random() * opciones.length)
    imgMaquina.src = opciones[randomIndex].image

    const opcionSeleccionada = opciones[randomIndex].name
    divMaquina.appendChild(imgMaquina)
    divMaquina.className = ''
    divMaquina.classList.add(opcionSeleccionada)

    comprobar()
    guardarPuntuacionEnLocalStorage()
    actualizarPuntuacionEnInterfaz()
  }
  const iniciarJuego = () => {
    cargarPuntuacionDesdeLocalStorage()
  }

  for (const element of opciones) {
    const imgUsuario = document.createElement('img')
    imgUsuario.src = element.image
    const divEleccion = document.createElement('div')
    divEleccion.classList.add(element.name)

    divEleccion.appendChild(imgUsuario)
    divUsuario.appendChild(divEleccion)

    divEleccion.addEventListener('click', () => {
      divEleccionSeleccionada = divEleccion
      eleccionMaquina()
    })

    art1Ppt.appendChild(divMaquina)
    art1Ppt.appendChild(divUsuario)
    sectionPpt.appendChild(art1Ppt)
    sectionPpt.appendChild(art2Ppt)
    nodoPadre.appendChild(sectionPpt)
  }
  iniciarJuego()
}
