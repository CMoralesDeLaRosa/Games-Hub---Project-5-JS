import '/style.css'
import './Data.css'
import { Parejas } from '../2.Parejas/Parejas'
import { Trivial } from '../4.Trivial/Trivial'
import { PiedraPapelTijeras } from '../3.PiedraPapelTijeras/PiedraPapelTijeras'

export const dataMain = {
  h1: '¿A qué juego quieres jugar?',
  image: '/Assets/Mando-img.png',
  imageEnd: '/Assets/Mando-end-img.png'
}

export const arrayJuegos = [
  {
    name: 'Parejas',
    url: '#',
    page: Parejas
  },
  {
    name: 'Piedra,papel o tijeras',
    url: '#',
    page: PiedraPapelTijeras
  },
  {
    name: 'Trivial',
    url: '#',
    page: Trivial
  }
]

export const dataTrivial = [
  {
    id: 1,
    pregunta: '¿De qué país es originario el queso brie?',
    respuestas: {
      respuestaCorrecta: 'Francia',
      respuestaFalsa1: 'Italia',
      respuestaFalsa2: 'Grecia',
      respuestaFalsa3: 'España'
    }
  },
  {
    id: 2,
    pregunta: '¿Dónde está el David de Miguel Ángel?',
    respuestas: {
      respuestaCorrecta: 'Florencia',
      respuestaFalsa1: 'París',
      respuestaFalsa2: 'Madrid',
      respuestaFalsa3: 'Londres'
    }
  },
  {
    id: 3,
    pregunta: '¿Cuál es la moneda de México?',
    respuestas: {
      respuestaCorrecta: 'Peso mexicano',
      respuestaFalsa1: 'Pesito',
      respuestaFalsa2: 'Dolar',
      respuestaFalsa3: 'Rulo'
    }
  },
  {
    id: 4,
    pregunta: '¿De qué colores es la bandera de Japón?',
    respuestas: {
      respuestaCorrecta: 'Blanca y roja',
      respuestaFalsa1: 'Verde y roja',
      respuestaFalsa2: 'Blanca y azul',
      respuestaFalsa3: 'Azul y roja'
    }
  },
  {
    id: 5,
    pregunta: '¿Qué día es la fiesta de la hispanidad?',
    respuestas: {
      respuestaCorrecta: '12 de octubre',
      respuestaFalsa1: '10 de octubre',
      respuestaFalsa2: '8 de octubre',
      respuestaFalsa3: '18  de octubre'
    }
  },
  {
    id: 6,
    pregunta: '¿Cómo se llama el pan con chorizo típico de Asturias?',
    respuestas: {
      respuestaCorrecta: 'Bollo preñao',
      respuestaFalsa1: 'Bocadillo preñao',
      respuestaFalsa2: 'Choripan',
      respuestaFalsa3: 'Choricitos'
    }
  },
  {
    id: 7,
    pregunta: '¿Dónde nació Cervantes?',
    respuestas: {
      respuestaCorrecta: 'Alcalá de Henares',
      respuestaFalsa1: 'Roma',
      respuestaFalsa2: 'Toledo',
      respuestaFalsa3: 'París'
    }
  },
  {
    id: 8,
    pregunta: '¿A qué país pertenece la Isla de Pascua?',
    respuestas: {
      respuestaCorrecta: 'Chile',
      respuestaFalsa1: 'Perú',
      respuestaFalsa2: 'Cuba',
      respuestaFalsa3: 'Colombia'
    }
  }
]
