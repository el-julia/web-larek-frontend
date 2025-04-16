import { Component } from '../base/Component';
import { IEvents } from '../base/Events';
import { ensureElement } from '../../utils/utils';

interface IModalData {
	content: HTMLElement;
}

export class Modal extends Component<IModalData>{
	protected closeButton: HTMLButtonElement;
	protected modelContent: HTMLElement;

	constructor(container: HTMLElement, protected events: IEvents) {
		super(container);

		this.closeButton = ensureElement<HTMLButtonElement>('.modal__close', container);
		this.modelContent = ensureElement<HTMLElement>('.modal__content', container);

		this.closeButton.addEventListener('click', this.close.bind(this));
		this.container.addEventListener('click', this.close.bind(this));
		this.modelContent.addEventListener('click', (event) => event.stopPropagation());
	}

	set Content(value: HTMLElement) {
		this.modelContent.replaceChildren(value);
	}

	open(): void  {
		this.container.classList.add('modal__active');
		this.events.emit('modal:open');
	}

	close(): void {
		this.container.classList.remove('modal__active');
		this.modelContent = null;
		this.events.emit('modal:close');
	}

	render(data: IModalData): HTMLElement {
		super.render(data);
		this.open();
		return this.container;
	}
}