import { Button } from "@chakra-ui/button";
import { Image } from "@chakra-ui/image";
import { Input } from "@chakra-ui/input";
import { Flex, Box, Text, Spacer } from "@chakra-ui/layout";
import { Textarea } from "@chakra-ui/textarea";
import { useState, useEffect } from "react";
import { AiOutlineFileSearch } from "react-icons/ai";
import useUserStore from "../store/useUserStore";
import { useRouter } from "next/router";

const DashboardPage = () => {
	const router = useRouter();
	const { jwt_data, jwt, logout } = useUserStore();
	const [profile, setProfile] = useState({});
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		setProfile(
			jwt_data.arbiter_profile
				? jwt_data.arbiter_profile
				: jwt_data.user.arbiter_profile
		);
		setLoading(false);
	}, []);

	if (loading) return <div>Loading...</div>;

	const handleHomeRedir = () => {
		router.push("/");
	};

	const handleLogout = () => {
		logout();
		router.push("/");
	};

	const handleSeeProfile = () => {
		router.push(`/profile/${profile.id}/`);
	};

	return (
		<Flex
			position="relative"
			minH="100vh"
			w="full"
			bgColor="secondary"
			justifyContent="center"
			alignItems="center"
		>
			<Box
				pos="relative"
				zIndex="2"
				p="6"
				w="sm"
				h="2xl"
				bgColor="white"
				rounded="lg"
				shadow="lg"
				mr="2"
			>
				<Flex flexDir="column" h="full">
					<Flex
						fontWeight="medium"
						alignItems="center"
						justifyContent="center"
					>
						<Text fontSize="1.8rem" color="black">
							<AiOutlineFileSearch />
						</Text>
						<Text color="black">Prisme Search</Text>
					</Flex>
					<Spacer />
					<Button onClick={handleHomeRedir} mb="2">
						Wróć do strony głównej
					</Button>
					<Button onClick={handleSeeProfile} mb="2">
						Sprawdź swój profil
					</Button>
					<Button onClick={handleLogout}>Wyloguj</Button>
				</Flex>
			</Box>
			<Box
				pos="relative"
				zIndex="2"
				ml="2"
				p="6"
				w="3xl"
				h="2xl"
				bgColor="white"
				rounded="lg"
				shadow="lg"
			>
				<Text fontSize="xl" fontWeight="semibold">
					Twój status to{" "}
					{profile.verified ? (
						<Text as="span" color="green.400">
							Zweryfikowany
						</Text>
					) : (
						<Text as="span" color="red.400">
							Niezweryfikowany
						</Text>
					)}
				</Text>
				<Text fontSize="2xl">Twoje dane:</Text>
				<Flex as="form" flexWrap="wrap" h="90%" flexDir="column">
					<Box>
						<Text>Imię</Text>
						<Input name="first_name" value={profile.first_name} />
					</Box>
					<Box>
						<Text>Nazwisko</Text>
						<Input name="last_name" value={profile.last_name} />
					</Box>
					<Box>
						<Text>Opis</Text>
						<Textarea
							name="description"
							value={profile.description}
						/>
					</Box>
					<Box>
						<Text>Doświadczenie</Text>
						<Textarea value={JSON.stringify(profile.experience)} />
					</Box>
					<Spacer />
					<Button>Zaktualizuj dane</Button>
				</Flex>
			</Box>
			<Image
				position="absolute"
				objectFit="cover"
				width="full"
				height="full"
				src="/images/bg-dashboard.jpg"
				opacity="0.2"
				alt="bg"
			/>
		</Flex>
	);
};

export default DashboardPage;
