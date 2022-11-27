import { Deserializable } from "./deserializable.model";

/*
	req types
	all: all the entries in the array must be met
	or: at least one entry in the array must be met
*/

// Represents a requirement that can be met through different combinations of courses
export class CoursesRequirement implements Deserializable {

	public type: string = '';
	public reqs: CoursesRequirement[] = [];
	public courses: string[] = [];
	public extra: string = '';

	setType(type: string) {
		this.type = type;
	}

	addReq(req: CoursesRequirement) {
		this.reqs.push(req);
	}

	addCourse(course: string) {
		this.courses.push(course);
	}

	setExtra(extra: string) {
		this.extra = extra;
	}

	// when this function gets called by
	deserialize(input: any): this {
		if (typeof input === 'string') {
			console.warn('Trying to deserialize a course requirement with a string, should be a json array');
		}
		Object.assign(this, input);
		
		this.reqs = input.reqs.map((req: any) => new CoursesRequirement().deserialize(req));

		return this;
	}
}

export enum ReqType {
	All = "all",
	Any = "or",
	None = "none"
}