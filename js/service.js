'use strict'
var gKeywords = { 'happy': 12, 'funny puk': 1 }
var gImgs = [{ id: 1, url: 'imgs/memes/1.jpg', keywords: ['trump'] },
{ id: 2, url: 'imgs/memes/2.jpg', keywords: ['dogs'] },
{ id: 3, url: 'imgs/memes/3.jpg', keywords: ['dog baby'] }];
var gMeme = { selectedImgId: 5, selectedLineIdx: 0, lines: [{ txt: 'I never eat Falafel', size: 20, align: 'left', color: 'red' }] }


function getImgUrl() {
    return `imgs/memes/${gMeme.selectedImgId}.jpg`
}
function getAllImgs() {
    return gImgs;
}

function getImgText(idx) {
    return gMeme.lines[idx].txt
}

function updateText(txtFromUser) {
    gMeme.lines[0].txt = txtFromUser
    drawMeme()
}
function updateMeme(imgNum) {
    var currMeme;
    currMeme = gImgs.filter(function (img) {
        return (img.id === imgNum);
    })
gMeme.selectedImgId=currMeme[0].id;
drawMeme()
}
