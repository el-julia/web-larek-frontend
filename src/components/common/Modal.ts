import { Component } from '../base/Component';
import { IEvents } from '../base/Events';
import { ensureElement } from '../../utils/utils';

interface IModalData {
	content: HTMLElement;
}

export class Modal extends Component<IModalData>{
	protected closeButton: HTMLButtonElement;
	protected modalContent: HTMLElement;

	constructor(container: HTMLElement, protected events: IEvents) {
		super(container);

		this.closeButton = ensureElement<HTMLButtonElement>('.modal__close', container);
		this.modalContent = ensureElement<HTMLElement>('.modal__content', container);

		this.closeButton.addEventListener('click', this.close.bind(this));
		this.container.addEventListener('click', this.close.bind(this));
		this.modalContent.addEventListener('click', (event) => event.stopPropagation());
	}

	set content(value: HTMLElement) {
		this.modalContent.replaceChildren(value);
	}

	open(): void  {
		this.container.classList.add('modal_active');
		this.events.emit('modal:open');
	}

	close(): void {
		this.container.classList.remove('modal_active');
		this.content = null;
		this.events.emit('modal:close');
	}

	render(data: IModalData): HTMLElement {
		super.render(data);
		this.open();
		return this.container;
	}
}