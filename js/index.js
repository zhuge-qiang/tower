/**
 * �ֲ�ͼ�Ͳ�Ʒģ��JavaScript
 */
$(function(){
    banner();
    initProduct();
    $('[data-toggle="tooltip"]').tooltip();/*��Ҫ�Լ�ȥ��ʼ��  ������ʾ*/
});

/*��̬�ֲ�ͼ*/
function banner(){
    /*
    * ��ȡ����       ajax
    * �жϵ�ǰ��ʲô�豸  768px���¶���  �ƶ��豸
    * �����豸����������  ��jsonת��HTML   �ַ���ƴ��  ģ������ ��
    * ��Ⱦ��htmlҳ�浱��  html(�������ַ���);
    * ��ҳ��ߴ�ı��ʱ��������Ⱦ   ����ҳ��ߴ�ĸı�  resize
    * */
    var myData;
    /*��ȡ����*/
    var getData = function(callback){
        if(myData){
            callback && callback(myData);
            return false;
        }
        /*��ȡ���� */
        $.ajax({
            url:'js/index.json',/*���ҳ�������·��*/
            type:'get',
            data:{},
            dataType:'json',
            success:function(data){
                /*��������һ�������ʱ����Ҫ��¼*/
                myData = data;
                callback && callback(myData);
            }
        });
    };
    /*��Ⱦ*/
    var render = function(){
        /*
        * �жϵ�ǰ��ʲô�豸  768px���¶���  �ƶ��豸
        * �����豸����������  ��jsonת��HTML   �ַ���ƴ��  ģ������ ��
        * ��Ⱦ��htmlҳ�浱��  html(�������ַ���);
        * */
        var width = $(window).width();//��ȡ��ǰ��Ļ�Ŀ��

        /*�жϵ�ǰ�ǲ����ƶ���*/
        var isMobile = false;
        if(width <=768 ){//С�ڵ���768px��ʱ����Ϊ���ƶ��豸
            isMobile = true;
        }

        /*��ȡ����*/
        getData(function(data){
            /*�����豸���������� */

            var templatePoint = _.template($('#template_point').html());
            var templateImage = _.template($('#template_image').html());

            var htmlPoint = templatePoint({model:data});
            var htmlImage = templateImage({model:data,isMobile:isMobile});

            /*��Ⱦ*/
            $('.carousel-indicators').html(htmlPoint);
            $('.carousel-inner').html(htmlImage);
        });

    };
    /*��ҳ��ߴ�ı��ʱ��������Ⱦ   ����ҳ��ߴ�ĸı�  resize*/
    $(window).on('resize',function(){
        render();
    }).trigger('resize');
    /*��ʱִ��  resize  �¼�*/

    /*���ƶ���  ���ƻ���*/
    var startX = 0;
    var moveX =0;
    var distanceX = 0;
    var isMove = false;
    $('.carousel-inner').on('touchstart',function(e){
        /*����û��ֱ�ӷ���ԭ�����ƶ���touchEvent����  originalEvent  ���ص��� touchEvent����  */
        startX = e.originalEvent.touches[0].clientX;
    });
    $('.carousel-inner').on('touchmove',function(e){
        moveX = e.originalEvent.touches[0].clientX;
        distanceX = moveX-startX;
        isMove = true;
    });
    $('.carousel-inner').on('touchend',function(e){
        if( Math.abs(distanceX) > 50 && isMove){
            if(distanceX > 0){/*��ô�����ֲ�ͼ���*/
                /*��һ��*/
                $('.carousel').carousel('prev');
            }else{
                /*��һ��*/
                $('.carousel').carousel('next');
            }
        }
        /*���ò���*/
         startX = 0;
         moveX =0;
         distanceX = 0;
         isMove = false;
    });
}
/*��ʼ����Ʒҳǩ*/
function initProduct(){
    /*
    * ֪������li�Ŀ�ȵĺ�
    * ul�Ŀ�����óɺ�����li�ĺ���һ��
    * ����
    * */
    /*��ȡҳǩ����*/
    var tabs = $('.nav-tabs-product');
    /*���е�li*/
    var lis = tabs.find('li');
    var width = 0;
    $.each(lis,function(i,item){
        /*width() ��ȡ�������ݵĿ��*/
        /*innerWidth() ��ȡ���� ���� �ڱ߾� �Ŀ��*/
        width += $(this).innerWidth();
    });
    tabs.width(width);
}
/*����*/
itcast.iScroll({
    swipeDom:document.querySelector('.nav-tabs-product-parent'),
    swipeType:'x',
    swipeDistance:1000
});