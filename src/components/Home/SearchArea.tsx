import { TextInput, TextInputProps } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';

export function SearchArea(props: TextInputProps) {


	return (
		<TextInput
			icon={<IconSearch size="1.1rem" stroke={1.5} />}
			radius="xl"
			size="md"
			placeholder="Search by note title or content"
			rightSectionWidth={42}
			{...props}
		/>
	);
}