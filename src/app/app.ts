import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('todoApp');
  protected readonly information = "App de tareas simple en Angular";
  protected readonly tasks = [
    "1. Instalacion de angular CLI",
    "2. Creacion de nuevo proyecto",
    "3. Creacion de componentes"
  ]
}
