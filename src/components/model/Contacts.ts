import { Model } from '../base/Model';
import { CheckoutEvent } from '../events/CheckoutEvents';

export interface IContacts {
	email: string;
	phone: string;
	valid: boolean;
}

export class Contacts extends Model<IContacts>{

	private email: string;
	private phone: string;
	private valid: boolean;
	setEmail(email: string) {
		this.email = email;
		this.contactsChanged();
	}

	setPhone(phone: string) {
		this.phone = phone;
		this.contactsChanged();
	}

	private contactsChanged() {
		this.emitChanges(CheckoutEvent.ORDER_CHANGED, {
			email: this.email,
			phone: this.phone,
			valid: this.email.length > 0 && this.phone.length > 0,
		});
	}
}