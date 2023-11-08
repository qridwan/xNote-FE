/* eslint-disable no-unsafe-optional-chaining */
import { Box, NativeSelect, Text } from '@mantine/core';

import { Group } from '@mantine/core';
import { YearPicker } from '@mantine/dates';
import { useGenreListQuery } from '../../redux/features/books/bookApi';

export default function Filters({ yearValue, setYearValue, setGenreValue }: any) {

	const { data, isLoading } = useGenreListQuery({})

	return (
		<Box p={20}>
			<NativeSelect
				mt={10}
				data={isLoading ? [''] : ['', ...data?.data]}
				label="Filter by genre"
				// description="Filter by genre"
				withAsterisk
				onChange={(e) => setGenreValue(e.target.value)}
			/>
			<Group mt={20} >
				<Text fz='xs'>Filter By Publication Year</Text>
				<YearPicker allowDeselect mt={-10} maxDate={new Date()} size='xs' value={yearValue} onChange={setYearValue} />
			</Group>
		</Box>

	);
}