import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchSongComponent } from './search-song.component';

const routes: Routes = [
  { path: ':searchTerm', component: SearchSongComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchSongRoutingModule {}
