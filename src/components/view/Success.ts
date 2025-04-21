import { Component } from '../base/Component';
import { ensureElement, formatNumber } from '../../utils/utils';

export interface ISuccessAction {
	onSuccessButtonClick: (event: MouseEvent) => void;
}

export interface ISuccess {
	total: number;
}

export class Success extends Component<ISuccess> {
	protected totalSuccess: HTMLElement;
	protected buttonSuccess: HTMLButtonElement;

	constructor(container: HTMLElement, actions: ISuccessAction ) {
		super(container);

		this.totalSuccess = ensureElement<HTMLElement>('.order-success__description', this.container);
		this.buttonSuccess = ensureElement<HTMLButtonElement>('.order-success__close', this.container);

		this.buttonSuccess.addEventListener('click', actions.onSuccessButtonClick);

		this.total = 0;
	}

	set total(total: number) {
		if (total > 0) {
			this.setText(this.totalSuccess, `Списано ${formatNumber(total)} синапсов`);
		} else {
			this.setText(this.totalSuccess, '');
		}
	}

}