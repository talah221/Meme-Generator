'use strict'
var gFirstLine = true;
var gFilter;
var gKeywords = { 'happy': 12, 'funny puk': 1 }
var gImgs = [
    { id: 1, url: 'imgs/memes/1.jpg', keywords: ['all', 'trump', 'complicated'] },
    { id: 2, url: 'imgs/memes/2.jpg', keywords: ['all', 'dog'] },
    { id: 3, url: 'imgs/memes/3.jpg', keywords: ['all', 'dog', 'baby', 'cute'] },
    { id: 4, url: 'imgs/memes/4.jpg', keywords: ['all', 'cat', 'cute'] },
    { id: 5, url: 'imgs/memes/5.jpg', keywords: ['all', 'baby', 'success'] },
    { id: 6, url: 'imgs/memes/6.jpg', keywords: ['all', 'complicated'] },
    { id: 7, url: 'imgs/memes/7.jpg', keywords: ['all', 'baby', 'suprised'] },
    { id: 8, url: 'imgs/memes/8.jpg', keywords: ['all', , 'intersting', 'tell me more', 'suprised'] },
    { id: 9, url: 'imgs/memes/9.jpg', keywords: ['all', 'baby'] },
    { id: 10, url: 'imgs/memes/10.jpg', keywords: ['all', 'baby', 'funny'] },
    { id: 11, url: 'imgs/memes/11.jpg', keywords: ['all', 'obama', 'funny'] },
    { id: 12, url: 'imgs/memes/12.jpg', keywords: ['all', 'kissing', 'gays'] },
    { id: 13, url: 'imgs/memes/13.jpg', keywords: ['all', 'you'] },
    { id: 14, url: 'imgs/memes/14.jpg', keywords: ['all', 'cheers', 'funny'] },
    { id: 15, url: 'imgs/memes/15.jpg', keywords: ['all', 'matrix', 'serious', 'sad'] },
    { id: 16, url: 'imgs/memes/16.jpg', keywords: ['all', 'serious', 'complicated'] },
    { id: 17, url: 'imgs/memes/17.jpg', keywords: ['all', 'serious', 'putin', 'complicated'] },
    { id: 18, url: 'imgs/memes/18.jpg', keywords: ['all', 'cartoon', 'funny'] }
];
var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [{ txt: '', size: 45, align: 'left', color: 'red', pos: { x: 250, y: 65 } }]
}


function addLine() {
    var newLine;
    if (gFirstLine) {
        newLine = { txt: 'new', size: 45, align: 'left', color: 'red', pos: { x: 250, y: 450 } }
        gFirstLine = false;
    } else {
        newLine = { txt: 'new', size: 45, align: 'left', color: 'red', pos: { x: 250, y: 250 } };
    }
    gMeme.lines.push(newLine)
    switchLine()
}

function switchLine() {
    gMeme.selectedLineIdx++;
    if (gMeme.selectedLineIdx >= gMeme.lines.length) gMeme.selectedLineIdx = 0;
}

function getMeme() {
    return gMeme;
}

function getImgUrl() {
    return `imgs/memes/${gMeme.selectedImgId}.jpg`
}

function setFilter(txt) {
    gFilter = txt
}

function getImgsForDisplay() {
    if (!gFilter) return gImgs
    var imgsForDisplay = [];
    gImgs.forEach(function(img) {
        img.keywords.forEach(function(keyword) {
            if (keyword.toLowerCase().includes(gFilter.toLowerCase())) {
                imgsForDisplay.push(img)

            }
        })
    })
    return imgsForDisplay
}


function getImgText() {
    return gMeme.lines[gMeme.selectedLineIdx].txt
}

function updateText(txtFromUser) {
    gMeme.lines[gMeme.selectedLineIdx].txt = txtFromUser
    drawText()
}

function updateMeme(imgNum) {
    var currMeme;
    currMeme = gImgs.filter(function(img) {
        return (img.id === imgNum);
    })
    gMeme.selectedImgId = currMeme[0].id;
    renderCanvas()
}

function changeFontSize(size) {
    if (size === 'bigger') gMeme.lines[gMeme.selectedLineIdx].size += 2
    else gMeme.lines[gMeme.selectedLineIdx].size -= 2
}

function changeTextPos(pos) {
    if (pos === 'down') gMeme.lines[gMeme.selectedLineIdx].pos.y += 10
    else gMeme.lines[gMeme.selectedLineIdx].pos.y -= 10
}

function deleteLine() {
    gMeme.lines.splice(gMeme.selectedLineIdx, gMeme.selectedLineIdx + 1);
    gMeme.selectedLineIdx--;

}
var gIsOnTxt = false;

function isOnTxt(x, y) {
    var onTxt;
    var fontSize = gMeme.lines[gMeme.selectedLineIdx].size
    var textLetters = gMeme.lines[gMeme.selectedLineIdx].txt.length
    const textLength = gCtx.measureText(gMeme.lines[gMeme.selectedLineIdx].txt).width

    const xStart = gMeme.lines[gMeme.selectedLineIdx].pos.x
    const yStart = gMeme.lines[gMeme.selectedLineIdx].pos.y
    var xRange = [xStart - (textLetters * textLength), xStart + (textLetters * textLength)]
    var yRange = [yStart - fontSize, yStart + fontSize]
    if (x > xRange[0] && x < xRange[1] && y > yRange[0] && y < yRange[1]) {
        gIsOnTxt = true


    }




    // if (y + fontSize >= gMeme.lines[gMeme.selectedLineIdx].pos.y && y - fontSize <= gMeme.lines[gMeme.selectedLineIdx].pos.y) console.log('on Y');
}

function moveText(x, y) {
    if (!gIsOnTxt) return;
    // const textLetters = gMeme.lines[gMeme.selectedLineIdx].txt.length
    // const textLength = gCtx.measureText(gMeme.lines[gMeme.selectedLineIdx].txt).width
    // const xStart = gMeme.lines[gMeme.selectedLineIdx].pos.x
    // const yStart = gMeme.lines[gMeme.selectedLineIdx].pos.y
    // var xRange = [xStart - (textLetters*10), xStart + (textLetters*10)]
    // console.log("isOnTxt -> xRange", xRange)
    // var yRange = [yStart + 15, yStart - 15]
    // if (x > xRange[0] && x < xRange[1]) console.log('onX');
    // // if(x ===xRange[0] || x===xRange[1] || xRange[2] && y===yRange[0]||yRange[1]) console.log('on.');

    gMeme.lines[gMeme.selectedLineIdx].pos.x = x
    gMeme.lines[gMeme.selectedLineIdx].pos.y = y

}