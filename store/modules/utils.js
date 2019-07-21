const utils = {
	state: {
		pickerValue: [],
		if_show_share: false
	},
	mutations: {
		SET_PICKER_VALUE(state, data) {
			for (let i in data.array) {
				if (data.value == data.array[i]) {
					state.pickerValue[0] = i
					break
				}
			}
			state.pickerValue[1] = new Date().getMonth()
		},
		SET_IF_SHOW_SHARE(state, data) {
			state.if_show_share = !state.if_show_share
			console.log(state.if_show_share)
		}
	}
}

export default utils
