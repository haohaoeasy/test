/**
 * Created by 小丑 on 2017/6/26.
 */
window.onload=function(){
    searchEffect();
    timeback();
    bannerEffect();
}
/*头部的js效果*/
function  searchEffect(){
    /*头部搜索块的js效果*/
    /*1.获取当前banner的高度*/
    var banner=document.querySelector(".jd_banner");
    var bannerHeight = banner.offsetHeight;
    /*获取header搜索块*/
    var search = document.querySelector(".jd_search");
    /*2.获取当前屏幕滚动时，banner滚动出屏幕的距离*/
    window.onscroll=function(){
        var offsetTop=document.body.scrollTop;
        /*3.计算比例值，获取透明度，设置背景颜色的样式*/
        var opacity = 0;
        if(offsetTop<bannerHeight){
            opacity=offsetTop/bannerHeight;
            /*设置样式*/
            search.style.backgroundColor="rgba(233,35,34,"+opacity+")";
        }
    }
}
/*倒计时效果*/
function timeback(){
    /*1.获取用于展示时间的span*/
    var spans = document.querySelector(".jd_sk_time").querySelectorAll("span");
    /*2.设置初始的倒计时时间,以秒做为单位*/
    var total=3700;
    /*3.开启定时器*/
    var timerId=setInterval(function(){
        total--;
        /*判断倒计时时间是否已经完成*/
        /*清除时钟*/
        if(total<0){
            clearInterval(timerId);
            return;
        }
        /*获取时*/
        var hour = Math.floor(total/3600);
        /*获取分*/
        var minute = Math.floor(total%3600/60);
        /*获取秒*/
        var second = Math.floor(total%60);
        spans[0].innerHTML=Math.floor(hour/10);
        spans[1].innerHTML=Math.floor(hour%10);
        spans[3].innerHTML=Math.floor(minute/10);
        spans[4].innerHTML=Math.floor(minute%10);
        spans[6].innerHTML=Math.floor(second/10);
        spans[7].innerHTML=Math.floor(second%10);
    },1000);
}
/*轮播图效果*/
function bannerEffect() {
    /* 1.在首尾添加图片
     1.在开始位置添加原始的最后一张图片
     2.在最后位置添加原始的第一张图片*/
    var banner=document.querySelector(".jd_banner");
    /*1.2.获取图片容器*/
    var imgBox=banner.querySelector("ul:first-of-type");
    /*1.3.获取原始的第一张图片*/
    var first=imgBox.querySelector("li:first-of-type");
    /*1.4.获取原始的最后一张图片*/
    var last=imgBox.querySelector("li:last-of-type");
    /*1.5.在首尾插入两张图片   cloneNode:复制一个dom元素*/
    imgBox.appendChild(first.cloneNode(true));
    /*insertBefore(需要插入的dom元素，位置)*/
    imgBox.insertBefore(last.cloneNode(true),imgBox.firstChild);
    /*2.设置对应的样式*/
    /*2.1获取所有li元素*/
    var lis = imgBox.querySelectorAll("li");
    /*2.2 获取li元素的数量*/
    var count=lis.length;
    /*2.3.获取banner的宽度*/
    var bannerWidth = banner.offsetWidth;
    /*2.4 设置图片盒子的宽度*/
    imgBox.style.width = count*bannerWidth+"px";
    /*2.5 设置每一个li(图片)元素的宽度*/
    for(var i=0;i<lis.length;i++){
        lis[i].style.width=bannerWidth+"px";
    }
    /*定义图片索引:图片已经有一个宽度的默认偏移*/
    var index =1;
    /*3.设置默认的偏移*/
    imgBox.style.left= -bannerWidth+"px";
    /*4.当屏幕变化的时候，重新计算宽度*/
    window.onresize=function(){
        /*4.1.获取banner的宽度,覆盖全局的宽度值*/
        bannerWidth = banner.offsetWidth;
        imgBox.style.width = count*bannerWidth+"px";
        /*4.3设置每一个li(图片)元素的宽度*/
        for (var i=0;i<lis.length;i++){
            lis[i].style.width=bannerWidth+"px";
        }
        /*4.4重新设置定位值*/
        imgBox.style.left=-index*bannerWidth+"px";
    }
    var setIndicator=function(){
        var indicators = banner.querySelector("ul:last-of-type").querySelectorAll("li");
        for(var i =0;i<indicators.length;i++){
            indicators[i].classList.remove("active");
        }
        indicators[index-1].classList.add("active");
    }
    var timerId;
    /*5.实现自动轮播*/
    var startTime = function () {
        timerId = setInterval(function () {
            /*5.1 变换索引*/
            index++;
            /*5.2.添加过渡效果*/
            imgBox.style.transition = "left 0.5s ease-in-out";
            /*5.3 设置偏移*/
            imgBox.style.left = (-index * bannerWidth) + "px";
            /*5.4 判断是否到最后一张，如果是则回到索引1的位置*/
            setTimeout(function () {
                if (index == count - 1) {
                    index = 1;
                    /*如果一个元素的某个属性之前添加过过渡效果，那么过渡属性会一直存在，如果不想要，则需要清除过渡效果*/
                    /*关闭过渡效果*/
                    imgBox.style.transition = "none";
                    /*偏移到指定的位置*/
                    imgBox.style.left = (-index * bannerWidth) + "px";
                }
            }, 1000);
        }, 2000);
    }
    startTime();
    /*实现手动轮播效果*/
    var startX,moveX,distanceX;
    var isEnd = true;
    imgBox.addEventListener("touchstart",function(e){
        clearInterval(timerId);
        startX= e.targetTouches[0].clientX;
    })
    imgBox.addEventListener("touchmove",function(e){
        if(isEnd==true){
            moveX= e.targetTouches[0].clientX;
            distanceX=moveX-startX;
            imgBox.style.transition="none";
            imgBox.style.left=(-index*bannerWidth+distanceX)+"px";
        }
    });
    imgBox.addEventListener("touchend",function(e){
        isEnd=false;
        if(Math.abs(distanceX)>100){
            if(distanceX>0){
                index--;
            }
            else{
                index++;
            }
        //    翻页
            imgBox.style.transition="left 0.5s ease-in-out";
            imgBox.style.left=-index*bannerWidth+"px";
        }
        else if(Math.abs(distanceX)>0){
            imgBox.style.transition="left 0.5s ease-in-out";
            imgBox.style.left=-index*bannerWidth+"px";
        }
        startX =0;
        moveX=0;
        distanceX=0;
    })
    imgBox.addEventListener("webkitTransitionEnd",function(){
        if(index==count-1){
            index=1;
            imgBox.style.transition="none";
            imgBox.style.left=-index*bannerWidth+"px";
        }
        else if(index==0){
            index=count-2;
            imgBox.style.transition="none";
            imgBox.style.left=-index*bannerWidth+"px";
        }
        setIndicator(index);
        setTimeout(function(){
            isEnd=true;
            clearInterval(timerId);
            startTime();},2000);
        })
    /*实现手动轮播:
        1.记录手指的起始位置
        2.记录手指在滑动过程中的位置，计算出相对于起始位置的偏移值，通过left样式实现图片的偏移
        3.在松开手指之后，判断当前滑动的距离，如果超出指定的范围，就翻页，否则回弹
        4.松开手指之后，重新开启定时器*/
}