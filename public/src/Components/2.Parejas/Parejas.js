import '/style.css'
import './Parejas.css'
import { createButton } from '../Button/Button'

const cartas = [
  { id: 1, color: 'rosybrown' },
  { id: 2, color: 'darkslategrey' },
  { id: 3, color: 'darkcyan' },
  { id: 4, color: 'darkslateblue' },
  { id: 5, color: 'coral' },
  { id: 6, color: 'mediumpurple' },
  { id: 7, color: 'dodgerblue' },
  { id: 8, color: 'grey' },
  { id: 9, color: 'darkgoldenrod' },
  { id: 10, color: 'darkkhaki' },
  { id: 11, color: 'rosybrown' },
  { id: 12, color: 'darkslategrey' },
  { id: 13, color: 'darkcyan' },
  { id: 14, color: 'darkslateblue' },
  { id: 15, color: 'coral' },
  { id: 16, color: 'mediumpurple' },
  { id: 17, color: 'dodgerblue' },
  { id: 18, color: 'grey' },
  { id: 19, color: 'darkgoldenrod' },
  { id: 20, color: 'darkkhaki' }
]

export const Parejas = (nodoPadre) => {
  let contador = 0
  let puntuacion = 0
  let carta1 = null
  let carta2 = null
  let cartasCoincidentes = []
  let cartasMezcladas = []
  let juegoIniciado = false

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[array[i], array[j]] = [array[j], array[i]]
    }
    return array
  }

  const inicializarJuego = () => {
    if (!sessionStorage.getItem('juegoIniciado')) {
      cartasMezcladas = shuffleArray(cartas)
      crearTablero(cartasMezcladas)
      sessionStorage.setItem('cartasMezcladas', JSON.stringify(cartasMezcladas))
      sessionStorage.setItem('juegoIniciado', 'true')
    } else {
      cargarEstadoJuego()
    }
    return
  }

  const guardarEstadoJuego = () => {
    const estadoJuego = {
      puntuacion: puntuacion,
      cartasMezcladas: cartasMezcladas,
      cartasCoincidentes: cartasCoincidentes
    }
    sessionStorage.setItem('parejasEstadoJuego', JSON.stringify(estadoJuego))
  }

  const cargarEstadoJuego = () => {
    const estadoJuego = JSON.parse(sessionStorage.getItem('parejasEstadoJuego'))

    if (estadoJuego) {
      puntuacion = estadoJuego.puntuacion
      cartasCoincidentes = estadoJuego.cartasCoincidentes || []
      cartasMezcladas = estadoJuego.cartasMezcladas

      crearTablero(cartasMezcladas)
      actualizarPuntuacionVisual()
      aplicarColorSeleccionado()
    }
  }

  const crearTablero = () => {
    const sectionParejas = document.createElement('section')
    sectionParejas.id = 'sectionParejas'
    sectionParejas.classList.add('flex-container')

    const art1Par = document.createElement('article')
    const art2Par = document.createElement('article')
    const divPunt = document.createElement('div')
    divPunt.classList.add('flex-container', 'divPunt')
    divPunt.innerHTML = puntuacion
    art1Par.classList.add('flex-container', 'art1Par')
    art2Par.classList.add('flex-container', 'art2Par')

    art2Par.appendChild(divPunt)
    sectionParejas.appendChild(art1Par)
    sectionParejas.appendChild(art2Par)
    nodoPadre.appendChild(sectionParejas)

    cartasMezcladas.forEach((carta) => {
      const divCarta = document.createElement('div')
      divCarta.classList.add('divCarta')

      divCarta.addEventListener('click', () =>
        seleccionar(divCarta, carta.color)
      )

      if (cartasCoincidentes.includes(carta.color)) {
        divCarta.style.backgroundColor = carta.color
      }

      art1Par.appendChild(divCarta)
    })

    if (puntuacion === cartasMezcladas.length / 2) {
      const divWin = document.createElement('div')
      divWin.classList.add('divWin', 'flex-container')

      const h3Win = document.createElement('h3')
      h3Win.innerText = '¡Has ganado!'.toUpperCase()

      divWin.appendChild(h3Win)
      const art2Par = document.querySelector('.art2Par')
      art2Par.appendChild(divWin)

      const boton = createButton(art2Par)
      boton.classList.add('reset')

      const img = document.createElement('img')
      img.src = '/Assets/Reset-icon.png'
      boton.appendChild(img)

      boton.addEventListener('click', resetearJuego)
    }
    guardarEstadoJuego()
  }

  const actualizarPuntuacionVisual = () => {
    const divPunt = document.querySelector('.divPunt')
    if (divPunt) {
      const h3Puntuacion = document.createElement('h3')
      h3Puntuacion.innerText = puntuacion
      divPunt.innerHTML = ''
      divPunt.appendChild(h3Puntuacion)
    }
  }

  const resetearJuego = (estadoJuego) => {
    sessionStorage.removeItem('parejasEstadoJuego', JSON.stringify(estadoJuego))
    sessionStorage.removeItem('juegoIniciado', JSON.stringify(estadoJuego))
    const divPunt = document.querySelector('.divPunt')
    divPunt.innerHTML = ''
    puntuacion = 0
    contador = 0
    carta1 = null
    carta2 = null
    cartasCoincidentes = []
    cartasMezcladas = shuffleArray(cartas)
    const divWin = document.querySelector('.divWin')
    if (divWin) divWin.remove()
    const boton = document.querySelector('.reset')
    if (boton) boton.remove()
    const cartasLevantadas = document.querySelectorAll('.divCarta')
    cartasLevantadas.forEach((carta) => carta.remove())
    cartasMezcladas.forEach((carta) => {
      const divCarta = document.createElement('div')
      divCarta.classList.add('divCarta')
      divCarta.addEventListener('click', () =>
        seleccionar(divCarta, carta.color)
      )
      const art1Par = document.querySelector('.art1Par')
      art1Par.appendChild(divCarta)
    })
  }

  const comprobar = () => {
    if (carta1 === carta2) {
      puntuacion++
      contador = 0
      cartasCoincidentes.push(carta1)
      sessionStorage.setItem(
        'cartasSeleccionadas',
        JSON.stringify(cartasCoincidentes)
      )
      carta1 = undefined
      carta2 = undefined

      const h3Puntuación = document.createElement('h3')
      h3Puntuación.innertext = puntuacion
      const divPunt = document.querySelector('.divPunt')
      divPunt.innerHTML = puntuacion
      divPunt.appendChild(h3Puntuación)

      guardarEstadoJuego()

      if (puntuacion === cartasMezcladas.length / 2) {
        const divWin = document.createElement('div')
        divWin.classList.add('divWin', 'flex-container')

        const h3Win = document.createElement('h3')
        h3Win.innerText = '¡Has ganado!'.toUpperCase()

        divWin.appendChild(h3Win)
        const art2Par = document.querySelector('.art2Par')
        art2Par.appendChild(divWin)

        const boton = createButton(art2Par)
        boton.classList.add('reset')

        const img = document.createElement('img')
        img.src = '/Assets/Reset-icon.png'
        boton.appendChild(img)

        boton.addEventListener('click', resetearJuego)
      }
    } else {
      setTimeout(() => {
        resetearColor()
      }, 800)
    }
  }

  const resetearColor = () => {
    const cartasSeleccionadas = document.querySelectorAll('.divCarta.selected')
    cartasSeleccionadas.forEach((carta) => {
      if (!cartasCoincidentes.includes(carta.style.backgroundColor)) {
        carta.style.backgroundColor = ''
      }
      carta.classList.remove('selected')
      guardarEstadoJuego()
    })
    contador = 0
    carta1 = undefined
    carta2 = undefined
  }

  const seleccionar = (divCarta, color) => {
    if (contador < 2 && !divCarta.classList.contains('selected')) {
      contador++
      divCarta.classList.add('selected')
      divCarta.classList.add('girar')
      divCarta.addEventListener(
        'animationend',
        () => {
          divCarta.classList.remove('girar')
          divCarta.style.backgroundColor = color
        },
        { once: true }
      )
      if (contador === 1) {
        carta1 = color
      } else if (contador === 2) {
        carta2 = color
        comprobar()
      }
    }
  }
  inicializarJuego()
}
