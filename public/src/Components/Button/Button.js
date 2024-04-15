import '/style.css'
import './Button.css'

export const createButton = (nodoPadre, texto = '') => {
  const button = document.createElement('button')
  button.classList.add('button')

  button.innerText = texto.toUpperCase()

  nodoPadre.appendChild(button)

  return button
}
