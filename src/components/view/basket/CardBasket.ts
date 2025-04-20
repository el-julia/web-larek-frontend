import { Component } from '../../base/Component';
import { ensureElement, formatNumber } from '../../../utils/utils';

export interface ICardBasketActions {
	onCardButtonDeleteClick: (event: MouseEvent) => void;
}

export interface ICardBasket {
	index: number;
	title: string;
	price: number;
}

export class CardBasket extends Component<ICardBasket> {
	protected basketIndex: HTMLElement;
	protected cardTitle: HTMLElement;
	protected cardPrice: HTMLElement;
	protected cardButtonDelete: HTMLButtonElement;

	constructor(container: HTMLElement, actions: ICardBasketActions) {
		super(container);

		this.basketIndex = ensureElement<HTMLElement>(
			'.basket__item-index',
			this.container
		);
		this.cardTitle = ensureElement<HTMLElement>('.card__title', this.container);
		this.cardPrice = ensureElement<HTMLElement>('.card__price', this.container);
		this.cardButtonDelete = ensureElement<HTMLButtonElement>(
			'.basket__item-delete',
			this.container
		);

		this.cardButtonDelete.addEventListener(
			'click',
			actions.onCardButtonDeleteClick
		);
	}

	set index(value: number) {
		this.setText(this.basketIndex, formatNumber(value));
	}

	set title(value: string) {
		this.setText(this.cardTitle, value);
	}

	set price(value: number) {
		this.setText(this.cardPrice, formatNumber(value));
	}
}