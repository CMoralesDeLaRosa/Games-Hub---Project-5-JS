import '/style.css'
import './Header.css'
import { arrayJuegos } from '../0.Data/Data'
import { createButton } from '../Button/Button'
import { createMainPage } from '../1.Main-page/Main-page'

export const createHeader = (nodoPadre) => {
  const div = document.querySelector('#app')
  const header = document.createElement('header')
  header.id = 'header'
  header.classList.add('flex-container')

  const boton = createButton(header, '🏠')
  boton.classList.add('home')

  boton.addEventListener('click', () => {
    sessionStorage.removeItem('lastVisitedPage')
    div.innerHTML = ''
    createMainPage(div)
  })

  const nav = document.createElement('nav')
  const ul = document.createElement('ul')
  ul.classList.add('ul', 'flex-container')

  for (const element of arrayJuegos) {
    const li = document.createElement('li')
    const a = document.createElement('a')
    a.innerText = element.name.toUpperCase()
    a.href = element.url

    li.appendChild(a)
    ul.appendChild(li)

    a.addEventListener('click', () => {
      sessionStorage.setItem('lastVisitedPage', element.name)
      sessionStorage.setItem('fromMainPage', 'true')
      div.innerHTML = ''
      createHeader(div)
      element.page(div)
    })
  }

  nav.appendChild(ul)
  header.appendChild(nav)
  nodoPadre.appendChild(header)
}
