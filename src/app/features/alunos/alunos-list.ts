import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AlunosService } from './alunos.service';
import { Aluno } from '../../shared/aluno.model';
import { AlunoForm } from './aluno-form';

@Component({
    standalone: true,
    imports: [
        CommonModule,
        MatTableModule, MatPaginatorModule, MatSortModule,
        MatButtonModule, MatDialogModule
    ],
    template: `
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h1>Lista de Alunos</h1>
      <button mat-flat-button color="primary" (click)="novo()">Novo</button>
    </div>

    <input class="form-control mb-2" placeholder="Filtrar..." (input)="applyFilter($event)">

    <table mat-table [dataSource]="dataSource" matSort class="mat-elevation-z1 w-100">
      <ng-container matColumnDef="nome">
        <th mat-header-cell *matHeaderCellDef mat-sort-header> Nome </th>
        <td mat-cell *matCellDef="let a">{{ a.nome }} {{ a.sobrenome }}</td>
      </ng-container>

      <ng-container matColumnDef="email">
        <th mat-header-cell *matHeaderCellDef mat-sort-header> E-mail </th>
        <td mat-cell *matCellDef="let a">{{ a.email }}</td>
      </ng-container>

      <ng-container matColumnDef="acoes">
        <th mat-header-cell *matHeaderCellDef> Ações </th>
        <td mat-cell *matCellDef="let a">
          <button mat-button (click)="editar(a)">Editar</button>
          <button mat-button color="warn" (click)="excluir(a)">Excluir</button>
        </td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="cols"></tr>
      <tr mat-row *matRowDef="let row; columns: cols;"></tr>
    </table>

    <mat-paginator [pageSize]="5" [pageSizeOptions]="[5,10,20]"></mat-paginator>
  `
})
export class AlunosList implements OnInit {
    cols = ['nome', 'email', 'acoes'];
    dataSource = new MatTableDataSource<Aluno>([]);
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    constructor(private svc: AlunosService, private dialog: MatDialog) { }

    ngOnInit() {
        this.svc.alunos$.subscribe(list => {
            this.dataSource.data = list;
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        });
        this.dataSource.filterPredicate = (d, f) =>
            `${d.nome} ${d.sobrenome} ${d.email}`.toLowerCase().includes(f.trim().toLowerCase());
    }

    applyFilter(ev: Event) { this.dataSource.filter = (ev.target as HTMLInputElement).value; }

    novo() {
        const ref = this.dialog.open(AlunoForm, { data: { mode: 'create' } });
        ref.afterClosed().subscribe(v => { if (v) this.svc.add(v); });
    }
    editar(a: Aluno) {
        const ref = this.dialog.open(AlunoForm, { data: { mode: 'edit', aluno: a } });
        ref.afterClosed().subscribe(v => { if (v) this.svc.update({ ...a, ...v }); });
    }
    excluir(a: Aluno) { this.svc.remove(a.id); }
}
