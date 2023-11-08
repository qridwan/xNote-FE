import { Code, Flex, Text } from '@mantine/core';
import BrandLogoPNG from '../assets/images/xnote.png';
import { Link } from 'react-router-dom'


export function BrandLogo() {
	return (
		<div>
			<Link to="/" style={{ textDecoration: 'none', color: 'grey' }}>

				<Flex
					mih={50}
					align={'center'}
					py={4}
				>
					<img src={BrandLogoPNG} alt="" height={50} />
					<Text
						size="xl"
						fw={900}
						variant="gradient"
						gradient={{ from: 'rgba(0, 0, 0, 1)', to: 'gray', deg: 111 }}
					>
						NOTE
					</Text>
				</Flex>
			</Link>
		</div>
	);
}

export default BrandLogo;
