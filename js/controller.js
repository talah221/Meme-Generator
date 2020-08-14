'use strict'

const gCanvas = document.querySelector('#myCanvas');
const gCtx = gCanvas.getContext('2d');

var gIsMouseDown=false;




function init() {
    renderGallery()
}

function renderGallery() {
    const allImgs = getAllImgs();
    var str = '';
    var imgNum = 1
    allImgs.forEach((img) => {
        // str += `<img onclick="renderCanvas(0,0,getImgUrl(${imgNum-1}))" class="img-0${imgNum} img" src="imgs/memes/${imgNum}.jpg" alt="Image">`
        str += `<img onclick="onUpdateMeme(${imgNum})" class="img-01 img" src="imgs/memes/${imgNum}.jpg" alt="Can't find image.">`

        imgNum++
    })
    var elGallery = document.querySelector('.gallery-container');
    elGallery.innerHTML = str;
}
// (imgStartX,imgStartY,imgUrl,textX,textY)

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
function drawText() {
    const currMeme = getMeme()
    // const currLine = currMeme.lines[currMeme.selectedLineIdx];
    // const memePos = currMeme.lines[currMeme.selectedLineIdx].pos

    const memeText = getImgText()

    currMeme.lines.forEach(function (line) {

        gCtx.lineWidth = '2';
        gCtx.fillStyle = 'white';
        gCtx.textAlign = 'center';
        gCtx.font = `${line.size}px Impact`;
        // if (currMeme.lines.length > 1) saveOtherLines()
        gCtx.fillText(line.txt, line.pos.x, line.pos.y);
        gCtx.strokeText(line.txt, line.pos.x, line.pos.y);//img,x,y,xend,yend
    })

    // function saveOtherLines() {
    //     currMeme.lines.forEach(function (line) {

    //         gCtx.fillText(line.txt, line.pos.x, line.pos.y)
    //         gCtx.strokeText(line.txt, line.pos.x, line.pos.y)

    //     })
    // }
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
    if(page==='gallery'){
        document.querySelector('.main-container').classList.remove('hide')
        document.querySelector('.editor-container').classList.remove('show')
        document.querySelector('.gallery-link ').classList.add('active')
        document.querySelector('.editor-link').classList.remove('active')
        
    }
    else if(page==='editor'){
        document.querySelector('.main-container').classList.add('hide')
        document.querySelector('.editor-container').classList.add('show')
        document.querySelector('.gallery-link ').classList.remove('active')
        document.querySelector('.editor-link').classList.add('active')

    }else{
        console.log('no about page.');
    }
}


function toggleClick() {
    gIsMouseDown = !gIsMouseDown;
}

function moveText(ev){
    const { layerX, layerY } = ev;
    isOnTxt(layerX,layerY)
}