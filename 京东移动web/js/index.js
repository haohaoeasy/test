window.onload=function(){
    searchEffect();
    timeBack();
    bannerEffect()
}
/*ͷ���������jsЧ��*/
function  searchEffect(){
    /*1.��ȡ��ǰbanner�ĸ߶�*/
    var banner=document.querySelector(".jd_banner");
    var bannerHeight = banner.offsetHeight;
    /*��ȡheader������*/
    var search = document.querySelector(".jd_search");
    /*2.��ȡ��ǰ��Ļ����ʱ��banner��������Ļ�ľ���*/
    window.onscroll=function(){
        var offsetTop=document.body.scrollTop
        /*3.�������ֵ����ȡ͸���ȣ����ñ�����ɫ����ʽ*/
        var opacity=0;
        /*�жϣ������banner��û����ȫ ������Ļ����ô���б�Ҫ����͸���Ⱥ�����͸����*/
        if(offsetTop<bannerHeight){
            opacity=offsetTop/bannerHeight;
            /*������ʽ*/
            search.style.backgroundColor="ragb(233,35,34,"+opacity+")";
        }
    }
}
/*����ʱЧ��*/
function timeBack(){
    /*1.��ȡ����չʾʱ���span*/
    var spans = document.querySelector(".jd_sk_time").querySelectorAll("span");
    /*2.���ó�ʼ�ĵ���ʱʱ��,������Ϊ��λ*/
    var totalTime = 3700;
    /*3.������ʱ��*/
    var timeId = setInterval(function(){
        totalTime--;
        /*�жϵ���ʱʱ���Ƿ��Ѿ����*/
        if(totalTime<0){
            /*���ʱ��*/
            clearInterval(timeId);
            return;
        }
        /*�õ�ʣ��ʱ���е�  ʱ  ��  ��*/
        /*��ȡʱ*/
        var hour = Math.floor(totalTime/3600);
        /*��ȡ��*/
        var minute = Math.floor(totalTime%3600/60);
        /*��ȡ��*/
        var second = Math.floor(totalTime%60);
        /*��ֵ����ʱ����䵽span��  12*/
        spans[0].innerHTML=Math.floor(hour/10);
        spans[1].innerHTML=Math.floor(hour%10);
        spans[3].innerHTML=Math.floor(minute/10);
        spans[4].innerHTML=Math.floor(minute%10);
        spans[6].innerHTML=Math.floor(second/10);
        spans[7].innerHTML=Math.floor(second%10);
    },1000);
}
/*�ֲ�ͼ*/
function  bannerEffect(){
    /*1.�����޸��ֲ�ͼ��ҳ��ṹ
     * a.�ڿ�ʼλ�����ԭʼ�����һ��ͼƬ
     * b.�ڽ���λ�����ԭʼ�ĵ�һ��ͼƬ*/
    /*1.1.��ȡ�ֲ�ͼ�ṹ*/
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
    var setIndicator=function(index){
        var indicators=banner.querySelector("ul:last-of-type").querySelectorAll("li");
        /*���������liԪ�ص�active��ʽ*/
        for(var i=0;i<indicators.length;i++){
            indicators[i].classList.remove("active");
        }
        /*Ϊ��ǰliԪ�����active��ʽ*/
        indicators[index-1].classList.add("active");
    }
    var timerId;
    /*5.ʵ���Զ��ֲ�*/
    var startTime = function(){
        /*5.1 �任����*/
        timerId=setInterval(function(){
            index++;
            /*5.2.��ӹ���Ч��*/
            imgBox.style.transition="left 0.5s ease-in-out";
            /*5.3 ����ƫ��*/
            imgBox.style.left=(-index*bannerWidth)+"px";
            setTimeout(function(){
                /*5.4 �ж��Ƿ����һ�ţ��������*/
                if(index==count-1){
                    index=1;
                    /*���һ��Ԫ�ص�ĳ������֮ǰ��ӹ�����Ч������ô�������Ի�һֱ���ڣ��������Ҫ������Ҫ�������Ч��*/
                    /*�رչ���Ч��*/
                    imgBox.style.transition="none";
                    /*ƫ�Ƶ�ָ����λ��*/
                    imgBox.style.left=(-index*bannerWidth)+"px";
                }
            },500);
        },2000);
    }
    startTime();
    /*6.ʵ���ֶ��ֲ�*/
    var startX,moveX,distanceX;
    /*��ǵ�ǰ����Ч���Ƿ��Ѿ�ִ�����*/
    var isEnd=true;
    /*ΪͼƬ��Ӵ����¼�--������ʼ*/
    imgBox.addEventListener("touchstart",function(e){
        /*�����ʱ��*/
        clearInterval(timerId);
        /*��ȡ��ǰ��ָ����ʼλ��*/
        startX= e.targetTouches[0].clientX;
    });
    /*ΪͼƬ��Ӵ����¼�--��������*/
    imgBox.addEventListener("touchmove",function(e){
        if(isEnd==true){
            //console.log("touchmove");
            /*��¼��ָ�ڻ��������е�λ��*/
            moveX= e.targetTouches[0].clientX;
            /*��������Ĳ���*/
            distanceX=moveX-startX;
            /*Ϊ�˱�֤Ч����������֮ǰ������ӵĹ�����ʽ���*/
            imgBox.style.transition="none";
            /*ʵ��Ԫ�ص�ƫ��  left������ԭʼ������
             * �ش�ϸ�ڣ����εĻ�������Ӧ�û���֮ǰ�ֲ�ͼ�Ѿ�ƫ�Ƶľ���*/
            imgBox.style.left=(-index*bannerWidth + distanceX)+"px";
        }
    });
    /*��Ӵ��������¼�*/
    /*touchend:�ɿ���ָ����*/
    imgBox.addEventListener("touchend",function(e){
        /*�ɿ���ָ����ǵ�ǰ����Ч������ִ��*/
        isEnd=false;
        /*��ȡ��ǰ�����ľ��룬�жϾ����Ƿ񳬳�ָ���ķ�Χ 100px*/
        if(Math.abs(distanceX) > 100){
            /*�жϻ����ķ���*/
            if(distanceX > 0){//��һ��
                index--;
            }
            else{ //��һ��
                index++;
            }
            /*��ҳ*/
            imgBox.style.transition="left 0.5s ease-in-out";
            imgBox.style.left=-index*bannerWidth+"px";
        }
        else if(Math.abs(distanceX) > 0){ //�ñ�֤�û�ȷʵ���й���������
            /*�ص�*/
            imgBox.style.transition="left 0.5s ease-in-out";
            imgBox.style.left=-index*bannerWidth+"px";
        }
        /*����һ��move����������������Ϊ0*/
        startX=0;
        moveX=0;
        distanceX=0;
    });

    /*webkitTransitionEnd:���Լ�����ǰԪ�صĹ���Ч��ִ����ϣ���һ��Ԫ�صĹ���Ч��ִ����ϵ�ʱ�򣬻ᴥ������¼�*/
    imgBox.addEventListener("webkitTransitionEnd",function(){
        //console.log("webkitTransitionEnd");
        /*����������һ��(count-1)���ص�����1*/
        /*������˵�һ��(0)���ص�����count-2*/
        if(index==count-1){
            index=1;
            /*�������*/
            imgBox.style.transition="none";
            /*����ƫ��*/
            imgBox.style.left=-index*bannerWidth+"px";
        }
        else if(index==0){
            index=count-2;
            /*�������*/
            imgBox.style.transition="none";
            /*����ƫ��*/
            imgBox.style.left=-index*bannerWidth+"px";
        }
        /*���ñ��*/
        setIndicator(index);
        setTimeout(function(){
            isEnd=true;
            /*���֮ǰ��ӵĶ�ʱ��*/
            clearInterval(timerId);
            //���¿�����ʱ��
            startTime();},100);
    });
}

