'use strict'

const gCanvas = document.querySelector('#myCanvas');
const gCtx = gCanvas.getContext('2d');

var gIsMouseDown = false;


function init() {
    renderGallery()
}

function renderGallery() {
    const allImgs = getImgsForDisplay();
    var str = '';
    allImgs.forEach(img => str += `<img onclick="onUpdateMeme(${img.id})" class="img-${img.id} img" src="${img.url}" alt="Can't find image.">`)
    var elGallery = document.querySelector('.gallery-container');
    elGallery.innerHTML = str;
}

function renderCanvas(imgStartX = 0, imgStartY = 0, imgUrl = getImgUrl()) {
    var img = new Image()
    img.src = imgUrl;
    img.onload = () => {
        gCtx.drawImage(img, imgStartX, imgStartY, 500, 500)
        drawText()
    }
    document.querySelector('.gallery-link ').classList.remove('active')
    document.querySelector('.editor-link').classList.add('active')
}

console.log('');

function drawText() {
    const currMeme = getMeme()

    const memeText = getImgText()

    currMeme.lines.forEach(function(line) {

        gCtx.lineWidth = '2';
        gCtx.fillStyle = 'white';
        gCtx.textAlign = 'center';
        gCtx.font = `${line.size}px Impact`;
        gCtx.fillText(line.txt, line.pos.x, line.pos.y);
        gCtx.strokeText(line.txt, line.pos.x, line.pos.y); //img,x,y,xend,yend
    })

}



function setMemeText() {
    var givenText = document.querySelector('#text').value;
    updateText(givenText)
    renderCanvas()
}

function onUpdateMeme(imgNum) {
    updateMeme(imgNum)
    document.querySelector('.main-container').classList.add('hide')
    document.querySelector('.editor-container').classList.add('show')
}

function onChangeFontSize(size) {
    changeFontSize(size)
    renderCanvas()
}

function onChangeTextPos(pos) {
    changeTextPos(pos);
    renderCanvas();

}

function onAddLine() {
    addLine();
    renderCanvas();
}

function onSwitchLine() {
    document.querySelector('#text').value = ''
    switchLine()
    drawText()
}

function onDeleteLine() {
    if (gMeme.lines.length === 1) return;
    deleteLine();
    renderCanvas()

}

function movePage(page) {
    if (page === 'gallery') {
        document.querySelector('.main-container').classList.remove('hide')
        document.querySelector('.editor-container').classList.remove('show')
        document.querySelector('.gallery-link ').classList.add('active')
        document.querySelector('.editor-link').classList.remove('active')

    } else if (page === 'editor') {
        document.querySelector('.main-container').classList.add('hide')
        document.querySelector('.editor-container').classList.add('show')
        document.querySelector('.gallery-link ').classList.remove('active')
        document.querySelector('.editor-link').classList.add('active')

    } else {
        console.log('no about page.');
    }
}


function toggleClick() {
    gIsMouseDown = !gIsMouseDown;
}

function onMoveText(ev) {
    const { offsetX, offsetY } = ev;
    const { movementX, movementY } = ev;
    isOnTxt(offsetX, offsetY)
    if (gIsMouseDown) moveText(offsetX, offsetY)
    renderCanvas()

}

function onSearch() {
    const userText = document.querySelector('.search-bar').value;
    setFilter(userText)
    renderGallery()

}

function onFiltering(txt, elWord) {
    setFilter(txt)
    sizeUp(txt, elWord)
    renderGallery();
}

function sizeUp(txt, elWord) {
    const textSize = elWord.style.fontSize;
    var size = (textSize) ? +textSize.split('rem')[0] : 0.7;

    size += 0.2
    var elCurrSearch = document.querySelector(`.${txt}`)
    elCurrSearch.style.fontSize = size + 'rem';
}

function refresh() {
    setFilter()
    movePage('gallery')
    renderGallery()

}

function toggleMenu() {
    var elHamburger = document.querySelector('.links-container');
    elHamburger.classList.toggle('open');
    document.querySelector('.toggle-menu-screen').classList.toggle('visible')
}