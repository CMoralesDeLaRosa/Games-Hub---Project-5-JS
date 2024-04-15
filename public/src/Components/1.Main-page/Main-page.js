import '/style.css'
import './Main-page.css'
import { dataMain } from '../0.Data/Data'
import { createButton } from '../Button/Button'
import { arrayJuegos } from '../0.Data/Data'
import { createHeader } from '/public/src/Components/5.Header/Header'

export const createMainPage = (nodoPadre) => {
  const lastVisitedPage = sessionStorage.getItem('lastVisitedPage')
  if (lastVisitedPage) {
    const div = document.querySelector('#app')
    createHeader(div)
    const currentPage = arrayJuegos.find(
      (element) => element.name === lastVisitedPage
    )
    if (currentPage) {
      div.innerHTML = ''
      createHeader(div)
      currentPage.page(div)
    }
    return
  }

  const sectionMainPage = document.createElement('section')
  sectionMainPage.id = 'mainPage'
  sectionMainPage.classList.add('flex-container')

  const artH1Main = document.createElement('article')
  const artButMain = document.createElement('article')
  const artImgMain = document.createElement('article')
  const h1Main = document.createElement('h1')
  const imgMain = document.createElement('img')

  artButMain.classList.add('flex-container')
  h1Main.innerText = dataMain.h1.toUpperCase()
  imgMain.classList.add('imgMain')
  imgMain.src = dataMain.image

  const div = document.querySelector('#app')

  for (const element of arrayJuegos) {
    const boton = createButton(artButMain, element.name)

    boton.addEventListener('click', () => {
      sessionStorage.setItem('lastVisitedPage', element.name)
      div.innerHTML = ''
      createHeader(div)
      element.page(div)
    })
  }

  artImgMain.appendChild(imgMain)
  artH1Main.appendChild(h1Main)
  sectionMainPage.appendChild(artH1Main)
  sectionMainPage.appendChild(artButMain)
  sectionMainPage.appendChild(artImgMain)
  nodoPadre.appendChild(sectionMainPage)

  imgMain.addEventListener('animationend', () => {
    imgMain.src = dataMain.imageEnd
  })
}
