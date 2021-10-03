import {
	Box,
	Flex,
	Grid,
	Link,
	List,
	ListItem,
	Spacer,
	Text,
} from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { AiOutlineFileSearch } from "react-icons/ai";
import { Image } from "@chakra-ui/image";
import { Input } from "@chakra-ui/input";
import { Select } from "@chakra-ui/select";
import { BsCheckCircle, BsStar, BsChevronRight } from "react-icons/bs";
import RSelect from "react-select";
import exampleArbiters from "../data/exampleArbiters";

const countries = [
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

const getShuffledSpecializations = () => {
	return specjalizacje.sort((a, b) => 0.5 - Math.random());
};

const SearchRecommendedElement = ({ nationality, name, surname, location }) => {
	return (
		<Flex
			rounded="lg"
			border="1px"
			borderColor="gray.200"
			height={{ sm: "56", md: "40" }}
			width="full"
			mb="4"
			overflow="hidden"
			transition="all 0.25s ease"
			_hover={{
				cursor: "pointer",
				shadow: "xl",
			}}
		>
			<Image
				height="full"
				src="https://picsum.photos/350"
				alt="image"
			></Image>
			<Box w="full" p="4">
				<Flex w="full">
					<Flex alignItems="center" color="green.400">
						<BsCheckCircle />
						<Text ml="1">Zweryfikowano</Text>
					</Flex>
					<Spacer />
					<Flex alignItems="center">
						<Text mr="1">{Math.floor(Math.random() * 10)}</Text>

						<BsStar />
					</Flex>
				</Flex>
				<Text textAlign="left" w="full" fontSize="2xl" mb="1">
					{name} {surname}{" "}
					<Text as="span" color="gray.300" fontSize="xl">
						({location})
					</Text>
				</Text>
				<Box w="full">
					<Flex flexWrap="wrap">
						{getShuffledSpecializations().map((spec) => {
							return (
								<Text
									rounded="full"
									border="1px"
									borderColor="orange.300"
									pl="2"
									pr="2"
									mr="1"
									mb="1"
									fontSize="small"
									color="orange.300"
									key={spec}
								>
									{spec}
								</Text>
							);
						})}
					</Flex>
				</Box>
				<Box mt="3">
					<Link>
						<Flex alignItems="center">
							Sprawdź profil <BsChevronRight />
						</Flex>
					</Link>
				</Box>
			</Box>
		</Flex>
	);
};

const SearchResultsList = () => (
	<Flex p="0" flexDir="column">
		<Text fontSize="xl" fontWeight="semibold">
			Rekomendowani arbitrzy
		</Text>
		<Flex mt="4" flexDir="column" w="full">
			{exampleArbiters
				.slice(1, 6)
				.map(({ name, surname, location, nationality }) => {
					return (
						<SearchRecommendedElement
							key={name}
							name={name}
							surname={surname}
							nationality={nationality}
							location={location}
						></SearchRecommendedElement>
					);
				})}
		</Flex>
		<Text fontSize="xl" fontWeight="semibold">
			Pozostali arbitrzy
		</Text>
	</Flex>
);

function HeaderSection() {
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
						<Button variant="outline" color="white" mr="3">
							Zaloguj się
						</Button>
						<Button>Zarejestruj się</Button>
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

function SearchSection() {
	return (
		<Flex
			id="search"
			position="relative"
			bgColor="gray.200"
			justifyContent="center"
			h={{ sm: "96", md: "48" }}
		>
			<Grid
				position="absolute"
				columnGap="4"
				zIndex="3"
				top={{
					sm: "-36",
					md: "-12",
				}}
				templateColumns={{
					sm: "1fr",
					md: "repeat(3,1fr)",
				}}
				bgColor="white"
				minH="48"
				w={{
					sm: "90%",
					md: "70%",
					lg: "5xl",
				}}
				shadow="lg"
				rounded="lg"
				p="6"
			>
				<Flex flexDir="column">
					<Text>Języki</Text>
					<RSelect isMulti placeholder="Wybierz języki"></RSelect>
					<Spacer />
					<Text>Data</Text>
					<Input type="date"></Input>
				</Flex>
				<Flex flexDir="column">
					<Text mb="0.5">Lokalizacja</Text>
					<RSelect options={countries} />
					<Spacer />
					<Text mb="0.5">Sąd arbitrażowy</Text>
					<RSelect options={countries} />
				</Flex>
				<Flex flexDir="column">
					<Text mb="0.5">Kategorie</Text>
					<RSelect options={countries} isMulti />
					<Spacer />
					<Button
						mt={{
							sm: 10,
							md: 0,
						}}
						colorScheme="orange"
					>
						Wyszukaj
					</Button>
				</Flex>
			</Grid>
		</Flex>
	);
}

function SearchResultSection() {
	return (
		<Flex as="section" justifyContent="center" p="6">
			<Box
				w={{
					sm: "90%",
					md: "70%",
					lg: "5xl",
				}}
			>
				<Text fontSize="md">Wyniki wyszukiwania</Text>
				<Text fontSize="2xl">
					Znaleziono{" "}
					<Text as="span" color="primary">
						39
					</Text>{" "}
					pasujących arbitrów
				</Text>
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
