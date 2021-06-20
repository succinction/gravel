import Store from '../../../lib/Store'

export interface IModalStore {
	id?: string
	zindex: number
	options?: Record<string, any>
}
class ModalStore extends Store<IModalStore> {
	zindex: number

	constructor(){
		super({ zindex: 2000 })
	}

	show(id, options = {}){
		this.set({ id, options, zindex: this.get().zindex + 1 }, `${id}.show`)
	}

	hide(id?, options = {}){
		
		if(id){
			this.set({ id, options, zindex: this.get().zindex - 1 }, `${id}.hide`)
		}
		else {
			this.set({ id: '', zindex: 2000, options: {} }, 'hide')
		}
	}

}

export const modalStore = new ModalStore()
