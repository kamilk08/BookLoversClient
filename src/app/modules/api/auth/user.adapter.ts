import { Adapter } from '../../shared/adapter';
import { DecodedToken } from './refreshing-tokens/models/decoded-token.model';
import { Account } from './models/account.model';
import { User } from './models/user.model';

export class UserAdapter implements Adapter<User>{
  adapt(item: DecodedToken) {
    if (!item)
      return undefined;

    let user: User = {
      identification: { id: +item.userId, guid: item.sub },
      roles: item.roles,
      account: new Account(item.email)
    };

    return user;
  }

}
