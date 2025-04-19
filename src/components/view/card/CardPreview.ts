import { ICard, Card } from './Card';
import { Product } from '../../../types';


export interface ICardPreview extends ICard {
	basketProducts: Product[];
}

export class CardPreview extends Card<ICardPreview> {
	private priceless = false;

	set productPrice(price: number) {
		this.priceless = price === null;

		if (this.priceless) {
			this.setButtonState(true, 'Не продаётся');
		}

		super.productPrice = price;
	}

	set cartProducts(products: Product[]) {
		if (!this.priceless) {
			// если в товарах корзины найден наш, то помечаем кго как добавленный
			const addedToCart =
				products.find(
					(cartProduct) => cartProduct.id === this.container.dataset.id
				) !== undefined;

			if (addedToCart) {
				this.setButtonState(true, 'Уже в корзине');
			} else {
				this.setButtonState(false, 'В корзину');
			}
		}
	}

	private setButtonState(disabled: boolean, text: string) {
		this.setDisabled(this.button, disabled);
		this.button.textContent = text;
	}
}
