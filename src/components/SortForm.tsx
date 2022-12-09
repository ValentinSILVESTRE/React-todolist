import { useState } from 'react';

interface ISortFormProps {
	sortKey: 'deadline' | 'priority' | 'title';
	updateSort: Function;
}

export default function SortForm(props: ISortFormProps) {
	const [sortKey, setSortKey] = useState(props.sortKey);
	const updateSort = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setSortKey(event.target.value as 'deadline' | 'priority' | 'title');
		props.updateSort(event.target.value);
	};

	return (
		<div className="d-flex mt-3">
			<label htmlFor="sort" className="me-2">
				Sort by
			</label>
			<select
				name="sort"
				id="sort"
				value={sortKey}
				onChange={updateSort}
				style={{ height: 'fit-content' }}
			>
				<option value="deadline">Deadline</option>
				<option value="priority">Priority</option>
				<option value="title">Title</option>
			</select>
		</div>
	);
}
