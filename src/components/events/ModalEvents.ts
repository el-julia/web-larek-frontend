export enum ModalEvents {
	// входящие события
	PRODUCT_PREVIEW = 'modal:productPreview',
	BASKET = 'modal:basket',
	ORDER = 'modal:order',
	CONTACTS = 'modal:contacts',
	SUCCESS = 'modal:success',

	// исходящие события
	OPEN = 'modal:open',
	CLOSE = 'modal:close',
	NONE = 'modal:none',
}