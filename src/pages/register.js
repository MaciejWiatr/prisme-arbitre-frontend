import { Button } from "@chakra-ui/button";
import { Image } from "@chakra-ui/image";
import { Input } from "@chakra-ui/input";
import { Flex, Box, Text, Spacer, Grid } from "@chakra-ui/layout";
import { Textarea } from "@chakra-ui/textarea";
import { useState } from "react";
import RSelect from "react-select";
import axios from "axios";
import useUserStore from "../store/useUserStore";

const countries = [
	{ value: "1", label: "Ghana" },
	{ value: "2", label: "Nigeria" },
	{ value: "1", label: "Kenya" },
	{ value: "2", label: "South Africa" },
	{ value: "1", label: "United States" },
	{ value: "2", label: "Canada" },
	{ value: "1", label: "Germany" },
];

const UpdateProfileStep = ({ nextStep }) => {
	const { user, jwt } = useUserStore();
	const handleRegistration = async (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);

		const resp = await axios
			.put(
				`http://127.0.0.1:8000/api/arbiter/${user.user.arbiter_profile.id}/`,
				formData,
				{
					headers: {
						Authorization: `Bearer ${jwt}`,
						"Content-Type": "multipart/form-data",
					},
				}
			)
			.catch((error) => {
				console.log(error.response.data);
				console.log(error.response.status);
			});
		console.log(resp.data);
	};

	return (
		<>
			<Text mb="2" fontSize="xl">
				Wypełnij swój profil arbitra (1 / 3)
			</Text>
			<form onSubmit={(e) => handleRegistration(e)}>
				<Grid templateColumns="repeat(2,1fr)" gridGap="4">
					<Flex flexDir="column">
						<Text>Imię</Text>
						<Input name="first_name" />
						<Text>Nazwisko</Text>
						<Input name="last_name" />
						<Text>Email kontaktowy</Text>
						<Input name="email" />
						<Text>Sąd arbitrażowy</Text>
						<RSelect name="court" options={countries} />
					</Flex>
					<Flex flexDir="column">
						<Text>Narodowość</Text>
						<Input name="nationality" />
						<Text>Miasto</Text>
						<RSelect name="location" options={countries} />
						<Text>Języki</Text>
						<RSelect name="languages" isMulti options={countries} />
						<Text>Zdjęcie</Text>
						<Input name="photo" p="1" type="file" />
					</Flex>
				</Grid>
				<Text>Opisz swoją działalność</Text>
				<Textarea name="description" />
				<Text>Dokument potwierdzający tożsamość</Text>
				<Input name="verification_document" p="1" type="file" />
				<Button type="submit" colorScheme="orange" mt="5" w="full">
					Przejdź do następnego kroku
				</Button>
			</form>
		</>
	);
};

const RegisterAccountStep = ({ nextStep }) => {
	const { updateUser } = useUserStore();
	const [isLoading, setLoading] = useState(false);
	const [response, setResponse] = useState();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const data = Object.fromEntries(formData);
		setLoading(true);
		const resp = await axios
			.post("http://127.0.0.1:8000/api/user/", data)
			.catch((error) => {
				console.log(error.response.data);
				console.log(error.response.status);
			});
		setResponse(resp.data);
		const jwtResp = await axios
			.post("http://127.0.0.1:8000/api/token/", data)
			.catch((error) => {
				console.log(error.response.data);
				console.log(error.response.status);
			});
		updateUser(jwtResp.data.access, jwtResp.data.refresh);
		setLoading(false);
		nextStep();
	};

	return (
		<form onSubmit={(e) => handleSubmit(e)}>
			<Text mb="2" fontSize="3xl" fontWeight="semibold">
				Zarejestruj się
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
	);
};

const RegisterPage = () => {
	const [step, setStep] = useState(0);
	const nextStep = () => {
		setStep((s) => s + 1);
	};
	const prevStep = () => {
		setStep((s) => s - 1);
	};
	const StepComponent = [RegisterAccountStep, UpdateProfileStep][step];

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
				<StepComponent nextStep={nextStep} />
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

export default RegisterPage;
