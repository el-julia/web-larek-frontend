import { Component } from '../base/Component';
import { ensureElement } from '../../utils/utils';

interface IPage {
	counter: number;
	catalog: HTMLElement[];
}

export interface IPageActions {
	onBasketClick: (event: MouseEvent) => void;
}

export class Page extends Component<IPage> {
	protected wrapper: HTMLElement;
	protected counterElement: HTMLElement;
	protected catalogElement: HTMLElement;
	protected basket: HTMLElement;

	constructor(
		container: HTMLElement,
		actions: IPageActions,
	) {
		super(container);
		this.wrapper = ensureElement<HTMLElement>('.page__wrapper');
		this.counterElement = ensureElement<HTMLElement>('.header__basket-counter');
		this.catalogElement = ensureElement<HTMLElement>('.gallery');
		this.basket = ensureElement<HTMLElement>('.header__basket');

		this.basket.addEventListener('click', actions.onBasketClick);
	}

	set counter(value: number) {
		this.setText(this.counterElement, String(value));
	}

	set catalog(items: HTMLElement[]) {
		this.catalogElement.replaceChildren(...items);
	}

	set locked(value: boolean) {
		if (value) {
			this.wrapper.classList.add('page__wrapper_locked');
		} else {
			this.wrapper.classList.remove('page__wrapper_locked');
		}
	}
}
