import { Component } from '../../base/Component';
import { ensureElement } from '../../../utils/utils';

export interface ICardActions {
	onClick: (event: MouseEvent) => void;
}

export interface ICard {
	productId: string;
	productCategory: string;
	productTitle: string;
	productImage: string;
	productPrice: number;
	productDescription?: string;
}

export abstract class Card<T extends ICard> extends Component<T> {
	protected category: HTMLElement;
	protected title: HTMLElement;
	protected image: HTMLImageElement;
	protected price: HTMLElement;
	protected description?: HTMLElement;
	protected button?: HTMLButtonElement;

	constructor(protected container: HTMLElement, actions?: ICardActions) {
		super(container);
		this.category = ensureElement<HTMLElement>('.card__category', container);
		this.title = ensureElement<HTMLElement>('.card__title', container);
		this.image = ensureElement<HTMLImageElement>('.card__image', container);
		this.price = ensureElement<HTMLElement>('.card__price', container);
		this.description = container.querySelector('.card__text');
		this.button = container.querySelector('.card__button');

		if (actions?.onClick) {
			if (this.button) {
				this.button.addEventListener('click', actions.onClick);
			} else {
				container.addEventListener('click', actions.onClick);
			}
		}
	}

	private set productId(value: string) {
		this.container.dataset.id = value;
	}

	get productId(): string {
		return this.container.dataset.id || '';
	}

	set productTitle(value: string) {
		this.setText(this.title, value);
	}

	get productTitle(): string {
		return this.title.textContent || '';
	}

	set productImage(value: string) {
		this.setImage(this.image, value, this.productTitle);
	}

	set productCategory(value: string) {
		this.setText(this.category, value);
	}

	set productPrice(price: number) {
		if (price === null) {
			this.setText(this.price, `Бесценно`);
		} else {
			this.setText(this.price, `${price} синапсов`);
		}
	}

	set productText(value: string) {
		this.setText(this.description, value);
	}
}