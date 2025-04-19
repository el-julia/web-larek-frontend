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
	protected buttonBasket: HTMLElement;

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
	}

	set items(items: HTMLElement[]) {
		if(items.length) {
			this.basketList.replaceChildren(...items);
		} else {
			this.basketList.replaceChildren(createElement<HTMLParagraphElement>('p', {
				textContent: 'Корзина пуста'
			}));
		}
	}

	set total(total: number) {
		this.setText(this.basketTotal, formatNumber(total));
	}

}