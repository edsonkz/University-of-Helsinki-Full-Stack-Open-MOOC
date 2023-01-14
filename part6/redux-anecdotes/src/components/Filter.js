import { setFilter } from "../reducers/filterReducer";
import { connect } from "react-redux";

const Filter = (props) => {
	const handleChange = (event) => {
		let filter = event.target.value;
		props.setFilter(filter);
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

const connectedFilter = connect(null, { setFilter })(Filter);

export default connectedFilter;
