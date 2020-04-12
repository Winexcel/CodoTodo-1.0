import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.sass']
})
export class MainLayoutComponent implements OnInit {

  currentYear = (new Date()).getFullYear();
  userMenu = {
    isFirstOpen: true,
    display: false,
  };

  navbar = {
    isFirstOpen: true,
    display: false,
  };

  @HostListener('document:click')
  onDocumentClick() {
    if (this.userMenu.display) {
      this.userMenu.display = false;
    }

    if (this.navbar.display) {
      this.navbar.display = false;
    }
  }

  @ViewChild('userDropDown', {static: true}) userDropDown: ElementRef;

  constructor() {
  }

  ngOnInit(): void {
  }

  openMenu(event) {
    this.userMenu.isFirstOpen = false;

    this.userMenu.display = !this.userMenu.display;
    event.stopPropagation();
  }

  openNavbar(event) {
    this.navbar.isFirstOpen = false;

    this.navbar.display = !this.navbar.display;
    event.stopPropagation();
  }
}
