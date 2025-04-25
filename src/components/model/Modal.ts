import { AModel } from '../base/AModel';
import { ModalEvents } from '../events/ModalEvents';


export class Modal extends AModel {
	open(): void {
		this.emitChanges(ModalEvents.OPEN);
	}

	close(): void {
		this.emitChanges(ModalEvents.CLOSE);
	}
}