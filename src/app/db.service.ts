import { Injectable } from '@angular/core';

import {
  Stitch,
  RemoteMongoClient,
  AnonymousCredential,
  RemoteMongoDatabase,
  StitchAppClient
} from 'mongodb-stitch-browser-sdk';



@Injectable({ providedIn: 'root' })
export class DBService {
  db: RemoteMongoDatabase;
  client: StitchAppClient;

  initDB() {

    this.client = Stitch.initializeDefaultAppClient('mongodb-stitch-oavqv');

    this.db = this.client.getServiceClient(RemoteMongoClient.factory, 'mongodb-stitch').db('ng-db');
  }

  addToDo(todo: { title: string }) {
    this.client.auth.loginWithCredential(new AnonymousCredential()).then(() => {
      this.db.collection('todos').insertOne(todo);
    });

  }

  getTodos() {
    return this.client.auth.loginWithCredential(new AnonymousCredential()).then(() => {
      return this.db.collection<{ title: string }>('todos').find().asArray();
    });
  }
}
