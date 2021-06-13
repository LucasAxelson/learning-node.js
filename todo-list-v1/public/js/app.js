const btnClose = document.querySelector(`.button--close`)
const btnReveal = document.querySelector(`.button--reveal`)
const formAdd = document.querySelector(`.form--add`)

btnClose.addEventListener(`click`, (e) => {
    e.preventDefault()
    formAdd.style.display = `none`
    btnReveal.style.display = `block`
})

btnReveal.addEventListener(`click`, () => {
    formAdd.style.display = `block`
    btnReveal.style.display = `none`
})
