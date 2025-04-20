import { Component } from '../../base/Component';
import { ensureElement } from '../../../utils/utils';

export interface IOrderActions {
	onOnlineClick: (event: MouseEvent) => void;
	onOfflineClick: (event: MouseEvent) => void;
	onProceedButtonClick: (event: MouseEvent) => void;

}

type Payment = 'online' | 'offline';

interface IOrder {
	payment: Payment;
	address: string;
}

export class Order extends Component<IOrder> {

	protected buttonOnline: HTMLButtonElement;
	protected buttonOffline: HTMLButtonElement;
	protected addressInput: HTMLInputElement;
	protected orderButton: HTMLButtonElement;

	constructor(container: HTMLFormElement, actions: IOrderActions) {
		super(container);

		this.buttonOnline = ensureElement<HTMLButtonElement>('button[name=card]', this.container);
		this.buttonOffline = ensureElement<HTMLButtonElement>('button[name=cash]', this.container);
		this.addressInput = ensureElement<HTMLInputElement>('input[name=address]', this.container);
		this.orderButton = ensureElement<HTMLButtonElement>('button[type=submit]', this.container);

		this.buttonOnline.addEventListener('click', actions.onOnlineClick);
		this.buttonOffline.addEventListener('click', actions.onOfflineClick);
		this.orderButton.addEventListener('click', actions.onProceedButtonClick);
	}

	set payment(payment: Payment) {
		this.toggleClass(this.buttonOnline, 'button_alt-active', payment === 'online' );
		this.toggleClass(this.buttonOffline, 'button_alt-active', payment === 'offline' );
	}

	set address(address: string) {
		this.addressInput.value = address;
	}
}