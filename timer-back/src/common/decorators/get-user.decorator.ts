import { createParamDecorator } from "@nestjs/common";
import { User } from "../../user/model/user.entity";

export const GetUser = createParamDecorator((data, req): User => {
  console.log(req.header)
  return req.user;
});