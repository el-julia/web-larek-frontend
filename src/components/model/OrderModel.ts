import { AModel } from '../base/AModel';
import { Payment } from '../../types';
import { CheckoutEvent } from '../events/CheckoutEvents';

export interface IOrderChange {
	payment?: Payment;
	address: string;
	valid: boolean;
	error: string;
}

export class OrderModel extends AModel {
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
			valid: this.getValid(),
			error: this.getError(),
		} as IOrderChange);
	}

	private getValid(): boolean {
		return this._payment !== undefined && this._address.length > 0;
	}

	setAddress(address: string) {
		this._address = address;
		this.orderChanged();
	}

	getError(): string {
		if (this._payment == undefined) {
			return 'Необходимо выбрать способ оплаты'
		} else if (this._address.length <= 0) {
			return 'Необходимо заполнить адрес'
		} else {
			return ''
		}
	}
}
