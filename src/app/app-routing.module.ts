import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'artist',
    loadChildren: () =>
      import('./features/artist/artist.module').then(m => m.ArtistModule),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./features/home/home.module').then(m => m.HomeModule),
  },
  {
    path: 'search-song',
    loadChildren: () =>
      import('./features/search-song/search-song.module').then(
        m => m.SearchSongModule
      ),
  },
  {
    path: 'track',
    loadChildren: () =>
      import('./features/song/song.module').then(m => m.SongModule),
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '/home',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabledBlocking',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
