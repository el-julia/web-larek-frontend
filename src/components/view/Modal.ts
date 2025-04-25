import { ensureElement } from '../../utils/utils';
import { AView } from '../base/AView';

export interface IModalActions {
	onClose: () => void;
}

interface IModalData {
	content: HTMLElement;
}

export class Modal extends AView<IModalData> {
	protected closeButton: HTMLButtonElement;
	protected content: HTMLElement;

	constructor(container: HTMLElement, actions: IModalActions) {
		super(container);

		this.closeButton = ensureElement<HTMLButtonElement>(
			'.modal__close',
			container
		);
		this.content = ensureElement<HTMLElement>('.modal__content', container);

		this.closeButton.addEventListener('click', this.close.bind(this));
		this.container.addEventListener('click', this.close.bind(this));
		this.content.addEventListener('click', (event) => event.stopPropagation());
	}

	protected doRender(data: Partial<IModalData>): void {
		if (data.content !== undefined) {
			this.setContent(data.content);
		}
	}

	private setContent(value: HTMLElement | null) {
		if (value) {
			this.content.replaceChildren(value);
		} else {
			this.content.replaceChildren();
		}
	}

	open(): void {
		this.container.classList.add('modal_active');
	}

	close(): void {
		this.container.classList.remove('modal_active');
		this.setContent(null);
	}
}
