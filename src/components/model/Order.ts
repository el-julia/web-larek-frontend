import { Model } from '../base/Model';
import { Payment } from '../../types';

export interface IOrderChange {
	payment?: Payment;
	address: string;
	valid: boolean;
}


export class Order extends Model<IOrderChange> {
	private payment?: Payment;
	private address = '';

	setPayment(payment?: Payment) {
		this.payment = payment;
		this.orderChanged();
	}

	private orderChanged() {
		this.changed({
			payment: this.payment,
			address: this.address,
			valid: this.payment !== undefined && this.address.length > 0,
		})
	}

	setAddress(address: string) {
		this.address = address;
		this.orderChanged();
	}
}
