//vue实例
var vm = new Vue({
	el:"#app",
	data:{
		totalMoney:0,
		productList:[],
		checkAllFlag:false,
		delFlag:flase;
	},
	//局部过滤器
	filters:{
		formatMoney: function(value){
			"use strict";
			return "￥"+value.toFixed(2);
		}
	},
	//生命周期的开始
	mounted: function(){
		this.cartView();
	},
	methods:{
		cartView: function(){
			let _this = this;
			this.$http.get('../data/cartData.json').then(function (res){
				_this.productList = res.body.result.list;
				// _this.totalMoney = res.body.result.totalMoney;

			});
		},
		changeMoney: function(product,way){
			"use strict";
			if(way>0){
				product.productQuentity++;
			}else{
				product.productQuentity--;
				if(product.productQuentity<1){
					product.productQuentity = 1;
				}
			}
			this.calcTotalMoney();
		},
        //单选
        selectCheckBox:function(item){
            "use strict";
            if(typeof item.checked == 'undefined'){
                // Vue.set(item,'checked',true);//全局设置
                this.$set(item,'checked',true)
            }else{
                item.checked = !item.checked;
            }
			this.calcTotalMoney();
        },
        allSelectCheckBox:function(flag){
            "use strict";
			this.checkAllFlag = flag;
            var _this = this;

            _this.productList.forEach(function(item,index){
                   if(typeof item.checked == 'undefined'){
                       Vue.set(item,'checked',_this.checkAllFlag);//全局设置
                       // _this.$set(item,'checked',_this.checkedAll)
                   }else{
                       item.checked = _this.checkAllFlag;
                   }
               })
        },
		calcTotalMoney:function(){
			"use strict";
			var _this = this;
			_this.totalMoney = 0;
			_this.productList.forEach(function(item,index){
				if(item.checked){
					_this.totalMoney += item.productPrice*item.productQuentity;
				}
			})
		}，
		//删除当前数据
		delFlagConfirm: function(){
			this.delFlag =true;
			this.curProduct = item;
		}
		//yes
		delProduct:function(){
			var index = this.productList.indexOf(this.curProduct);
			this.productList.splice(index,1)
			this.delFlag =flase;
		}
	}
});
//全局过滤器
Vue.filter('money',function(value,type){
	"use strict";
	return "￥"+value.toFixed(2)+type;
})