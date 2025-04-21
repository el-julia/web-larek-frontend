import { Model } from '../base/Model';
import { Payment } from '../../types';
import { CheckoutEvent } from '../events/CheckoutEvents';

export interface IOrderChange {
	payment: Payment;
	address: string;
	valid: boolean;
}

export class Order extends Model {
	private payment?: Payment;
	private address = '';

	setPayment(payment: Payment) {
		this.payment = payment;
		this.orderChanged();
	}

	private orderChanged() {
		this.emitChanges(CheckoutEvent.ORDER_CHANGED, {
			payment: this.payment,
			address: this.address,
			valid: this.payment !== undefined && this.address.length > 0,
		} as IOrderChange);
	}

	setAddress(address: string) {
		this.address = address;
		this.orderChanged();
	}
}
