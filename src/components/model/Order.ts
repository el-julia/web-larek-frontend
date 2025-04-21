import { Model } from '../base/Model';
import { Payment } from '../../types';
import { CheckoutEvent } from '../events/CheckoutEvents';

export interface IOrderChange {
	payment?: Payment;
	address: string;
	valid: boolean;
	errors: Error[];
}

export class Order extends Model {
	private _payment?: Payment;
	private _address = '';

	getPayment(): Payment | null {
		return this._payment ?? null;
	}

	getAddress(): string {
		return this._address;
	}

	setPayment(payment?: Payment) {
		this._payment = payment;
		this.orderChanged();
	}

	private orderChanged() {
		this.emitChanges(CheckoutEvent.ORDER_CHANGED, {
			payment: this._payment,
			address: this._address,
			valid: this._payment !== undefined && this._address.length > 0,
		} as IOrderChange);
	}

	setAddress(address: string) {
		this._address = address;
		this.orderChanged();
	}
}
