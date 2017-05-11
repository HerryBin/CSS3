/**
 * Created by xianrongbin on 2017/5/8.
 */
$(function () {
    $('.link  .button').hover(function () {
            let title = $(this).attr('data-title');

            $('.tip em').text(title);

            let pos = $(this).position().left,//获取按钮的位置
                dis = ($('.tip').outerWidth() - $(this).outerWidth()) / 2, //得到 （提示框宽度-按钮宽度)/2,即按钮应该往左应该移动的长度
                tipLeft=pos-dis;
            $('.tip').css({'left':tipLeft+'px'}).animate({'opacity': 1}, 300);
            console.log(dis);
        }
        , function () {
            //解决频繁交换移动，导致提示框不停的闪动
            if(!$('.tip').is(':animated')){
                $('.tip').animate({'top': 160, 'opacity': 0}, 300);
            }
        }
    );
});