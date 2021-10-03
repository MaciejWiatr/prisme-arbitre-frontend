import { Flex, Text } from "@chakra-ui/layout";
import exampleArbiters from "../data/exampleArbiters";
import { SearchRecommendedElement } from "./SearchRecommendedElement";
import useSearchResults from "../store/useSearchResults";
import url from "../helpers/url";

export const SearchResultsList = () => {
	const { results } = useSearchResults();

	return (
		<Flex p="0" flexDir="column">
			<Text fontSize="xl" fontWeight="semibold">
				Rekomendowani arbitrzy
			</Text>
			<Flex mt="4" flexDir="column" w="full">
				{results
					.slice(1, 6)
					.map(
						({
							first_name,
							last_name,
							nationality,
							location,
							photo,
						}) => {
							return (
								<SearchRecommendedElement
									key={first_name}
									name={first_name}
									surname={last_name}
									nationality={nationality}
									location={location.name}
									photo={photo.slice(7)}
								></SearchRecommendedElement>
							);
						}
					)}
			</Flex>
			<Text fontSize="xl" fontWeight="semibold">
				Pozostali arbitrzy
			</Text>
			{/* TODO: DODAĆ MNIEJ REKOMENDOWANYCH */}
		</Flex>
	);
};
