/**
 * Created by С�� on 2017/6/25.
 */
window.onload = function () {
    /*��ȡ�����*/
    var c_left=document.querySelector("c_left");
    /*��ȡ������ĸ߶�*/
    var leftHeight = c_left.offsetHeight;
    /*��ȡ�����������б�*/
    var ulBox=c_left.querySelector("ul:first-of-type");
    var ulBoxHeight = ulBox.offsetHeight;
    /*��ȡ����liԪ��*/
    var lis=ulBox.querySelectorAll("li");
    /*���þ�ֹ״̬�µ����topֵ*/
    var maxTop = 0;
    /*���þ�ֹ״̬�µ���С��topֵ*/
    var minTop = leftHeight-ulBoxHeight;
    /*���û���״̬�µ�����topֵ*/
    var maxBounceTop= maxTop+100;
    /*���û���״̬�µ���Сtopֵ*/
    var minBounceTop = minTop-100;
    /*ʵ�ֻ���*/
    var startY, moveY,distanceY;
    /*��¼��ǰԪ�ػ������ľ���*/
    var currentY=0;
    /*��ӻ����¼�*/
    ulBox.addEventListener("touchstart",function(e){
        /*��ȡ��ָ����ʼ����*/
        startY= e.targetTouches[0].clientY;
    })
    ulBox.addEventListener("touchmove",function(e){
        moveY= e.targetTouches[0].clientY;
        /*�������Ĳ���*/
        distanceY=moveY-startY;
        /*�жϻ�����ʱ���Ƿ񳬳���ǰָ���Ļ�������*/
        if(currentY+distanceY>maxTop||currentY+distanceY<minTop){
            return;
        }
        /*�Ƚ�֮ǰ������ӵĹ���Ч�����*/
        ulBox.style.transition="none";
        /*ʵ��ƫ�Ʋ���:Ӧ����֮ǰ�Ļ�������Ļ���֮���ٽ��л���*/
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
        /*�жϵ�ǰ�����ľ����Ƿ��ھ�ֹ״̬�ͻ���״̬�µ���Сtopֵ֮��*/
        /*�ص�minTopλ��*/
        /*�ص�maxTopλ��*/
        /*��¼��ǰ�����ľ���*/
    })
}