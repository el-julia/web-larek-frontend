import { Component } from '../../base/Component';
import { IEvents } from '../../base/Events';
import { createElement, ensureElement, formatNumber } from '../../../utils/utils';

export interface IBasketAction {
	onButtonBasketClick: (event: MouseEvent) => void;
}

interface IBasketView {
	items: HTMLElement[];
	total: number;
}

export class Basket extends Component<IBasketView> {

	protected basketList: HTMLElement;
	protected basketTotal: HTMLElement;
	protected buttonBasket: HTMLButtonElement;

	constructor(container: HTMLElement, actions: IBasketAction) {
		super(container);

		this.basketList = ensureElement<HTMLElement>('.basket__list', this.container);
		this.basketTotal = ensureElement<HTMLElement>('.basket__price',this.container);
		this.buttonBasket = ensureElement<HTMLButtonElement>('.basket__button', this.container);

		this.buttonBasket.addEventListener('click', actions.onButtonBasketClick);

		this.items = [];
		this.total = 0;
	}

	set items(items: HTMLElement[]) {
		if(items.length) {
			this.basketList.replaceChildren(...items);
			this.setDisabled(this.buttonBasket, false);
		} else {
			this.basketList.replaceChildren(createElement<HTMLParagraphElement>('p', {
				textContent: 'Корзина пуста'
			}));

			this.setDisabled(this.buttonBasket, true);
		}
	}

	set total(total: number) {
		if (total > 0) {
			this.setText(this.basketTotal, `${formatNumber(total)} синапсов`);
		} else {
			this.setText(this.basketTotal, '');
		}
	}


}