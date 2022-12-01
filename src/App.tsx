import './assets/styles/App.css';
import TaskList from './components/TaskList';

function App() {
	return (
		<div className="App">
			<h1 className="text-center m-3">The best Todo List !</h1>
			<TaskList />
		</div>
	);
}

export default App;
