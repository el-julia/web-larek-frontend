import { Model } from '../base/Model';
import { CheckoutEvent } from '../events/CheckoutEvents';

export interface IContactsChange {
	email: string;
	phone: string;
	valid: boolean;
}

export class Contacts extends Model {
	private email = '';
	private phone = '';

	setEmail(email: string) {
		this.email = email;
		this.contactsChanged();
	}

	setPhone(phone: string) {
		this.phone = phone;
		this.contactsChanged();
	}

	private contactsChanged() {
		this.emitChanges(CheckoutEvent.CONTACTS_CHANGED, {
			email: this.email,
			phone: this.phone,
			valid: this.email.length > 0 && this.phone.length > 0,
		});
	}
}
