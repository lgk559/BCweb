<template>
  <div>

    <Navbar/>
    <Alert/>
    <div class="container-fluid">
      <div class="row">
        
          
				<Sidebar/>

        <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
          <router-view></router-view>
        </main>
      </div>
    </div>

  </div>
</template>

<script>
import Sidebar from './pages/Sidebar';
import Navbar from './pages/Navbar'
import Alert from './AlertMessage'
export default {
	components:{
		Sidebar,
		Navbar,
    Alert
	},
  created(){
    var myCookie = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, "$1");
    this.$http.defaults.headers.common.Authorization = myCookie
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
