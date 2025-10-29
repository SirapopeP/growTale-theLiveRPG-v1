import { createParamDecorator, ExecutionContext } from '@nestjs/common';

interface AuthenticatedRequest {
  user: { id: number; email: string; role: string };
}

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<AuthenticatedRequest>();
    return request.user;
  },
);
