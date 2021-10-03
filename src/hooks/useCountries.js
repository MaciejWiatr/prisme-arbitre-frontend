import { useState } from "react";

const countries = [
	{ value: "ghana", label: "Ghana" },
	{ value: "nigeria", label: "Nigeria" },
	{ value: "kenya", label: "Kenya" },
	{ value: "southAfrica", label: "South Africa" },
	{ value: "unitedStates", label: "United States" },
	{ value: "canada", label: "Canada" },
	{ value: "germany", label: "Germany" },
];

const useCountries = () => {
	const [pickerItems, setPickerItems] = useState(countries);

	return [pickerItems, setPickerItems];
};

export default useCountries;
