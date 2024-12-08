import { Routes } from "@angular/router";
import { ProntuarioComponent } from "./prontuario/prontuario.component";
import { AtendimentoComponent } from "./atendimento/atendimento.component";

export const AtendimentoRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'prontuario',
                component: ProntuarioComponent,
                data: { title: 'Prontuario', breadcrumb: 'Prontuario' }
            },
            {
                path: 'atendimento',
                component: AtendimentoComponent,
                data: { title: 'Atendimento', breadcrumb: 'Atendimento' }
            },
        ]
    }
];