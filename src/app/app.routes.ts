import { Routes } from '@angular/router';
import { Layout } from './layout/layout';

export const routes: Routes = [
    {
        path: '',
        component: Layout,
        children: [
            {
                path: 'alunos',
                loadComponent: () =>
                    import('./features/alunos/alunos-list').then(m => m.AlunosList)
            },
            { path: '', pathMatch: 'full', redirectTo: 'alunos' }
        ]
    }
];