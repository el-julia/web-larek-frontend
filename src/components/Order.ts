import { Form } from "./common/Form";
import { IOrderForm } from '../types';
import { IEvents } from './base/Events';
import { ensureElement } from '../utils/utils';

export class Order extends Form<IOrderForm> {
	private orderCardButton:HTMLButtonElement;
	private orderCashButton:HTMLButtonElement;

	constructor(container: HTMLFormElement, events: IEvents) {
		super(container, events);

		this.orderCardButton = ensureElement<HTMLButtonElement>('button[name="card"]', this.container);
		this.orderCashButton = ensureElement<HTMLButtonElement>('button[name="cash"]', this.container);


	}


}