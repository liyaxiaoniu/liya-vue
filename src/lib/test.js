
export default{
    el:'#app',
    data:{
        'checked':0
    },
    filters:{

    },
    mounted: function(){
        this.$nextTick(function(){
            this.init();
        })
    },
    methods:{
        init: function(){
            this.$http.get('./data/loginInfo.json',{}).then(function(res){
                var code = res.resultCode;
            })
        }
    }
}
