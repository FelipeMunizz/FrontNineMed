import { Routes } from "@angular/router"
import { SigninComponent } from "./signin/signin.component"
import { NotFoundComponent } from "./not-found/not-found.component"
import { LandpageComponent } from "./landpage/landpage.component"

export const SessionsRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "landpage",
        component: LandpageComponent,
        data: { title: "Landpage" },
      },
      {
        path: "signin",
        component: SigninComponent,
        data: { title: "Login" },
      },
      {
        path: "404",
        component: NotFoundComponent,
        data: { title: "Not Found" },
      },
    ],
  },
]
