import { createBrowserRouter, RouterProvider } from 'react-router'
import './App.css'
import Root from './pages/Root'
import LoginPage from './pages/LoginPage'
import CreateProfilePage from './pages/CreateProfilePage'
import EditProfilePage from './pages/EditProfilePage'
import ViewProfilePage from './pages/ViewProfilePage'

const router = createBrowserRouter([{
  path:'/',
  element: <Root />,
  children:[
    {index:true,
      element: <LoginPage />
    },
    {path:"/create-profile",
     element:<CreateProfilePage /> 
    },
    {path:"/edit-profile/:name",
     element:<EditProfilePage />
    },
    {path:"/view-profile/:name",
     element:<ViewProfilePage />
    }
  ]
}])
export default function App() {
  return <RouterProvider router={router}/>
}


