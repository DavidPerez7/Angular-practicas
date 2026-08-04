import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-labs',
  imports: [CommonModule],
  templateUrl: './labs.html',
  styleUrl: './labs.css',
})
export class Labs {
  protected readonly information = "App de tareas simple en Angular";
  protected readonly tasks = [
    "1. Instalacion de angular CLI",
    "2. Creacion de nuevo proyecto",
    "3. Creacion de componentes"
  ]
}
