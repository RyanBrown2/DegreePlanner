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

	setType(type: string): CoursesRequirement {
		this.type = type;
		return this;
	}

	addReq(req: CoursesRequirement): CoursesRequirement {
		this.reqs.push(req);
		return this;
	}

	addCourse(course: string): CoursesRequirement {
		this.courses.push(course);
		return this;
	}

	setExtra(extra: string): CoursesRequirement {
		this.extra = extra;
		return this;
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

	// this is used to check if a course has zero prereqs
	static isEmpty(prereq: CoursesRequirement): boolean {
		return JSON.stringify(prereq) === '{"type":"all","reqs":[],"courses":[],"extra":"none"}';

	}
}

export enum ReqType {
	All = "all",
	Any = "or",
	None = "none"
}