gCanvas = document.querySelector('#myCanvas');
gCtx = gCanvas.getContext('2d');


function init() {
    renderGallery()
}

function renderGallery() {
    const allImgs = getAllImgs();
    var str = '';
    var imgNum = 1
    allImgs.forEach((img) => {
        // str += `<img onclick="renderCanvas(0,0,getImgUrl(${imgNum-1}))" class="img-0${imgNum} img" src="imgs/memes/${imgNum}.jpg" alt="Image">`
        str += `<img onclick="onUpdateMeme(${imgNum})" class="img-01 img" src="imgs/memes/${imgNum}.jpg" alt="Image">`

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

}
function drawText() {
    const currMeme = getMeme()
    // const currLine = currMeme.lines[currMeme.selectedLineIdx];
    // const memePos = currMeme.lines[currMeme.selectedLineIdx].pos

    memeText = getImgText()

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
    if (!givenText) givenText = 'No Text'
    updateText(givenText)
    renderCanvas()
}

function onUpdateMeme(imgNum) {
    updateMeme(imgNum)
}

function onChangeFontSize(size) {
    // gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
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
    document.querySelector('#text').value=''
    switchLine()
    drawText()
}