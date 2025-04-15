import { Component } from './base/Component';
import { ensureElement } from '../utils/utils';

interface Page {
	ProductsList: HTMLElement[];
}

export class PageView extends Component<Page> {
	protected ProductsContainer: HTMLElement;

	constructor(container: HTMLElement) {
		super(container);
		this.ProductsContainer = ensureElement('.gallery', this.container);
	}

	set ProductsList(items: HTMLElement[]) {
		this.ProductsContainer.replaceChildren(...items);
	}

}