import { Flex, Grid, Spacer, Text } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import RSelect from "react-select";
import { Select } from "@chakra-ui/select";
import { countries } from "../pages/index";
import useSelectionOptions from "../hooks/useSelectionOptions";
import { useRef, useState } from "react";
import axios from "axios";
import url from "../helpers/url";
import useSearchResults from "../store/useSearchResults";

export function SearchSection() {
	const { setResults } = useSearchResults();
	const [languageOptions] = useSelectionOptions("language");
	const [locationOptions] = useSelectionOptions("location");
	const [categoriesOptions] = useSelectionOptions("specialization");
	const [courtOptions] = useSelectionOptions("court");
	const [] = useSelectionOptions("court");
	const langRef = useRef(null);
	const degreeRef = useRef(null);
	const locRef = useRef(null);
	const courtRef = useRef(null);
	const catRef = useRef(null);

	const handleSearch = async (e) => {
		e.preventDefault();
		const data = {
			location: locRef.current.getValue().map(({ value }) => value),
			languages: langRef.current.getValue().map(({ value }) => value),
			specializations: catRef.current
				.getValue()
				.map(({ value }) => value),
			court: courtRef.current.getValue().map(({ value }) => value),
			degree: degreeRef.current.value,
		};
		const resp = await axios.get(
			url(
				`/api/arbiter/?court=${data.court}&location=${
					data.location
				}&languages=${JSON.stringify(
					data.languages
				)}&specializations=${JSON.stringify(
					data.specializations
				)}&degree=${data.degree}`
			)
		);

		setResults(resp.data);
	};

	return (
		<form onSubmit={handleSearch}>
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
						<RSelect
							isMulti
							name="languages"
							placeholder="Wybierz języki"
							ref={langRef}
							options={languageOptions.map(({ id, name }) => {
								return { label: name, value: name };
							})}
						></RSelect>
						<Spacer />
						<Text>Stopień naukowy</Text>
						<Select ref={degreeRef} placeholder="Wybierz opcję">
							<option value={true}>Tak</option>
							<option value={false}>Nie</option>
						</Select>
					</Flex>
					<Flex flexDir="column">
						<Text mb="0.5">Lokalizacja</Text>
						<RSelect
							ref={locRef}
							options={locationOptions.map(({ name }) => ({
								label: name,
								value: name,
							}))}
						/>
						<Spacer />
						<Text mb="0.5">Sąd arbitrażowy</Text>
						<RSelect
							ref={courtRef}
							options={courtOptions.map(({ name }) => ({
								label: name,
								value: name,
							}))}
						/>
					</Flex>
					<Flex flexDir="column">
						<Text mb="0.5">Kategorie</Text>
						<RSelect
							ref={catRef}
							options={categoriesOptions.map(({ id, name }) => {
								return { label: name, value: name };
							})}
							isMulti
						/>
						<Spacer />
						<Button
							type="submit"
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
		</form>
	);
}
