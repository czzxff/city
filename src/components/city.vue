<template>
  <div class="city">
    <div class="city-header">
      <img src="@/assets/icon/back.png" class="icon-img" @click="backmovie()"/>
      <input type="text" v-model="searchcity" placeholder="城市/拼音" class="search-box">
      <img src="@/assets/icon/search.png" class="icon-img search-btn">
      <img src="@/assets/icon/delete.png" @click="cancel()" class="icon-img delete-btn">
    </div>
    <div class="over" v-if="searchc">
      <ul>
        <li class="cityte" v-for="item in searcharr" @click="citytext(item.name,item.id)">{{item.name}}</li>
      </ul>
    </div>
    <div class="hot-city">
      <div class="locate-city">
        <p class="fl">{{title}}</p>&nbsp;&nbsp;&nbsp;
        <div class="item-box">
          <img src="@/assets/icon/locate.png" class="icon-img">
          <span>{{this.$store.state.locatecityname}}</span>
         </div>
      </div>
      <p style="padding:1rem 0 0 0;">热门城市</p>
      <div class="hot-list">
        <div class="item-box fl" @click="citytext(item.name,item.id)" v-for="item in isHot" >{{item.name}}</div>
      </div>
    </div>
    <div class="city-main">
      <div class="city-list">
        <ul>
        	<li v-for="(item,index) in citylist" :key="index" class="cityli" :id="item.lettertop">
        		<p class="cityle">{{item.lettertop}}</p>
        		<ul>
              <li v-for="(itemx,index) in item.city" @click="citytext(itemx.name,itemx.id)" class="cityte">{{itemx.name}}</li>
        		</ul>
        	</li>
        </ul>
      </div>
      <div class="city-letter">
      	<ul>
      		<li v-for="(item,index) in letter" :key="index" @click="lettercity($event)">{{item}}</li>
      	</ul>
      </div>
      <div class="showletter" v-if='showx'>{{showletterx}}</div>
    </div>
  </div>
</template>

<script>
	import axios from 'axios'
	export default {
    name:'city',
		data() {
			return {
				title: "当前城市",
				letter: [],
				isHot: [],
				citylist: [],
				citylistc: [],
				showletterx: "",
				showx: false,
        searchc:false,
				searchcity: "",
				searcharr: []
			}
		},
		created: function() {
			axios.get('./static/city.json').then(response => {
				const citylist = response.data.cities;
				this.citylistc = response.data.cities;
				let cityhead = [],
					newcityhead = [],
					isHotx = [],
					citymain = [];

				for (let i = 0; i < citylist.length; i++) {
					let ishotlist = citylist[i];
					let letterx = citylist[i].pinyin.charAt(0).toUpperCase(); //toUpperCase() 方法用于把字符串转换为大写
					if (citylist[i].isHot) {
						isHotx.push(ishotlist); //把数据中标记为热门城市的，遍历添加至数组热门城市
					}
					cityhead.push(letterx);//城市拼音首给字母大写集合数组
				}
				for (let i = 0; i < cityhead.length; i++) {
					if (newcityhead.indexOf(cityhead[i]) == -1) { //indexof检索，没找到返回-1
						newcityhead.push(cityhead[i]);  //newcityhead为城市首拼数组，用于右侧快速选择城市，及城市顺序排列
					}
				}
				newcityhead = newcityhead.sort(function compareFunction(item1, item2) {
					return item1.localeCompare(item2); //localeCompare方法用于给字母按中文排序
				});
				this.isHot = isHotx; //热门城市数组
				this.letter = newcityhead;  //城市首拼数组
				// console.log(newcityhead)
				for (let i = 0; i < newcityhead.length; i++) {
					let obj = new Object();  //创建城市列表对象
					obj.lettertop = newcityhead[i];  //动态创建对象，lettertop为obj子对象的首拼对象
					obj.city = [];

					for (let j = 0; j < citylist.length; j++) {
						if (newcityhead[i].toLowerCase() === citylist[j].pinyin.charAt(0)) {
              let citya = new Object();
              citya.id = citylist[j].cityId;
              citya.name = citylist[j].name;
              // 在城市列表，具体城市中添加ID属性是为了跳转传值，用ID提供城市信息，
              // 进而页面获取城市具体数据.若不用次方法,可把上面3行去掉,下面那行改成push(citylist[j].name)
              // 如此,citymain中city数组变为一维数组,类似:"city":["鞍山","安庆","安阳"]

							obj.city.push(citya);
						}
					}
					citymain.push(obj)
          // 城市列表citymain结构简述:
          // citymain:[
          //   {//obj
          //     "lettertop":"A",
          //     "city":[citya
          //       {
          //         "id":"230300",
          //         "name":"安庆"
          //       },
          //       ......
          //     ]
          //   },
          //   ......
          // ]
				}
				this.citylist = citymain;
				// console.log(citymain)
			})
		},
    mounted () {
      // const cityname = localStorage.getItem('cityname')
      // this.locateCity = cityname
    },
		methods: {
			backmovie() {
				this.$router.push('/');
			},
			lettercity($event) {
				let text = $event.currentTarget.innerText; //获取点击的字母
				let _this = this;
				let letter = document.getElementById(text);  //获取城市列表该字母部分
				var citym = document.getElementsByClassName("city-main")[0];  //获取城市列表父组件，用于定位

				this.showletterx = text;  //用于点击选择城市首字母后，屏幕显示该字母大写事件
				this.showx = true;  //显示字母大写事件
				setTimeout(function() {
					_this.showx = false;
				}, 1600);
				citym.scrollTo(0, letter.offsetTop - 350)
			},
			cancel() {
				this.searchc = false;
        this.searchcity = "";
			},
      citytext:function(name,id) {
      	const actioncity = name;
        const actionid = id;
      	this.$store.commit("updatecityid",actionid)
        this.$store.commit("updatecityname",actioncity)
        // localStorage.setItem('cityname', actioncity);
        // localStorage.setItem('cityid', actionid);
        this.$router.push('/');
      }
		},
		watch: {
			searchcity: function() {
				let citysearchs = [];
				//判断input输入内容全是空格
				if (this.searchcity != "") {
					this.searchc = true;
					for (let i = 0; i < this.citylistc.length; i++) {
						let str = this.citylistc[i].name;
						if (str.indexOf(this.searchcity) != -1) {
              let cityitem = new Object ();
              cityitem.id = this.citylistc[i].cityId;
              cityitem.name = this.citylistc[i].name;
							citysearchs.push(cityitem);
						}
					}
				}
				this.searcharr = citysearchs;
				if (this.searchcity.length == 0) {
					this.searchc = false
				} else {
					this.searchc = true
				}
			}
		}
	}
