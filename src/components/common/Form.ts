import { Component } from '../base/Component';
import { IEvents } from '../base/Events';
import { ensureElement } from '../../utils/utils';

interface IformState {
	valid: boolean;
	errors: string[];
}

export class Form<T> extends Component<IformState> {
	protected formSubmit:HTMLButtonElement;
	protected formError:HTMLElement;

	constructor(protected container: HTMLFormElement, protected events: IEvents) {
		super(container);

		this.formSubmit = ensureElement<HTMLButtonElement>('button[type="submit"]', this.container);
		this.formError = ensureElement<HTMLElement>('.form__errors', this.container);

		this.container.addEventListener('input', (e: Event) => {
			const target = e.target as HTMLInputElement;
			const field = target.name as keyof T;
			const value = target.value;
			this.onInputChange(field, value);
		});

		this.container.addEventListener('submit', (e: Event) => {
			e.preventDefault();
			this.events.emit(`${this.container.name}: submit`);
		});
	}

	protected onInputChange(field: keyof T, value: string) {
		this.events.emit(`${this.container.name}.${String(field)}:change`, {
			field,
			value
		});
	}

	set valid(value: boolean) {
		this.formSubmit.disabled = !value;
	}

	set errors(value: string) {
		this.setText(this.formError, value);
	}

	render(state: Partial<T> & IformState) {
		const {valid, errors, ...inputs} = state;
		super.render({valid, errors});
		Object.assign(this, inputs);
		return this.container;
	}
}