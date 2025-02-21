import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const UserProfile = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const gqlContext = GqlExecutionContext.create(ctx);
  const request = gqlContext.getContext().req; // Get request object

  if (!request.user) {
    throw new Error('User not found in request');
  }

  console.log('User', request.user);


  return request.user; // Return the authenticated user
});