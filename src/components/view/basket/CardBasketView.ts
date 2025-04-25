import { ensureElement, formatNumber } from '../../../utils/utils';
import { AView } from '../../base/AView';

export interface ICardBasketActions {
	onCardButtonDeleteClick: (event: MouseEvent) => void;
}

export interface ICardBasket {
	index: number;
	title: string;
	price: number;
}

export class CardBasketView extends AView<ICardBasket> {
	protected basketIndex: HTMLElement;
	protected cardTitle: HTMLElement;
	protected cardPrice: HTMLElement;
	protected cardButtonDelete: HTMLButtonElement;

	constructor(container: HTMLElement, actions: ICardBasketActions) {
		super(container);

		this.basketIndex = ensureElement<HTMLElement>(
			'.basket__item-index',
			this.container,
		);
		this.cardTitle = ensureElement<HTMLElement>('.card__title', this.container);
		this.cardPrice = ensureElement<HTMLElement>('.card__price', this.container);
		this.cardButtonDelete = ensureElement<HTMLButtonElement>(
			'.basket__item-delete',
			this.container,
		);

		this.cardButtonDelete.addEventListener(
			'click',
			actions.onCardButtonDeleteClick,
		);
	}

	protected doRender(data: Partial<ICardBasket>): void {
		if (data.index !== undefined) {
			this.setText(this.basketIndex, formatNumber(data.index));
		}

		if (data.price !== undefined) {
			this.setText(this.cardPrice, formatNumber(data.price));
		}

		if (data.title !== undefined) {
			this.setText(this.cardTitle, data.title);
		}
	}
}