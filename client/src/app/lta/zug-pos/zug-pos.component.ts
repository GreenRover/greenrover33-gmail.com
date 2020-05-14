import { LtaService } from './../../api/api/lta.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-zug-pos',
  templateUrl: './zug-pos.component.html',
  styleUrls: ['./zug-pos.component.css']
})
export class ZugPosComponent implements OnInit {

  constructor(
    private ltaService: LtaService
  ) { }

  ngOnInit(): void {
    this.ltaService.znv().subscribe(znt => {
      console.log(znt);
    });
  }

}
