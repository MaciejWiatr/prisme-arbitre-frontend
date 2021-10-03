import { useToast, Flex, Text, Input, Button, Image } from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import url from "../helpers/url";
import useUserStore from "../store/useUserStore";

const LoginPage = () => {
	const { updateUser } = useUserStore();
	const router = useRouter();
	const [isLoading, setLoading] = useState(false);
	const toast = useToast();
	const [step, setStep] = useState(0);
	const handleSubmit = async (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const dataRq = Object.fromEntries(formData);
		setLoading(true);
		const jwtResp = await axios
			.post(url("/api/token/"), dataRq)
			.then(({ data }) => {
				updateUser(data.access, data.refresh);
				setLoading(false);
				router.push("/dashboard");
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const displayError = (msg) => {
		toast({
			title: JSON.stringify(msg),
			status: "error",
			isClosable: true,
		});
	};

	return (
		<Flex
			bgColor="secondary"
			justifyContent="center"
			alignItems="center"
			minH="100vh"
			position="relative"
			p="2"
		>
			<Flex
				pos="relative"
				zIndex="2"
				flexDir="column"
				bgColor="white"
				rounded="lg"
				w="lg"
				p="6"
				shadow="lg"
			>
				{" "}
				<form onSubmit={(e) => handleSubmit(e)}>
					<Text mb="2" fontSize="3xl" fontWeight="semibold">
						Zaloguj się
					</Text>
					<Text>Nazwa użytkownika</Text>
					<Input name="username"></Input>
					<Text>Hasło</Text>
					<Input name="password"></Input>

					<Button
						type="submit"
						w="full"
						isLoading={isLoading}
						mt="4"
						colorScheme="orange"
					>
						Utwórz konto
					</Button>
				</form>
			</Flex>
			<Image
				position="absolute"
				objectFit="cover"
				width="full"
				height="full"
				src="/images/bg-register.jpg"
				alt="bg-register"
				opacity="0.2"
				zIndex="1"
			></Image>
		</Flex>
	);
};

export default LoginPage;
