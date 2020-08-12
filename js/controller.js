gCanvas = document.querySelector('#myCanvas');
gCtx = gCanvas.getContext('2d');

var gFontSize=35;

function init() {
    renderGallery()
}

function renderGallery() {
    const allImgs = getAllImgs();
    var str = '';
    var imgNum = 1
    allImgs.forEach((img) => {
        // str += `<img onclick="drawMeme(0,0,getImgUrl(${imgNum-1}))" class="img-0${imgNum} img" src="imgs/memes/${imgNum}.jpg" alt="Image">`
        str+=`<img onclick="onUpdateMeme(${imgNum})" class="img-01 img" src="imgs/memes/${imgNum}.jpg" alt="Image">`

        imgNum++
    })
    var elGallery = document.querySelector('.gallery-container');
    elGallery.innerHTML = str;
}
// (imgStartX,imgStartY,imgUrl,textX,textY)
function drawMeme(imgStartX = 0, imgStartY = 0, imgUrl = getImgUrl(), textX = 250, textY = 75) {
    var img = new Image()
    img.src = imgUrl;
    img.onload = () => {
        gCtx.drawImage(img, imgStartX, imgStartY, 550, 550)
        memeText = getImgText(0)
        gCtx.lineWidth = '2';
        gCtx.fillStyle = 'white';
        gCtx.font = `${gFontSize}px Impact`;
        gCtx.fillText(memeText, textX, textY);
        gCtx.strokeText(memeText, textX, textY);//img,x,y,xend,yend
    }
}

function setMemeText() {
    var givenText = document.querySelector('#text').value;
    if (!givenText) givenText = 'No Text'
    updateText(givenText)
}

function onUpdateMeme(imgNum){
    updateMeme(imgNum)
}

function increaseFont(){
    gFontSize+=2

}

console.log('a');