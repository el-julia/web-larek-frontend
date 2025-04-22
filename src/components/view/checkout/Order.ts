import { ensureElement } from '../../../utils/utils';
import { Payment } from '../../../types';
import { AView } from '../../base/AView';

export interface IOrderActions {
	onOnlineClick: (event: MouseEvent) => void;
	onOfflineClick: (event: MouseEvent) => void;
	onProceedButtonClick: (event: MouseEvent) => void;
	onAddressInput: (event: Event) => void;
}

interface IOrder {
	valid: boolean;
	payment: Payment;
	address: string;
	error: string;
}

export class Order extends AView<IOrder> {
	protected buttonOnline: HTMLButtonElement;
	protected buttonOffline: HTMLButtonElement;
	protected addressInput: HTMLInputElement;
	protected proceedButton: HTMLButtonElement;
	protected errors: HTMLElement;

	constructor(container: HTMLFormElement, actions: IOrderActions) {
		super(container);

		this.buttonOnline = ensureElement<HTMLButtonElement>(
			'button[name=card]',
			this.container
		);
		this.buttonOffline = ensureElement<HTMLButtonElement>(
			'button[name=cash]',
			this.container
		);
		this.addressInput = ensureElement<HTMLInputElement>(
			'input[name=address]',
			this.container
		);
		this.proceedButton = ensureElement<HTMLButtonElement>(
			'button[type=submit]',
			this.container
		);

		this.errors = ensureElement<HTMLElement>('.form__errors', this.container);

		this.buttonOnline.addEventListener('click', actions.onOnlineClick);
		this.buttonOffline.addEventListener('click', actions.onOfflineClick);
		this.proceedButton.addEventListener('click', actions.onProceedButtonClick);
		this.addressInput.addEventListener('input', actions.onAddressInput);
	}

	protected doRender(data: Partial<IOrder>): void {
		if (data.valid !== undefined) {
			this.setDisabled(this.proceedButton, !data.valid);
		}

		if (data.payment !== undefined) {
			this.setPayment(data.payment);
		}

		if (data.address !== undefined) {
			this.addressInput.value = data.address;
		}

		if (data.error !== undefined) {
			this.errors.textContent = data.error;
		}
	}

	private setPayment(payment: Payment | undefined) {
		this.toggleClass(
			this.buttonOnline,
			'button_alt-active',
			payment === 'card'
		);
		this.toggleClass(
			this.buttonOffline,
			'button_alt-active',
			payment === 'cash'
		);
	}
}
