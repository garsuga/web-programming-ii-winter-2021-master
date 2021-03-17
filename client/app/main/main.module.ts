import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { RouterModule, Routes } from '@angular/router';

import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { RatingConfig, RatingModule } from 'ngx-bootstrap/rating';
import { CarouselConfig, CarouselModule } from 'ngx-bootstrap/carousel';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MainPage } from './main.page';
import { UserService } from '../../components/services/user.service';
import { RecipeService } from '../../components/services/recipe.service';
import { BsModalRef, BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { RecipeComponent } from '../../components/recipe/full/recipe.component';
import { RecipeCardComponent } from '../../components/recipe/card/recipecard.component';
import { EditListComponent } from '../../components/editlist/editlist.component';
import { KeyValuePipe, TitleCasePipe } from '@angular/common';
import { ReviewComponent } from '../../components/review/review.component';
import { ReviewService } from '../../components/services/review.service';
import { CreateReviewComponent } from '../../components/review/create/createreview.component';
import { RecipesPage } from '../../components/recipe/page/recipe.page';
import { UsersPage } from '../../components/user/page/user.page';


export const ROUTES: Routes = [
    { path: 'recipes', component: RecipesPage},
    { path: 'users', component: UsersPage},
    { path: '**', component: MainPage }
];


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ModalModule,
        BrowserAnimationsModule,
        RouterModule.forChild(ROUTES),
        TooltipModule.forRoot(),
        RatingModule.forRoot(),
        CarouselModule.forRoot()
    ],
    declarations: [
        MainPage,
        RecipeComponent,
        RecipeCardComponent,
        EditListComponent,
        ReviewComponent,
        CreateReviewComponent,
        RecipesPage,
        UsersPage
    ],

    exports: [
        MainPage,
    ],
    providers: [
        UserService,
        RecipeService,
        BsModalService,
        BsModalRef,
        KeyValuePipe,
        TitleCasePipe,
        RatingConfig,
        ReviewService,
        CarouselConfig
    ],
    entryComponents: [
        RecipeComponent
    ]
})
export class MainModule {}
