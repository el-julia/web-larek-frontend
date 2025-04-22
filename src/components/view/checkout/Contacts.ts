import { ensureElement } from '../../../utils/utils';
import { AView } from '../../base/AView';

export interface IContactActions {
	onEmailInput: (event: Event) => void;
	onPhoneInput: (event: Event) => void;
	onToPayButtonClick: (event: MouseEvent) => void;
}

export interface IContact {
	valid: boolean;
	email: string;
	phone: string;
	error: string;
}

export class Contacts extends AView<IContact> {
	protected emailInput: HTMLInputElement;
	protected phoneInput: HTMLInputElement;
	protected toPayButton: HTMLButtonElement;
	protected errors: HTMLElement;

	constructor(container: HTMLFormElement, actions: IContactActions) {
		super(container);

		this.emailInput = ensureElement<HTMLInputElement>(
			'input[name=email]',
			this.container
		);
		this.phoneInput = ensureElement<HTMLInputElement>(
			'input[name=phone]',
			this.container
		);
		this.toPayButton = ensureElement<HTMLButtonElement>(
			'button[type=submit]',
			this.container
		);
		this.errors = ensureElement<HTMLElement>(
			'.form__errors',
			this.container
		);

		this.emailInput.addEventListener('input', actions.onEmailInput);
		this.phoneInput.addEventListener('input', actions.onPhoneInput);
		this.toPayButton.addEventListener('click', actions.onToPayButtonClick);
	}

	protected doRender(data: Partial<IContact>): void {
		if (data.valid !== undefined) {
			this.setDisabled(this.toPayButton, !data.valid);
		}

		if (data.email !== undefined) {
			this.emailInput.value = data.email;
		}

		if (data.phone !== undefined) {
			this.phoneInput.value = data.phone;
		}

		if (data.error !== undefined) {
			this.errors.textContent = data.error;
		}
	}
}