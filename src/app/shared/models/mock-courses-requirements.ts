import { CoursesRequirement } from "./course-requirement.model";

// MA336
const ma336 = new CoursesRequirement();

// MA336 sub req
const ma336SubReq = new CoursesRequirement();
ma336SubReq.setType('and');
ma336SubReq.addCourse('ma221');
ma336SubReq.addCourse('ma212');

ma336.setType('or');
ma336.addReq(ma336SubReq);

// MA438
const ma438 = new CoursesRequirement();

// MA438 sub 1 req
const ma438Sub1Req = new CoursesRequirement();
ma438Sub1Req.setType('all');
ma438Sub1Req.addCourse('ma211');
ma438Sub1Req.addCourse('ma212');

// MA438 sub 2 req
const ma438Sub2Req = new CoursesRequirement();
ma438Sub2Req.setType('or');
ma438Sub2Req.addCourse('ma222');
ma438Sub2Req.addReq(ma438Sub1Req);

// MA438 
ma438.setType('all');
ma438.addReq(ma438Sub2Req);
ma438.setExtra('senior standing');

export const MOCK_COURSES_REQS = {
	ma336: ma336,
	ma438: ma438
}