<template>
  <header>
    <div id="usercity" @click="gocity()">
      <span>{{this.$store.state.locatecityname}}</span>
      <img src="@/assets/icon/more.png"  class="icon-img">
    </div>
    <div id="search">
      <input type="text">
      <img src="@/assets/icon/search.png" class="icon-img">
    </div>
    <img src="@/assets/icon/info.png" class="icon-img" id="info-img">
  </header>
</template>

<script>
  import axios from 'axios'
  export default{
          data(){
              return{

              }
          },
          methods:{
            gocity() {
            	this.$router.push('/city');
            }
          }
      }
</script>

<style>
  body{margin: 0;padding: 0;}
  .icon-img{width: 2rem;height: 2rem;}
  header{width: 100%;height: 3rem;line-height: 3rem;display: -webkit-flex;display: flex;-webkit-justify-content: space-around;justify-content: space-around;border-bottom: 1px solid darkgray;}
  #usercity{width: 5rem;height: 3rem;display: -webkit-flex;display: flex;-webkit-align-items: center;align-items: center; }
  #usercity span{width: 3rem;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}
  #search{width: 12rem;height: 3rem;display: -webkit-flex;display: flex;-webkit-align-items: center;align-items: center; }
  #search input {width:12rem;height: 2rem;border-radius: 1rem;}
  #search img{margin-left: -2.5rem;}
  #info-img {margin:0.5rem}
</style>
