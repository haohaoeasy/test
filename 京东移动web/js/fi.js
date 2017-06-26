/**
 * Created by С�� on 2017/6/26.
 */
window.onload=function(){
    searchEffect();
    timeback();
    bannerEffect();
}
/*ͷ����jsЧ��*/
function  searchEffect(){
    /*ͷ���������jsЧ��*/
    /*1.��ȡ��ǰbanner�ĸ߶�*/
    var banner=document.querySelector(".jd_banner");
    var bannerHeight = banner.offsetHeight;
    /*��ȡheader������*/
    var search = document.querySelector(".jd_search");
    /*2.��ȡ��ǰ��Ļ����ʱ��banner��������Ļ�ľ���*/
    window.onscroll=function(){
        var offsetTop=document.body.scrollTop;
        /*3.�������ֵ����ȡ͸���ȣ����ñ�����ɫ����ʽ*/
        var opacity = 0;
        if(offsetTop<bannerHeight){
            opacity=offsetTop/bannerHeight;
            /*������ʽ*/
            search.style.backgroundColor="rgba(233,35,34,"+opacity+")";
        }
    }
}
/*����ʱЧ��*/
function timeback(){
    /*1.��ȡ����չʾʱ���span*/
    var spans = document.querySelector(".jd_sk_time").querySelectorAll("span");
    /*2.���ó�ʼ�ĵ���ʱʱ��,������Ϊ��λ*/
    var total=3700;
    /*3.������ʱ��*/
    var timerId=setInterval(function(){
        total--;
        /*�жϵ���ʱʱ���Ƿ��Ѿ����*/
        /*���ʱ��*/
        if(total<0){
            clearInterval(timerId);
            return;
        }
        /*��ȡʱ*/
        var hour = Math.floor(total/3600);
        /*��ȡ��*/
        var minute = Math.floor(total%3600/60);
        /*��ȡ��*/
        var second = Math.floor(total%60);
        spans[0].innerHTML=Math.floor(hour/10);
        spans[1].innerHTML=Math.floor(hour%10);
        spans[3].innerHTML=Math.floor(minute/10);
        spans[4].innerHTML=Math.floor(minute%10);
        spans[6].innerHTML=Math.floor(second/10);
        spans[7].innerHTML=Math.floor(second%10);
    },1000);
}
/*�ֲ�ͼЧ��*/
function bannerEffect() {
    /* 1.����β���ͼƬ
     1.�ڿ�ʼλ�����ԭʼ�����һ��ͼƬ
     2.�����λ�����ԭʼ�ĵ�һ��ͼƬ*/
    var banner=document.querySelector(".jd_banner");
    /*1.2.��ȡͼƬ����*/
    var imgBox=banner.querySelector("ul:first-of-type");
    /*1.3.��ȡԭʼ�ĵ�һ��ͼƬ*/
    var first=imgBox.querySelector("li:first-of-type");
    /*1.4.��ȡԭʼ�����һ��ͼƬ*/
    var last=imgBox.querySelector("li:last-of-type");
    /*1.5.����β��������ͼƬ   cloneNode:����һ��domԪ��*/
    imgBox.appendChild(first.cloneNode(true));
    /*insertBefore(��Ҫ�����domԪ�أ�λ��)*/
    imgBox.insertBefore(last.cloneNode(true),imgBox.firstChild);
    /*2.���ö�Ӧ����ʽ*/
    /*2.1��ȡ����liԪ��*/
    var lis = imgBox.querySelectorAll("li");
    /*2.2 ��ȡliԪ�ص�����*/
    var count=lis.length;
    /*2.3.��ȡbanner�Ŀ��*/
    var bannerWidth = banner.offsetWidth;
    /*2.4 ����ͼƬ���ӵĿ��*/
    imgBox.style.width = count*bannerWidth+"px";
    /*2.5 ����ÿһ��li(ͼƬ)Ԫ�صĿ��*/
    for(var i=0;i<lis.length;i++){
        lis[i].style.width=bannerWidth+"px";
    }
    /*����ͼƬ����:ͼƬ�Ѿ���һ����ȵ�Ĭ��ƫ��*/
    var index =1;
    /*3.����Ĭ�ϵ�ƫ��*/
    imgBox.style.left= -bannerWidth+"px";
    /*4.����Ļ�仯��ʱ�����¼�����*/
    window.onresize=function(){
        /*4.1.��ȡbanner�Ŀ��,����ȫ�ֵĿ��ֵ*/
        bannerWidth = banner.offsetWidth;
        imgBox.style.width = count*bannerWidth+"px";
        /*4.3����ÿһ��li(ͼƬ)Ԫ�صĿ��*/
        for (var i=0;i<lis.length;i++){
            lis[i].style.width=bannerWidth+"px";
        }
        /*4.4�������ö�λֵ*/
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
    /*5.ʵ���Զ��ֲ�*/
    var startTime = function () {
        timerId = setInterval(function () {
            /*5.1 �任����*/
            index++;
            /*5.2.��ӹ���Ч��*/
            imgBox.style.transition = "left 0.5s ease-in-out";
            /*5.3 ����ƫ��*/
            imgBox.style.left = (-index * bannerWidth) + "px";
            /*5.4 �ж��Ƿ����һ�ţ��������ص�����1��λ��*/
            setTimeout(function () {
                if (index == count - 1) {
                    index = 1;
                    /*���һ��Ԫ�ص�ĳ������֮ǰ��ӹ�����Ч������ô�������Ի�һֱ���ڣ��������Ҫ������Ҫ�������Ч��*/
                    /*�رչ���Ч��*/
                    imgBox.style.transition = "none";
                    /*ƫ�Ƶ�ָ����λ��*/
                    imgBox.style.left = (-index * bannerWidth) + "px";
                }
            }, 1000);
        }, 2000);
    }
    startTime();
    /*ʵ���ֶ��ֲ�Ч��*/
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
        //    ��ҳ
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
    /*ʵ���ֶ��ֲ�:
        1.��¼��ָ����ʼλ��
        2.��¼��ָ�ڻ��������е�λ�ã�������������ʼλ�õ�ƫ��ֵ��ͨ��left��ʽʵ��ͼƬ��ƫ��
        3.���ɿ���ָ֮���жϵ�ǰ�����ľ��룬�������ָ���ķ�Χ���ͷ�ҳ������ص�
        4.�ɿ���ָ֮�����¿�����ʱ��*/
}