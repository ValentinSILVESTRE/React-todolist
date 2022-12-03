import './assets/styles/App.css';
import TaskList from './components/TaskList';

function App() {
	return (
		<div className="App">
			<h1 className="text-center mt-4 mb-5">The Best Todo List Ever !</h1>
			<TaskList />
		</div>
	);
}

export default App;