</script>

<style>
	ul{
    margin: 0;
    padding: 0;
    list-style: none;
    text-align: center;
  }
  .city-header{
    width: 100%;
    height: 3rem;
    background-color: yellow;
    display: -webkit-flex;
    display: flex;
    -webkit-align-items: center;
    align-items: center;
  }
  .search-box{
     margin-left: 1rem;
     width: 70%;
     height: 1.5rem;
     text-align: center;
  }
  .search-btn{
    margin-left: -70%;
  }
  .delete-btn{
   margin-left: 50%;
  }
  .over{
    background-color: white;
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 1;
  }
  .hot-city{
    width: 96%;
    padding: 2%;
    min-height: 10rem;
    display: table;
    content: '';
    clear: both;
    background-color: #dbdbdb;
    border-bottom: 1px solid gray;
  }
  .locate-city{
    display: -webkit-flex;
    display: flex;
    -webkit-align-items: center;
    align-items: center;
    width: 100%;
    height: 2rem;
  }
  p{
    margin: 0;
  }
  .item-box{
    width: 6rem;
    height: 2rem;
    background-color: white;
    border-radius: 3px;
    line-height: 2rem;
    text-align: center;
  }
  .item-box img{
    width: 1rem;
    height: 1rem;
  }
  .hot-list{
    margin-top: 0.5rem;
    width: 100%;
    height: 8rem;
    display: -webkit-flex;
    display: flex;
    -webkit-flex-wrap: wrap;
    flex-wrap: wrap;
  }
  .hot-list div{
     margin-right: 1.5rem;
  }
  .city-main{
    width: 100%;
    height: 30rem;
    overflow-y: scroll;
  }
  .cityle{
    width: 100%;
    height: 1.5rem;
    line-height: 1.5rem;
    background-color: #dbdbdb;
  }
  .cityte{
    width: 100%;
    height: 1.5rem;
    line-height: 1.5rem;
    border-bottom: 1px solid gray;
  }
  .city-letter{
    position: fixed;
    top: 12rem;
    right: 1rem;
  }
  .showletter{
    position: absolute;
    top: 60%;
    left: 50%;
    font-size: 10rem;
    color: grey;
    transform: translate(-50%,-50%);
  }
</style>
