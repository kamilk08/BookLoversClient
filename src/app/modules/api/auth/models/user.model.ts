import { Identification } from "src/app/modules/shared"
import { Account } from "./account.model"
export class User {
  identification: Identification
  roles: string[]
  account: Account
}
