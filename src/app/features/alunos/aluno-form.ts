import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Aluno } from '../../shared/aluno.model';

type Data = { mode: 'create' | 'edit', aluno?: Aluno };

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule],
  template: `
    <h2>{{ data.mode === 'create' ? 'Novo Aluno' : 'Editar Aluno' }}</h2>

    <form [formGroup]="form">
      <label>Nome</label>
      <input class="form-control" formControlName="nome">

      <label>Sobrenome</label>
      <input class="form-control" formControlName="sobrenome">

      <label>E-mail</label>
      <input class="form-control" formControlName="email">
    </form>

    <div class="mt-3" style="text-align:right">
      <button class="btn btn-outline-secondary" (click)="ref.close()">Cancelar</button>
      <button class="btn btn-primary" [disabled]="form.invalid" (click)="salvar()">Salvar</button>
    </div>
  `
})
export class AlunoForm {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    public ref: MatDialogRef<AlunoForm>,
    @Inject(MAT_DIALOG_DATA) public data: Data
  ) {

    this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(2)]],
      sobrenome: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
    });

    if (data.aluno) this.form.patchValue(data.aluno);
  }

  salvar() {
    if (this.form.valid) this.ref.close(this.form.value);
  }
}
