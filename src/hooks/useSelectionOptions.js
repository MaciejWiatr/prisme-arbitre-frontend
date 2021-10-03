import axios from "axios";
import { useEffect, useState } from "react";
import url from "../helpers/url";

const getSelectionOptions = async (name) => {
	const resp = await axios.get(url(`/api/${name}/`));
	return resp.data;
};

const useSelectionOptions = (name) => {
	const [options, setOptions] = useState([]);

	useEffect(() => {
		(async () => {
			await updateOptions();
		})();
	}, []);

	const updateOptions = async () => {
		const opts = await getSelectionOptions(name);
		setOptions(opts);
	};

	return [options, setOptions, updateOptions];
};

export default useSelectionOptions;
