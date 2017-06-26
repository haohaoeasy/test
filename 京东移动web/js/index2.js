/**
 * Created by 小丑 on 2017/6/25.
 */
window.onload = function () {
    /*获取左侧栏*/
    var c_left=document.querySelector("c_left");
    /*获取左侧栏的高度*/
    var leftHeight = c_left.offsetHeight;
    /*获取用来滑动的列表*/
    var ulBox=c_left.querySelector("ul:first-of-type");
    var ulBoxHeight = ulBox.offsetHeight;
    /*获取所有li元素*/
    var lis=ulBox.querySelectorAll("li");
    /*设置静止状态下的最大top值*/
    var maxTop = 0;
    /*设置静止状态下的最小的top值*/
    var minTop = leftHeight-ulBoxHeight;
    /*设置滑动状态下的最大的top值*/
    var maxBounceTop= maxTop+100;
    /*设置滑动状态下的最小top值*/
    var minBounceTop = minTop-100;
    /*实现滑动*/
    var startY, moveY,distanceY;
    /*记录当前元素滑动到的距离*/
    var currentY=0;
    /*添加滑动事件*/
    ulBox.addEventListener("touchstart",function(e){
        /*获取手指的起始坐标*/
        startY= e.targetTouches[0].clientY;
    })
    ulBox.addEventListener("touchmove",function(e){
        moveY= e.targetTouches[0].clientY;
        /*计算距离的差异*/
        distanceY=moveY-startY;
        /*判断滑动的时候是否超出当前指定的滑动区间*/
        if(currentY+distanceY>maxTop||currentY+distanceY<minTop){
            return;
        }
        /*先将之前可能添加的过渡效果清除*/
        ulBox.style.transition="none";
        /*实现偏移操作:应该在之前的滑动距离的基础之上再进行滑动*/
        ulBox.style.top=(currentY+distanceY)+"px";
    ulBox.addEventListener("touchend",function(e){
        if(currentY+distanceY<minTop){
            currentY=minTop;
            ulBox.style.transition="top 0.5s";
            ulBox.style.top=minTop+"px";
        }
        else if(currentY+distanceY>maxTop){
            currentY=maxTop;
            ulBox.style.transition="top 0.5s";
            ulBox.style.top=maxTop+"px";
        }
        else{
            currentY+=distanceY;
        }
    })
        /*判断当前滑动的距离是否在静止状态和滑动状态下的最小top值之间*/
        /*回到minTop位置*/
        /*回到maxTop位置*/
        /*记录当前滑动的距离*/
    })
}