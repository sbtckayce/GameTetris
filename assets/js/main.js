$(document).ready(function () {



    $('.change-bg-btn').click(function () {
        $('.change-bg-btn').toggleClass('active')
    })
    $('.change-music-btn').click(function () {
        $('.change-music-btn').toggleClass('active')
    })

})

var inputBG = document.querySelector('#input-bg')
var container = document.querySelector('.container')

var li = document.querySelectorAll('.li')
function addItem() {


    li.forEach((item) => {
        item.classList.remove('active')
        container.classList.remove(`${dataText}`)
    })
    this.classList.add('active')
    var dataText = this.getAttribute('data-text')
    var dataImg = this.getAttribute('data-img')
    var liAc = document.querySelectorAll('.li .active')
    inputBG.value = `BG : ${dataText}`


    console.log(dataImg)
    console.log(dataText)

    if (liAc) {
        container.style.backgroundImage = `${dataImg}`

    }
}
li.forEach((item) => {
    item.addEventListener('click', addItem)
})

var musicItem =document.querySelectorAll('.change-music-item')
var inputMU = document.querySelector('#input-music')
function addMusic() {


    musicItem.forEach((muitem) => {
        muitem.classList.remove('active')
       
    })
    this.classList.add('active')
    var dataMusicName = this.dataset.musicname
    var dataMusicSrc = this.dataset.musicsrc
    var musicItemAc = document.querySelectorAll('.change-music-item .active')
    inputMU.value = `Music : ${dataMusicName}`


    console.log(dataMusicName)
    console.log(dataMusicSrc)

    if (musicItemAc) {
        
        var music = document.querySelector('#audio')

        music.src = dataMusicSrc

        music.play()

    }
}
musicItem.forEach((muitem) => {
    muitem.addEventListener('click', addMusic)
})



var changeLevels =document.querySelectorAll('.change-level li')

function changeLevel(){
    changeLevels.forEach((item)=>
        item.classList.remove('active')
    )
    this.classList.add('active')
}

changeLevels.forEach((item)=>
item.addEventListener('click', changeLevel))


    
