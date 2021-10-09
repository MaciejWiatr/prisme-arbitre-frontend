import { Box, Flex, Link, Spacer, Text } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/image";
import { BsCheckCircle, BsStar, BsChevronRight } from "react-icons/bs";

export const SearchResultElement = ({
	nationality,
	name,
	surname,
	location,
	photo,
	verified,
	specializations,
}) => {
	const photoSrc = "https://" + photo.slice(9);
	return (
		<Flex
			rounded="lg"
			border="1px"
			borderColor="gray.200"
			width="full"
			mb="4"
			overflow="hidden"
			transition="all 0.25s ease"
			_hover={{
				cursor: "pointer",
				shadow: "xl",
			}}
		>
			<Box w="150px">
				<Image
					h="full"
					w="full"
					objectFit="cover"
					src={photoSrc}
					alt="image"
				></Image>
			</Box>
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
						{specializations
							? specializations
									.slice(0, 3)
									.map(({ name: specName }) => {
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
												key={specName}
											>
												{specName}
											</Text>
										);
									})
							: null}
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
