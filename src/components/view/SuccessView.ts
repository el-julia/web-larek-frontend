import { ensureElement, formatNumber } from '../../utils/utils';
import { AView } from '../base/AView';

export interface ISuccessAction {
	onSuccessButtonClick: (event: MouseEvent) => void;
}

export interface ISuccess {
	total: number;
}

export class SuccessView extends AView<ISuccess> {
	protected description: HTMLElement;
	protected button: HTMLButtonElement;

	constructor(container: HTMLElement, actions: ISuccessAction ) {
		super(container);

		this.description = ensureElement<HTMLElement>('.order-success__description', this.container);
		this.button = ensureElement<HTMLButtonElement>('.order-success__close', this.container);

		this.button.addEventListener('click', actions.onSuccessButtonClick);

		this.setTotal(0);
	}

	protected doRender(data: Partial<ISuccess>): void {
		if (data.total !== undefined) {
			this.setTotal(data.total);
		}
	}

	private setTotal(total: number) {
		if (total > 0) {
			this.setText(this.description, `Списано ${formatNumber(total)} синапсов`);
		} else {
			this.setText(this.description, '');
		}
	}
}