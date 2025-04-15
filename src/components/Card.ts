import { Component } from './base/Component';

interface ICardActions {
	onClick: (event: MouseEvent) => void;
}

interface ICard<T> {
	productCategory: string;
	productTitle: string;
	productImage: string;
	productPrice: number;

}

export class Card<T> extends Component<ICard<T>> {
	protected productCategory: HTMLElement;
	protected productTitle: HTMLElement;
	protected productImage: HTMLImageElement;
	protected productPrice: HTMLElement;

	constructor(protected blockName: string, container: HTMLElement, actions: ICardActions) {
		super(container);

	}

}