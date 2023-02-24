import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';
import HomePage from '../src/pages/homepage';
import Plans from '../src/pages/plans';
import Login from '../src/pages/login';
import SignUp from '../src/pages/signUp';
import ForgotPassword from '../src/pages/forgotPassword';
import News from '../src/pages/news';
import Screener from '../src/pages/screener';
import Portfolio from '../src/pages/portfolio';
import Watchlist from '../src/pages/watchlist';
import WatchlistAddStock from '../src/pages/watchlist/add-stock';
import PortfolioAddStock from '../src/pages/portfolio/add-stock';
import WatchlistSpecificStock from '../src/pages/watchlist/specific-stock';
import PortfilioSpecificStock from '../src/pages/portfolio/specific-stock';
import Subscription from '../src/pages/subscription';
import Success from '../src/pages/subscription/success';
import Cancel from '../src/pages/subscription/cancel';
import PageNotFound from '../src/pages/PageNotFound';
import InfoAboutStock from '../src/pages/screener/infoAboutStock';
import Calculator from './pages/calculator';
import AdsComponent from './pages/Ads';
function App() {
	return (
		<>
			<Navbar />
			{/* <AdsComponent /> */}
			<ToastContainer position="top-center" />
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/plans" element={<Plans />} />
				<Route path="/login" element={<Login />} />
				<Route path="/sign-up" element={<SignUp />} />
				<Route path="/forgot-password" element={<ForgotPassword />} />
				<Route path="/news" element={<News />} />
				<Route path="/subscription" element={<Subscription />} />
				<Route path="/subscription/success" element={<Success />} />
				<Route path="/subscription/cancel" element={<Cancel />} />
				<Route path="/calculator" element={<Calculator />} />
				<Route path="/screener" element={<Screener />} />
				<Route path="/screener/:symbol" element={<InfoAboutStock />} />
				<Route path="/portfolio" element={<Portfolio />} />
				<Route path="/watchlist" element={<Watchlist />} />
				<Route path="/watchlist/:id/add-stock" element={<WatchlistAddStock />} />
				<Route path="/watchlist/:id" element={<WatchlistSpecificStock />} />
				<Route path="/portfolio/:id/add-stock" element={<PortfolioAddStock />} />
				<Route path="/portfolio/:id" element={<PortfilioSpecificStock />} />
				<Route path="*" element={<PageNotFound />} />
			</Routes>
			<Footer />
		</>
	);
}

export default App;
