import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { IngresoEgreso } from 'src/app/models/ingreso-egreso.model';
import { map } from 'rxjs/operators';
import { IngresoEgresoService } from 'src/app/services/ingreso-egreso.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: []
})
export class DetalleComponent implements OnInit, OnDestroy {

  public ingresosYegresos: IngresoEgreso[] = [];
  public IE_subs: Subscription = new Subscription();

  constructor(private store:Store<AppState>, private ingresoEgresoService: IngresoEgresoService) { }

  ngOnInit() {
    this.IE_subs = this.store.select('IE').pipe(map(data => data.items))
                           .subscribe((IE: IngresoEgreso[])=> {
                             this.ingresosYegresos = IE;
                             console.log(this.ingresosYegresos);
    })
  }

  borrarItem(ie: IngresoEgreso) { 
    this.ingresoEgresoService.borrarIngresoEgreso(ie);
  }

  ngOnDestroy() {
    this.IE_subs.unsubscribe();
  }

}
