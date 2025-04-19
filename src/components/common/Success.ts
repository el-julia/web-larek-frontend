import { Component } from '../base/Component';
import { ensureElement } from '../../utils/utils';

interface ISuccess {
	total: number;
}

interface ISuccessActions {
	onClick: () => void;
}

export class Success extends Component<ISuccess> {
	protected successClose: HTMLElement;

	constructor(container: HTMLElement, actions: ISuccessActions) {
		super(container);

		this.successClose = ensureElement<HTMLElement>('.order-success__close', this.container);

		if (actions?.onClick) {
			this.successClose.addEventListener('click', actions.onClick);
		}
	}
}