import { Component } from './base/Component';
import { ensureElement } from '../utils/utils';
import { Product } from '../types';

export class ProductCard extends Component<Product> {
	protected productCategory: HTMLElement;
	protected productTitle: HTMLElement;
	protected productImage: HTMLImageElement;
	protected productPrice: HTMLElement;

	constructor(container: HTMLElement) {
		super(container);
		this.productCategory = ensureElement('.card__category', this.container);
		this.productTitle = ensureElement('.card__title', this.container);
		this.productImage = ensureElement('.card__image', this.container) as HTMLImageElement;
		this.productPrice = ensureElement('.card__price', this.container);
	}

	set category(value:string) {
		this.setText(this.productCategory, value);
	}

	set title(value: string) {
		this.setText(this.productTitle, value);
	}

	set image(value: string) {
		this.setImage(this.productImage, value);
	}

	set price(value: number) {
		this.setText(this.productPrice, value);
	}

}
