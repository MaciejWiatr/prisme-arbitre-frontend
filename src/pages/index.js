import { Box, Flex, Grid, Spacer, Text } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { AiOutlineFileSearch } from "react-icons/ai";
import { Image } from "@chakra-ui/image";
import { Input } from "@chakra-ui/input";
import { Checkbox } from "@chakra-ui/checkbox";
import { useRouter } from "next/router";
import { SearchSection } from "../compontents/SearchSection";
import { SearchResultsList } from "../compontents/SearchResultsList";
import useSearchResults from "../store/useSearchResults";

export const countries = [
	{ value: "ghana", label: "Ghana" },
	{ value: "nigeria", label: "Nigeria" },
	{ value: "kenya", label: "Kenya" },
	{ value: "southAfrica", label: "South Africa" },
	{ value: "unitedStates", label: "United States" },
	{ value: "canada", label: "Canada" },
	{ value: "germany", label: "Germany" },
];

const specjalizacje = [
	"Medycyna",
	"Prawo karne",
	"Administracja",
	"Prawo własności",
];

export const getShuffledSpecializations = () => {
	return specjalizacje.sort((a, b) => 0.5 - Math.random());
};

function HeaderSection() {
	const router = useRouter();

	return (
		<Box
			justifyContent="center"
			position="relative"
			w="full"
			h={{
				sm: "100vh",
				md: "70vh",
			}}
			bgColor="secondary"
			overflow="hidden"
		>
			<Flex justifyContent="center" w="full" h="full" margin="0">
				<Flex
					flexDir="column"
					position="relative"
					w={{
						sm: "100%",
						lg: "80%",
					}}
					maxW="8xl"
					zIndex="2"
					p={{
						sm: 3,
						lg: 4,
					}}
					minH={{
						sm: "100vh",
						md: "70vh",
					}}
					h="100%"
				>
					<Flex w="full" h="20" alignItems="center">
						<Flex fontWeight="medium" alignItems="center">
							<Text fontSize="1.8rem" color="white">
								<AiOutlineFileSearch />
							</Text>
							<Text color="white">Prisme Search</Text>
						</Flex>
						<Spacer />
						<Button
							onClick={() => {
								router.push("/login");
							}}
							variant="outline"
							color="white"
							mr="3"
						>
							Zaloguj się
						</Button>
						<Button
							onClick={() => {
								router.push("/register");
							}}
						>
							Zarejestruj się
						</Button>
					</Flex>
					<Flex
						h="full"
						w="full"
						justifyContent="center"
						alignItems="center"
						flexDir="column"
						padding="10"
					>
						<Text
							w="2xl"
							maxW="100%"
							fontSize="5xl"
							color="white"
							fontWeight="bold"
							textShadow="lg"
							textAlign="center"
						>
							Wyszukaj najlepszych arbitrów do swojej sprawy
						</Text>
						<Flex mt="5">
							<Button mr="5" size="lg">
								Jestem arbitrem
							</Button>
							<a href="#search">
								<Button colorScheme="orange" size="lg">
									Znajdź arbitra
								</Button>
							</a>
						</Flex>
					</Flex>
				</Flex>
			</Flex>
			<Box
				zindex="1"
				top="0"
				left="0"
				position="absolute"
				width="full"
				height="full"
			>
				<Image
					width="full"
					height="full"
					objectFit="cover"
					src="/images/bg.png"
					alt="bg"
				></Image>
			</Box>
		</Box>
	);
}

function SearchResultSection() {
	const { results } = useSearchResults();
	return (
		<Flex as="section" justifyContent="center" p="6">
			<Box
				w={{
					sm: "90%",
					md: "70%",
					lg: "5xl",
				}}
			>
				{results.length > 1 && (
					<>
						<Text fontSize="md">Wyniki wyszukiwania</Text>
						<Text fontSize="2xl">
							Znaleziono{" "}
							<Text as="span" color="primary">
								{results.length}
							</Text>{" "}
							pasujących arbitrów
						</Text>
					</>
				)}
				<Grid mt="2" w="full" minH="12" templateColumns="1fr">
					{/* <Box>
						<Flex
							border="1px"
							borderColor="gray.200"
							w="full"
							h="full"
							textAlign="left"
							rounded="lg"
							p="6"
						>
							<Text fontSize="xl" fontWeight="semibold">
								Filtry
							</Text>
						</Flex>
					</Box> */}
					<SearchResultsList />
				</Grid>
			</Box>
		</Flex>
	);
}

export default function Home() {
	return (
		<div>
			<HeaderSection />
			<SearchSection />
			<SearchResultSection />
			<Flex
				bgColor="gray.800"
				w="full"
				h="32"
				color="white"
				alignItems="center"
			>
				<Text textAlign="center" w="full">
					Strona wykonana przez zespół prisme w ramach konkursu{" "}
					<Text color="primary">
						<a href="https://hack4law.pl/">Hack4Law</a>
					</Text>
				</Text>
			</Flex>
		</div>
	);
}
