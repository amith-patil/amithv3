import { Component } from '@angular/core';
import { Hero } from '../../components/hero/hero';
import { About } from '../../components/about/about';
import { Contact } from '../../components/contact/contact';
import { Career } from '../../components/career/career';
import { Footer } from '../../components/footer/footer';

@Component({
  selector: 'app-home',
  imports: [Hero, About, Contact, Career, Footer],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home { }
