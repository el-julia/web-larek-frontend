import { Model } from '../base/Model';
import { CheckoutEvent } from '../events/CheckoutEvents';

export interface IContactsChange {
	email: string;
	phone: string;
	valid: boolean;
	error: string;
}

export class Contacts extends Model {
	private _email = '';
	private _phone = '';

	getEmail(): string {
		return this._email;
	}

	getPhone(): string {
		return this._phone;
	}

	setEmail(email: string) {
		this._email = email;
		this.contactsChanged();
	}

	setPhone(phone: string) {
		this._phone = phone;
		this.contactsChanged();
	}

	private contactsChanged() {
		this.emitChanges(CheckoutEvent.CONTACTS_CHANGED, {
			email: this._email,
			phone: this._phone,
			valid: this.getValid(),
			error: this.getError(),
		} as IContactsChange);
	}

	private getValid(): boolean {
		return this._email.length > 0 && this._phone.length > 0;
	}

	getError(): string {
		if (this._email.length <= 0) {
			return 'Необходимо заполнить Email'
		} else if (this._phone.length <= 0) {
			return 'Необходимо заполнить телефон'
		} else {
			return ''
		}
	}

}
