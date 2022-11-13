import { Observable, of } from "rxjs";
import { CoursesRequirement } from "src/app/shared/models/course-requirement.model";
import { Course } from "src/app/shared/models/course.model";

const MOCK_COURSES: Course[] = [];

// MA336
const ma336 = new Course();
ma336.id = 'ma336';
ma336.subject='ma';
ma336.number='336';
ma336.title = 'BOUNDARY VALUE PROBLEMS';
ma336.description = 'Introduction to boundary value problems and partial differential equations. Emphasis on boundary values problems that arise from the wave equation, diffusion equation, and Laplace’s equation in one, two and three dimensions. Solutions to such boundary value problems will be discussed using Fourier series, numerical techniques, and integral transforms.';

const ma336Req = new CoursesRequirement();

// MA336 sub req
const ma336SubReq = new CoursesRequirement();
ma336SubReq.setType('and');
ma336SubReq.addCourse('ma221');
ma336SubReq.addCourse('ma212');

ma336Req.setType('or');
ma336Req.addReq(ma336SubReq);

ma336.prereqs = ma336Req;
ma336.prereqsText='MA 222 or both MA 211 and MA 212';
ma336.searchText = 'MA 336 - Boundary Value Problems';

MOCK_COURSES.push(ma336);

// MA438
const ma438 = new Course();
ma438.id='ma438';
ma438.subject='ma';
ma438.number='438';
ma438.title='ADVANCED ENGINEERING MATHEMATICS';
ma438.description='A fast-paced course in advanced applied mathematics for engineering and physics students that combines aspects of MA330, MA336, and MA373. Applied linear algebra, including abstract vector spaces, linear operators, eigentheory, diagonalization, and the matrix exponential; review of partial differentiation and multiple integration, including Lagrange multipliers and other optimization topics; vector analysis, including the Jacobian matrix and the del operator in standard coordinate systems; and Fourier series with application to the solution of partial differential equation boundary value problems. Students who receive credit for MA438 may only receive credit for at most one of MA330, MA336, MA371, and MA373.';

const ma438Req = new CoursesRequirement();

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
ma438Req.setType('all');
ma438Req.addReq(ma438Sub2Req);
ma438Req.setExtra('senior standing');

ma438.prereqs = ma438Req;
ma438.prereqsText = 'MA 222 or both MA 211 and MA 212 and senior standing';
ma438.searchText='MA 438 - ADVANCED ENGINEERING MATHEMATICS';

MOCK_COURSES.push(ma438);

function GetMockCourses(): Observable<Course[]> {
	return of(MOCK_COURSES);
}

export { GetMockCourses };