import { Skeleton } from '@mantine/core';

const NoteDetailsSkeleton = () => {
	return (
		<div>
			<>
				<Skeleton height={"10vh"} mt={6} width="100%" radius="md" />
				<Skeleton height={"60vh"} mt={6} width="100%" radius="md" />
			</>
		</div>
	);
};

export default NoteDetailsSkeleton;