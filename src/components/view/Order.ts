import { Form } from "./Form";
import { IOrderForm } from '../../types';
import { IEvents } from '../base/Events';
import { ensureElement } from '../../utils/utils';

export class Order extends Form<IOrderForm> {
	private orderCardButton:HTMLButtonElement;
	private orderCashButton:HTMLButtonElement;

	constructor(container: HTMLFormElement, events: IEvents) {
		super(container, events);

		this.orderCardButton = ensureElement<HTMLButtonElement>('button[name="card"]', this.container);
		this.orderCashButton = ensureElement<HTMLButtonElement>('button[name="cash"]', this.container);

		this.orderCardButton.addEventListener('click', () => {
			this.orderCardButton.classList.add('button_alt-active');
			this.orderCardButton.classList.remove('button_alt-active');
			this.onInputChange('payment', 'card');
		});

		this.orderCashButton.addEventListener('click', () => {
			this.orderCashButton.classList.add('button_alt-active');
			this.orderCashButton.classList.remove('button_alt-active');
			this.onInputChange('payment', 'cash');
		});

	}

	set address(value: string) {
		(this.container.elements.namedItem('address') as HTMLInputElement).value = value;
	}

	set payment(value: 'card' | 'cash') {
		if (value === 'card') {
			this.orderCardButton.classList.add('button_alt-active');
			this.orderCashButton.classList.remove('button_alt-active');
		} else {
			this.orderCashButton.classList.add('button_alt-active');
			this.orderCardButton.classList.remove('button_alt-active');
		}
	}


}