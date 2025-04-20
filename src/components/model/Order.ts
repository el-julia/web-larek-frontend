import { Model } from '../base/Model';
import { Payment } from '../../types';
import { CheckoutEvent } from '../events/CheckoutEvents';

export interface IOrder {
	payment: Payment;
	address: string;
}

export interface IOrderChange extends IOrder {
	valid: boolean;
}

export class Order extends Model<IOrder> {
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
