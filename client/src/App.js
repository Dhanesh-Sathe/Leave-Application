import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Components/Header';
import Main from './Components/Main';
import Login from './Components/Login'; 
import Register from './Components/Registration';
import Testimonials from './Components/Testimonial';
import FAQ from './Components/FAQ';
import ContactSection from './Components/Contact';
import Footer from './Components/Footer';
import PrivacyPolicy from './Components/PrivacyPolicy';
import LeaveApplicationForm from './Components/LeaveApplication';
import LeaveStatusLanding from './Components/LeaveStatus';
import DetailedLeaveReport from './Components/DetailedLeaveReport';
import Calendar from './Components/QuickAccess/Calendar';
import LeaveBalance from './Components/QuickAccess/LeaveBalance';
import Help from './Components/QuickAccess/Help';
import ProfileCompletion from './Components/ProfileCompletion/ProfileCompletion';
import PrivateRoute from './Components/PrivateRoutes';
import Dashboard from './Components/Dashboard';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public routes */}
          <Route
            path="/"
            element={
              <>
                <Header />
                <Main />
                <Testimonials />
                <FAQ />
                <ContactSection />
                <Footer />
              </>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path='/privacy-policy' element={<PrivacyPolicy />} />

          {/* Protected routes */}
          <Route path="/dashboard" element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } />
          
          <Route path='/leave-application' element={
            <PrivateRoute>
              <LeaveApplicationForm />
            </PrivateRoute>
          } />
          
          <Route path='/leave-status' element={
            <PrivateRoute>
              <LeaveStatusLanding />
            </PrivateRoute>
          } />
          
          <Route path='/leave-report' element={
            <PrivateRoute>
              <DetailedLeaveReport />
            </PrivateRoute>
          } />
          
          <Route path='/calendar' element={
            <PrivateRoute>
              <Calendar />
            </PrivateRoute>
          } />
          
          <Route path='/leave-balance' element={
            <PrivateRoute>
              <LeaveBalance />
            </PrivateRoute>
          } />
          
          <Route path='/help' element={
            <PrivateRoute>
              <Help />
            </PrivateRoute>
          } />
          
          <Route path="/complete-profile" element={
            <PrivateRoute>
              <ProfileCompletion />
            </PrivateRoute>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

