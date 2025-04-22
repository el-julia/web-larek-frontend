import { ensureElement } from '../../utils/utils';
import { AView } from '../base/AView';

interface IPage {
	counter: number;
	catalog: HTMLElement[];
	locked: boolean;
}

export interface IPageActions {
	onBasketClick: (event: MouseEvent) => void;
}

export class Page extends AView<IPage> {
	protected wrapper: HTMLElement;
	protected counter: HTMLElement;
	protected catalog: HTMLElement;
	protected basket: HTMLElement;

	constructor(container: HTMLElement, actions: IPageActions) {
		super(container);
		this.wrapper = ensureElement<HTMLElement>('.page__wrapper');
		this.counter = ensureElement<HTMLElement>('.header__basket-counter');
		this.catalog = ensureElement<HTMLElement>('.gallery');
		this.basket = ensureElement<HTMLElement>('.header__basket');

		this.basket.addEventListener('click', actions.onBasketClick);
	}

	protected doRender(data: Partial<IPage>): void {
		if (data.counter !== undefined) {
			this.setText(this.counter, String(data.counter));
		}

		if (data.catalog !== undefined) {
			this.catalog.replaceChildren(...data.catalog);
		}

		if (data.locked !== undefined) {
			this.setLocked(data.locked);
		}
	}

	private setLocked(value: boolean) {
		if (value) {
			this.wrapper.classList.add('page__wrapper_locked');
		} else {
			this.wrapper.classList.remove('page__wrapper_locked');
		}
	}
}
