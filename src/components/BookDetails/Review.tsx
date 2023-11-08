import { createStyles, Text, Avatar, Group, rem, Card } from '@mantine/core';

import { formateDate } from '../../helpers/dates';

const useStyles = createStyles((theme) => ({
	body: {
		paddingLeft: rem(54),
		paddingTop: theme.spacing.sm,
	},
}));




const Review = ({ createdAt, review, author }: any) => {
	const { classes } = useStyles();
	return (
		<Card shadow="xs" my={10}>
			<Group mb={-10}>
				<Avatar radius="xl" >
					{author?.slice(0, 2)}
				</Avatar>
				<div>
					<Text size="xs" >{author}</Text>
					<Text size="xs" >
						{formateDate(createdAt as string)}
					</Text>
				</div>
			</Group>
			<Text className={classes.body} color="dimmed" size="xs">
				{review}
			</Text>
		</Card>
	);
};

export default Review;