/**
 * Created by xianrongbin on 2017/5/3.
 */

window.onload=function(){

    waterfall('main','box')

}

function waterfall(parent,box){
    //将main下面所有class 为box的元素取出来
    let oParent=document.getElementById(parent),
        oBoxs=getByCalss(oParent,box),
        oBoxWidth=oBoxs[0].offsetWidth,
        cols=Math.floor(document.documentElement.clientWidth/oBoxWidth);//计算屏幕可以显示的列数
    oParent.style.cssText='width:'+oBoxWidth*cols+'px; margin:0 auto';

    var pinHArr=[];//用于存储 每列中的所有块框相加的高度。
    for(var i=0;i<oBoxs.length;i++){//遍历数组aPin的每个块框元素
        var pinH=oBoxs[i].offsetHeight;
        if(i<cols){
            pinHArr[i]=pinH; //第一行中的num个块框pin 先添加进数组pinHArr
        }else{
            var minH=Math.min.apply(null,pinHArr);
            var minHIndex=getminHIndex(pinHArr,minH);
            oBoxs[i].style.position='absolute';//设置绝对位移
            oBoxs[i].style.top=minH+'px';
            oBoxs[i].style.left=oBoxs[minHIndex].offsetLeft+'px';
            //数组 最小高元素的高 + 添加上的aPin[i]块框高
            pinHArr[minHIndex]+=oBoxs[i].offsetHeight;//更新添加了块框后的列高
        }
    }
}

/**
 *
 * @param parentDom
 * @param clsName
 */
function getByCalss(parentDom,clsName){
    let boxArr=[],//用来存储所有class=box 的元素
        oElements=parentDom.getElementsByTagName('*'),
        len=oElements.length;
    for(let i=0;i<len;i++){
        if(oElements[i].className===clsName){
            boxArr.push(oElements[i]);
        }
    }
    return boxArr;
}

function getminHIndex(arr,minH){
    for(var i in arr){
        if(arr[i]==minH){
            return i;
        }
    }
}