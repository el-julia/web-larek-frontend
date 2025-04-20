import { Component } from '../../base/Component';
import { IEvents } from '../../base/Events';
import { createElement, ensureElement, formatNumber } from '../../../utils/utils';

interface IBasketView {
	items: HTMLElement[];
	total: number;
}

export class Basket extends Component<IBasketView> {

	protected basketList: HTMLElement;
	protected basketTotal: HTMLElement;
	protected buttonBasket: HTMLButtonElement;

	constructor(container: HTMLElement, events: IEvents) {
		super(container);

		this.basketList = ensureElement<HTMLElement>('.basket__list', this.container);
		this.basketTotal = this.container.querySelector('.basket__price');
		this.buttonBasket = this.container.querySelector('.basket__button');

		if (this.buttonBasket) {
			this.buttonBasket.addEventListener('click', () => {
				events.emit('order:open');
			})
		}
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