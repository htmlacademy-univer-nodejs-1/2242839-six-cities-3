import 'reflect-metadata';
import {RestApplication} from './rest';
import {Container} from 'inversify';
import {Component} from './shared/types';
import {restApplicationContainer} from './rest/rest.container';
import {userContainer} from './shared/modules/user/user.container';
import {offerContainer} from './shared/modules/offer';
import {commentContainer} from './shared/modules/comment';
import {authContainer} from './shared/modules/auth';

(async () => {
  const appContainer = Container.merge(
    restApplicationContainer(),
    userContainer(),
    offerContainer(),
    commentContainer(),
    authContainer(),
  );

  const application = appContainer.get<RestApplication>(Component.RestApplication);
  await application.init();
})();
