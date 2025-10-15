import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Aluno } from '../../shared/aluno.model';

@Injectable({ providedIn: 'root' })
export class AlunosService {
    private _alunos$ = new BehaviorSubject<Aluno[]>([
        { id: 'a1', nome: 'Ana', sobrenome: 'Souza', email: 'ana@ex.com' },
        { id: 'a2', nome: 'Bruno', sobrenome: 'Lima', email: 'bruno@ex.com' },
    ]);

    alunos$ = this._alunos$.asObservable();

    add(a: Omit<Aluno, 'id'>) {
        const id = Date.now().toString(); // simples, sem uuid
        this._alunos$.next([...this._alunos$.value, { id, ...a }]);
    }
    update(a: Aluno) {
        this._alunos$.next(this._alunos$.value.map(x => x.id === a.id ? a : x));
    }
    remove(id: string) {
        this._alunos$.next(this._alunos$.value.filter(x => x.id !== id));
    }
}
