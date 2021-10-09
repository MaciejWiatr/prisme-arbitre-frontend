import { Box, Flex, Grid, Text } from "@chakra-ui/layout";
import { SearchResultsList } from "./SearchResultsList";
import useSearchResults from "../store/useSearchResults";
import { Spinner } from "@chakra-ui/spinner";

export function SearchResultSection() {
	const { results, isLoading } = useSearchResults();
	return (
		<Flex as="section" justifyContent="center" p="6">
			<Box
				w={{
					sm: "90%",
					md: "70%",
					lg: "5xl",
				}}
			>
				{isLoading ? (
					<Flex
						flexDir="column"
						justifyContent="center"
						alignItems="center"
					>
						<Text>Trwa wyszukiwanie</Text>
						<Spinner
							margin="2"
							emptyColor="gray.200"
							color="primary"
						/>
					</Flex>
				) : null}
				{results.length > 1 ? (
					<>
						<Text fontSize="md">Wyniki wyszukiwania</Text>
						<Text fontSize="2xl">
							Znaleziono{" "}
							<Text as="span" color="primary">
								{results.length}
							</Text>{" "}
							pasujących arbitrów
						</Text>
						<Grid mt="2" w="full" minH="12" templateColumns="1fr">
							<SearchResultsList />
						</Grid>
					</>
				) : (
					<Box w="full" textAlign="center" color="gray.400">
						Wprowadź dane wyszukiwania a tu znajdziesz swoje wyniki
					</Box>
				)}
			</Box>
		</Flex>
	);
}
