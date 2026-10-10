import {RouterProvider} from 'react-router';
import routers from './auth.routes.jsx';
import { AuthProvider } from './features/auth/auth.context.jsx';
import { InterviewProvider } from './features/interview/interview.context.jsx';

function App() {
  

  return (
    <div >
      <AuthProvider>
        <InterviewProvider>  
          <RouterProvider router={routers} />
        </InterviewProvider>
      </AuthProvider>
    </div>
  )
}

export default App
