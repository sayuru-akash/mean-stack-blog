import {Component, NgModule, OnDestroy, OnInit} from "@angular/core";
import {AuthService} from "../auth/auth.service";
import {interval, subscribeOn, Subscription} from "rxjs";
import {Socket} from "ngx-socket-io";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit, OnDestroy {
  userIsAuthenticated = false;
  private authListenerSubs: Subscription;
  constructor(private authService: AuthService, private socket: Socket, private _snackBar: MatSnackBar) {}

  onLogout() {
    this.authService.logout();
  }

  ngOnInit() {
    interval(1000).subscribe((x) => {
      this.socket.on('createPost', (postName:string) => {
        this._snackBar.open('New post was created by a user, Post Name: ' + postName, 'Okay',{
          duration: 2500,
        });
      });
      this.socket.on('deletePost', (postId: string) => {
        this._snackBar.open('A post was removed by a user, PostID: ' + postId, 'Okay',{
          duration: 2500,
        });
      });
    });
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService.getAuthStatusListener()
      .subscribe((isAuthenticated: boolean) => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }
}
