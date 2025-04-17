import instance from '@/libs/axios/instance';
import endpoint from './endpoint.constant';
import { IAssignments } from '@/types/Assignment';

const assignmentService = {
	getAssignments: (params?: string) =>
		instance.get(`${endpoint.ASSIGNMENT}?${params}`),
	getAssignmentsStudents: (params?: string) =>
		instance.get(`${endpoint.ASSIGNMENT}/students?${params}`),
	getAssignment: (id: string) => instance.get(`${endpoint.ASSIGNMENT}/${id}`),
	submitAssignment: (payload: any) =>
		instance.post(`${endpoint.ASSIGNMENT}`, payload),
};

export default assignmentService;
