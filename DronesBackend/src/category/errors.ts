export class DuplicateError extends Error {
	public readonly httpCode: number = 409;
	public readonly name: string = "DuplicateError";

	constructor(message: string = "Same object was created") {
		super(message);

		Object.setPrototypeOf(this, DuplicateError.prototype);
	}
}
