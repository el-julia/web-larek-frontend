export enum CheckoutEvent {
	// входящие события
	PAYMENT_SELECT = 'checkout:paymentSelect',
	ADDRESS_INPUT = 'checkout:addressInput',

	EMAIL_INPUT = 'checkout:emailInput',
	PHONE_INPUT = 'checkout:phoneInput',



	//исходящие события
	ORDER_CHANGED = 'checkout:orderChanged',
	CONTACTS_CHANGED = 'checkout:contactsChanged',
}
