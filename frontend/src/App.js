import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {AppProvider} from './context/AppContext';
import Container from './components/Container/Container';
import InputPage from './pages/InputPage/InputPage';
import ResultPage from './pages/ResultPage/ResultPage';
import MedicinePage from './pages/MedicinePage/MedicinePage';
import PharmacyPage from './pages/PharmacyPage/PharmacyPage';


function App() {
	return (<AppProvider>
		<Router>
			<Container>
				<Routes>
					<Route path="/" element={<InputPage/>}/>
					<Route path="/result" element={<ResultPage/>}/>
					<Route path="/medicine" element={<MedicinePage/>}/>
					<Route path="/pharmacy" element={<PharmacyPage/>}/>
				</Routes>
			</Container>
		</Router>
	</AppProvider>);
}

export default App;
