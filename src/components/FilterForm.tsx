interface IFilterFormProps {
	query: string;
	updateQuery: Function;
}

export default function FilterForm(props: IFilterFormProps) {
	const updateQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
		props.updateQuery(e.target.value);
	};

	return (
		<input
			type="text"
			placeholder="Search"
			className=""
			style={{ height: 'fit-content' }}
			value={props.query}
			onChange={updateQuery}
		/>
	);
}
