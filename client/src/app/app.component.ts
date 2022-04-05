import { Component, OnInit } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import gql from 'graphql-tag';

const getTutorials = gql`
  query {
    getTutorial {
      title
    }
  }
`;

const CREATE_LINK_MUTATION = gql`
  mutation ($title: String!,$description: String!) {
    addUser(input: { title: $title, description: $description, published: true }) {
      title
    }
  }
`;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  private query!: QueryRef<any>;
  tutorialArr!: any[];

  constructor(private apollo: Apollo) {}
  ngOnInit() {
    this.loadAuthorsData();
  }

  form = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(3)]),

    description: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
  });

  onSubmit() {
    console.log(this.form.value.title);

    this.apollo
      .mutate<any>({
        mutation: CREATE_LINK_MUTATION,
        variables: {
          title: this.form.value.title,
          description:this.form.value.description
        },
      })
      .subscribe((response) => {
        console.log(response);
      });
  }

  public loadAuthorsData() {
    this.query = this.apollo.watchQuery({
      query: getTutorials,
    });
    this.query.valueChanges.subscribe((result) => {
      console.log(result.data.getTutorial);
      this.tutorialArr = result.data.getTutorial;
    });
  }
}
