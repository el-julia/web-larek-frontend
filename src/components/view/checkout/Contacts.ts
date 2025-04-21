import { ensureElement } from '../../../utils/utils';
import { Component } from '../../base/Component';

export interface IContactActions {
	onEmailInput: (event: Event) => void;
	onPhoneInput: (event: Event) => void;
	onToPayButtonClick: (event: MouseEvent) => void;
}

export interface IContact {
	valid: boolean;
	email: string;
	phone: string;
}

export class Contacts extends Component<IContact> {
	protected emailInput: HTMLInputElement;
	protected phoneInput: HTMLInputElement;
	protected toPayButton: HTMLButtonElement;
	protected errorsContacts: HTMLElement;

	constructor(container: HTMLFormElement, actions: IContactActions) {
		super(container);

		this.emailInput = ensureElement<HTMLInputElement>('input[name=email]', this.container);
		this.phoneInput = ensureElement<HTMLInputElement>('input[name=phone]', this.container);
		this.toPayButton = ensureElement<HTMLButtonElement>('button[type=submit]', this.container);
		this.errorsContacts = ensureElement<HTMLElement>('.form__errors', this.container);

		this.emailInput.addEventListener('input', actions.onEmailInput);
		this.phoneInput.addEventListener('input', actions.onPhoneInput);
		this.toPayButton.addEventListener('click', actions.onToPayButtonClick);
	}

	set email(email: string) {
		this.emailInput.value = email;
	}

	set phone(phone: string) {
		this.phoneInput.value = phone;
	}

	set valid(valid: boolean) {
		this.setDisabled(this.toPayButton, !valid);
	}

	set error(value: string) {
		this.errorsContacts.textContent = value;
	}


}