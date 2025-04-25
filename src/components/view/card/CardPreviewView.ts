import { CardView, ICard } from './CardView';
import { Product } from '../../../types';

export interface ICardPreview extends ICard {
	basketProducts: Product[];
}

export class CardPreviewView extends CardView<ICardPreview> {
	protected doRender(data: Partial<ICardPreview>) {
		super.doRender(data);

		if (data.price === null) {
			this.setButtonState(false, 'Не продаётся');
		} else {
			// если в товарах корзины найден товар карточки, тогда
			// отключаем кнопку добавления и меняем текст
			if (this.isAddedToCart(data)) {
				this.setButtonState(false, 'Уже в корзине');
			} else {
				this.setButtonState(true, 'В корзину');
			}
		}
	}

	private isAddedToCart(data: Partial<ICardPreview>) {
		if (data.basketProducts !== undefined && data.id !== undefined) {
			// проверяем что какой-то из товаров в корзине совпадает с нашим по id
			return (
				data.basketProducts.find(
					(cartProduct) => cartProduct.id === data.id
				) !== undefined
			);
		}

		return false;
	}

	private setButtonState(enabled: boolean, text: string) {
		if (this.button) {
			this.setDisabled(this.button, !enabled);
			this.button.textContent = text;
		}
	}
}
