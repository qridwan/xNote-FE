import { Box, NativeSelect, Text, Group } from '@mantine/core';
import { YearPicker } from '@mantine/dates';

export default function Filters({ yearValue, setYearValue, setGenreValue }: any) {

	return (
		<Box p={20}>
			<NativeSelect
				mt={10}
				data={[{ label: 'genre1', value: '1' }]}
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