import { ensureElement } from '../../../utils/utils';
import { ProductCategory } from '../../../types';
import { AView } from '../../base/AView';

export interface ICardActions {
	onClick: (event: MouseEvent) => void;
}

export interface ICard {
	id: string;
	category: ProductCategory;
	title: string;
	image: string;
	price: number | null;
	description: string;
}

export abstract class Card<RenderData extends ICard> extends AView<RenderData> {
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

	protected doRender(data: Partial<RenderData>) {
		if (data.title !== undefined) {
			this.setText(this.title, data.title);
		}

		if (data.image !== undefined) {
			this.setImage(this.image, data.image, data.title);
		}

		if (data.category !== undefined) {
			this.setProductCategory(data.category);
		}

		if (data.price !== undefined) {
			this.setProductPrice(data.price);
		}

		if (data.description !== undefined) {
			this.setProductDescription(data.description);
		}
	}

	private setProductCategory(value: ProductCategory) {
		this.setText(this.category, value);
		this.toggleClass(this.category, this.getProductCategoryClass(value), true);
	}

	private getProductCategoryClass(
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

	private setProductPrice(price: number | null) {
		if (price === null) {
			this.setText(this.price, `Бесценно`);
		} else {
			this.setText(this.price, `${price} синапсов`);
		}
	}

	private setProductDescription(value: string) {
		if (this.description) {
			this.setText(this.description, value);
		}
	}
}
