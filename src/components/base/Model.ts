import { IEvents } from './Events';

/**
 * Базовый класс модели он содержит вспомогательный метод для отправки событий,
 * как правило при изменении модели
 */
export abstract class Model {
	constructor(private events: IEvents) {}

	protected emitChanges(event: string, payload?: object) {
		this.events.emit(event, payload ?? {});
	}
}
