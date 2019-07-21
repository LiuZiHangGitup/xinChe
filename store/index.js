import Vue from 'vue'
import Vuex from 'vuex'
import getters from '@/store/getters'
import user from '@/store/modules/user.js'
import utils from '@/store/modules/utils.js'

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		user,
		utils
	},
	getters
})
