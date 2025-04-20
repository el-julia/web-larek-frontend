import { Component } from '../../base/Component';

export interface IOrderActions {
	onClick: (event: MouseEvent) => void;

}

interface IOrder {
	buttonPayOnline: HTMLButtonElement;
	buttonPayOffline: HTMLButtonElement;
	address: string;
}

export class Order extends Component<IOrder> {

	protected buttonOnline: HTMLButtonElement;
	protected buttonOffline: HTMLButtonElement;
	protected address: HTMLInputElement;

	constructor(container: HTMLElement ) {
		super(container);
	}
}