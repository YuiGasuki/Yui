const imgBox = document.getElementById('img_box');
let ImgList = [
    [],
    [],
    []
];
let rn = 0;
let MaxR = 10;
let MaxM = 11;
let r, m;
let starTime, endTime;
let BodyImgText = "";

function changeList() {
    endTime = 0;
    ImgList = [
        [],
        [],
        []
    ];
    BodyImgText = "";
    let rList = []
    for (let i = 1; i <= MaxR; i++) {
        rList.push({
            "id": i,
            "type": 0
        })
    }
    for (let i = 1; i <= MaxM; i++) {
        rList.push({
            "id": i,
            "type": 1
        })
    }
    alllist = shuffle(rList).slice(0, 9)
    alllist_end = []
    imgBox.innerHTML = "";
    let li = 0;
    for (let i = 0; i < 3; i++) {
        alllist_end.push(alllist.slice(3 * i, 3 * (i + 1)))
    }
    for (let i = 0; i < 3; i++) {
        for (let li = 0; li < 3; li++) {
            ImgList[i].push(alllist_end[i][li]["type"])
            if (alllist_end[i][li]["type"] == 1) {
                BodyImgText += `<img src="m_${alllist_end[i][li]["id"]}.webp" onclick="changeList()" />`;
            } else {
                BodyImgText += `<img src="r_${alllist_end[i][li]["id"]}.webp" onclick="Right(${i},${li},this)" />`;
            }
        }

    }
    imgBox.innerHTML = BodyImgText;
    starTime = Date.parse(new Date());

}
changeList()


function Right(i, bi, ul) {
    ul.style.opacity = 0;
    ImgList[i][bi] = 1;
}

function verification() {
    for (let i = 0; i < 3; i++) {
        for (let bi = 0; bi < 3; bi++) {
            if (ImgList[i][bi] == 0) {
                alert(`验证失败`)
                return
            }
        }
    }
    if (endTime === 0) {
        endTime = new Date().getTime();
    }


    alert(`验证成功，用时${TimeTurn(endTime,starTime)}`)
}

function TimeTurn(time, star) {
    let date = [new Date(time), new Date(star)]; // 参数需要毫秒数，所以这里将秒数乘于 1000
    m = date[0].getMinutes() - date[1].getMinutes();
    s = (date[0].getSeconds() + (m * 60)) - date[1].getSeconds() + '秒';
    return s;
}



function shuffle(arr) {
    var len = arr.length;
    for (var i = 0; i < len - 1; i++) {
        var idx = Math.floor(Math.random() * (len - i));
        var temp = arr[idx];
        arr[idx] = arr[len - i - 1];
        arr[len - i - 1] = temp;
    }
    return arr;
}