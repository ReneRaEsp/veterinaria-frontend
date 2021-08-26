<template>
  <div id="app">
	<Header/>
    <Citas/>
  </div>
</template>
<script>
import Citas from './components/Citas.vue';
import Header from './components/Header.vue';

export default{
  components:{
    Citas,
	Header
  }
}
</script>

<style lang="sass">
*
	margin: 0
	padding: 0
	box-sizing: border-box

body
	display: flex
	justify-content: center
	flex-direction: column
	overflow-x: hidden
	padding-bottom: 40px
	background-image: url('./img/huellas.png')
	background-attachment: fixed
	font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif

::-webkit-scrollbar
	background: #6fceb8b1
	width: 12px
	order-radius: .3rem
	&:hover
		background: #4ba284a8

::-webkit-scrollbar-track
	background: gba(20, 128, 154, .6)

::-webkit-scrollbar-thumb
	background: #18573c9e
	width: 1px
	border-radius: .3rem
	border: 1px solid #90e8e6
	&:hover
		background: #3b9d8dc4
	&:active
		background: #43a6bccc

</style>
