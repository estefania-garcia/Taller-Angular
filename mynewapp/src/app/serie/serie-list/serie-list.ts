import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Serie } from '../serie'
import { dataSeries } from '../dataSerie'
import { SerieService } from '../serie.service';

import { AfterViewInit } from '@angular/core';
declare var bootstrap: any;
declare var $: any;

@Component({
  selector: 'app-serie-list',
  standalone: false,
  templateUrl: './serie-list.html',
  styleUrls: ['./serie-list.css'],
  encapsulation: ViewEncapsulation.None
})

export class SerieList implements OnInit, AfterViewInit {
  promedioTemporadas: number = 0;
  sumaTemporadas: number = 0;

  series: Array<Serie> = [];
  carouselInitialized = false;

  constructor(private serieService: SerieService) { }

  getSeriesList() {
    this.serieService.getSerie().subscribe((series) => {
      this.series = series;
      this.sumaTemporadas = this.series.reduce((acc, serie) => acc + serie.seasons, 0);
      this.promedioTemporadas = this.series.length > 0 ? this.sumaTemporadas / this.series.length : 0;
    });
  }

  ngOnInit() {
    this.getSeriesList();
  }

  ngAfterViewInit(): void { }

  ngAfterViewChecked(): void {
    if (this.series.length > 0 && !this.carouselInitialized) {
      this.initCarousel();
      this.carouselInitialized = true;
    }
  }

  initCarousel(): void {
    const multipleItemCarousel = document.querySelector("#carouselExample");

    if (window.matchMedia("(min-width:576px)").matches) {
      const carousel = new bootstrap.Carousel(multipleItemCarousel, {
        interval: false
      });

      const carouselWidth = $(".carousel2-inner")[0].scrollWidth;
      const cardWidth = $(".carousel2-item").width();
      let scrollPosition = 0;

      $(".carousel2-control-next").on("click", function () {
        if (scrollPosition < carouselWidth - cardWidth * 4) {
          scrollPosition += cardWidth;
          $(".carousel2-inner").animate({ scrollLeft: scrollPosition }, 600);
        }
      });

      $(".carousel2-control-prev").on("click", function () {
        if (scrollPosition > 0) {
          scrollPosition -= cardWidth;
          $(".carousel2-inner").animate({ scrollLeft: scrollPosition }, 600);
        }
      });
    } else {
      $(multipleItemCarousel).addClass("slide");
    }
  }
}