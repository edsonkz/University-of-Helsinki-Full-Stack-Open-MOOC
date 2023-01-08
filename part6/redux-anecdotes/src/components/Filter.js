import { setFilter } from "../reducers/filterReducer";
import { useDispatch } from "react-redux";

const Filter = () => {
	const dispatch = useDispatch();
	const handleChange = (event) => {
		let filter = event.target.value;
		dispatch(setFilter(filter));
	};
	const style = {
		marginBottom: 10,
	};

	return (
		<div style={style}>
			filter <input name="filtering" onChange={handleChange} />
		</div>
	);
};

export default Filter;
