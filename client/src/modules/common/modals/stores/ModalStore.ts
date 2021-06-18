import Store from '../../../lib/Store'

export interface IModal {
  shown: boolean
	zindex: number
}

export interface IModalStore {
  modals: IModal[]
}
class ModalStore extends Store<IModalStore> {
	shown: boolean
	zindex: number

	constructor(){
		super({ modals: [] })
		// Allow for more recent modals
		// to show over recent ones, ie modal on modal
		this.shown = false
		this.zindex = 2000

	}

	getZIndex(){
		return this.zindex
	}

	show(name, options){
		this.zindex = this.zindex + 1
		//this.set(name + '.show')
	}

	hide(name, options){
		
		if(name){
			this.zindex = this.zindex - 1
			//this.set(name + '.hide', options)
		}
		else {
			this.zindex = 2000
			//this.set('hide')
		}
	}

}

export const modalStore = new ModalStore()
