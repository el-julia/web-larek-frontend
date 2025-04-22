export abstract class AView<RenderData extends object> {
	private data: Partial<RenderData> = {};

	protected constructor(protected readonly container: HTMLElement) {}

	// Инструментарий для работы с DOM в дочерних компонентах

	// Переключить класс
	toggleClass(element: HTMLElement, className: string, force?: boolean) {
		element.classList.toggle(className, force);
	}

	// Установить текстовое содержимое
	protected setText(element: HTMLElement, value: unknown) {
		if (element) {
			element.textContent = String(value);
		}
	}

	// Сменить статус блокировки
	setDisabled(element: HTMLElement, state: boolean) {
		if (element) {
			if (state) element.setAttribute('disabled', 'disabled');
			else element.removeAttribute('disabled');
		}
	}

	// Установить изображение с альтернативным текстом
	protected setImage(element: HTMLImageElement, src: string, alt?: string) {
		if (element) {
			element.src = src;
			if (alt) {
				element.alt = alt;
			}
		}
	}

	/**
	 * Метод, который объединяет новые данные со старыми и вызывает doRender,
	 * чтобы он отрисовал все элементы
	 */
	render(data: Partial<RenderData>): HTMLElement {
		Object.assign(this.data, data);
		this.doRender(this.data);
		return this.container;
	}

	/**
	 * Метод, который занимается рендерингом, специфичным для конкретного представления
	 */
	protected abstract doRender(data: Partial<RenderData>): void;
}
