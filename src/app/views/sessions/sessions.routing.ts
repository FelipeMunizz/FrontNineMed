import { Routes } from "@angular/router"
import { SigninComponent } from "./signin/signin.component"
import { NotFoundComponent } from "./not-found/not-found.component"
import { LandpageComponent } from "./landpage/landpage.component"
import { ContactComponent } from "./contact/contact.component"

export const SessionsRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "landpage",
        component: LandpageComponent,
        data: { title: "Home" },
      },
      {
        path: "signin",
        component: SigninComponent,
        data: { title: "Login" },
      },
      {
        path: "contact",
        component: ContactComponent,
        data: { title: "Contato" },
      },
      {
        path: "404",
        component: NotFoundComponent,
        data: { title: "Not Found" },
      },
    ],
  },
]
