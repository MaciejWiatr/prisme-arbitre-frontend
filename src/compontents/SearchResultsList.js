import { Flex, Text } from "@chakra-ui/layout";
import { SearchResultElement } from "./SearchResultElement";
import useSearchResults from "../store/useSearchResults";

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
							specializations,
						}) => {
							return (
								<SearchResultElement
									key={`${first_name}${last_name}`}
									name={first_name}
									surname={last_name}
									nationality={nationality}
									location={location.name}
									photo={photo.slice(7)}
									verified={true}
									specializations={specializations}
								></SearchResultElement>
							);
						}
					)}
			</Flex>
			<Text fontSize="xl" fontWeight="semibold">
				Pozostali arbitrzy
			</Text>
			<Flex mt="4" flexDir="column" w="full">
				{results
					.slice(6, 100)
					.map(
						({
							first_name,
							last_name,
							nationality,
							location,
							photo,
						}) => {
							return (
								<SearchResultElement
									key={first_name}
									name={first_name}
									surname={last_name}
									nationality={nationality}
									location={
										location?.name || "Nieznana lokalizacja"
									}
									photo={photo.slice(7)}
									verified={false}
								></SearchResultElement>
							);
						}
					)}
			</Flex>
		</Flex>
	);
};
