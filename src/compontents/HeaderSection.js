import { Box, Flex, Spacer, Text } from "@chakra-ui/layout";
import { Button, useBreakpointValue } from "@chakra-ui/react";
import { AiOutlineFileSearch } from "react-icons/ai";
import { Image } from "@chakra-ui/image";
import { useRouter } from "next/router";

export function HeaderSection() {
	const router = useRouter();
	const buttonSize = useBreakpointValue(["sm", "md"]);

	return (
		<Box
			justifyContent="center"
			position="relative"
			w="full"
			h={{
				sm: "80vh",
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
						sm: "full",
						lg: "80%",
					}}
					maxW="8xl"
					zIndex="2"
					ml={[2, 0]}
					mr={[2, 0]}
					p={{
						sm: 3,
						lg: 4,
					}}
					minH={{
						sm: "80vh",
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
							size={buttonSize}
						>
							Zaloguj się
						</Button>
						<Button
							onClick={() => {
								router.push("/register");
							}}
							size={buttonSize}
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
							w={{ sm: "80%", md: "2xl" }}
							maxW="100%"
							fontSize={["3xl", "3xl", "5xl"]}
							color="white"
							fontWeight="bold"
							textShadow="lg"
							textAlign="center"
						>
							Wyszukaj najlepszych arbitrów do swojej sprawy
						</Text>
						<Flex mt="5">
							<Button
								mr="5"
								size={buttonSize}
								onClick={() => {
									router.push("/register");
								}}
							>
								Jestem arbitrem
							</Button>
							<a href="#search">
								<Button colorScheme="orange" size={buttonSize}>
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
