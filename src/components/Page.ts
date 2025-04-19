import { Component } from './base/Component';
import { ensureElement } from '../utils/utils';
import { IEvents } from './base/Events';

interface IPage {
	counter: number;
	catalog: HTMLElement[];
}

export class Page extends Component<IPage> {
	protected wrapper: HTMLElement;
	protected counterElement: HTMLElement;
	protected catalogElement: HTMLElement;
	protected basket: HTMLElement;

	constructor(container: HTMLElement, protected events: IEvents ) {
		super(container);
		this.wrapper = ensureElement<HTMLElement>('.page__wrapper');
		this.counterElement = ensureElement<HTMLElement>('.header__basket-counter');
		this.catalogElement = ensureElement<HTMLElement>('.gallery');
		this.basket = ensureElement<HTMLElement>('.header__basket');
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