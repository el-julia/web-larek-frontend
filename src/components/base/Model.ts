import { IEvents } from './Events';

/**
 * Базовый класс модели он содержит вспомогательный метод для отправки событий,
 * как правило при изменении модели
 */
export abstract class Model<ChangeEventData extends object> {
	constructor(private events: IEvents, private changeEvent: string) {}

	protected emitChanges(event: string, payload?: object) {
		this.events.emit(event, payload ?? {});
	}

	protected changed(payload: ChangeEventData) {
		this.emitChanges(this.changeEvent, payload);
	}

	subscribe(onChange: (data: ChangeEventData) => void) {
		this.events.on(this.changeEvent, onChange);
	}
}
