import { Component, OnInit, ViewChild } from "@angular/core"
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: "app-contact",
  templateUrl: "./contact.component.html",
  styleUrls: ["./contact.component.css"],
})
export class ContactComponent implements OnInit {
  @ViewChild(MatSelectModule) select: MatSelectModule;
  @ViewChild(MatInputModule) input: MatInputModule;
  @ViewChild(MatFormFieldModule) formField: MatFormFieldModule;
  
  constructor() {}

  ngOnInit(): void {}
}
