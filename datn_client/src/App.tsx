import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import routers from "./constants/router";

function App() {
     const queryClient = new QueryClient();
     return (
          <QueryClientProvider client={queryClient}>
               <RouterProvider router={routers} />
          </QueryClientProvider>
     );
}

export default App;
