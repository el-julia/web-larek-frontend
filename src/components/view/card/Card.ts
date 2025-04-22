import { Component } from '../../base/Component';
import { ensureElement } from '../../../utils/utils';
import { ProductCategory } from '../../../types';

export interface ICardActions {
	onClick: (event: MouseEvent) => void;
}

export interface ICard {
	productId: string;
	productCategory: ProductCategory;
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
	protected description: HTMLElement | null;
	protected button: HTMLButtonElement | null;

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

	set productCategory(value: ProductCategory) {
		this.setText(this.category, value);
		this.toggleClass(this.category, this.getProductCategory(value), true);
	}

	private getProductCategory(
		value: 'софт-скил' | 'хард-скил' | 'дополнительное' | 'кнопка' | string
	) {
		let category: string;
		switch (value) {
			case 'хард-скил':
				category = '_hard';
				break;
			case 'софт-скил':
				category = '_soft';
				break;
			case 'кнопка':
				category = '_button';
				break;
			case 'дополнительное':
				category = '_additional';
				break;
			default:
				category = '_other';
		}

		return 'card__category' + category;
	}

	set productPrice(price: number) {
		if (price === null) {
			this.setText(this.price, `Бесценно`);
		} else {
			this.setText(this.price, `${price} синапсов`);
		}
	}

	set productText(value: string) {
		if (this.description) {
			this.setText(this.description, value);
		}
	}
}