import { Flex, Text } from '@mantine/core';
import BrandLogoPNG from '../assets/images/xnote.png';
import { Link } from 'react-router-dom'
import { useAppSelector } from '../redux/hook';


export function BrandLogo({ imgHeight, textSize }: { readonly imgHeight?: number, readonly textSize?: string }) {
	const { user } = useAppSelector(state => state.auth);
	const { username } = user || {};
	return (
		<div>
			<Link to={username ? '/all' : "/"} style={{ textDecoration: 'none', color: 'grey' }}>

				<Flex
					mih={50}
					align={'center'}
					py={4}
				>
					<img src={BrandLogoPNG} alt="" height={imgHeight ?? 50} />
					<Text
						size={textSize ?? "xl"}
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
