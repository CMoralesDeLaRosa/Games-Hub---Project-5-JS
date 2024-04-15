import '/style.css'
import './Trivial.css'
import { dataTrivial } from '../0.Data/Data'
import { createButton } from '../Button/Button'

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

export const Trivial = (nodoPadre) => {
  let puntuacion = sessionStorage.getItem('puntuacion')

  if (!puntuacion) {
    puntuacion = 0
  }
  let respuestasSeleccionadas = JSON.parse(
    sessionStorage.getItem('respuestasSeleccionadas')
  )

  if (!respuestasSeleccionadas) {
    respuestasSeleccionadas = []
  }

  let nombreRespuestasSeleccionadas = JSON.parse(
    sessionStorage.getItem('nombreRespuestasSeleccionadas')
  )

  if (!nombreRespuestasSeleccionadas) {
    nombreRespuestasSeleccionadas = []
  }

  let preguntasAleatorias = []
  let juegoIniciado = false
  let respuestasAleatoriasParaPregunta = {}

  const iniciarJuego = () => {
    preguntasAleatorias = JSON.parse(
      sessionStorage.getItem('preguntasAleatorias')
    )
    if (!preguntasAleatorias) {
      preguntasAleatorias = shuffleArray(dataTrivial)
      sessionStorage.setItem(
        'preguntasAleatorias',
        JSON.stringify(preguntasAleatorias)
      )
    }
    crearTablero(preguntasAleatorias)
    cargarEstadoJuego()
  }

  const cargarEstadoJuego = () => {
    const estadoJuego = JSON.parse(sessionStorage.getItem('trivialEstadoJuego'))

    if (estadoJuego) {
      puntuacion = estadoJuego.puntuacion
      respuestasSeleccionadas = estadoJuego.respuestasSeleccionadas
      nombreRespuestasSeleccionadas = estadoJuego.nombreRespuestasSeleccionadas
      actualizarPuntuacion()
    }
  }

  const guardarEstadoJuego = () => {
    const estadoJuego = {
      puntuacion: puntuacion,
      respuestasSeleccionadas: respuestasSeleccionadas,
      nombreRespuestasSeleccionadas: nombreRespuestasSeleccionadas
    }

    sessionStorage.setItem('trivialEstadoJuego', JSON.stringify(estadoJuego))
  }

  const crearTablero = (preguntasAleatorias) => {
    const sectionTrivialExistente = document.getElementById('sectionTrivial')
    if (sectionTrivialExistente) {
      sectionTrivialExistente.remove()
    }

    const sectionTrivial = document.createElement('section')
    sectionTrivial.id = 'sectionTrivial'
    sectionTrivial.classList.add('flex-container')

    const art1Trivial = document.createElement('article')
    art1Trivial.classList.add('art1Trivial', 'flex-container')
    const art2Trivial = document.createElement('article')
    art2Trivial.classList.add('art2Trivial', 'flex-container')

    const divPuntT = document.createElement('div')
    divPuntT.classList.add('divPuntT', 'flex-container')
    divPuntT.textContent = puntuacion
    art2Trivial.appendChild(divPuntT)

    if (puntuacion < 8) {
      const botonComprobar = createButton(art2Trivial)
      const imgComprobar = document.createElement('img')
      imgComprobar.src = '/Assets/Check-icon.png'
      botonComprobar.classList.add('reset', 'botonComprobar')
      botonComprobar.appendChild(imgComprobar)
      botonComprobar.addEventListener('click', () => {
        actualizarPuntuacion()
      })
    }

    sectionTrivial.appendChild(art1Trivial)
    sectionTrivial.appendChild(art2Trivial)
    nodoPadre.appendChild(sectionTrivial)

    if (!respuestasSeleccionadas) {
      respuestasSeleccionadas.push(false)
    }

    for (const element of preguntasAleatorias) {
      const divPregunta = document.createElement('div')
      const pregunta = document.createElement('p')
      pregunta.innerText = element.pregunta.toUpperCase()
      divPregunta.appendChild(pregunta)

      const ul = document.createElement('ul')
      ul.classList.add('ulRespuestas', 'flex-container')

      let respuestasAleatoriasParaPregunta = sessionStorage.getItem(
        `respuestasAleatorias_${element.id}`
      )

      if (!respuestasAleatoriasParaPregunta) {
        const respuestasAleatorias = shuffleArray(
          Object.values(element.respuestas)
        )
        sessionStorage.setItem(
          `respuestasAleatorias_${element.id}`,
          JSON.stringify(respuestasAleatorias)
        )
        respuestasAleatoriasParaPregunta = respuestasAleatorias
      } else {
        respuestasAleatoriasParaPregunta = JSON.parse(
          respuestasAleatoriasParaPregunta
        )
      }

      for (const respuesta of respuestasAleatoriasParaPregunta) {
        const divLi = document.createElement('div')
        const li = document.createElement('li')
        li.textContent = respuesta.toUpperCase()
        divLi.classList.add('divLi', 'flex-container')

        if (
          respuesta === 'Francia' ||
          respuesta === 'Alcalá de Henares' ||
          respuesta === '12 de octubre' ||
          respuesta === 'Florencia' ||
          respuesta === 'Chile' ||
          respuesta === 'Blanca y roja' ||
          respuesta === 'Peso mexicano' ||
          respuesta === 'Bollo preñao'
        ) {
          divLi.dataset.key = 'respuestaCorrecta'
        } else {
          divLi.dataset.key = 'respuestaIncorrecta'
        }

        divLi.appendChild(li)
        ul.appendChild(divLi)

        if (nombreRespuestasSeleccionadas.includes(respuesta.toUpperCase())) {
          divLi.classList.add('seleccionada')
        }

        divLi.addEventListener('click', (event) => {
          comprobar(
            event,
            preguntasAleatorias,
            respuestasSeleccionadas,
            element
          )
        })
      }

      divPregunta.appendChild(ul)
      art1Trivial.appendChild(divPregunta)
    }

    if (puntuacion > 7) {
      mostrarHasGanadoYBotonReset()
    }

    guardarEstadoJuego()
  }

  const comprobar = (
    event,
    preguntasAleatorias,
    respuestasSeleccionadas,
    element
  ) => {
    const divLi = event.currentTarget
    const preguntaIndex = preguntasAleatorias.findIndex(
      (pregunta) => pregunta === element
    )

    const ul = divLi.parentNode
    const respuestasDivs = ul.querySelectorAll('div')
    respuestasDivs.forEach((div) => div.classList.remove('seleccionada'))
    divLi.classList.add('seleccionada')

    const key = divLi.dataset.key
    const respuestaActualEsCorrecta = key === 'respuestaCorrecta'
    const respuestaSeleccionada = divLi.textContent.trim()

    const respuestaAnterior = respuestasSeleccionadas[preguntaIndex]
    if (respuestaAnterior) {
      if (
        respuestaAnterior === 'respuestaCorrecta' &&
        !respuestaActualEsCorrecta
      ) {
        puntuacion--
      }
      if (
        respuestaAnterior === 'respuestaIncorrecta' &&
        respuestaActualEsCorrecta
      ) {
        puntuacion++
      }
    } else {
      if (respuestaActualEsCorrecta) {
        puntuacion++
      }
    }

    nombreRespuestasSeleccionadas[preguntaIndex] = respuestaSeleccionada

    respuestasSeleccionadas[preguntaIndex] = respuestaActualEsCorrecta
      ? 'respuestaCorrecta'
      : 'respuestaIncorrecta'

    sessionStorage.setItem(
      'respuestasSeleccionadas',
      JSON.stringify(respuestasSeleccionadas)
    )

    sessionStorage.setItem(
      'nombreRespuestasSeleccionadas',
      JSON.stringify(nombreRespuestasSeleccionadas)
    )
    sessionStorage.setItem('puntuacion', JSON.stringify(puntuacion))

    guardarEstadoJuego()
  }

  const resetearJuego = () => {
    sessionStorage.removeItem('trivialEstadoJuego')
    sessionStorage.removeItem('juegoIniciado')
    sessionStorage.removeItem('puntuacion')
    sessionStorage.removeItem('respuestasSeleccionadas')
    sessionStorage.removeItem('nombreRespuestasSeleccionadas')
    sessionStorage.removeItem('respuestasAleatorias')
    sessionStorage.removeItem('preguntasAleatorias')
    juegoIniciado = false
    puntuacion = 0
    respuestasSeleccionadas = []
    nombreRespuestasSeleccionadas = []
    respuestasAleatoriasParaPregunta = {}
    preguntasAleatorias = []
    iniciarJuego()
  }

  const actualizarPuntuacion = () => {
    const divPuntT = document.querySelector('.divPuntT')
    divPuntT.innerHTML = ''

    const h3Punt = document.createElement('h3')
    h3Punt.textContent = puntuacion
    divPuntT.appendChild(h3Punt)

    if (puntuacion === 8) {
      mostrarHasGanadoYBotonReset()
    }

    guardarEstadoJuego()
  }

  const mostrarHasGanadoYBotonReset = () => {
    const divWinT = document.createElement('div')
    const h3Win = document.createElement('h3')
    divWinT.classList.add('divWin', 'flex-container')
    divWinT.appendChild(h3Win)
    h3Win.innerText = '¡Has ganado!'.toUpperCase()
    const art2Trivial = document.querySelector('.art2Trivial')
    art2Trivial.appendChild(divWinT)
    const botonResetT = createButton(art2Trivial)
    botonResetT.classList.add('botonResetT', 'reset')
    const img = document.createElement('img')
    img.src = '/Assets/Reset-icon.png'
    botonResetT.appendChild(img)

    const botonComprobar = document.querySelector('.botonComprobar')
    if (botonComprobar) {
      botonComprobar.remove()
    }

    guardarEstadoJuego()

    botonResetT.addEventListener('click', () => {
      resetearJuego()
    })
  }

  iniciarJuego()
  cargarEstadoJuego()
}
