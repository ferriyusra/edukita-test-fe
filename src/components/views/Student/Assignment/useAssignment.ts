import useChangeUrl from '@/hooks/useChangeUrl';
import assignmentService from '@/services/assignment.service';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useState } from 'react';

const useAssignment = () => {
	const [selectedId, setSelectedId] = useState<string>('');
	const router = useRouter();
	const { currentPerPage, currentPage, currentSearch, currentSubject } =
		useChangeUrl();

	const getAssignments = async () => {
		let params = `page=${currentPage}&perPage=${currentPerPage}`;

		if (currentSearch) {
			params += `&title[like]=${currentSearch}`;
		}

		if (currentSubject) {
			params += `&subject=${currentSubject}`;
		}

		const res = await assignmentService.getAssignmentsStudents(params);

		const { data } = res;

		return data;
	};

	const {
		data: dataAssignments,
		isLoading: isLoadingAssignments,
		isRefetching: isRefetchingAssignments,
		refetch: refetchAssignments,
	} = useQuery({
		queryKey: [
			'AssignmentsStudents',
			currentPage,
			currentPerPage,
			currentSearch,
		],
		queryFn: () => getAssignments(),
		enabled: router.isReady && !!currentPage && !!currentPerPage,
	});

	return {
		dataAssignments,
		isRefetchingAssignments,
		isLoadingAssignments,
		refetchAssignments,
		selectedId,
		setSelectedId,
	};
};

export default useAssignment;
