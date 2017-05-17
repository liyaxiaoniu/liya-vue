;(function (doc, win) {
    win.gRem = {

        bakHtmlFontSize : null, //备份最原本css里面设计的html的字体大小，用以回滚通过 setRem 设置后的情况

        isMobile : false,       //是否为移动端           tips: 根据浏览器代理自动判断赋值
        
        /**
         * [init 初始化]
         * @param  {[type]} options [可配置的参数，待扩展]
         * @return {[type]}     [this]
         */
        init : function (options) {
            var self = this;

            self.opt = options||{};

            self.setDevice().set(self.opt);

            return self;
        },

        /**
         * 移动端设置基准rem
         * rem单位说明：
         * 基于最常用的iPhone6 375*667 屏幕设置基础像素50px 详见js代码 100 * (clientWidth / 750) ---clientWidth为375时刚好50px
         * 目的是这边设计稿一般按750宽来设置原型，这样我们这边定义rem可方便直接转换，比如设计稿上35px，我们这边定义为.35rem刚好(即除以100)
         * 另，平时我们其他的已经用像素作为单位的地方比如设置的是35px，则转换成rem大概是.7rem(即乘2除以100也就是除以50)
         * 之所以选择50px，是因为换算方便，要么除以100，要么乘2除以100，都是偶数，
         * 如果设置成100，那小数点太多，设置成10px，由于chrome最低12px，故你设置html的基础字体为10px，其实是12px。
         * 综上
         * 1、750宽设计图的px转rem             除以100
         * 2、页面上已经按px定义好的转rem      乘2除以100
         * 3、页面上rem转回成使用px            除以2乘100
         * 4、设计图px单位转换成页面上的px     除以2
         * 
         * opt.remRollback      是否回滚字体
         * opt.remForceSet      是否强制设置rem，主要用于PC端要设置rem的情况
         * opt.remVminFlag      基准屏幕宽是否设置为屏宽与屏高中的较小者，这样可以保证手机竖屏横屏字体大小一样
         * opt.remBigScrScale   当vminFlag为false的情况下，可以设置大于414宽屏幕(iPhone6plus)之后，不同比例放大，而是适当打折，免得大屏幕字体感觉太大
         * opt.remMaxWidth      最大适配屏幕限制，大于此宽则不再放大，始终按此宽度进行基准宽度计算
         * opt.remDesignWidth   设计效果图的设计宽度   默认750，即iPhone6宽的2倍
         * opt.remBaseTimes     rem转换比例调整配置    默认100
         * opt.remLogFlag       是否打印日志           默认true
         *
         */
        set : function (opt){
            var self = this,
                opt = opt || {},
                docEl = doc.documentElement;    //documentElement变量缓存下来

            //如果没有备份过字体大小，首先备份原始html字体大小，以便回滚
            !self.bakHtmlFontSize && (self.bakHtmlFontSize = self.getStyle(docEl)['font-size']);

            //如果是回滚字体并且已经备份过
            if(opt.remRollback && self.bakHtmlFontSize){
                docEl.style.fontSize = self.bakHtmlFontSize;
                return self;
            }

            //非移动端且没配置为强制设置则不进行rem设置，也就是如果是PC端但是设置了强制设置标识，也可以进行rem设置
            if(!self.isMobile && !opt.remForceSet){
                return self;
            }

            var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
                // 基准屏幕宽是否设置为屏宽与屏高中的较小者，这样可以保证手机竖屏横屏字体大小一样
                vminFlag = typeof(opt.remVminFlag)==='boolean' ?  opt.remVminFlag : false,
                // 当vminFlag为false的情况下，可以设置大于414宽屏幕(iPhone6plus)之后，不同比例放大，而是适当打折，免得大屏幕字体感觉太大
                bigScrScale = opt.remBigScrScale    || 0.7,
                // 最大适配屏幕限制，大于此宽则不再放大，始终按此宽度进行基准宽度计算
                maxWidth = opt.remMaxWidth          || 750,
                // 设计效果图的设计宽度   默认750，即iPhone6宽的2倍
                designWidth = opt.remDesignWidth    || 750,
                // rem转换比例调整配置    默认100
                baseTimes = opt.remBaseTimes        || 100,
                //是否打印日志
                logFlag = typeof(opt.remLogFlag)==='boolean' ?  opt.remLogFlag : true;

            //计算欲设值字体大小
            var recalc = function () {
                var clientWidth = docEl.clientWidth,//获取屏幕宽度
                    clientHeight = docEl.clientHeight,//获取屏幕高度
                    baseWidth = clientWidth,        //基准宽度，默认取屏幕宽度
                    resPx = "50px";                 //最终的基准像素大小,先给个默认值
                //没获取到宽的，则还回，所以我们css里面设置了html的基准像素是50px，然后body设置回16px,以防出现这个情况
                if (!baseWidth) {
                    //docEl.style.fontSize = resPx;
                    return self;
                }
                //如果配置基准宽度取屏宽与屏高中的较小者，且屏宽与屏高都存在
                if(vminFlag && clientWidth && clientHeight){
                    baseWidth = clientWidth>clientHeight ? clientHeight : clientWidth;
                }else if(!vminFlag && bigScrScale && baseWidth>414 && baseWidth<=maxWidth){
                    //当vminFlag为false的情况下，如果有设置大屏缩小比例，则。。。这里大屏已414屏幕即iphone6plus为基准
                    baseWidth = parseInt(baseWidth*bigScrScale);
                }
                //最终的基准还大于最大适配屏幕限制，那基准就设计为最大适配屏幕限制大小
                if(baseWidth > maxWidth){
                    baseWidth = maxWidth;
                }
                //默认是iPhone6 w375 下 100 * (clientWidth / 750) 的50px;
                resPx = parseInt( baseTimes * (baseWidth/designWidth) ) + 'px';
                //开始设置html字体大小
                docEl.style.fontSize = resPx;
                //日志打印
                logFlag && window.console && console.log('rem单位相关配置计算结果：' + baseWidth + ' - ' + resPx);

            };
            //事件监听支持的判断
            if (!doc.addEventListener){
                return self;
            }
            //事件绑定，当屏幕大小改变，最常见的比如横竖屏切换时重新计算基准像素
            win.addEventListener(resizeEvt, recalc, false);
            doc.addEventListener('DOMContentLoaded', recalc, false);

            return self;
        },

        /**
         * [setDevice 设置设备标识]
         */
        setDevice : function () {
            var self = this,
                mReg = /(iPhone|iPod|iPad|Android|ios|Windows Phone)/i;

            if(win.navigator && navigator.userAgent.match(mReg)){
                self.isMobile = true;
            }
            
            return self;
        },

        /**
         * [getStyle 获取元素的css样式]
         * @param  {[type]} ele [原生dom节点]
         */
        getStyle : function (ele) {
            var style = null;

            if(win.getComputedStyle) {
                style = win.getComputedStyle(ele, null);
            }else{
                style = ele.currentStyle;
            }

            return style;
        }
    };

    gRem.init();
    
})(document, window);