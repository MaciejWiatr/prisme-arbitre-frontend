import { Flex, Text } from "@chakra-ui/layout";
import { SearchSection } from "../compontents/SearchSection";
import { SearchResultSection } from "../compontents/SearchResultSection";
import { HeaderSection } from "../compontents/HeaderSection";
import { Tooltip } from "@chakra-ui/react";

export default function Home() {
	return (
		<div>
			<HeaderSection />
			<SearchSection />
			<SearchResultSection />
			<Flex
				bgColor="gray.800"
				w="full"
				p="2"
				h="32"
				color="white"
				alignItems="center"
			>
				<Text textAlign="center" w="full">
					Strona wykonana przez zespół{" "}
					<Tooltip label="Maciej Wiatr, Jakub Wilk, Oktawia Sepioł">
						<Text as="span" color="blue.200" cursor="pointer">
							prisme
						</Text>
					</Tooltip>{" "}
					w ramach konkursu{" "}
					<Text color="primary">
						<a href="https://hack4law.pl/">Hack4Law</a>
					</Text>
				</Text>
			</Flex>
		</div>
	);
}
