/**
 * Created by xianrongbin on 2017/5/3.
 */

window.onload = function () {
    var imgData = [{'src': '1.jpg'}, {'src': '2.jpg'}, {'src': '3.jpg'}, {'src': '4.jpg'}];
    waterfall('main', 'box')


    window.onscroll = function () {
        if (checkScrollSide()) {
            let oParent = document.getElementById('main'),
                scrollImgLen = imgData.length;
            for (let i = 0; i < scrollImgLen; i++) {
                var oPin = document.createElement('div'); //添加 元素节点
                oPin.className = 'box';                   //添加 类名 name属性
                oParent.appendChild(oPin);              //添加 子节点
                var oBox = document.createElement('div');
                oBox.className = 'pic';
                oPin.appendChild(oBox);
                var oImg = document.createElement('img');
                oImg.src = '../images/' + imgData[i].src;
                oBox.appendChild(oImg);
            }
            waterfall('main', 'box');
        }
    };

};
function waterfall(parent, box) {
    //将main下面所有class 为box的元素取出来
    let oParent = document.getElementById(parent),
        oBoxs = getByCalss(oParent, box),
        oBoxWidth = oBoxs[0].offsetWidth,
        cols = Math.floor(document.documentElement.clientWidth / oBoxWidth);//计算屏幕可以显示的列数
    oParent.style.cssText = 'width:' + oBoxWidth * cols + 'px; margin:0 auto';

    let pinHArr = [],//用于存储 每列中的所有块框相加的高度。
        boxLen = oBoxs.length;
    for (let i = 0; i < boxLen; i++) {//遍历数组aPin的每个块框元素
        let pinH = oBoxs[i].offsetHeight;
        if (i < cols) {
            pinHArr[i] = pinH; //第一行中的num个块框pin 先添加进数组pinHArr
        } else {
            let minH = Math.min(...pinHArr), //ES6语法 ...pinHArr  ES5则需要 Math.min.apply(null,pinHArr)
                minHIndex = getminHIndex(pinHArr, minH),
                selfBox = oBoxs[i];

            selfBox.style.position = 'absolute';//设置绝对位移
            selfBox.style.top = minH + 'px';

            selfBox.style.left = oBoxs[minHIndex].offsetLeft + 'px';
            //数组 最小高元素的高 + 添加上的aPin[i]块框高
            pinHArr[minHIndex] += selfBox.offsetHeight;//更新添加了块框后的列高
        }
    }
}

/**
 *获得所有样式为 clsName 的div元素
 * @param parentDom
 * @param clsName
 */
function getByCalss(parentDom, clsName) {
    let boxArr = [],//用来存储所有class=box 的元素
        oElements = parentDom.getElementsByTagName('*'),
        len = oElements.length;
    for (let i = 0; i < len; i++) {
        if (oElements[i].className === clsName) {
            boxArr.push(oElements[i]);
        }
    }
    return boxArr;
}

function getminHIndex(arr, minH) {
    for (let i in arr) {
        if (arr.hasOwnProperty(i) && arr[i] == minH) {
            return i;
        }
    }
}

/*
 * 滚动时，最后一张图片的一半位置，距离可视窗口的距离<可视窗口高度+隐藏顶部的高度
 * 可参考 scroll-condition.jpg
 * */
function checkScrollSide() {
    let oParent = document.getElementById('main'),
        allBoxs = getByCalss(oParent, 'box'),
        lastBoxDom = allBoxs[allBoxs.length - 1],
        lastPicTop = lastBoxDom.offsetTop + Math.floor(lastBoxDom.offsetHeight / 2),
        scrollTop = document.documentElement.scrollTop || document.body.scrollTop, //IE 谷歌
        clientHeight = document.documentElement.clientHeight;
    return (lastPicTop < scrollTop + clientHeight) ? true : false;

}