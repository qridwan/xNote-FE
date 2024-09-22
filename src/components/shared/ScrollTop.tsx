import { Affix, Button, rem, Transition } from "@mantine/core";
import { useWindowScroll } from "@mantine/hooks";
import { IconArrowUp } from "@tabler/icons-react";

function ScrollTop() {
	const [scroll, scrollTo] = useWindowScroll();

	return (<Affix position={{ bottom: rem(20), right: rem(20) }}>
		<Transition transition="slide-up" mounted={scroll.y > 0}>
			{(transitionStyles) => (
				<Button
					color='dark'
					leftIcon={<IconArrowUp size="1rem" />}
					style={transitionStyles}
					onClick={() => scrollTo({ y: 0 })}
				>
					Top
				</Button>
			)}
		</Transition>
	</Affix>);
}

export default ScrollTop;
