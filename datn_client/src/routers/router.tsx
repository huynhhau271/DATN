import { BrowserRouter, Route, Routes } from "react-router-dom";
import { routers } from "../constants/router";

export const AppRouter = () => {
     return (
          <>
               <BrowserRouter>
                    {routers.map((router) => (
                         <Routes key={router.id}>
                              {
                                   <Route
                                        path={router.path}
                                        Component={router.component}
                                        key={router.path}
                                   >
                                        {router.children &&
                                             router.children.map((child) => (
                                                  <Route
                                                       path={child.path}
                                                       Component={
                                                            child.component
                                                       }
                                                  />
                                             ))}
                                   </Route>
                              }
                         </Routes>
                    ))}
               </BrowserRouter>
          </>
     );
};
