import {
	createElement,
	ensureElement,
	formatNumber,
} from '../../../utils/utils';
import { AView } from '../../base/AView';

export interface IBasketAction {
	onClick: (event: MouseEvent) => void;
}

interface IBasketView {
	items: HTMLElement[];
	total: number;
}

export class BasketView extends AView<IBasketView> {

	protected basketList: HTMLElement;
	protected basketTotal: HTMLElement;
	protected buttonBasket: HTMLButtonElement;

	constructor(container: HTMLElement, actions: IBasketAction) {
		super(container);

		this.basketList = ensureElement<HTMLElement>('.basket__list', this.container);
		this.basketTotal = ensureElement<HTMLElement>('.basket__price',this.container);
		this.buttonBasket = ensureElement<HTMLButtonElement>('.basket__button', this.container);

		this.buttonBasket.addEventListener('click', actions.onClick);

		this.setItems([])
		this.setTotal(0)
	}

	protected doRender(data: Partial<IBasketView>): void {
		if (data.items !== undefined) {
			this.setItems(data.items);
		}

		if (data.total !== undefined) {
			this.setTotal(data.total);
		}
	}

	private setItems(items: HTMLElement[]) {
		if(items.length) {
			this.basketList.replaceChildren(...items);
			this.setDisabled(this.buttonBasket, false);
		} else {
			this.basketList.replaceChildren(createElement<HTMLParagraphElement>('p', {
				textContent: 'Корзина пуста',
			}));

			this.setDisabled(this.buttonBasket, true);
		}
	}

	private setTotal(total: number) {
		if (total > 0) {
			this.setText(this.basketTotal, `${formatNumber(total)} синапсов`);
		} else {
			this.setText(this.basketTotal, '');
		}
	}
}