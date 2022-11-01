import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { MatCard } from '@angular/material/card';
import { ICard } from './card.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnChanges {
  @Input() cardData!: ICard;
  cardBackgroundcolor: { [klass: string]: any } = {};
  constructor() {}

  ngOnChanges(): void {
    this.cardBackgroundcolor = {
      'background-color': this.cardData['background-color'],
    };
  }
}
