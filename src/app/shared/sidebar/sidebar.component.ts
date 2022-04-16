import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styles: [],
})
export class SidebarComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  logout() {
    Swal.fire({
      title: "Espere por favor",
      didOpen: () => {
        Swal.showLoading();
      },
    });
    this.authService
      .logout()
      .then((data) => {
        console.log(data)
        Swal.close();
        this.router.navigate(["/login"]);
      })
      .catch((e) => {
        Swal.fire({
          icon: "error",
          title: e.message,
          text: "Something went wrong!",
          footer: '<a href="">Why do I have this issue?</a>',
        });
      });
  }
}