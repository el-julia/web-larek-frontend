import { CardView, ICard } from './CardView';

export interface ICardPreview extends ICard {
	isInBasket: boolean;
}

export class CardPreviewView extends CardView<ICardPreview> {
	protected doRender(data: Partial<ICardPreview>) {
		super.doRender(data);

		if (data.price === null) {
			this.setButtonState(false, 'Не продаётся');
		} else {
			// если в товарах корзины найден товар карточки, тогда
			// отключаем кнопку добавления и меняем текст
			if (data.isInBasket) {
				this.setButtonState(false, 'Уже в корзине');
			} else {
				this.setButtonState(true, 'В корзину');
			}
		}
	}

	private setButtonState(enabled: boolean, text: string) {
		if (this.button) {
			this.setDisabled(this.button, !enabled);
			this.button.textContent = text;
		}
	}
}
