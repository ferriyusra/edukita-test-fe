import instance from '@/libs/axios/instance';
import endpoint from './endpoint.constant';

const gradeService = {
	submitGrade: (payload: any) => instance.post(`${endpoint.GRADE}`, payload),
};

export default gradeService;
