'use strict'
var gKeywords = { 'happy': 12, 'funny puk': 1 }
var gImgs = [{ id: 1, url: 'imgs/memes/1.jpg', keywords: ['trump'] },
{ id: 2, url: 'imgs/memes/2.jpg', keywords: ['dogs'] },
{ id: 3, url: 'imgs/memes/3.jpg', keywords: ['dog baby'] },
{ id: 3, url: 'imgs/memes/4.jpg', keywords: ['dog baby'] },
{ id: 3, url: 'imgs/memes/5.jpg', keywords: ['dog baby'] },
{ id: 3, url: 'imgs/memes/6.jpg', keywords: ['dog baby'] },
{ id: 3, url: 'imgs/memes/7.jpg', keywords: ['dog baby'] },
{ id: 3, url: 'imgs/memes/8.jpg', keywords: ['dog baby'] },
{ id: 3, url: 'imgs/memes/9.jpg', keywords: ['dog baby'] },
{ id: 3, url: 'imgs/memes/10.jpg', keywords: ['dog baby'] },
{ id: 3, url: 'imgs/memes/12.jpg', keywords: ['dog baby'] },
{ id: 3, url: 'imgs/memes/13.jpg', keywords: ['dog baby'] },
{ id: 3, url: 'imgs/memes/14.jpg', keywords: ['dog baby'] },
{ id: 3, url: 'imgs/memes/15.jpg', keywords: ['dog baby'] },
{ id: 3, url: 'imgs/memes/16.jpg', keywords: ['dog baby'] },
{ id: 3, url: 'imgs/memes/17.jpg', keywords: ['dog baby'] },
{ id: 3, url: 'imgs/memes/18.jpg', keywords: ['dog baby'] },
{ id: 3, url: 'imgs/memes/19.jpg', keywords: ['dog baby'] }
];
var gMeme = {
    selectedImgId: 5, selectedLineIdx: 0,
    lines: [{ txt: 'Enter Text', size: 45, align: 'left', color: 'red', pos: { x: 250, y: 65 } },
    { txt: '', size: 45, align: 'left', color: 'red', pos: { x: 250, y: 450 } }]
}


function addLine() {
    const newLine = { txt: 'new', size: 45, align: 'left', color: 'red', pos: { x: 250, y: 250 } }
    gMeme.lines.push(newLine)
}

function switchLine() {
    gMeme.selectedLineIdx++;
    if (gMeme.selectedLineIdx >= gMeme.lines.length) gMeme.selectedLineIdx = 0;
    console.log('line:', gMeme.selectedLineIdx);
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
    currMeme = gImgs.filter(function (img) {
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