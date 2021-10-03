import { Box, Flex, Link, Spacer, Text } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/image";
import { BsCheckCircle, BsStar, BsChevronRight } from "react-icons/bs";
import { getShuffledSpecializations } from "../pages/index";

export const SearchRecommendedElement = ({
	nationality,
	name,
	surname,
	location,
	photo,
	verified,
}) => {
	const photoSrc = "https://" + photo.slice(9);
	console.log(photoSrc);
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
				w="150px"
				objectFit="cover"
				src={photoSrc}
				alt="image"
			></Image>
			<Box w="full" p="4">
				<Flex w="full">
					{verified ? (
						<Flex alignItems="center" color="green.400">
							<BsCheckCircle />
							<Text ml="1">Zweryfikowano</Text>
						</Flex>
					) : null}

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
