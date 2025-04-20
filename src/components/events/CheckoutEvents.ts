export enum CheckoutEvent {
	// входящие события
	PAYMENT_SELECT = 'checkout:paymentSelect',
	ADDRESS_INPUT = 'checkout:addressInput',



	//исходящие события
	ORDER_CHANGED = 'checkout:orderChanged',
	CONTACTS_CHANGED = 'checkout:contactsChanged',
}
