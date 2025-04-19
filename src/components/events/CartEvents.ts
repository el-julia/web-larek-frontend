export enum CartEvents {
	// входящие события
	ADD = 'cart:add',
	REMOVE = 'cart:remove',
	CLEAR = 'cart:clear',

	// исходящие события
	CHANGED ='cart:changed',
}