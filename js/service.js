'use strict'
var gFirstLine = true;
var gKeywords = { 'happy': 12, 'funny puk': 1 }
var gImgs = [{ id: 1, url: 'imgs/memes/1.jpg', keywords: ['trump'] },
{ id: 2, url: 'imgs/memes/2.jpg', keywords: ['dogs'] },
{ id: 3, url: 'imgs/memes/3.jpg', keywords: ['dog baby'] },
{ id: 4, url: 'imgs/memes/4.jpg', keywords: ['dog baby'] },
{ id: 5, url: 'imgs/memes/5.jpg', keywords: ['dog baby'] },
{ id: 6, url: 'imgs/memes/6.jpg', keywords: ['dog baby'] },
{ id: 7, url: 'imgs/memes/7.jpg', keywords: ['dog baby'] },
{ id: 8, url: 'imgs/memes/8.jpg', keywords: ['dog baby'] },
{ id: 9, url: 'imgs/memes/9.jpg', keywords: ['dog baby'] },
{ id: 10, url: 'imgs/memes/10.jpg', keywords: ['dog baby'] },
{ id: 11, url: 'imgs/memes/12.jpg', keywords: ['dog baby'] },
{ id: 12, url: 'imgs/memes/13.jpg', keywords: ['dog baby'] },
{ id: 13, url: 'imgs/memes/14.jpg', keywords: ['dog baby'] },
{ id: 14, url: 'imgs/memes/15.jpg', keywords: ['dog baby'] },
{ id: 15, url: 'imgs/memes/16.jpg', keywords: ['dog baby'] },
{ id: 16, url: 'imgs/memes/17.jpg', keywords: ['dog baby'] },
{ id: 17, url: 'imgs/memes/18.jpg', keywords: ['dog baby'] },
{ id: 18, url: 'imgs/memes/19.jpg', keywords: ['dog baby'] }
];
var gMeme = {
    selectedImgId: 5, selectedLineIdx: 0,
    lines: [{ txt: '', size: 45, align: 'left', color: 'red', pos: { x: 250, y: 65 } }
    ]
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
function getAllImgs() {
    return gImgs;
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
    currMeme = currMeme = gImgs.filter(function (img) {
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

function isOnTxt(x, y) {

    // const textLetters = gMeme.lines[gMeme.selectedLineIdx].txt.length
    // const textLength = gCtx.measureText(gMeme.lines[gMeme.selectedLineIdx].txt).width
    // const xStart = gMeme.lines[gMeme.selectedLineIdx].pos.x
    // const yStart = gMeme.lines[gMeme.selectedLineIdx].pos.y
    // var xRange = [xStart - (textLetters*10), xStart + (textLetters*10)]
    // console.log("isOnTxt -> xRange", xRange)
    // var yRange = [yStart + 15, yStart - 15]
    // if (x > xRange[0] && x < xRange[1]) console.log('onX');
    // // if(x ===xRange[0] || x===xRange[1] || xRange[2] && y===yRange[0]||yRange[1]) console.log('on.');

}