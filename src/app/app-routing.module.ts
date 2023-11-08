import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'artist',
    loadChildren: () =>
      import('./components/artist/artist.module').then(m => m.ArtistModule),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./components/home/home.module').then(m => m.HomeModule),
  },
  {
    path: 'search-song',
    loadChildren: () =>
      import('./components/search-song/search-song.module').then(
        m => m.SearchSongModule
      ),
  },
  {
    path: 'track',
    loadChildren: () =>
      import('./components/song/song.module').then(m => m.SongModule),
  },
  // Redirect to `home` as the default route
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
