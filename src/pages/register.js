import { Button } from "@chakra-ui/button";
import { Image } from "@chakra-ui/image";
import { Input } from "@chakra-ui/input";
import { Flex, Box, Text, Spacer, Grid } from "@chakra-ui/layout";
import { Textarea } from "@chakra-ui/textarea";
import { useState } from "react";
import RSelect from "react-select";
import axios from "axios";
import url from "../helpers/url";
import useSelectionOptions from "../hooks/useSelectionOptions";
import useUserStore from "../store/useUserStore";
import { useRouter } from "next/router";
import { useToast } from "@chakra-ui/toast";

const countries = [
	{ value: "1", label: "Ghana" },
	{ value: "2", label: "Nigeria" },
	{ value: "1", label: "Kenya" },
	{ value: "2", label: "South Africa" },
	{ value: "1", label: "United States" },
	{ value: "2", label: "Canada" },
	{ value: "1", label: "Germany" },
];

const UpdateProfileSpecializations = ({ nextStep, displayError }) => {
	const [categoriesOptions] = useSelectionOptions("specialization");
	const { jwt_data, jwt, refreshUser } = useUserStore();
	const router = useRouter();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const resp = await axios
			.put(
				url(`/api/arbiter/${jwt_data.user.arbiter_profile.id}/`),
				formData,
				{
					headers: {
						Authorization: `Bearer ${jwt}`,
						"Content-Type": "multipart/form-data",
					},
				}
			)
			.then(async () => {
				await refreshUser();
				router.push("/dashboard");
			})
			.catch((error) => {
				displayError(error.response.data);
			});
	};

	return (
		<form onSubmit={handleSubmit}>
			<Text mb="2" fontSize="xl">
				Wypełnij swój profil arbitra (3 / 3)
			</Text>
			<Text>Wybierz swoje specjalizacje</Text>
			<RSelect
				name="specializations"
				options={categoriesOptions.map(({ id, name }) => {
					return { label: name, value: id };
				})}
				isMulti
			/>
			<Button type="submit" colorScheme="orange" w="full" mt="5">
				Przejdź dalej
			</Button>
		</form>
	);
};

const UpdateProfileExperience = ({ nextStep, displayError }) => {
	const { jwt_data, jwt, refreshUser } = useUserStore();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const resp = await axios
			.put(
				url(`/api/arbiter/${jwt_data.user.arbiter_profile.id}/`),
				formData,
				{
					headers: {
						Authorization: `Bearer ${jwt}`,
						"Content-Type": "multipart/form-data",
					},
				}
			)
			.catch((error) => {
				displayError(error.response.data);
			});
		nextStep();
	};

	return (
		<form onSubmit={handleSubmit}>
			<Text mb="2" fontSize="xl">
				Wypełnij swój profil arbitra (2 / 3)
			</Text>
			<Text>Opisz swoje doświadczenie</Text>
			<Textarea h="full" name="experience" />
			<Button colorScheme="orange" mt="5" type="submit">
				Prześlij
			</Button>
		</form>
	);
};

const UpdateProfileStep = ({ nextStep, displayError }) => {
	const [languageOptions] = useSelectionOptions("language");
	const [locationOptions] = useSelectionOptions("location");

	const [courtOptions] = useSelectionOptions("court");
	const { jwt_data, jwt } = useUserStore();
	const [loading, setLoading] = useState(false);
	const handleRegistration = async (e) => {
		e.preventDefault();
		setLoading(true);
		const formData = new FormData(e.target);

		await axios
			.put(
				url(`/api/arbiter/${jwt_data.user.arbiter_profile.id}/`),
				formData,
				{
					headers: {
						Authorization: `Bearer ${jwt}`,
						"Content-Type": "multipart/form-data",
					},
				}
			)
			.then(() => {
				setLoading(false);
				nextStep();
			})
			.catch((error) => {
				displayError(error.response.data);
			});
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
						<RSelect
							name="court"
							options={courtOptions.map(({ id, name }) => {
								return { label: name, value: id };
							})}
						/>
					</Flex>
					<Flex flexDir="column">
						<Text>Narodowość</Text>
						<Input name="nationality" />
						<Text>Miasto</Text>
						<RSelect
							name="location"
							options={locationOptions.map(({ id, name }) => {
								return { label: name, value: id };
							})}
						/>
						<Text>Języki</Text>
						<RSelect
							name="languages"
							isMulti
							options={languageOptions.map(({ id, name }) => {
								return { label: name, value: id };
							})}
						/>
						<Text>Zdjęcie</Text>
						<Input name="photo" p="1" type="file" />
					</Flex>
				</Grid>
				<Text>Opisz swoją działalność</Text>
				<Textarea name="description" />
				<Text>Dokument potwierdzający tożsamość</Text>
				<Input name="verification_document" p="1" type="file" />
				<Button
					isLoading={loading}
					type="submit"
					colorScheme="orange"
					mt="5"
					w="full"
				>
					Przejdź do następnego kroku
				</Button>
			</form>
		</>
	);
};

const RegisterAccountStep = ({ nextStep, displayError }) => {
	const { updateUser } = useUserStore();
	const [isLoading, setLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const data = Object.fromEntries(formData);
		setLoading(true);
		const resp = await axios
			.post(url("/api/user/"), data)
			.catch((error) => {
				displayError(error.response.data);
			});
		const jwtResp = await axios
			.post(url("/api/token/"), data)
			.then(({ data }) => {
				updateUser(data.access, data.refresh);
				setLoading(false);
				nextStep();
			})
			.catch((error) => {});
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
	const toast = useToast();
	const [step, setStep] = useState(0);
	const nextStep = () => {
		setStep((s) => s + 1);
	};
	const prevStep = () => {
		setStep((s) => s - 1);
	};
	const StepComponent = [
		RegisterAccountStep,
		UpdateProfileStep,
		UpdateProfileExperience,
		UpdateProfileSpecializations,
	][step];

	const displayError = (msg) => {
		if (step > 0) {
			prevStep();
		}
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
				<StepComponent
					nextStep={nextStep}
					displayError={displayError}
				/>
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
