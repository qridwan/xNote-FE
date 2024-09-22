import { TextInput, TextInputProps } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { useAppSelector } from '../../redux/hook';

export function SearchArea(props: TextInputProps) {
	const { settings: { sidebar } } = useAppSelector(state => state.note);

	return (
		<TextInput
			icon={<IconSearch size="1rem" stroke={1.5} />}
			radius="md"
			size="sm"
			placeholder="Search note"
			rightSectionWidth={sidebar == "short" ? 10 : 42}
			{...props}
		/>
	);
}