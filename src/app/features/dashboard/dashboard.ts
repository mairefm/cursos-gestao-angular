import { Component } from '@angular/core';
import { IconType } from '@angular/material/icon/testing';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  listItems = [
    {
      name: 'Inicio',
      icon: 'home',
      url: '/dashboard'
    },
    {
      name: 'Cursos',
      icon: 'school',
      url: '/cousers'
    },
    {

      name: 'Alumnos',
      icon: 'groups',
      url: '/students',

    }
  ];
}
